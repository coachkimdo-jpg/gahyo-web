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
장례 서비스는 구글의 YMYL(Your Money or Your Life) 기준이 엄격하게 적용되는 분야입니다. 따라서 기계적인 AI 느낌의 글이 아닌, 실제 현장 경험과 전문성을 바탕으로 한 E-E-A-T(경험, 전문성, 권위, 신뢰) 기준을 완벽하게 충족하는 글을 작성해야 합니다.

[E-E-A-T 및 YMYL 작성 원칙 - 매우 중요]
1. 경험(Experience) 증명: 반드시 "저희 가효상조가 최근 현장에서 장례를 진행하면서 느낀 점은..." 또는 "수석 장례지도사로서 유가족분들을 뵈면..." 과 같이 1인칭 시점의 생생한 현장 경험을 바탕으로 서술하세요.
2. 전문성(Expertise) 및 신뢰성(Trust): 허위 정보나 과장 없이 정확한 장례 지식을 제공하고, 글의 서두와 말미에 작성자가 '가효상조 수석 장례지도사'임을 명확히 밝혀 신뢰도를 높이세요.
3. 진정성 있는 어조: 검색 순위 조작용 키워드 남발을 절대 금지하며, 유가족의 슬픔에 공감하고 진정으로 도움을 주려는 따뜻하고 정중한 어투를 사용하세요.

[가효상조 웹사이트 내부 링크 지도]
본문 내에 아래의 가효상조 내부 페이지 링크를 자연스럽게 3~5개 정도 삽입하세요. 
반드시 <a href="/경로">앵커텍스트</a> 형태의 HTML a 태그를 작성하여 실제 링크가 작동하도록 하세요.

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
1. <image_prompt>: 이미지 생성 AI에게 전달할 영어 프롬프트 (photorealistic, warm lighting, respectful atmosphere 등 포함)
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
            const storageRef = ref(storage, `ai-posts/${imageFilename}.jpeg`);
            await uploadBytes(storageRef, bytes, { contentType: 'image/jpeg' });
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
