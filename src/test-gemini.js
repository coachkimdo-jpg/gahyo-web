
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("NO API KEY");
        return;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
당신은 '가효상조'의 수석 장례지도사이자 SEO 콘텐츠 마케터입니다.
주어진 키워드에 대해 구글 검색 및 AI 개요(AI Overview) 상위 노출에 완벽하게 최적화된 블로그 포스트를 작성해야 합니다.

키워드: "장례식장 비용"

[작성 원칙 - 절대 준수]
1. AI 검색 최적화 구조
- 명확한 계층: H1(제목)은 하나만, 본문 내에서는 H2, H3 태그를 사용하여 피라미드 구조 형성
- 핵심 정의 선행: 글 초반부에 "A는 B입니다" 형식의 명확한 정의와 200~300자 내외의 핵심 요약 단락 배치
- 대화형/FAQ 구조: 본문 내에 사용자의 질문에 답하는 Q&A 및 FAQ 섹션 반드시 포함
- 가독성: 문장은 15~20자 내외로 짧고 명확하게 끊어 쓰며, 번호 리스트나 글머리표를 적극 활용
- 구조화된 데이터: 본문 마지막 부분에 JSON-LD 형식의 Article 및 FAQ 스키마 마크업을 <script type="application/ld+json"> 안에 삽입

2. E-E-A-T (경험, 전문성, 권위, 신뢰)
- 1인칭 실제 경험 포함: "제가 현장에서 유가족분들을 모시다 보면..." 같은 1인칭 관점의 고유한 경험 묘사 포함
- 엔티티 명확화: 작성자가 '가효상조 소속 전문 장례지도사'임을 본문 내에 자연스럽게 명시
- 출처 표기: 필요한 경우 가상의 통계나 외부 링크(예: 보건복지부 등 공신력 있는 출처)를 인용하는 형태를 취함

3. 롱테일 키워드
- 롱테일 질문형 키워드(예: "~하는 방법은 무엇인가요?")를 헤딩(H2)에 적극 반영

응답은 반드시 아래 JSON 형식만을 출력해야 합니다 (마크다운 코드 블록이나 다른 텍스트는 포함하지 마세요):
{
  "title": "게시물 제목 (롱테일 키워드 포함)",
  "summary": "목록에 표시될 요약 내용 (100자 내외)",
  "category": "추천 카테고리 (예: 장례상식, 비용안내, 임종절차 등)",
  "readTime": "읽는 시간 (예: 5분)",
  "content": "HTML 형식으로 작성된 본문 내용 (H2, H3, p, ul, li 태그 및 JSON-LD 스키마 포함)"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    console.log("RESPONSE:", text);
    
    // Remove markdown code block wrappers if any
    text = text.replace(/^```json/g, '').replace(/^```/g, '').trim();

    const data = JSON.parse(text);
    console.log("PARSED OK");
  } catch(e) {
    console.error("ERROR:", e);
  }
}
test();
