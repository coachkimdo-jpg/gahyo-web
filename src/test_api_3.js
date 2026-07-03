const fs = require('fs');
const dotenvStr = fs.readFileSync('.env.local', 'utf8');
const envMatches = dotenvStr.match(/GEMINI_API_KEY=(.+)/);
const apiKey = envMatches ? envMatches[1].trim() : '';

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash-lite',
  tools: [{ googleSearch: {} }],
  systemInstruction: '테스트 시스템 지침'
});

async function test() {
  try {
    const guideline = `[역할 정의]
너는 구글/네이버 SEO, AEO, GEO 전문가이자, 장례 문화 및 상조 마케팅에 정통한 팩트 중심의 콘텐츠 마케터야.`;

    const prompt = `키워드: "장례식장 조의금 봉투 쓰는법"

${guideline ? `[관리자 추가 특별 지침 - 반드시 반영할 것]\n${guideline}\n\n` : ''}위 키워드와 특별 지침을 바탕으로 지정된 XML 형식에 맞춰 블로그 포스트를 생성해주세요.`;
    
    console.log('Generating...');
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log('Success, length:', text.length);
    console.log(text);
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
