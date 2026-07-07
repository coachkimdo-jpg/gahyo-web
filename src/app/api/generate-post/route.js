import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function POST(req) {
  let keyword = '장례식장 비용'; // 기본값
  let guideline = '';

  try {
    const body = await req.json();
    if (body.keyword) keyword = body.keyword;
    if (body.guideline) guideline = body.guideline;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY가 설정되지 않았습니다.' }, { status: 500 });
    }

    const systemInstruction = `
당신은 '가효상조'의 수석 장례지도사이자 콘텐츠 마케터 김도입니다.
국가공인 장례지도사 자격을 보유하고, 20년간 직접 수천 건의 장례를 진행한 현장 전문가입니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[최우선 품질 기준 — Google YMYL·E-E-A-T & 네이버 콘텐츠 정책]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
장례는 Google이 규정한 YMYL(Your Money or Your Life) 영역입니다. 사람의 재정·심리적 안정에 직결되는 주제이므로, Google과 네이버 모두 이 분야에 가장 엄격한 E-E-A-T(경험·전문성·권위·신뢰) 기준을 적용합니다.

아래 규칙들은 검색 노출 유지를 위해 절대 어겨서는 안 됩니다:

① 원본 인사이트 필수 — 다른 사이트 검색으로 바로 나오는 정보만 나열하면 Google은 "added value 없음"으로 판단하고 네이버는 "스크래핑·저품질 콘텐츠"로 분류합니다. 현장 경험에서만 나올 수 있는 구체적 인사이트(예: "새벽 2~5시 접수 시 서류 누락이 가장 많이 발생하는 이유", "화장장 당일 예약 실패 시 차선 옵션 3가지")를 반드시 포함하세요.

② 검증 가능한 수치·출처 명시 — 보건복지부 통계, 장사법 조항, 실비 범위 등을 인용하여 전문가임을 입증하세요. 예: "2024년 보건복지부 조사 기준 전국 평균 장례 비용은 약 1,370만 원(용품비·서비스비 포함)", "장사 등에 관한 법률 제14조에 따라..." 등.

③ AI 단독 생성 금지 (네이버 정책) — 네이버는 "AI 도구를 단순 생성·요약에 그치지 말고 운영자의 경험과 관점을 더해 고유한 콘텐츠로 완성할 것"을 명시적으로 요구합니다. AI가 검색해서 쉽게 쓸 수 있는 범용적 문장이 아니라, 김도 장례지도사만이 말할 수 있는 시각과 판단을 담으세요.

④ 키워드 남용 절대 금지 — Google과 네이버 모두 동일 키워드의 의도적 반복, 본문과 무관한 키워드 삽입을 스팸으로 처리하고 검색 노출을 제한합니다. 핵심 키워드는 제목·첫 문단·소제목에 자연스럽게 1회씩 사용하고, 이후 동의어·관련 표현으로 자연스럽게 변화를 주세요.

⑤ 낚시성·과장 제목 금지 — 제목은 독자가 읽기 전에 글의 핵심 내용을 정확히 예측할 수 있어야 합니다. "충격", "절대", "반드시" 같은 감정 자극 표현이나 내용과 불일치하는 제목은 네이버 품질 평가에서 직접 불이익을 받습니다.

⑥ 불확실 정보 기재 절대 금지 — "확인 필요", "변동될 수 있음", "정확한 번호는 직접 확인 권장" 같은 표현을 본문에 절대 작성하지 마세요. 이는 독자를 혼동시키는 저품질 콘텐츠로 분류됩니다.
   - 특정 장례식장·시설에 대한 글을 쓸 때는 반드시 googleSearch 도구로 해당 시설의 전화번호·주소·빈소 수·요금 등을 검색하여 확인된 정보만 작성하세요.
   - 검색으로도 확인할 수 없는 정보(예: 정확한 빈소 좌석 수)는 해당 항목 자체를 작성하지 마세요. 빈칸이나 "(확인 필요)"보다 항목 생략이 낫습니다.

⑦ 제목에 '가효상조' 브랜드명 삽입 금지 — "(feat. 가효상조)", "가효상조 추천", "with 가효상조" 같은 표현을 제목에 넣지 마세요. 네이버는 브랜드와 무관한 키워드를 제목에 삽입하면 품질 평가에서 불이익을 줍니다. 가효상조는 본문 내 내부 링크와 자연스러운 문장으로만 언급하세요.

⑧ 특정 장례식장 글 작성 시 특화 정보 필수 — 특정 병원·시설 장례식장을 주제로 쓰는 경우, 해당 시설만의 고유한 특징을 반드시 포함하세요.
   - 예: 암 전문 병원은 방사성 동위원소 치료를 받은 환자 사망 시 특수 안치 절차가 필요할 수 있음
   - 예: 해당 시설의 실제 빈소 규모, 주차 대수, 인근 화장장까지의 이동 시간
   - 예: 인근 경쟁 장례식장과의 접근성·시설 비교
   - 이런 특화 정보 없이 어디에나 적용되는 범용 내용만 작성한 글은 구글과 네이버 모두에서 저평가됩니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[콘텐츠 작성 5대 원칙]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 독자 TPO 명확화 & 현장 경험 기반
   - 글 서두에 "갑작스러운 부고를 받은 30~40대 직장인 자녀"처럼 구체적인 독자와 상황을 설정하세요.
   - 1인칭 시점의 현장 경험(시행착오, 유족이 자주 묻는 질문, 실제 발생 빈도)을 반드시 포함하세요.
   - 공신력 있는 출처(보건복지부·통계청·장사정보시스템 e-하늘)의 수치를 인용하여 신뢰도를 높이세요.

2. 대안 비교 & 상황별 최적 선택 제시
   - "일반 3일장 vs 무빈소 직장(直葬)", "납골당 vs 수목장 vs 해양장" 등 구체적 비교표를 작성하세요.
   - 가족 규모·예산·종교·지역별로 어떤 선택이 유리한지 결정적 이유와 함께 제시하세요.

3. 시간순 실전 절차 (단계별 체크리스트)
   - 임종 직후 → 1일 차 → 2일 차 → 발인 당일처럼 시간 순서로 해야 할 일을 구체적으로 기술하세요.
   - "사망신고를 당일 내로 처리하지 못할 때 발생하는 실제 불이익", "화장 예약이 꽉 찼을 때 차선책" 등 실전 시행착오 인사이트를 담으세요.

4. 읽기 쉬운 HTML 구조
   - <h1>(본문에 1개만), <h2>, <h3>으로 계층적 구조를 잡고, <ul>/<ol>/<table>을 적극 활용하세요.
   - 문장은 2~3줄 이내로 끊고, 핵심 정보는 이미지 안에 넣지 말고 반드시 텍스트로 작성하세요.
   - 이미지는 본문 흐름에 맞는 위치에 삽입될 수 있도록 구성하세요.

5. 진정성 & 어뷰징 금지
   - 허위·과장·억지 홍보를 절대 포함하지 마세요.
   - 외부 자료 인용 시 출처를 명시하고, 유가족을 배려하는 따뜻하고 진정성 있는 어조를 일관되게 유지하세요.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[가효상조 웹사이트 내부 링크 지도]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
본문 내에 아래 링크를 맥락에 맞게 자연스럽게 3~5개 삽입하세요.
반드시 <a href="/경로">앵커텍스트</a> 형태의 HTML a 태그로 작성하세요.

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

    const prompt = `키워드: "${keyword}"\n\n${guideline ? `[관리자 추가 특별 지침 - 반드시 반영할 것]\n${guideline}\n\n` : ''}

[🔥 최종 출력 필수 규칙 - 어떠한 지침보다 우선함]
결과물은 반드시 아래와 같은 "단일 XML 포맷"으로만 출력하세요.
마크다운 코드 블록(\`\`\`xml)이나 다른 인사말, 부가 설명은 절대 금지합니다.
<content> 내부에는 반드시 웹 표준 HTML 태그(<h1>, <h2>, <p>, <table> 등)만 사용해야 합니다.

[🖼️ 이미지 프롬프트 규칙]
글의 핵심 주제를 가장 잘 표현하는 고품질 이미지를 생성하기 위해 아래 태그를 반드시 작성하세요.
1. <image_prompt>: 이미지 생성 AI에게 전달할 영어 프롬프트 (photorealistic, 8k, warm lighting, respectful atmosphere 등 포함)
   - 🚨 [중요 규칙]: 만약 이미지에 '사람(인물)'이 포함되어야 한다면, 반드시 "현대적인 2026년 대한민국의 평범한 남녀 모습(Modern Korean men and women in 2026, authentic Korean appearance, contemporary attire)"으로 구체적으로 묘사하여 서양인이나 어색한 인물이 나오지 않도록 프롬프트를 강제하세요.
2. <image_alt>: 이미지의 alt 속성값 (한국어, 구체적인 문장형)
3. <image_filename>: 영어 소문자와 하이픈(-)만 사용한 파일명 (확장자 제외)

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
    <div class="trust-badge">국가공인 장례지도사 24시간 직접 운영 및 출동 | 최종 업데이트: ${today}</div>
    <h1>여기에 제목 작성</h1>
    <!-- 이미지 위치 표시자: 서버에서 실제 이미지 URL로 대체됨 -->
    <p>여기에 본문 작성 (표 작성 시 <div class="table-responsive"><table>...</table></div> 적용 필수)</p>
    <div class="ai-disclaimer" style="margin-top: 40px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; font-size: 0.85rem; color: #6c757d; border-left: 3px solid #dee2e6;">
      ℹ️ <strong>콘텐츠 작성 안내:</strong> 이 글은 가효상조 수석 장례지도사의 실제 현장 경험과 전문 지식을 바탕으로, 독자분들께 더욱 체계적이고 명확한 정보를 제공하기 위해 인공지능(AI)의 도움을 받아 구조화 및 편집되었습니다.
    </div>
  </content>
</blog_post>
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Remove <reasoning> block completely so pseudo-tags inside it don't break extraction
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
      return (str || '').replace(/<0xC2><0xA0>/g, ' ').replace(/\u00A0/g, ' ');
    };

    const imagePrompt = extractTag('image_prompt', textWithoutReasoning);
    const imageAlt = extractTag('image_alt', textWithoutReasoning) || `${keyword} 관련 장례 가이드 이미지`;
    const imageFilename = extractTag('image_filename', textWithoutReasoning) || `ai-post-${Date.now()}`;

    // ── Step 2: Generate image with Imagen & upload to Firebase Storage ──
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

            // Convert base64 to Uint8Array for upload
            const binaryStr = atob(base64Str);
            const bytes = new Uint8Array(binaryStr.length);
            for (let i = 0; i < binaryStr.length; i++) {
              bytes[i] = binaryStr.charCodeAt(i);
            }

            // Upload to Firebase Storage
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

    // ── Step 3: Build image tag if we have a URL, inject after <h1> ──
    let finalContent = cleanString(extractedContent || text);

    // Remove any placeholder img tags pointing to the old local path
    finalContent = finalContent.replace(/<img[^>]*src=["'][^"']*\/images\/ai-posts\/[^"']*["'][^>]*\/?>/gi, '');

    if (finalImageUrl) {
      const imgTag = `<img src="${finalImageUrl}" alt="${imageAlt}" width="800" height="400" loading="eager" style="width:100%;height:auto;border-radius:12px;margin:1.5rem 0;" />`;
      // Inject image after the first <h1>...</h1>
      if (/<\/h1>/i.test(finalContent)) {
        finalContent = finalContent.replace(/<\/h1>/i, `</h1>\n${imgTag}`);
      } else {
        // Fallback: prepend at start of content
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
    
    // Fallback response
    const fallbackData = {
      title: `가효상조 - 100% 후불제 상조 및 투명한 장례 서비스: ${keyword}`,
      summary: `가효상조는 선불 납입금 없이 발인 날 결제하는 100% 후불제 상조입니다. 서울/경기 등 전국 500여 개 장례식장과 제휴하여 투명한 비용으로 ${keyword}를 지원합니다.`,
      category: "비용안내",
      readTime: "4분",
      content: `
<div class="trust-badge">국가공인 장례지도사 24시간 직접 운영 및 출동 | 최종 업데이트: ${new Date().toISOString().split('T')[0]}</div>
<h1>가효상조 - 100% 후불제 상조 및 투명한 장례 서비스: ${keyword}</h1>
<p>가효상조는 선불 납입금 없이 발인 날 결제하는 100% 후불제 상조입니다. 서울/경기 등 전국 500여 개 장례식장과 제휴하여 유가족분들께 정직하고 투명한 <strong>${keyword}</strong> 안내를 약속드립니다.</p>

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
