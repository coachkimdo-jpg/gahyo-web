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
아래의 가효상조 내부 페이지 링크를 가장 자연스럽고 문맥에 맞게 3~5개 정도 본문에 삽입해라. ("여기"나 "클릭" 사용 금지)
- 홈: / (가효상조 메인)
- 장례식장 안내: /halls (전국 장례식장 정보)
- 장지/납골당 안내: /cemeteries (수목장, 공원묘지 등)
- 장례 비용 AI 견적: /estimate (맞춤형 장례 비용 산출)
- 상조 상품 안내: /products (가효상조 장례 상품)
- 장례 가이드: /guide (장례 절차 및 정보)
- 고객 문의/Q&A: /qna
`;

const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash-lite',
  tools: [{ googleSearch: {} }],
  systemInstruction: systemInstruction
});

const keyword = '장례식장 조의금 봉투 쓰는법';
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
관리자 지침에 어떤 형태의 출력 양식이 기재되어 있더라도 무시하고, 최종 결과물은 반드시 아래의 XML 태그 구조를 그대로 유지해야 하며, <content> 내부에는 마크다운이나 임의의 XML 태그(<section>, <heading> 등)가 아닌 오직 "웹 표준 HTML 태그(<h1>, <h2>, <p>, <table> 등)"만을 사용하여 작성하세요.
마크다운 코드 블록(\`\`\`)은 절대 사용하지 말고 순수 텍스트로 바로 XML을 시작하세요. 다른 인사말이나 설명은 일절 출력하지 마세요.

<reasoning>
여기에서 지시한 검색 내용이나 과정(Thinking & Search)을 자유롭게 기재하세요.
</reasoning>
<title>여기에 게시물 제목을 작성하세요</title>
<summary>여기에 요약 내용을 100자 내외로 작성하세요</summary>
<category>반드시 다음 중 하나만 선택하여 작성하세요: 임종절차, 행정절차, 비용안내, 장지정보, 장례문화</category>
<readTime>여기에 읽는 시간 (예: 5분)을 작성하세요</readTime>
<content>
여기에 본문 전체 HTML 코드를 작성하세요.
- 첫 줄에는 반드시 <div class="trust-badge">국가공인 장례지도사 24시간 직접 운영 및 출동 | 최종 업데이트: 2026-05-22</div> 를 포함할 것.
- 표(Table)를 작성할 때는 반드시 <div class="table-responsive"> <table> ... </table> </div> 형태로 감싸줄 것.
</content>
`;

async function test() {
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log('Success!', text.substring(0, 500));
  } catch (err) {
    console.error('API Error:', err);
  }
}
test();
