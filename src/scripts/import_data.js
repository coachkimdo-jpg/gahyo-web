const fs = require('fs-extra');
const path = require('path');
const xlsx = require('xlsx');

async function main() {
  console.log('Reading Excel files...');
  
  const docsPath = 'C:\\Users\\PC\\Documents';
  
  // 1. Read Facilities
  const wbFacilities = xlsx.readFile(path.join(docsPath, 'ehaneul_funeral_facilities_fixed.xlsx'));
  const facilitiesData = xlsx.utils.sheet_to_json(wbFacilities.Sheets[wbFacilities.SheetNames[0]]);
  
  // 2. Read Prices
  const wbPrices = xlsx.readFile(path.join(docsPath, 'ehaneul_funeral_price_items.xlsx'));
  const pricesData = xlsx.utils.sheet_to_json(wbPrices.Sheets[wbPrices.SheetNames[0]]);
  
  // 3. Read Photos
  const wbPhotos = xlsx.readFile(path.join(docsPath, 'ehaneul_funeral_photos.xlsx'));
  const photosData = xlsx.utils.sheet_to_json(wbPhotos.Sheets[wbPhotos.SheetNames[0]]);

  console.log(`Loaded ${facilitiesData.length} facilities, ${pricesData.length} prices, ${photosData.length} photos.`);

  // Group prices by facilitycd
  const pricesByFacility = {};
  for (const price of pricesData) {
    if (!pricesByFacility[price.facilitycd]) {
      pricesByFacility[price.facilitycd] = [];
    }
    pricesByFacility[price.facilitycd].push({
      itemType: price.item_type || price.category_title,
      itemName: price.item_name,
      price: price.price,
      detail: price.rental_detail
    });
  }

  // Group photos by facilitycd and copy them
  const photosByFacility = {};
  const publicImagesDir = path.join(__dirname, '..', 'public', 'images', 'halls');
  await fs.ensureDir(publicImagesDir);

  for (const photo of photosData) {
    if (!photosByFacility[photo.facilitycd]) {
      photosByFacility[photo.facilitycd] = [];
    }
    
    // Copy image
    if (photo.local_path && fs.existsSync(photo.local_path)) {
      const destDir = path.join(publicImagesDir, String(photo.facilitycd));
      await fs.ensureDir(destDir);
      
      const destPath = path.join(destDir, photo.file_name);
      try {
        await fs.copy(photo.local_path, destPath, { overwrite: true });
        // Add to array
        photosByFacility[photo.facilitycd].push(`/images/halls/${photo.facilitycd}/${photo.file_name}`);
      } catch (err) {
        console.error(`Error copying ${photo.local_path}: ${err.message}`);
      }
    }
  }

  // Combine data
  const finalFacilities = facilitiesData.map(fac => {
    // Extract region from address if possible
    const regionCode = fac.address ? (fac.address.includes('서울') ? 'seoul' : fac.address.includes('경기') ? 'gyeonggi' : fac.address.includes('부산') ? 'busan' : 'other') : 'other';
    
    let name = fac.facility_name;
    let address = fac.address || fac.facility_type || '';

    if (!name || name === '사설' || name === '공설') {
      let extracted = null;
      const searchSpace = [fac.facility_type, fac.address, fac.map_text, fac.intro_text].filter(Boolean).join(' | ');

      const parenMatch = searchSpace.match(/,\s*([^)]+(?:장례식장|장례문화원|병원|원|상조))\)/);
      if (parenMatch) {
        extracted = parenMatch[1];
      } else if (fac.map_text && fac.map_text.match(/["']([^"']+(?:장례식장|장례문화원|상조))["']/)) {
        extracted = fac.map_text.match(/["']([^"']+(?:장례식장|장례문화원|상조))["']/)[1];
      } else {
        const words = searchSpace.split(/[\s,()"\n|]+/);
        const wordMatch = words.find(w => w.endsWith('장례식장') || w.endsWith('장례문화원') || w.endsWith('상조'));
        if (wordMatch) extracted = wordMatch;
      }

      if (!extracted) {
        const fallbackMatch = searchSpace.match(/\((?:[^,]+,\s*)?([^)]+)\)/);
        if (fallbackMatch && !fallbackMatch[1].match(/(동|리|읍|면|구|시|군)$/)) {
          extracted = fallbackMatch[1].trim();
        }
      }

      if (extracted) name = extracted;
      else name = '상호 미상 장례식장';
    }

    if (name.startsWith('(주)')) name = name.replace('(주)', '').trim();
    if (name.startsWith('주식회사')) name = name.replace('주식회사', '').trim();
    if (name.startsWith('의료법인')) name = name.replace('의료법인', '').trim();

    return {
      id: String(fac.facilitycd),
      name: name,
      address: address,
      contact: fac.phone,
      regionCode: regionCode,
      rating: 4.8, // placeholder
      reviewCount: Math.floor(Math.random() * 500) + 10,
      features: ['24시간 운영', '주차가능'], // placeholder
      facilityInfo: {
        sliderEnabled: true,
        descriptionEnabled: true,
        pricingEnabled: true,
        mapEnabled: true,
        consultEnabled: true,
        description: fac.intro_text || `${fac.facility_name}은(는) 쾌적한 환경과 최상의 서비스를 제공합니다.`,
        parkingInfo: '무료 주차 지원',
        visitorsCapacity: '정보 없음',
        hallCount: '정보 없음'
      },
      moduleOrder: ['slider', 'description', 'pricing', 'map', 'consult'],
      photos: photosByFacility[fac.facilitycd] || [],
      pricingData: pricesByFacility[fac.facilitycd] || []
    };
  });

  const destJsonPath = path.join(__dirname, '..', 'src', 'lib', 'realData.json');
  await fs.ensureDir(path.dirname(destJsonPath));
  await fs.writeJson(destJsonPath, finalFacilities, { spaces: 2 });
  
  console.log(`Success! Saved ${finalFacilities.length} facilities to src/lib/realData.json`);
}

main().catch(console.error);
