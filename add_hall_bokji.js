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
  "id": "bokji-1000000381",
  "name": "복지장례문화원",
  "address": "서울특별시 영등포구 도림로 142 (대림동)",
  "contact": "02-831-4444",
  "regionCode": "seoul",
  "rating": 4.6,
  "reviewCount": 115,
  "features": [
    "24시간 운영",
    "주차가능",
    "대중교통 편의"
  ],
  "facilityInfo": {
    "sliderEnabled": true,
    "descriptionEnabled": true,
    "pricingEnabled": true,
    "mapEnabled": true,
    "consultEnabled": true,
    "description": "복지장례문화원은 합리적인 장례 비용과 편안한 시설로 내 가족처럼 정성을 다하여 모십니다.",
    "parkingInfo": "건물 주차장 이용 및 대중교통 접근성 우수",
    "visitorsCapacity": "충분함",
    "hallCount": "6",
    "structure": "다양한 크기의 6개 빈소 및 조문객 접객실 완비",
    "procedures": "24시간 안치 및 운구차 대기, 전문 장례지도사 1:1 상담 지원",
    "parkingAccess": "지하철 2, 7호선 대림역 도보 이동 가능",
    "quickPoint": "영등포, 대림 지역에서 접근하기 좋은 도심형 장례문화 공간",
    "mortuaryCapacity": 15
  },
  "moduleOrder": [
    "slider",
    "description",
    "pricing",
    "map",
    "consult"
  ],
  "photos": images,
  "pricingData": [
    {
      "itemType": "빈소사용료",
      "itemName": "특실 (70평형)",
      "price": 1800000,
      "detail": "1일 (24시간) 기준"
    },
    {
      "itemType": "빈소사용료",
      "itemName": "일반실 (40평형)",
      "price": 900000,
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
      "price": 250000,
      "detail": "1회 기준"
    },
    {
      "itemType": "식대",
      "itemName": "식사 (기본찬+국+밥)",
      "price": 14000,
      "detail": "1인당 평균"
    }
  ]
};

data.unshift(newHall); // Add to the beginning
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Successfully added 복지장례문화원 to realData.json");
