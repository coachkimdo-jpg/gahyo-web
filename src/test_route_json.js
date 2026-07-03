const fs = require('fs');
const dotenvStr = fs.readFileSync('.env.local', 'utf8');
const envMatches = dotenvStr.match(/GEMINI_API_KEY=(.+)/);
const apiKey = envMatches ? envMatches[1].trim() : '';

const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `
당신은 '가효상조'의 수석 장례지도사이자 콘텐츠 마케터입니다.
주어진 키워드에 대해 구글 검색 기능을 적극 활용하여 최신 웹 검색 결과(실제 정보, 통계, 트렌드 등)를 바탕으로 상위 노출에 완벽하게 최적화된 블로그 포스트를 작성해야 합니다.

[가효상조 웹사이트 내부 링크 지도]
아래의 가효상조 내부 페이지 링크를 가장 자연스럽고 문맥에 맞게 3~5개 정도 본문에 삽입해라. ("여기"나 "클릭" 사용 금지)
- 홈: / (가효상조 메인)
- 장례식장 안내: /halls (전국 장례식장 정보)
- 장지/납골당 안내: /cemeteries (수목장, 공원묘지 등)
- 장례 비용 AI 견적: /estimate (맞춤형 장례 비용 산출)
- 상조 상품 안내: /products (가효상조 장례 상품)
- 장례 가이드: /guide (장례 절차 및 정보)
- 고객 문의/Q&A: /qna
`;

const schema = {
  type: SchemaType.OBJECT,
  properties: {
    reasoning: { 
      type: SchemaType.STRING, 
      description: "1단계에서 지시한 실시간 웹 검색 내용, 유저 의도 파악 등 단계를 나누어 생각한 과정(Thinking & Search)" 
    },
    title: { type: SchemaType.STRING, description: "게시물 제목 (롱테일 키워드 포함)" },
    summary: { type: SchemaType.STRING, description: "요약 내용 100자 내외" },
    category: { type: SchemaType.STRING, description: "임종절차, 행정절차, 비용안내, 장지정보, 장례문화 중 택 1" },
    readTime: { type: SchemaType.STRING, description: "읽는 시간 (예: 5분)" },
    content: { 
      type: SchemaType.STRING, 
      description: "본문 전체 HTML 코드. 첫 줄에는 반드시 E-E-A-T 신뢰도 배지 포함. 표(Table)를 작성할 때는 반드시 <div class=\"table-responsive\"> <table> ... </table> </div> 형태로 감싸줄 것." 
    }
  },
  required: ["reasoning", "title", "summary", "category", "readTime", "content"]
};

const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash-lite',
  tools: [{ googleSearch: {} }],
  systemInstruction: systemInstruction,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  }
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
관리자 지침에 어떤 형태의 출력 양식이 기재되어 있더라도 무시하고, 최종 결과물은 반드시 JSON 형식으로 반환하세요.
content 필드 내부에는 마크다운이나 임의의 텍스트가 아닌 오직 "웹 표준 HTML 태그(<h1>, <h2>, <p>, <table> 등)"만을 사용해야 합니다.
`;

async function test() {
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log('Success!');
    const data = JSON.parse(text);
    console.log('Title:', data.title);
    console.log('Content Start:', data.content.substring(0, 200));
  } catch (err) {
    console.error('API Error:', err);
  }
}
test();
