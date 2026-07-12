import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'lib', 'graveyards.json');
const graveyards = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

let updated = 0;

for (const facility of graveyards) {
  // intro가 이미 있으면 건너뜀
  if (facility.intro && facility.intro.trim().length > 10) continue;

  const name = facility.name || '본 묘지';
  const address = facility.address || '해당 지역';
  const parking = facility.parking && facility.parking !== '정보 없음'
    ? `${facility.parking} 주차`
    : '방문객 주차';

  // 지역 추출
  const region = (() => {
    if (!address) return '해당 지역';
    const addr = address;
    if (addr.includes('서울')) return '서울';
    if (addr.includes('경기')) return '경기';
    if (addr.includes('인천')) return '인천';
    if (addr.includes('부산')) return '부산';
    if (addr.includes('대구')) return '대구';
    if (addr.includes('대전')) return '대전';
    if (addr.includes('광주')) return '광주';
    if (addr.includes('울산')) return '울산';
    if (addr.includes('강원')) return '강원';
    if (addr.includes('충북') || addr.includes('충청북도')) return '충북';
    if (addr.includes('충남') || addr.includes('충청남도')) return '충남';
    if (addr.includes('전북') || addr.includes('전라북도')) return '전북';
    if (addr.includes('전남') || addr.includes('전라남도')) return '전남';
    if (addr.includes('경북') || addr.includes('경상북도')) return '경북';
    if (addr.includes('경남') || addr.includes('경상남도')) return '경남';
    if (addr.includes('세종')) return '세종';
    if (addr.includes('제주')) return '제주';
    return '해당 지역';
  })();

  // 가격 정보 활용
  let priceText = '';
  if (facility.priceItems && facility.priceItems.length > 0) {
    const sorted = [...facility.priceItems].sort((a, b) => a.price - b.price);
    const minPrice = sorted[0].priceFormatted;
    priceText = `묘지 사용료는 ${minPrice}부터 시작하며, `;
  } else {
    priceText = '매장 비용은 묘역 위치와 면적에 따라 달라지며, ';
  }

  facility.intro = `${name}은(는) ${address}에 위치한 공원묘지(묘지 시설)로, 고인이 자연과 함께 영면할 수 있는 장소를 제공합니다.\n\n${region} 지역 내 쾌적한 환경에 조성된 묘역으로, 사계절 정돈된 조경과 ${parking} 공간을 갖추어 명절·기일 성묘 방문에도 편리합니다. ${priceText}상세한 안내는 시설에 직접 문의하시기 바랍니다.\n\n가효상조는 100% 후불제로 선불 납입금 없이 장례부터 매장 절차까지 원스톱으로 지원해 드립니다. ${name} 이용 관련 비용 및 절차 문의는 가효상조 24시간 상황실(1551-5718)로 연락하시면 국가공인 장례지도사가 안내해 드립니다.`;

  updated++;
}

fs.writeFileSync(DB_PATH, JSON.stringify(graveyards, null, 2));
console.log(`✅ 묘지 intro 업데이트 완료: ${updated}개 추가 (전체 ${graveyards.length}개)`);

const withIntro = graveyards.filter(g => g.intro && g.intro.trim().length > 10).length;
console.log(`  - intro 있음: ${withIntro}건 / ${graveyards.length}건`);
