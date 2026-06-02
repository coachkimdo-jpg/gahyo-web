const fs = require('fs');
const path = './src/lib/realData.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Read scraped images
let images = [];
try {
  const scraped = JSON.parse(fs.readFileSync('scraped_data.json', 'utf8'));
  images = [...new Set(scraped.images)];
} catch (e) {
  console.log("Could not read scraped_data.json images");
}

const newHall = {
  "id": "youngsan-7000001011",
  "name": "학교법인영산학원시민장례식장",
  "address": "인천광역시 미추홀구 석정로64번길 22 (숭의동)",
  "contact": "032-889-4644",
  "regionCode": "incheon",
  "rating": 4.5,
  "reviewCount": 185,
  "features": [
    "24시간 운영",
    "주차가능",
    "가족형 빈소"
  ],
  "facilityInfo": {
    "sliderEnabled": true,
    "descriptionEnabled": true,
    "pricingEnabled": true,
    "mapEnabled": true,
    "consultEnabled": true,
    "description": "학교법인영산학원 시민장례식장은 내 가족을 모시는 마음으로 정성을 다하여 장례를 돕습니다.",
    "parkingInfo": "장례식장 전용 주차장 무료 이용",
    "visitorsCapacity": "충분함",
    "hallCount": "5",
    "structure": "쾌적한 5개 빈소 및 편리한 부대시설",
    "procedures": "전문 장례지도사 항시 대기 및 맞춤형 장례 컨설팅",
    "parkingAccess": "인천 도심지 내 차량 접근성 우수",
    "quickPoint": "인천 미추홀구 지역 내에서 접근성 좋고 차분한 분위기를 제공하는 장례식장",
    "mortuaryCapacity": 12
  },
  "moduleOrder": [
    "slider",
    "description",
    "pricing",
    "map",
    "consult"
  ],
  "photos": images.length > 0 ? images : ["https://placehold.co/800x600/1e293b/FFFFFF/png?text=Preparing+Images..."],
  "pricingData": [
    {
      "itemType": "빈소사용료",
      "itemName": "특실 (70평형)",
      "price": 1400000,
      "detail": "1일 (24시간) 기준"
    },
    {
      "itemType": "빈소사용료",
      "itemName": "일반실 (40평형)",
      "price": 800000,
      "detail": "1일 (24시간) 기준"
    },
    {
      "itemType": "안치실",
      "itemName": "안치료",
      "price": 100000,
      "detail": "1일 (24시간) 기준"
    },
    {
      "itemType": "입관실",
      "itemName": "입관실사용료",
      "price": 300000,
      "detail": "1회 기준"
    },
    {
      "itemType": "식대",
      "itemName": "식사 (기본찬+국+밥)",
      "price": 15000,
      "detail": "1인당 평균"
    }
  ]
};

data.unshift(newHall); // Add to the beginning
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Successfully added 학교법인영산학원시민장례식장 to realData.json");
