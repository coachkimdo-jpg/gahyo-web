const fs = require('fs');
const path = require('path');

const inputJsonlPath = 'C:\\Users\\PC\\Documents\\자연장지\\ehaneul_natural_burial_facilities.jsonl';
const outputDataPath = path.join(__dirname, '..', 'src', 'lib', 'cemeteryData.json');
const publicImagesDir = path.join(__dirname, '..', 'public', 'images', 'cemeteries');

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

const lines = fs.readFileSync(inputJsonlPath, 'utf8').split('\n');

const getRegionCode = (address) => {
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
};

const cemeteries = [];
let idCounter = 1;

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const data = JSON.parse(line);
    const name = data.facility_name ? data.facility_name.replace(/\s+/g, '') : `자연장지_${idCounter}`;
    
    // Process Images
    const photoUrls = [];
    if (data.photo_local_paths) {
      const paths = data.photo_local_paths.split(' | ');
      paths.forEach((origPath, idx) => {
        if (fs.existsSync(origPath)) {
          // Use safe file name
          const safeName = encodeURIComponent(name).replace(/%/g, '_');
          const newFileName = `${safeName}_${idx}.jpg`;
          const destPath = path.join(publicImagesDir, newFileName);
          try {
            fs.copyFileSync(origPath, destPath);
            photoUrls.push(`/images/cemeteries/${newFileName}`);
          } catch (err) {
            console.error(`Failed to copy ${origPath}:`, err);
          }
        }
      });
    }

    // Default mock data for missing prices/benefits
    const benefits = ["가효상조 고객 특별 할인", "무료 사전 답사 지원", "연중 무휴 상담"];
    const basePrice = Math.floor(Math.random() * 300 + 150); // 150~450
    const maxPrice = basePrice + Math.floor(Math.random() * 400 + 100);
    const priceRange = `${basePrice}만원 ~ ${maxPrice}만원`;

    cemeteries.push({
      id: `cem_${idCounter++}`,
      name: data.facility_name,
      regionCode: getRegionCode(data.address),
      address: data.address,
      contact: data.phone || data.fax,
      type: "수목장", // All natural burials map roughly to this initially
      typeLabel: "자연장지",
      description: data.map_text ? data.map_text.split('\\n').join(' ') : "아름답고 쾌적한 환경을 자랑하는 친환경 자연장지입니다.",
      benefits: benefits,
      priceRange: priceRange,
      photos: photoUrls,
      facilityInfo: {
        burialCapacity: data.burial_capacity,
        parkingCount: data.parking_count,
        mapText: data.map_text,
        pricingText: data.pricing_text,
        etcIntro: data.etc_intro
      }
    });
  } catch (err) {
    console.error('JSON Parse error on line:', err);
  }
}

fs.writeFileSync(outputDataPath, JSON.stringify(cemeteries, null, 2), 'utf8');
console.log(`Successfully processed ${cemeteries.length} cemeteries and copied images.`);
