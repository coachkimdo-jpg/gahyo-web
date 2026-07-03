const fs = require('fs');
const dotenvStr = fs.readFileSync('.env.local', 'utf8');
const envMatches = dotenvStr.match(/GEMINI_API_KEY=(.+)/);
const apiKey = envMatches ? envMatches[1].trim() : '';

const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      tools: [{ googleSearch: {} }]
    });

    const keyword = '혜민병원장례식장 비용';
    const guideline = '[브랜드 솔루션] 후불제 가효상조의 투명한 상조 서비스 및 미사용 품목 공제 혜택\n[자주 묻는 질문 (FAQ)]\n[JSON-LD 스키마 마크업]';

    const prompt = `
당신은 '가효상조'의 수석 장례지도사이자 SEO 콘텐츠 마케터입니다.
주어진 키워드에 대해 구글 검색 기능을 적극 활용하여 최신 웹 검색 결과(실제 정보, 통계, 트렌드 등)를 바탕으로 상위 노출에 완벽하게 최적화된 블로그 포스트를 작성해야 합니다.

키워드: "${keyword}"
${guideline ? `\n[관리자 추가 특별 지침 - 반드시 반영할 것]\n${guideline}\n` : ''}
[가효상조 웹사이트 내부 링크 지도]
AI는 작성 중인 본문의 문맥을 파악하여, 아래의 가효상조 내부 페이지 링크를 가장 자연스럽고 SEO에 적합한 앵커 텍스트(Anchor Text)와 함께 3~5개 정도 본문에 삽입해야 합니다. "여기"나 "클릭" 같은 단어는 앵커 텍스트로 절대 사용하지 마세요.
- 홈: / (가효상조 메인)
- 장례식장 안내: /halls (전국 장례식장 정보)
- 장지/납골당 안내: /cemeteries (수목장, 공원묘지 등)
- 장례 비용 AI 견적: /estimate (맞춤형 장례 비용 산출)
- 상조 상품 안내: /products (가효상조 장례 상품)
- 장례 가이드: /guide (장례 절차 및 정보)
- 고객 문의/Q&A: /qna

[작성 원칙 - 절대 준수]
1. E-E-A-T 신뢰도 배지 최상단 배치
- 본문(content)의 가장 처음에 (H1 태그 위나 아래) 작성자의 전문성을 입증하는 신뢰도 문구를 눈에 띄게 배치하세요.
- 예: <div class="trust-badge">국가공인 장례지도사 24시간 직접 운영 및 출동 | 최종 업데이트: 2026-05-21</div>

2. BLUF(핵심 요약)와 H1 태그 최적화
- 명확한 계층: H1 태그는 하나만 사용하며, 구글 AI가 읽기 좋도록 직관적으로 작성하세요. (예: "가효상조 - 100% 후불제 상조 및 투명한 장례 서비스: ${keyword}")
- 핵심 요약 단락: H1 바로 아래에 200~300자 내외로 "가효상조는 선불 납입금 없이 발인 날 결제하는 100% 후불제 상조입니다. 서울/경기 등 전국 500여 개 장례식장과 제휴하여..." 형태의 명확한 회사 소개 및 글 요약(A는 B다 형태)을 반드시 배치하세요.

3. 가효상조 홍보 및 앵커 텍스트 적극 활용
- 단순 정보 전달을 넘어, 본문 중간중간 "왜 가효상조를 선택해야 하는지(100% 후불제, 투명한 비용 등)"를 키워드와 자연스럽게 엮어서 홍보하세요. 적절한 앵커 텍스트를 통해 내부 링크를 풍부하게 적용하세요.

4. 롱테일 FAQ 구성
- 본문 하단에 키워드 및 상조 자체에 대한 롱테일 질문형 키워드를 방어하는 FAQ 섹션을 반드시 추가하세요.
- 예: "후불제 상조와 선불제 상조의 가장 큰 차이점은 무엇인가요?", "한밤중에 임종하셨는데 지금 바로 장례식장 이동이 가능한가요?"

5. 구조화된 데이터 (Multi-schema JSON-LD)
- 본문 마지막 부분에 <script type="application/ld+json"> 태그를 삽입하고, 배열 안에 Article, Organization, WebSite, FAQPage 스키마를 모두 포함하세요.

응답은 반드시 아래와 같은 XML 태그 형식으로만 작성하세요 (마크다운 코드 블록이나 다른 텍스트는 포함하지 마세요):

<reasoning>
여기에서 사용자가 지시한 검색 내역, 팩트 체크, 단계를 나누어 생각한 과정(Thinking) 등을 자유롭게 텍스트로 기재하세요. (실제 화면에는 노출되지 않습니다)
</reasoning>

<title>게시물 제목 (롱테일 키워드 포함)</title>

<summary>목록에 표시될 요약 내용 (100자 내외)</summary>

<category>추천 카테고리 (예: 장례상식, 비용안내, 임종절차 등)</category>

<readTime>읽는 시간 (예: 5분)</readTime>

<content>
HTML 형식으로 작성된 본문 내용 (H1, H2, H3, p, ul, a, table 태그 및 JSON-LD 스키마 포함)
</content>
`;

    console.log("Generating...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    console.log('RAW RAW OUTPUT START');
    console.log(text);
    console.log('RAW RAW OUTPUT END');
  } catch (err) {
    console.error('ERROR CATCHED:', err);
  }
}
test();
