import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const GRAVEYARD_JSONL = 'C:\\Users\\PC\\Documents\\묘지\\ehaneul_cemetery_facilities.jsonl';
const PRICE_ITEMS_JSONL = 'C:\\Users\\PC\\Documents\\묘지\\ehaneul_cemetery_price_items.jsonl';
const OUT_JSON = path.join(process.cwd(), 'src', 'lib', 'graveyards.json');
const IMG_DIR = path.join(process.cwd(), 'public', 'images', 'cemeteries', 'graveyards');

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
console.log('📦 묘지 데이터 처리 중...');
const facilityLines = fs.readFileSync(GRAVEYARD_JSONL, 'utf8').split('\n').filter(Boolean);
const graveyards = [];

if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

async function processData() {
  for (const line of facilityLines) {
    let data;
    try { data = JSON.parse(line); } catch { continue; }

    const id = String(data.facilitycd);
    if (!id || id === 'undefined') continue;

    // 사진 복사 및 WebP 변환
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
          const newName = `id-${id}-graveyard-${String(i + 1).padStart(3, '0')}.webp`;
          const newPath = path.join(facilityImageDir, newName);
          
          try {
            await sharp(orig)
              .resize(800, 600, { fit: 'cover' })
              .webp({ quality: 80 })
              .toFile(newPath);
            copiedPhotos.push(`/images/cemeteries/graveyards/${id}/${newName}`);
          } catch (e) {
            console.error(`이미지 변환 실패: ${orig}`, e.message);
          }
        }
      }
    }

    function cleanIntroText(raw) {
      if (!raw || raw.trim().length < 10) return '';
      const NOISE_START = [
        /^사설/, /^민간/, /^공설/, /^전화전화/, /^팩스팩스/,
        /^길찾기/, /^공유공유/, /^주소\s+/, /^전화번호\s*$/, /^팩스번호\s*$/,
        /^주차가능대수/, /^편의시설\s*$/, /^업데이트/, /^\d+개월전/,
      ];
      const INVALID_CONTENT = [
        /이하\s*['"]?갑['"]?이라\s*한다/, /계약자\s*또는\s*계약자의\s*권리/,
        /사용료\s*반환\s*기준/, /환급률/, /계약\s*성립후/, /환불하지\s*않음/
      ];

      if (INVALID_CONTENT.some(p => p.test(raw))) return '';

      const rawLines = raw.split('\n');
      const cleanLines = [];
      for (const line of rawLines) {
        const trimmed = line.trim();
        if (NOISE_START.some(p => p.test(trimmed))) break;
        if (!trimmed || trimmed === '-') continue;
        cleanLines.push(trimmed);
      }
      return cleanLines.join('\n').trim();
    }

    const rawIntro = data.etc_intro || '';
    const cleanedIntro = cleanIntroText(rawIntro);

    const priceItems = priceMap[id] || [];
    const priceRange = getPriceRange(priceItems);

    const parkingRaw = data.parking_count || '';
    const parking = parkingRaw.replace(/\s+/g, ' ').trim() || '정보 없음';

    graveyards.push({
      id,
      type: '묘지',
      typeLabel: '🪦 묘지',
      name: data.facility_name || '이름 없음',
      address: data.address || '주소 미상',
      phone: data.phone || '',
      fax: data.fax || '',
      parking,
      intro: cleanedIntro,
      priceItems,
      priceRange,
      photos: copiedPhotos,
      updatedAt: new Date().toISOString()
    });
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(graveyards, null, 2));
  console.log(`✅ 묘지 ${graveyards.length}건 완료 → src/lib/graveyards.json`);

  const withPrices = graveyards.filter(o => o.priceItems.length > 0).length;
  const withIntro = graveyards.filter(o => o.intro.length > 10).length;
  const withPhotos = graveyards.filter(o => o.photos.length > 0).length;
  console.log(`  - 가격정보 있음: ${withPrices}건`);
  console.log(`  - 소개글 있음: ${withIntro}건`);
  console.log(`  - 사진 있음: ${withPhotos}건`);
}

processData();
