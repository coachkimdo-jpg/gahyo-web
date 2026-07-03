const fs = require('fs');
const dotenvStr = fs.readFileSync('.env.local', 'utf8');
const envMatches = dotenvStr.match(/GEMINI_API_KEY=(.+)/);
const apiKey = envMatches ? envMatches[1].trim() : '';

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `
당신은 '가효상조'의 수석 장례지도사이자 콘텐츠 마케터입니다.
주어진 키워드에 대해 구글 검색 기능을 적극 활용하여 최신 웹 검색 결과(실제 정보, 통계, 트렌드 등)를 바탕으로 상위 노출에 완벽하게 최적화된 블로그 포스트를 작성해야 합니다.

[가효상조 웹사이트 내부 링크 지도]
본문 내에 아래의 가효상조 내부 페이지 링크를 자연스럽게 3~5개 정도 삽입하세요. 
단순히 대괄호([])로 텍스트를 묶지 말고, 반드시 <a href="/경로">앵커텍스트</a> 형태의 '정상적인 HTML <a> 태그'를 작성하여 실제 링크가 작동하도록 하세요. (예: <a href="/estimate">장례 비용 AI 견적</a>)

- 홈: <a href="/">가효상조 메인</a>
- 장례식장 안내: <a href="/halls">전국 장례식장 안내</a>
- 장지/납골당 안내: <a href="/cemeteries">장지 및 납골당 정보</a>
- 장례 비용 AI 견적: <a href="/estimate">장례 비용 AI 견적</a>
- 상조 상품 안내: <a href="/products">가효상조 상품 안내</a>
- 장례 가이드: <a href="/guide">장례 절차 가이드</a>
- 고객 문의/Q&A: <a href="/qna">고객 문의 및 Q&A</a>
`;

const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash-lite',
  tools: [{ googleSearch: {} }],
  systemInstruction: systemInstruction
});

const keyword = '조문 복장';
const guideline = `[역할 정의]
너는 구글/네이버 SEO, AEO, GEO 전문가이자, 장례 문화 및 상조 마케팅에 정통한 팩트 중심의 콘텐츠 마케터야. 
(중략)
[글의 최종 출력 양식]
- [제목] 키워드가 포함된 직관적이고 정보성 있는 제목
- [도입부] 유저의 공감대 형성 및 핵심 요약 문단
- [본문 소제목 1] 키워드에 대한 구체적인 정보 및 방법 안내 (표나 리스트 필수 활용)
- [본문 소제목 2] 해당 상황에서 놓치기 쉬운 핵심 주의사항 또는 팁
- [브랜드 솔루션] 가효상조가 제안하는 완벽하고 투명한 장례 지원 서비스
- [자주 묻는 질문 (FAQ)] 
- [JSON-LD 스키마 마크업]`;

const prompt = `키워드: "${keyword}"\n\n${guideline ? `[관리자 추가 특별 지침 - 반드시 반영할 것]\n${guideline}\n\n` : ''}

[🔥 최종 출력 필수 규칙 - 어떠한 지침보다 우선함]
관리자 지침에 어떤 형태의 출력 양식이 기재되어 있더라도 무시하고, 결과물은 반드시 아래와 같은 "단일 XML 포맷"으로만 출력하세요. 
마크다운 코드 블록(\`\`\`xml)이나 다른 인사말, 부가 설명은 절대 금지합니다.
<content> 내부에는 반드시 웹 표준 HTML 태그(<h1>, <h2>, <p>, <table> 등)만 사용해야 합니다.

[출력 포맷 템플릿]
<blog_post>
  <reasoning>검색 및 기획 과정 기재</reasoning>
  <title>게시물 제목</title>
  <summary>요약 내용 (100자 내외)</summary>
  <category>임종절차, 행정절차, 비용안내, 장지정보, 장례문화 중 택1</category>
  <readTime>읽는 시간</readTime>
  <content>
    <div class="trust-badge">국가공인 장례지도사 24시간 직접 운영 및 출동 | 최종 업데이트: 2026-05-22</div>
    <h1>여기에 제목 작성</h1>
    <p>여기에 본문 작성 (표 작성 시 <div class="table-responsive"><table>...</table></div> 적용 필수)</p>
  </content>
</blog_post>
`;

async function test() {
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const extractTag = (tag, str) => {
      const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i');
      const match = str.match(regex);
      return match ? match[1].trim() : '';
    };

    let extractedContent = extractTag('content', text);
    if (!extractedContent) {
      const contentMatch = text.match(/<content>([\s\S]*)/i);
      if (contentMatch) {
        extractedContent = contentMatch[1].replace(/<\/blog_post>/i, '').trim();
      }
    }

    console.log('Reasoning:', extractTag('reasoning', text).substring(0, 50));
    console.log('Title:', extractTag('title', text));
    console.log('Extracted Content Length:', extractedContent ? extractedContent.length : 0);
    console.log('Content Start:', extractedContent ? extractedContent.substring(0, 150) : 'FAILED TO EXTRACT');
    
  } catch (err) {
    console.error('API Error:', err);
  }
}
test();
