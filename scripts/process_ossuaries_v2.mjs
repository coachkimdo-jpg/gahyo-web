import fs from 'fs';
import path from 'path';

const OSSUARY_JSONL = 'C:\\Users\\PC\\Documents\\봉안당\\ehaneul_ossuary_facilities.jsonl';
const PRICE_ITEMS_JSONL = 'C:\\Users\\PC\\Documents\\봉안당\\ehaneul_ossuary_price_items.jsonl';
const OUT_JSON = path.join(process.cwd(), 'src', 'lib', 'ossuaries.json');
const IMG_DIR = path.join(process.cwd(), 'public', 'images', 'ossuaries');

// ── 1. 가격 아이템을 facilitycd 기준으로 그룹핑 ─────────────
console.log('📊 가격 데이터 로딩 중...');
const priceLines = fs.readFileSync(PRICE_ITEMS_JSONL, 'utf8').split('\n').filter(Boolean);
const priceMap = {};

for (const line of priceLines) {
  try {
    const d = JSON.parse(line);
    const fcd = String(d.facilitycd);
    if (!priceMap[fcd]) priceMap[fcd] = [];
    
    const price = parseInt(String(d.price).replace(/,/g, ''), 10);
    if (d.item_type && price > 0) {
      priceMap[fcd].push({
        location: d.item_type.trim(),
        detail: d.rental_detail ? d.rental_detail.trim() : '',
        price: price,
        priceFormatted: price.toLocaleString('ko-KR') + '원'
      });
    }
  } catch { /* skip */ }
}

console.log(`✅ ${Object.keys(priceMap).length}개 시설의 가격 데이터 로딩 완료`);

// ── 2. intro_text 정제 함수 ───────────────────────────────────
const SKIP_PATTERNS = [
  /^이전$/, /^다음$/, /^사설$/, /^민간$/, /^공설$/,
  /^홈페이지$/, /^전화전화$/, /^팩스팩스$/, /^길찾기길찾기$/, /^공유공유$/,
  /^주소$/, /^전화번호$/, /^팩스번호$/, /^주차가능대수$/, /^편의시설$/,
  /^업데이트$/, /^\d+개월전 업데이트$/, /^-$/, /^\s*$/,
];

function cleanIntro(raw) {
  if (!raw) return '';
  const lines = raw.split('\n').map(l => l.trim()).filter(l => {
    return l.length > 0 && !SKIP_PATTERNS.some(p => p.test(l));
  });
  // 주소/전화번호 패턴(짧은 줄이 연속으로 나오는 경우) 제거
  return lines.filter(l => l.length > 3 || /^\d{2,3}-\d{3,4}-\d{4}$/.test(l) === false).join('\n');
}

// ── 3. 가격표에서 범위 계산 ──────────────────────────────────
function getPriceRange(items) {
  if (!items || items.length === 0) return '전화 문의';
  const prices = items.map(i => i.price).filter(p => p >= 100000 && p <= 1000000000);
  if (prices.length === 0) return '전화 문의';
  const min = Math.min(...prices).toLocaleString('ko-KR');
  const max = Math.max(...prices).toLocaleString('ko-KR');
  return min === max ? `${min}원` : `${min}원 ~ ${max}원`;
}

// ── 4. 시설 데이터 파싱 ─────────────────────────────────────
console.log('📦 봉안시설 데이터 처리 중...');
const facilityLines = fs.readFileSync(OSSUARY_JSONL, 'utf8').split('\n').filter(Boolean);
const ossuaries = [];

if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

for (const line of facilityLines) {
  let data;
  try { data = JSON.parse(line); } catch { continue; }

  const id = String(data.facilitycd);
  if (!id) continue;

  // 사진 복사
  const photoLocalPaths = data.photo_local_paths
    ? data.photo_local_paths.split(' | ').map(p => p.trim()).filter(Boolean)
    : [];
  const copiedPhotos = [];

  if (photoLocalPaths.length > 0) {
    const facilityImageDir = path.join(IMG_DIR, id);
    if (!fs.existsSync(facilityImageDir)) fs.mkdirSync(facilityImageDir, { recursive: true });

    for (let i = 0; i < Math.min(5, photoLocalPaths.length); i++) {
      const orig = photoLocalPaths[i];
      if (fs.existsSync(orig)) {
        const ext = path.extname(orig) || '.jpg';
        const newName = `${i + 1}${ext}`;
        const newPath = path.join(facilityImageDir, newName);
        fs.copyFileSync(orig, newPath);
        copiedPhotos.push(`/images/ossuaries/${id}/${newName}`);
      }
    }
  }

  // intro 정제 - 실제 소개글만 추출 (잡음 라인 이전까지만)
  function cleanIntroText(raw) {
    if (!raw || raw.trim().length < 10) return '';

    // 잡음이 시작되는 패턴 - 이 패턴을 만나면 그 이전까지만 사용
    const NOISE_START = [
      /^사설/, /^민간/, /^공설/, /^전화전화/, /^팩스팩스/,
      /^길찾기/, /^공유공유/,
      /^주소\s+/, /^전화번호\s*$/, /^팩스번호\s*$/,
      /^주차가능대수/, /^편의시설\s*$/, /^업데이트/,
      /^\d+개월전/,
    ];

    // 계약서, 약관, 환불 규정 등 소개글로 부적합한 내용 전체 필터링
    const INVALID_CONTENT = [
      /이하\s*['"]?갑['"]?이라\s*한다/,
      /계약자\s*또는\s*계약자의\s*권리/,
      /사용료\s*반환\s*기준/,
      /환급률/,
      /계약\s*성립후/,
      /환불하지\s*않음/
    ];

    if (INVALID_CONTENT.some(p => p.test(raw))) {
      return '';
    }

    // 줄 단위로 처리
    const rawLines = raw.split('\n');
    const cleanLines = [];

    for (const line of rawLines) {
      const trimmed = line.trim();
      // 잡음 시작 패턴이면 즉시 중단
      if (NOISE_START.some(p => p.test(trimmed))) break;
      // 빈 줄, 단독 대시 등 제거
      if (!trimmed || trimmed === '-') continue;
      cleanLines.push(trimmed);
    }

    return cleanLines.join('\n').trim();
  }

  const rawIntro = data.etc_intro || '';
  const cleanedIntro = cleanIntroText(rawIntro);

  // 가격 데이터
  const priceItems = priceMap[id] || [];
  const priceRange = getPriceRange(priceItems);

  // 주차 정리 (숫자만 추출)
  const parkingRaw = data.parking_count || '';
  const parking = parkingRaw.replace(/\s+/g, ' ').trim() || '정보 없음';

  ossuaries.push({
    id,
    type: '봉안당',
    typeLabel: '🏛️ 봉안시설',
    name: data.facility_name || '이름 없음',
    address: data.address || '주소 미상',
    phone: data.phone || '',
    fax: data.fax || '',
    parking,
    intro: cleanedIntro,
    priceItems,   // [{location, detail, price, priceFormatted}]
    priceRange,
    photos: copiedPhotos,
    updatedAt: new Date().toISOString()
  });
}

fs.writeFileSync(OUT_JSON, JSON.stringify(ossuaries, null, 2));
console.log(`✅ 봉안시설 ${ossuaries.length}건 완료 → src/lib/ossuaries.json`);

// 통계
const withPrices = ossuaries.filter(o => o.priceItems.length > 0).length;
const withIntro = ossuaries.filter(o => o.intro.length > 10).length;
const withPhotos = ossuaries.filter(o => o.photos.length > 0).length;
console.log(`  - 가격정보 있음: ${withPrices}건`);
console.log(`  - 소개글 있음: ${withIntro}건`);
console.log(`  - 사진 있음: ${withPhotos}건`);
