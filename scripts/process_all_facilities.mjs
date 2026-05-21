import fs from 'fs';
import path from 'path';

// ── 경로 설정 ──────────────────────────────────────────────
const OSSUARY_JSONL   = 'C:\\Users\\PC\\Documents\\봉안당\\ehaneul_ossuary_facilities.jsonl';
const NATURAL_JSONL   = 'C:\\Users\\PC\\Documents\\자연장지\\ehaneul_natural_burial_facilities.jsonl';

const OUT_OSSUARY_JSON  = path.join(process.cwd(), 'src', 'lib', 'ossuaries.json');
const OUT_NATURAL_JSON  = path.join(process.cwd(), 'src', 'lib', 'naturalBurials.json');

const IMG_OSSUARY_DIR  = path.join(process.cwd(), 'public', 'images', 'ossuaries');
const IMG_NATURAL_DIR  = path.join(process.cwd(), 'public', 'images', 'natural-burials');

// ── 공통 파싱 함수 ────────────────────────────────────────
function parseFacilities(jsonlPath, imageOutputDir, type, typeLabel) {
  const lines = fs.readFileSync(jsonlPath, 'utf8').split('\n').filter(Boolean);
  const facilities = [];

  if (!fs.existsSync(imageOutputDir)) fs.mkdirSync(imageOutputDir, { recursive: true });

  for (const line of lines) {
    let data;
    try { data = JSON.parse(line); } catch { continue; }

    const id = data.facilitycd;
    if (!id) continue;

    // 사진 복사
    const photoLocalPaths = data.photo_local_paths
      ? data.photo_local_paths.split(' | ').map(p => p.trim()).filter(Boolean)
      : [];
    const copiedPhotos = [];

    if (photoLocalPaths.length > 0) {
      const facilityImageDir = path.join(imageOutputDir, id);
      if (!fs.existsSync(facilityImageDir)) fs.mkdirSync(facilityImageDir, { recursive: true });

      for (let i = 0; i < Math.min(3, photoLocalPaths.length); i++) {
        const originalPath = photoLocalPaths[i];
        if (fs.existsSync(originalPath)) {
          const ext = path.extname(originalPath) || '.jpg';
          const newFilename = `${i + 1}${ext}`;
          const newPath = path.join(facilityImageDir, newFilename);
          fs.copyFileSync(originalPath, newPath);
          const urlBase = type === '봉안당' ? '/images/ossuaries' : '/images/natural-burials';
          copiedPhotos.push(`${urlBase}/${id}/${newFilename}`);
        }
      }
    }

    // 가격 텍스트 정제: 숫자+원 패턴만 추출하여 최소~최대 범위 표시
    let priceRange = '전화 문의';
    const priceText = data.price_text || '';
    const priceMatches = priceText.match(/[\d,]+/g);
    if (priceMatches) {
      const prices = priceMatches
        .map(p => parseInt(p.replace(/,/g, ''), 10))
        .filter(p => p >= 100000 && p <= 500000000); // 10만원 ~ 5억원 사이 유효값만
      if (prices.length > 0) {
        const minPrice = Math.min(...prices).toLocaleString('ko-KR');
        const maxPrice = Math.max(...prices).toLocaleString('ko-KR');
        if (minPrice === maxPrice) {
          priceRange = `${minPrice}원`;
        } else {
          priceRange = `${minPrice}원 ~ ${maxPrice}원`;
        }
      }
    }

    facilities.push({
      id,
      type,
      typeLabel,
      name: data.facility_name || '이름 없음',
      address: data.address || '주소 미상',
      phone: data.phone || '전화번호 미상',
      parking: data.parking_count || '주차 정보 없음',
      intro: data.intro_text || '',
      priceText: priceText,
      priceRange,
      photos: copiedPhotos,
      updatedAt: new Date().toISOString()
    });
  }

  return facilities;
}

// ── 실행 ─────────────────────────────────────────────────
console.log('📦 봉안시설 데이터 처리 중...');
const ossuaries = parseFacilities(OSSUARY_JSONL, IMG_OSSUARY_DIR, '봉안당', '🏛️ 봉안시설');
fs.writeFileSync(OUT_OSSUARY_JSON, JSON.stringify(ossuaries, null, 2));
console.log(`✅ 봉안시설 ${ossuaries.length}건 완료 → src/lib/ossuaries.json`);

console.log('🌿 자연장지 데이터 처리 중...');
const naturalBurials = parseFacilities(NATURAL_JSONL, IMG_NATURAL_DIR, '수목장', '🌲 자연장지');
fs.writeFileSync(OUT_NATURAL_JSON, JSON.stringify(naturalBurials, null, 2));
console.log(`✅ 자연장지 ${naturalBurials.length}건 완료 → src/lib/naturalBurials.json`);

console.log('🎉 전체 처리 완료!');
