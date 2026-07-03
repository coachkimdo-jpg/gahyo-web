import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const FUNERAL_JSONL = 'C:\\Users\\PC\\Documents\\ehaneul_funeral_facilities_fixed.jsonl';
const FUNERAL_DB = path.join(process.cwd(), 'src', 'lib', 'realData.json');
const IMG_DIR = path.join(process.cwd(), 'public', 'images', 'halls');

console.log('📦 원본 장례식장 데이터 파싱 중...');
const facilityLines = fs.readFileSync(FUNERAL_JSONL, 'utf8').split('\n').filter(Boolean);
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
const funeralData = JSON.parse(fs.readFileSync(FUNERAL_DB, 'utf8'));

if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

async function processImages() {
  let processedCount = 0;
  
  for (const facility of funeralData) {
    const id = String(facility.id);
    const photoLocalPaths = photoMap[id] || [];
    const newPhotos = [];

    if (photoLocalPaths.length > 0) {
      const facilityImageDir = path.join(IMG_DIR, id);
      if (!fs.existsSync(facilityImageDir)) fs.mkdirSync(facilityImageDir, { recursive: true });

      for (let i = 0; i < Math.min(6, photoLocalPaths.length); i++) {
        const orig = photoLocalPaths[i];
        if (fs.existsSync(orig)) {
          const newName = `id-${id}-hall-${String(i + 1).padStart(3, '0')}.webp`;
          const newPath = path.join(facilityImageDir, newName);
          
          try {
            await sharp(orig)
              .resize(800, 600, { fit: 'cover' })
              .webp({ quality: 80 })
              .toFile(newPath);
            newPhotos.push(`/images/halls/${id}/${newName}`);
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

  fs.writeFileSync(FUNERAL_DB, JSON.stringify(funeralData, null, 2));
  console.log(`✅ 변환 완료! 총 ${funeralData.length}개 시설 중 ${processedCount}개 시설 이미지 최적화 및 연결 성공.`);
}

processImages();
