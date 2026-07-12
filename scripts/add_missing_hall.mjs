/**
 * JSONL에서 누락된 장례식장 추출 후 realData.json에 추가
 * 실행: node scripts/add_missing_hall.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const FACILITY_JSONL   = 'C:\\Users\\PC\\Documents\\ehaneul_funeral_facilities_fixed.jsonl';
const PRICE_JSONL      = 'C:\\Users\\PC\\Documents\\ehaneul_funeral_price_items.jsonl';
const REAL_DATA_PATH   = path.join(ROOT, 'src', 'lib', 'realData.json');

const MISSING_IDS = ['7000001429']; // 다대수병원장례식장

// ── 시설 데이터 추출 ──────────────────────────────────────
const facilityLines = fs.readFileSync(FACILITY_JSONL, 'utf8').split('\n').filter(Boolean);
const found = {};
for (const line of facilityLines) {
  try {
    const d = JSON.parse(line);
    const id = String(d.facilitycd);
    if (MISSING_IDS.includes(id)) found[id] = d;
  } catch { /* skip */ }
}

// ── 가격 데이터 추출 ──────────────────────────────────────
const priceLines = fs.readFileSync(PRICE_JSONL, 'utf8').split('\n').filter(Boolean);
const priceMap = {};
for (const line of priceLines) {
  try {
    const d = JSON.parse(line);
    const fcd = String(d.facilitycd);
    if (!MISSING_IDS.includes(fcd)) continue;
    if (!priceMap[fcd]) priceMap[fcd] = [];
    const price = parseInt(String(d.price || 0).replace(/,/g, ''), 10);
    if (price > 0) {
      priceMap[fcd].push({
        category: (d.category_title || d.item_type || '').trim(),
        itemName: (d.item_name || '').trim(),
        price,
        priceFormatted: price.toLocaleString('ko-KR') + '원',
        detail: (d.rental_detail || '').trim(),
      });
    }
  } catch { /* skip */ }
}

// ── 지역 코드 추출 ────────────────────────────────────────
function getRegionCode(address) {
  if (!address) return 'etc';
  if (address.includes('서울')) return 'seoul';
  if (address.includes('경기')) return 'gyeonggi';
  if (address.includes('인천')) return 'incheon';
  if (address.includes('강원')) return 'gangwon';
  if (address.includes('충북') || address.includes('충청북도')) return 'chungbuk';
  if (address.includes('충남') || address.includes('충청남도')) return 'chungnam';
  if (address.includes('대전')) return 'daejeon';
  if (address.includes('전북') || address.includes('전라북도')) return 'jeonbuk';
  if (address.includes('전남') || address.includes('전라남도')) return 'jeonnam';
  if (address.includes('광주')) return 'gwangju';
  if (address.includes('경북') || address.includes('경상북도')) return 'gyeongbuk';
  if (address.includes('경남') || address.includes('경상남도')) return 'gyeongnam';
  if (address.includes('대구')) return 'daegu';
  if (address.includes('부산')) return 'busan';
  if (address.includes('울산')) return 'ulsan';
  if (address.includes('제주')) return 'jeju';
  return 'etc';
}

// ── slug 생성 (기존 utils.js와 동일 로직) ─────────────────
function getSlug(address, name) {
  const regionMap = {
    '서울': 'seoul', '경기': 'gyeonggi', '인천': 'incheon', '강원': 'gangwon',
    '충북': 'chungbuk', '충청북도': 'chungbuk', '충남': 'chungnam', '충청남도': 'chungnam',
    '대전': 'daejeon', '전북': 'jeonbuk', '전라북도': 'jeonbuk',
    '전남': 'jeonnam', '전라남도': 'jeonnam', '광주': 'gwangju',
    '경북': 'gyeongbuk', '경상북도': 'gyeongbuk', '경남': 'gyeongnam', '경상남도': 'gyeongnam',
    '대구': 'daegu', '부산': 'busan', '울산': 'ulsan', '제주': 'jeju', '세종': 'sejong',
  };
  let regionSlug = 'etc';
  for (const [k, v] of Object.entries(regionMap)) {
    if ((address || '').includes(k)) { regionSlug = v; break; }
  }
  const nameSlug = (name || '')
    .replace(/[()（）\[\]【】]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^가-힣a-zA-Z0-9-]/g, '')
    .toLowerCase();
  return `${regionSlug}-${nameSlug}`;
}

// ── realData.json에 추가 ──────────────────────────────────
const realData = JSON.parse(fs.readFileSync(REAL_DATA_PATH, 'utf8'));
const existingIds = new Set(realData.map(h => {
  const m = String(h.id).match(/(\d+)$/);
  return m ? m[1] : '';
}));

let addedCount = 0;
for (const [fcd, d] of Object.entries(found)) {
  if (existingIds.has(fcd)) {
    console.log(`이미 존재: ${d.facility_name} (${fcd})`);
    continue;
  }

  const name = (d.facility_name || '').trim();
  const address = (d.address || '').trim();
  const phone = (d.phone || '').trim();
  const regionCode = getRegionCode(address);
  const prices = priceMap[fcd] || [];

  const newEntry = {
    id: getSlug(address, name),
    name,
    address,
    contact: phone,
    regionCode,
    rating: 0,
    reviewCount: 0,
    features: [],
    facilityInfo: {
      sliderEnabled: false,
      descriptionEnabled: true,
      pricingEnabled: prices.length > 0,
      mapEnabled: true,
      consultEnabled: true,
      description: d.intro_text ? d.intro_text.trim().slice(0, 500) : '',
      parkingInfo: d.parking_count ? `주차 ${d.parking_count}대` : '문의',
      visitorsCapacity: '',
      hallCount: '',
      structure: '',
      procedures: '',
      parkingAccess: '',
      quickPoint: '',
      mortuaryCapacity: d.mortuary_count || '',
    },
    moduleOrder: ['slider','info','pricing','map','consult'],
    photos: [],
    pricingData: prices,
  };

  realData.push(newEntry);
  addedCount++;
  console.log(`✅ 추가: ${name} (${fcd}) → id: ${newEntry.id}`);
  console.log(`   주소: ${address}`);
  console.log(`   전화: ${phone}`);
  console.log(`   가격: ${prices.length}개 항목`);
}

if (addedCount > 0) {
  fs.writeFileSync(REAL_DATA_PATH, JSON.stringify(realData, null, 2));
  console.log(`\n✅ realData.json 업데이트 완료 (${realData.length}개, +${addedCount}개 추가)`);
} else {
  console.log('\n변경 사항 없음');
}
