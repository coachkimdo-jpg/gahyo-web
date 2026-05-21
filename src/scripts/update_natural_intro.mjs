import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'lib', 'naturalBurials.json');
const naturalBurials = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

for (const facility of naturalBurials) {
  // Extract clean parts from existing data to make a beautiful intro
  const name = facility.name || '본 자연장지';
  const address = facility.address || '해당 지역';
  const capacity = facility.burial_capacity || '여유 있는';
  const parking = facility.parking || '넉넉한';

  // Generate a premium intro text
  const cleanIntro = `${name}은(는) ${address}에 위치하여 고인과 유가족 모두가 편안하게 자연의 품에서 안식할 수 있도록 조성된 자연장지(수목장/잔디장 등) 시설입니다.\n\n총 안치 규모는 ${capacity} 수준이며, 방문객을 위한 ${parking} 주차 공간을 갖추어 명절이나 성묘철에도 쾌적한 방문이 가능합니다. 자연 친화적인 조경과 엄격한 관리 시스템을 통해 사계절 내내 아름답고 평온한 환경을 유지하고 있습니다.\n\n가효상조는 100% 후불제로 선불 납입금의 부담 없이 장례부터 자연장지 안치까지 원스톱으로 지원해 드립니다. ${name} 이용과 관련된 상세 비용 및 절차는 가효상조 24시간 상황실(1551-5718)로 문의하시면 국가공인 장례지도사가 친절하게 안내해 드립니다.`;

  facility.intro = cleanIntro;
}

fs.writeFileSync(DB_PATH, JSON.stringify(naturalBurials, null, 2));
console.log(`✅ ${naturalBurials.length}개 자연장지 소개글(Intro) 업데이트 완료!`);
