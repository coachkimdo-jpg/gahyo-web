import fs from 'fs';
import path from 'path';

const inputFilePath = 'C:\\Users\\PC\\Documents\\봉안당\\ehaneul_ossuary_facilities.jsonl';
const outputJsonPath = path.join(process.cwd(), 'src', 'lib', 'ossuaries.json');
const outputImageDir = path.join(process.cwd(), 'public', 'images', 'ossuaries');

if (!fs.existsSync(outputImageDir)) {
  fs.mkdirSync(outputImageDir, { recursive: true });
}

async function processData() {
  const lines = fs.readFileSync(inputFilePath, 'utf8').split('\n').filter(Boolean);
  const ossuaries = [];

  for (const line of lines) {
    try {
      const data = JSON.parse(line);
      const id = data.facilitycd;
      if (!id) continue;

      // Handle photos
      const photoLocalPaths = data.photo_local_paths ? data.photo_local_paths.split(' | ') : [];
      const copiedPhotos = [];
      
      if (photoLocalPaths.length > 0) {
        const facilityImageDir = path.join(outputImageDir, id);
        if (!fs.existsSync(facilityImageDir)) {
          fs.mkdirSync(facilityImageDir, { recursive: true });
        }
        
        // Copy up to 3 photos
        for (let i = 0; i < Math.min(3, photoLocalPaths.length); i++) {
          const originalPath = photoLocalPaths[i];
          if (fs.existsSync(originalPath)) {
            const ext = path.extname(originalPath) || '.jpg';
            const newFilename = `${i + 1}${ext}`;
            const newPath = path.join(facilityImageDir, newFilename);
            fs.copyFileSync(originalPath, newPath);
            copiedPhotos.push(`/images/ossuaries/${id}/${newFilename}`);
          }
        }
      }

      // Generate SEO slug
      const slug = data.facility_name
        .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();

      // Clean up price text
      let priceInfo = data.price_text || '전화 문의';
      // Basic cleanup for long messy text
      if (priceInfo.length > 500) priceInfo = priceInfo.substring(0, 500) + '... (상세 내용 홈페이지 참조)';

      ossuaries.push({
        id: id,
        slug: slug,
        name: data.facility_name || '이름 없음',
        address: data.address || '주소 미상',
        phone: data.phone || '전화번호 미상',
        parking: data.parking_count || '주차 정보 없음',
        intro: data.intro_text || '',
        priceText: priceInfo,
        photos: copiedPhotos,
        updatedAt: new Date().toISOString()
      });
      
    } catch (err) {
      console.error('Error parsing line:', err);
    }
  }

  fs.writeFileSync(outputJsonPath, JSON.stringify(ossuaries, null, 2));
  console.log(`Processed ${ossuaries.length} facilities successfully.`);
}

processData();
