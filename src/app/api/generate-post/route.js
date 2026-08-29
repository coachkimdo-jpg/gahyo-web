import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import funeralHalls from '@/lib/realData.json';

function findHallByKeyword(keyword) {
  if (!keyword || !Array.isArray(funeralHalls)) return null;
  const cleaned = keyword
    .replace(/장례식장|장례|이용안내|이용 안내|정보|안내|비용|후기|위치|주소|서비스/g, '')
    .trim();
  if (cleaned.length < 2) return null;
  return funeralHalls.find(h => {
    const coreName = (h.name || '').replace('장례식장', '').trim();
    return h.name.includes(cleaned) || cleaned.includes(coreName);
  }) || null;
}

export async function POST(req) {
  let keyword = '장례식장 비용';
  let guideline = '';

  try {
    const body = await req.json();
    if (body.keyword) keyword = body.keyword;
    if (body.guideline) guideline = body.guideline;

    // realData.json에서 시설 정보 자동 조회 → 프롬프트에 주입 (검색 결과보다 우선 적용)
    const hallData = findHallByKeyword(keyword);
    if (hallData) {
      const fi = hallData.facilityInfo || {};
      const roomPrices = (hallData.pricingData || [])
        .filter(p => p.itemType === '빈소+접객실' && p.price > 100000)
        .map(p => p.price);
      const pricingMin = roomPrices.length ? Math.min(...roomPrices) : null;
      const pricingMax = roomPrices.length ? Math.max(...roomPrices) : null;

      const dbArr = [
        '[확정 시설 정보 — 이 데이터가 100% 정확한 공식 데이터입니다. 그대로 본문에 사용하세요. 검색 결과와 달라도 이 데이터가 정확합니다. DB와 검색 결과의 비교 과정·메모·주석을 본문에 절대 노출하지 마세요.]',
        '시설명: ' + hallData.name,
        '주소: ' + hallData.address,
        '전화번호: ' + hallData.contact,
        fi.hallCount ? '빈소 수: ' + fi.hallCount + '개' : '',
        fi.structure ? '시설 구조: ' + fi.structure : '',
        fi.parkingInfo ? '주차: ' + fi.parkingInfo : '',
        fi.parkingAccess ? '교통/주차 안내: ' + fi.parkingAccess : '',
        fi.quickPoint ? '특징 요약: ' + fi.quickPoint : '',
        (hallData.features || []).length ? '운영 특징: ' + hallData.features.join(', ') : '',
        (pricingMin && pricingMax) ? '빈소 임대료: 24시간 기준 ' + pricingMin.toLocaleString() + '원~' + pricingMax.toLocaleString() + '원' : '',
        '[필수] 전화번호 ' + hallData.contact + '을(를) 반드시 본문 연락처 안내 섹션에 명시하세요.',
        '[금지] DB에 없는 지역 주민 할인·특정 계층 감면 등 미확인 혜택은 "일부 출처에서 언급이 있다"는 형태로도 절대 기재하지 마세요. 존재 자체를 언급하지 마세요.',
        '[금지] 총 장례 비용 범위(예: "579만~881만 원")를 AI가 추산하여 기재하지 마세요. DB에 있는 빈소 임대료만 명시하세요.',
        '[금지] 빈소 평형(평수, 예: 35평형·70평형)·호실 번호(예: 9호실·1호실) 정보를 DB 외부에서 창작하여 기재하지 마세요.',
      ];

      // 원자력병원 전용: RI 환자 특수 절차 자동 주입
      if (hallData.name.includes('원자력')) {
        dbArr.push(
          '[원자력병원 특수 절차 — 반드시 본문 별도 섹션으로 작성할 것]',
          '방사성 동위원소(RI) 치료 중 사망한 환자는 즉시 일반 빈소 안치 불가.',
          '임종 직후 원자력병원 방사선 안전팀에 먼저 연락하여 격리 안치 절차 완료 후에만 일반 장례 진행 가능.',
          '이를 사전에 모르는 유족이 많아 현장 혼란이 발생하는 사례가 빈번함.',
          '전문가로서 이 내용을 반드시 글에 포함해야 하며, 이것이 원자력병원 장례식장과 일반 장례식장의 가장 큰 차이점임.'
        );
      }

      const dbLines = dbArr.filter(Boolean).join('\n');
      guideline = dbLines + (guideline ? '\n\n' + guideline : '');
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY가 설정되지 않았습니다.' }, { status: 500 });
    }

    const systemInstruction = `
당신은 '가효상조'의 수석 장례지도사이자 콘텐츠 마케터 김도입니다.
국가공인 장례지도사 자격을 보유하고, 20년간 직접 수천 건의 장례를 진행한 현장 전문가입니다.

[글 작성 전 필수 웹 검색 프로토콜 — 이 단계를 반드시 먼저 실행하세요]
글을 쓰기 전에 반드시 googleSearch 도구를 사용하여 정보를 수집하세요. 이것은 선택이 아닌 필수입니다.

특정 장례식장·납골당·병원 이름이 키워드에 포함된 경우, 아래 검색어를 모두 실행하세요:
1) "[시설명] 장례식장 주소 전화번호"
2) "[시설명] 장례식장 빈소 운영 현황"
3) "[시설명] 장례식장 이용요금 주차"
4) "[시설명] 최신 뉴스 2024 2025"

일반 장례 정보 글의 경우에도 검색으로 최신 통계·법령을 확인하세요:
1) "보건복지부 장례 비용 통계 최신"
2) "장사법 관련 최신 개정 내용"

검색 결과 활용 원칙:
- 검색으로 확인된 정보 → 반드시 본문에 구체적 수치·사실로 포함
- 관리자 제공 정보가 있으면 → 검색 결과보다 관리자 정보를 우선 적용
- 검색해도 확인 불가 → 해당 항목·섹션 전체 삭제 (절대 플레이스홀더 금지)
- "직접 확인하세요", "변동될 수 있습니다" 같은 면피성 문구 → 전면 금지

통계·수치 인용 필수 형식:
- 올바른 예: "2024년 보건복지부 장례 실태조사 기준 전국 평균 장례 비용은 약 1,370만 원입니다"
- 올바른 예: "장사 등에 관한 법률 제14조에 따르면..."
- 절대 금지: [cite:X], [cite:1], [cite:2], [출처], [링크] 같은 대괄호 인용 플레이스홀더
- 절대 금지: 출처 불명의 수치를 임의로 생성하여 기재
- 출처가 불확실한 수치는 수치째로 삭제하세요.

[최우선 품질 기준 — Google YMYL·E-E-A-T & 네이버 콘텐츠 정책]
장례는 Google이 규정한 YMYL(Your Money or Your Life) 영역입니다.

① 원본 인사이트 필수 — 현장 경험에서만 나올 수 있는 구체적 인사이트를 반드시 포함하세요.

② 검증 가능한 수치·출처 직접 명시 — 출처를 본문 문장 안에 직접 명시하세요. "[cite:X]", "[출처]" 같은 인용 플레이스홀더는 절대 금지입니다. 출처가 불확실하면 수치 자체를 삭제하세요.

③ AI 단독 생성 금지 (네이버 정책) — 김도 장례지도사만이 말할 수 있는 시각과 판단을 담으세요.

④ 키워드 남용 절대 금지 — 핵심 키워드는 제목·첫 문단·소제목에 자연스럽게 1회씩 사용하고, 이후 동의어·관련 표현으로 변화를 주세요.

⑤ 낚시성·과장 제목 금지 — "충격", "절대", "반드시" 같은 감정 자극 표현 금지.

⑥ 불확실 정보·플레이스홀더 기재 절대 금지 — 아래 형태의 표현은 최종 출력물에 단 하나도 포함되어서는 안 됩니다:
   - "[정확한 주소 정보를 검색하여 기재]" 등 대괄호로 감싼 플레이스홀더 표현
   - "[cite:X]", "[cite:1]", "[출처]", "[링크]", "[각주]" 등 인용 플레이스홀더
   - "확인 필요", "변동될 수 있음", "직접 확인 권장", "달라질 수 있으며", "현장에서 문의하시는 것이 가장 정확합니다", "확인하시는 것이 좋습니다", "자세한 내용은 문의", "변동될 수 있으니", "문의하시면 됩니다", "달라질 수 있습니다" 같은 면피성·책임 회피 문구는 단 하나도 허용되지 않습니다.
   실행 원칙: 특정 장례식장·시설 글이라면 반드시 googleSearch 도구로 먼저 검색하고, 확인된 정보만 작성하세요. 확인 불가한 항목은 "문의하세요" 대신 섹션 전체를 삭제하세요. 빈 셀이나 플레이스홀더가 있는 표는 표 자체를 삭제하세요.
   표(table) 작성 금지 원칙: 셀 안에 실제 데이터 대신 설명문을 넣는 것은 절대 금지입니다. 실제 데이터로 채울 수 없는 표는 본문 문장으로 녹여 쓰거나 생략하세요.

⑦ 제목에 '가효상조' 브랜드명 삽입 금지 — "(feat. 가효상조)", "가효상조 추천" 같은 표현을 제목에 넣지 마세요.

⑧ HTML 콘텐츠 내 마크다운 문법 완전 금지 — content 태그 안에는 반드시 HTML 태그만 사용하세요.
   - 금지: **굵게**, *기울임*, ## 제목, - 목록 등 마크다운 문법
   - 사용: <strong>굵게</strong>, <em>기울임</em>, <h2>제목</h2>, <ul><li>목록</li></ul>

⑨ 특정 장례식장 글 작성 시 검색 기반 특화 정보 필수 — googleSearch로 확인한 해당 시설만의 고유한 특징을 반드시 포함하세요.
   - 검색으로 확인해야 할 것: 실제 주소, 전화번호, 빈소 수, 주차 가능 대수, 인근 화장장까지 이동 시간
   - 검색으로 확인해야 할 것: 병원 유형별 특수 사항 (암병원·원자력병원 → 방사성 동위원소 환자 특수 절차 등)
   - 검색 후에도 확인 불가 항목은 섹션 삭제. "문의 바랍니다", "확인하세요" 문구로 대체 금지.

⑩ AI 내부 추론·메모 본문 노출 절대 금지 — 글을 작성하는 과정에서 판단한 내용, DB와 검색 결과 비교 메모, 데이터 출처 설명 등을 본문에 절대 삽입하지 마세요.
   - 금지: "(관리자 DB 정보와 다름. 웹 검색 결과 확인 필요했으나, DB 정보 우선 적용. 따라서 DB 정보에 따라 6개 빈소로 명시)"
   - 금지: "(자세한 내용은 직접 확인 필요)", "(직접 확인 필요)", "(검색 결과 기준)"
   - 제공된 확정 데이터와 검색 결과가 다를 때: 조용히 확정 데이터를 사용하고 그 과정을 본문에 드러내지 마세요.

[관리자 제공 데이터 활용 전략]
AI 단독으로 100점 글을 만들 수 없는 이유: Google E-E-A-T의 첫 번째 E(Experience)는 AI가 증명할 수 없습니다. 이를 보완하는 방법은 관리자가 실제 데이터를 제공하거나, AI가 웹 검색으로 실제 데이터를 직접 수집하는 것입니다.

관리자 추가 지침에 실제 시설 정보가 있을 때:
- 제공된 주소·전화번호·빈소 수·요금·특이사항을 글에 정확히 반영하세요.
- 검색 결과와 다를 경우 관리자 제공 정보가 우선입니다.

관리자 추가 지침 없이 특정 시설 글을 쓸 때:
- googleSearch 검색 프로토콜을 반드시 실행하여 시설 정보를 직접 수집하세요.
- 검색으로 확인된 사실(주소, 전화번호, 시설 특성 등)을 본문에 반드시 포함하세요.
- 검색해도 확인 불가한 항목은 섹션 자체를 삭제하고, 대신 전문가 인사이트 분량을 늘리세요.

[콘텐츠 작성 5대 원칙]
1. 독자 TPO 명확화 & 현장 경험 기반
   - 글 서두에 "갑작스러운 부고를 받은 30~40대 직장인 자녀"처럼 구체적인 독자와 상황을 설정하세요.
   - 1인칭 시점의 현장 경험(시행착오, 유족이 자주 묻는 질문, 실제 발생 빈도)을 반드시 포함하세요.
   - 공신력 있는 출처(보건복지부·통계청·장사정보시스템 e-하늘)의 수치를 인용하여 신뢰도를 높이세요.

2. 대안 비교 & 상황별 최적 선택 제시
   - "일반 3일장 vs 무빈소 직장(直葬)", "납골당 vs 수목장 vs 해양장" 등 구체적 비교를 작성하세요.
   - 가족 규모·예산·종교·지역별로 어떤 선택이 유리한지 결정적 이유와 함께 제시하세요.

3. 시간순 실전 절차 (단계별 체크리스트)
   - 임종 직후 → 1일 차 → 2일 차 → 발인 당일처럼 시간 순서로 해야 할 일을 구체적으로 기술하세요.
   - "사망신고를 당일 내로 처리하지 못할 때 발생하는 실제 불이익" 등 실전 인사이트를 담으세요.

4. 읽기 쉬운 HTML 구조
   - h1(본문에 1개만), h2, h3으로 계층적 구조를 잡고, ul/ol/table을 적극 활용하세요.
   - 문장은 2~3줄 이내로 끊고, 핵심 정보는 이미지 안에 넣지 말고 반드시 텍스트로 작성하세요.

5. 진정성 & 어뷰징 금지
   - 허위·과장·억지 홍보를 절대 포함하지 마세요.
   - 외부 자료 인용 시 출처를 명시하고, 유가족을 배려하는 따뜻하고 진정성 있는 어조를 유지하세요.

[가효상조 웹사이트 내부 링크 지도]
본문 내에 아래 링크를 맥락에 맞게 자연스럽게 3~5개 삽입하세요.
반드시 HTML a 태그로 작성하세요.
- 홈: <a href="/">가효상조 메인</a>
- 장례식장 안내: <a href="/halls">전국 장례식장 안내</a>
- 장지/납골당 안내: <a href="/cemeteries">장지 및 납골당 정보</a>
- 장례 비용 AI 견적: <a href="/estimate">장례 비용 AI 견적</a>
- 상조 상품 안내: <a href="/products">가효상조 상품 안내</a>
- 장례 가이드: <a href="/guide">장례 절차 가이드</a>
- 고객 문의/Q&A: <a href="/qna">고객 문의 및 Q&A</a>
`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
      tools: [{ googleSearch: {} }],
      systemInstruction: systemInstruction
    });

    const today = new Date().toISOString().split('T')[0];

    const searchInstruction = `[글 작성 전 필수 검색 실행]
googleSearch 도구를 사용하여 아래를 먼저 검색하세요:
- 키워드 "${keyword}"와 관련된 최신 정보
- 키워드에 특정 시설명이 포함된 경우: 해당 시설의 주소, 전화번호, 빈소 수, 이용요금, 교통편을 반드시 검색하세요
- 통계 수치가 필요한 경우: 보건복지부, 통계청 등 공신력 있는 출처를 검색하여 확인된 수치만 사용하세요
- 검색 결과에서 확인된 사실만 작성하고, 확인 불가 항목은 섹션 전체를 삭제하세요
- [cite:X], [cite:1] 같은 인용 플레이스홀더는 절대 출력하지 마세요. 출처는 문장 안에 직접 명시하거나 수치째로 삭제하세요
- 특정 시설 글이라면 반드시 포함할 것: 임종 직후→1일차→2일차→발인 당일 시간순 절차, 해당 시설의 고유 특수사항(자사 DB에 있으면 반드시 포함), 인근 화장장 이동 정보
- 면피성 문구 최종 점검: 작성 완료 후 "확인하세요", "달라질 수 있습니다", "문의하시면", "가장 정확합니다" 표현이 있으면 해당 문장을 삭제하거나 확정 정보로 교체하세요`;

    const outputInstruction = `[최종 출력 필수 규칙]
결과물은 반드시 아래와 같은 단일 XML 포맷으로만 출력하세요.
마크다운 코드 블록이나 다른 인사말, 부가 설명은 절대 금지합니다.
content 내부에는 반드시 웹 표준 HTML 태그만 사용해야 합니다.

[이미지 프롬프트 규칙]
글의 핵심 주제를 가장 잘 표현하는 고품질 이미지를 생성하기 위해 아래 태그를 반드시 작성하세요.
1. image_prompt: 이미지 생성 AI에게 전달할 영어 프롬프트 (photorealistic, 8k, warm lighting, respectful atmosphere 등 포함)
   - 중요 규칙: 사람(인물)이 포함되어야 한다면, 반드시 "Modern Korean men and women in 2026, authentic Korean appearance, contemporary attire"으로 구체적으로 묘사하세요.
2. image_alt: 이미지의 alt 속성값 (한국어, 구체적인 문장형)
3. image_filename: 영어 소문자와 하이픈(-)만 사용한 파일명 (확장자 제외)

[출력 포맷 템플릿]
<blog_post>
  <reasoning>검색 및 기획 과정 기재</reasoning>
  <image_prompt>이미지 생성기용 영어 프롬프트</image_prompt>
  <image_alt>이미지 alt 속성값 (한국어)</image_alt>
  <image_filename>영어-하이픈-파일명</image_filename>
  <title>게시물 제목</title>
  <summary>요약 내용 (100자 내외)</summary>
  <category>임종절차, 행정절차, 비용안내, 장지정보, 장례문화 중 택1</category>
  <readTime>읽는 시간</readTime>
  <content>
    <div class="trust-badge">국가공인 장례지도사 24시간 직접 운영 및 출동 | 최종 업데이트: TODAYDATE</div>
    <h1>여기에 제목 작성</h1>
    <p>여기에 본문 작성</p>
    <div class="ai-disclaimer" style="margin-top: 40px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; font-size: 0.85rem; color: #6c757d; border-left: 3px solid #dee2e6;">
      ℹ️ <strong>콘텐츠 작성 안내:</strong> 이 글은 가효상조 수석 장례지도사의 실제 현장 경험과 전문 지식을 바탕으로, 독자분들께 더욱 체계적이고 명확한 정보를 제공하기 위해 인공지능(AI)의 도움을 받아 구조화 및 편집되었습니다.
    </div>
  </content>
</blog_post>`;

    const guidelineSection = guideline ? `[관리자 추가 특별 지침 - 반드시 반영할 것]\n${guideline}\n\n` : '';

    const prompt = `키워드: "${keyword}"\n\n${guidelineSection}${searchInstruction}\n\n${outputInstruction}`.replace('TODAYDATE', today);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Remove <reasoning> block completely
    const textWithoutReasoning = text.replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '');

    // Extract XML tags robustly
    const extractTag = (tag, str) => {
      const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i');
      const match = str.match(regex);
      return match ? match[1].trim() : '';
    };

    let extractedContent = extractTag('content', textWithoutReasoning);
    if (!extractedContent) {
      const contentMatch = textWithoutReasoning.match(/<content>([\s\S]*)/i);
      if (contentMatch) {
        extractedContent = contentMatch[1].replace(/<\/blog_post>/i, '').trim();
      }
    }

    const cleanString = (str) => {
      return (str || '').replace(/ /g, ' ');
    };

    const imagePrompt = extractTag('image_prompt', textWithoutReasoning);
    const imageAlt = extractTag('image_alt', textWithoutReasoning) || `${keyword} 관련 장례 가이드 이미지`;
    const imageFilename = extractTag('image_filename', textWithoutReasoning) || `ai-post-${Date.now()}`;

    // Generate image with Imagen & upload to Firebase Storage
    let finalImageUrl = null;

    if (imagePrompt && apiKey) {
      try {
        const imgRes = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict',
          {
            method: 'POST',
            headers: {
              'x-goog-api-key': apiKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              instances: [{ prompt: imagePrompt }],
              parameters: { sampleCount: 1, aspectRatio: '16:9' },
            }),
          }
        );

        if (imgRes.ok) {
          const imgData = await imgRes.json();
          if (imgData.predictions && imgData.predictions.length > 0) {
            const base64Str = imgData.predictions[0].bytesBase64Encoded;
            const binaryStr = atob(base64Str);
            const bytes = new Uint8Array(binaryStr.length);
            for (let i = 0; i < binaryStr.length; i++) {
              bytes[i] = binaryStr.charCodeAt(i);
            }
            const storageRef = ref(storage, `ai-posts/${imageFilename}.png`);
            await uploadBytes(storageRef, bytes, { contentType: 'image/png' });
            finalImageUrl = await getDownloadURL(storageRef);
          }
        } else {
          console.error('Imagen generation failed:', await imgRes.text());
        }
      } catch (err) {
        console.error('Error generating/uploading image:', err);
      }
    }

    // Build image tag and inject after <h1>
    let finalContent = cleanString(extractedContent || text);

    // Remove any img tags pointing to local /images/ paths
    finalContent = finalContent.replace(/<img[^>]*src=["'][^"']*\/images\/[^"']*["'][^>]*\/?>/gi, '');

    // AI 내부 추론 누출 자동 제거 (괄호 안에 DB/검색 비교 메모가 들어간 경우)
    finalContent = finalContent.replace(/\([^)]{0,400}(?:DB 정보|우선 적용|검색 결과 확인 필요|따라서 DB|DB 정보에 따라)[^)]*\)/g, '');
    // 관리자/DB 출처 표시 괄호 제거 (독자에게 노출되면 안 되는 내부 메모)
    finalContent = finalContent.replace(/\s*\([^)]*(?:관리자 제공|관리자 정보|DB 정보|자사 DB|제공 정보|출처 정보)[^)]*\)/g, '');

    // 면피성 괄호 표현 자동 제거 (길이 제한 300, 직접 확인 패턴 확장)
    finalContent = finalContent.replace(/\s*\([^)]{0,300}(?:자세한 내용은 직접 확인|직접 확인 필요|직접 확인이 필요|직접 확인하시|문의하시는 것이 좋|달라질 수 있|직접 확인 필요|감면 혜택 언급)[^)]*\)/g, '');

    // 문장 수준 면피성 표현 자동 제거 (괄호 밖 일반 문장)
    // HTML 태그(<)·마침표·줄바꿈을 경계로 삼아 해당 표현이 포함된 절·문장만 제거
    const sentenceHedgePatterns = [
      /[^<。.!?\n]*달라질 수 있습니다[^<。.!?\n]*[。.!?]?/g,
      /[^<。.!?\n]*달라질 수 있으며[^<。.!?\n]*[。.!?]?/g,
      /[^<。.!?\n]*달라질 수 있으니[^<。.!?\n]*[。.!?]?/g,
      /[^<。.!?\n]*변동될 수 있습니다[^<。.!?\n]*[。.!?]?/g,
      /[^<。.!?\n]*변동될 수 있으며[^<。.!?\n]*[。.!?]?/g,
    ];
    for (const pattern of sentenceHedgePatterns) {
      finalContent = finalContent.replace(pattern, '');
    }

    if (finalImageUrl) {
      const imgTag = `<img src="${finalImageUrl}" alt="${imageAlt}" width="800" height="400" loading="eager" style="width:100%;height:auto;border-radius:12px;margin:1.5rem 0;" />`;
      if (/<\/h1>/i.test(finalContent)) {
        finalContent = finalContent.replace(/<\/h1>/i, `</h1>\n${imgTag}`);
      } else {
        finalContent = imgTag + '\n' + finalContent;
      }
    }

    const data = {
      title: cleanString(extractTag('title', textWithoutReasoning)) || `가효상조 - 투명한 장례 서비스: ${keyword}`,
      summary: cleanString(extractTag('summary', textWithoutReasoning)) || '가효상조 후불제 상조 안내입니다.',
      category: cleanString(extractTag('category', textWithoutReasoning)) || '장례상식',
      readTime: cleanString(extractTag('readTime', textWithoutReasoning)) || '5분',
      content: finalContent,
    };

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error generating post:', error);

    const fallbackData = {
      title: `가효상조 - 100% 후불제 상조 및 투명한 장례 서비스: ${keyword}`,
      summary: `가효상조는 선불 납입금 없이 발인 날 결제하는 100% 후불제 상조입니다. 서울/경기 등 전국 100여 개 장례식장과 제휴하여 투명한 비용으로 ${keyword}를 지원합니다.`,
      category: "비용안내",
      readTime: "4분",
      content: `
<div class="trust-badge">국가공인 장례지도사 24시간 직접 운영 및 출동 | 최종 업데이트: ${new Date().toISOString().split('T')[0]}</div>
<h1>가효상조 - 100% 후불제 상조 및 투명한 장례 서비스: ${keyword}</h1>
<p>가효상조는 선불 납입금 없이 발인 날 결제하는 100% 후불제 상조입니다. 서울/경기 등 전국 100여 개 장례식장과 제휴하여 유가족분들께 정직하고 투명한 <strong>${keyword}</strong> 안내를 약속드립니다.</p>
<h2>왜 가효상조를 선택해야 할까요?</h2>
<p>저희 가효상조는 복잡하고 막막한 장례 절차 속에서 <a href="/estimate">투명한 AI 비용 견적</a>을 통해 예상치 못한 추가 비용 발생을 원천 차단합니다.</p>
<ul>
  <li><strong>100% 후불제:</strong> 매월 내는 납입금 없이 모든 서비스가 끝난 후 결제</li>
  <li><strong>합리적인 비용:</strong> <a href="/halls">전국 장례식장 제휴 정보</a>를 바탕으로 최적의 빈소 섭외</li>
  <li><strong>맞춤형 상품:</strong> 거품을 뺀 <a href="/products">가효상조 상조 상품 안내</a> 제공</li>
</ul>
      `
    };
    return NextResponse.json(fallbackData);
  }
}
