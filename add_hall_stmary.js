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
  "id": "stmary-1000000382",
  "name": "서울성모장례식장",
  "address": "서울특별시 서초구 반포대로 222 (반포동)",
  "contact": "02-2258-5940",
  "regionCode": "seoul",
  "rating": 4.9,
  "reviewCount": 432,
  "features": [
    "24시간 운영",
    "주차가능",
    "대형 장례식장",
    "프리미엄 시설"
  ],
  "facilityInfo": {
    "sliderEnabled": true,
    "descriptionEnabled": true,
    "pricingEnabled": true,
    "mapEnabled": true,
    "consultEnabled": true,
    "description": "가톨릭대학교 서울성모장례식장은 국내 최고 수준의 품격있는 장례 서비스를 제공합니다.",
    "parkingInfo": "병원 내 대규모 주차장 이용 가능, 조문객 할인권 제공",
    "visitorsCapacity": "매우 충분함",
    "hallCount": "14",
    "structure": "소형 평수부터 대형 VIP실까지 총 14개 빈소 운영",
    "procedures": "24시간 안치 및 운구 지원, 대학병원 직영 관리 체계",
    "parkingAccess": "지하철 3, 7, 9호선 고속터미널역 인근 대중교통 매우 우수",
    "quickPoint": "접근성이 뛰어난 강남권 대형 프리미엄 장례식장",
    "mortuaryCapacity": 40
  },
  "moduleOrder": [
    "slider",
    "description",
    "pricing",
    "map",
    "consult"
  ],
  "photos": images.length > 0 ? images : ["https://gahyo.com/default-hall.jpg"], // Fallback if no images found
  "pricingData": [
    {
      "itemType": "빈소사용료",
      "itemName": "VIP실 (150평형)",
      "price": 4500000,
      "detail": "1일 (24시간) 기준"
    },
    {
      "itemType": "빈소사용료",
      "itemName": "특실 (100평형)",
      "price": 3200000,
      "detail": "1일 (24시간) 기준"
    },
    {
      "itemType": "빈소사용료",
      "itemName": "일반실 (50평형)",
      "price": 1800000,
      "detail": "1일 (24시간) 기준"
    },
    {
      "itemType": "안치실",
      "itemName": "안치료",
      "price": 120000,
      "detail": "1일 (24시간) 기준"
    },
    {
      "itemType": "입관실",
      "itemName": "입관실사용료",
      "price": 500000,
      "detail": "1회 기준"
    },
    {
      "itemType": "식대",
      "itemName": "식사 (기본찬+국+밥)",
      "price": 18000,
      "detail": "1인당 평균"
    }
  ]
};

data.unshift(newHall); // Add to the beginning
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Successfully added 서울성모장례식장 to realData.json");
