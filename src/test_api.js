const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

async function test() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      tools: [{ googleSearch: {} }]
    });

    const keyword = '분당서울대병원장례식장 비용';
    const guideline = `[관리자 추가 특별 지침]
[역할 정의]
너는 구글/네이버 SEO, AEO, GEO 전문가이자, 실시간 데이터를 기반으로 글을 쓰는 팩트 중심의 콘텐츠 마케터야.
■ 1단계: 실시간 웹 검색 및 데이터 팩트 체크 (Thinking & Extracting)
- 검색 결과에서 반드시 다음 데이터를 찾아내어 본문에 포함시켜야 한다.
  1) 빈소 평형별 정확한 1일(24시간) 이용 요금
■ 2단계: 웹 표준 HTML 콘텐츠 작성
1단계에서 확보한 '실제 숫자 데이터'를 바탕으로 아래의 엔진별 최적화 가이드에 맞춰 최종 글을 출력해라.`;

    const prompt = `
당신은 '가효상조'의 수석 장례지도사이자 SEO 콘텐츠 마케터입니다.
주어진 키워드에 대해 구글 검색 기능을 적극 활용하여 최신 웹 검색 결과(실제 정보, 통계, 트렌드 등)를 바탕으로 상위 노출에 완벽하게 최적화된 블로그 포스트를 작성해야 합니다.

키워드: "${keyword}"

[관리자 추가 특별 지침 - 반드시 반영할 것]
${guideline}

[가효상조 웹사이트 내부 링크 지도]
AI는 작성 중인 본문의 문맥을 파악하여, 아래의 가효상조 내부 페이지 링크를 가장 자연스럽고 SEO에 적합한 앵커 텍스트(Anchor Text)와 함께 3~5개 정도 본문에 삽입해야 합니다. "여기"나 "클릭" 같은 단어는 앵커 텍스트로 절대 사용하지 마세요.
- 홈: / (가효상조 메인)

[작성 원칙 - 절대 준수]
1. E-E-A-T 신뢰도 배지 최상단 배치

응답은 반드시 아래 JSON 형식만을 출력해야 합니다 (마크다운 코드 블록이나 다른 텍스트는 포함하지 마세요):
{
  "step1_reasoning": "여기에서 사용자가 지시한 검색 내역, 팩트 체크, 단계를 나누어 생각한 과정 등을 자유롭게 텍스트로 기재하세요. (실제 화면에는 노출되지 않습니다)",
  "title": "게시물 제목 (롱테일 키워드 포함)",
  "summary": "목록에 표시될 요약 내용 (100자 내외)",
  "category": "추천 카테고리",
  "readTime": "읽는 시간 (예: 5분)",
  "content": "HTML 형식으로 작성된 본문 내용"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    console.log('RAW RAW OUTPUT START');
    console.log(text.substring(0, 2000));
    console.log('RAW RAW OUTPUT END');
  } catch (err) {
    console.error('ERROR CATCHED:', err);
  }
}
test();
