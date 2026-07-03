import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OSSUARY_JSONL = 'C:\\Users\\PC\\Documents\\봉안당\\ehaneul_ossuary_facilities.jsonl';
const OSSUARIES_DB = path.join(process.cwd(), 'src', 'lib', 'ossuaries.json');
const IMG_DIR = path.join(process.cwd(), 'public', 'images', 'cemeteries', 'ossuaries');

console.log('📦 원본 봉안당 데이터 파싱 중...');
const facilityLines = fs.readFileSync(OSSUARY_JSONL, 'utf8').split('\n').filter(Boolean);
const photoMap = {};

for (const line of facilityLines) {
  try {
    const data = JSON.parse(line);
    const id = String(data.facilitycd);
    if (id && data.photo_local_paths) {
      photoMap[id] = data.photo_local_paths.split(' | ').map(p => p.trim()).filter(Boolean);
    }
  } catch { /* skip */ }
}

console.log('📊 기존 DB 업데이트 및 이미지 변환 시작...');
const ossuariesData = JSON.parse(fs.readFileSync(OSSUARIES_DB, 'utf8'));

if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

async function processImages() {
  let processedCount = 0;
  
  for (const facility of ossuariesData) {
    const id = String(facility.id);
    const photoLocalPaths = photoMap[id] || [];
    const newPhotos = [];

    if (photoLocalPaths.length > 0) {
      const facilityImageDir = path.join(IMG_DIR, id);
      if (!fs.existsSync(facilityImageDir)) fs.mkdirSync(facilityImageDir, { recursive: true });

      for (let i = 0; i < Math.min(5, photoLocalPaths.length); i++) {
        const orig = photoLocalPaths[i];
        if (fs.existsSync(orig)) {
          const newName = `id-${id}-ossuary-${String(i + 1).padStart(3, '0')}.webp`;
          const newPath = path.join(facilityImageDir, newName);
          
          try {
            await sharp(orig)
              .resize(800, 600, { fit: 'cover' })
              .webp({ quality: 80 })
              .toFile(newPath);
            newPhotos.push(`/images/cemeteries/ossuaries/${id}/${newName}`);
          } catch (e) {
            console.error(`[오류] 이미지 변환 실패: ${orig}`, e.message);
          }
        }
      }
    }
    
    // Update the photos array in DB
    facility.photos = newPhotos;
    
    if (newPhotos.length > 0) {
      processedCount++;
    }
  }

  fs.writeFileSync(OSSUARIES_DB, JSON.stringify(ossuariesData, null, 2));
  console.log(`✅ 변환 완료! 총 ${ossuariesData.length}개 시설 중 ${processedCount}개 시설 이미지 최적화 및 연결 성공.`);
}

processImages();
