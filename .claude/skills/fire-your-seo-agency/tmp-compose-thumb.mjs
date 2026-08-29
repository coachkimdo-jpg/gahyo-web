import sharp from 'sharp';
const SRC = '/Users/alpsoft/Downloads/ChatGPT Image 2026년 8월 27일 오전 08_59_01 (1).png';
const font = "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";
const mono = "'SF Mono', 'Menlo', monospace";
const overlay = Buffer.from(`<svg width="1280" height="640" xmlns="http://www.w3.org/2000/svg">
  <text x="70" y="250" fill="#F6F7F9" font-family="${mono}" font-size="64" font-weight="800" letter-spacing="-1">fire-your-seo-agency</text>
  <text x="72" y="314" fill="#F7941E" font-family="${font}" font-size="31" font-weight="800">SEO 대행 · GEO 대행 · "AI 검색 최적화" 업체까지</text>
  <text x="72" y="362" fill="#F6F7F9" font-family="${font}" font-size="28" font-weight="700">월 350만 원짜리 일, AI 에이전트가 대체합니다</text>
  <text x="72" y="416" fill="#AEB8C7" font-family="${font}" font-size="23" font-weight="600" letter-spacing="1">SEO · AEO · GEO · LLMO · NEO(네이버)</text>
  <text x="72" y="560" fill="#6B7A90" font-family="${mono}" font-size="20" font-weight="600">github.com/leopard627/fire-your-seo-agency</text>
</svg>`);
await sharp(SRC).resize(1280, 640, { fit: 'cover', position: 'right' }).composite([{ input: overlay, top: 0, left: 0 }]).png().toFile('/Users/alpsoft/Desktop/fire-your-seo-agency-social.png');
console.log('thumb ok');
