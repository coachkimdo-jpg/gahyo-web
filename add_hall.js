const fs = require('fs');
const path = './src/lib/realData.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newHall = {
  "id": "kyowon-seoseoul-7000002416",
  "name": "교원예움 서서울장례식장",
  "address": "서울특별시 영등포구 선유로 101 (양평동1가)",
  "contact": "02-2676-4444",
  "regionCode": "seoul",
  "rating": 4.7,
  "reviewCount": 152,
  "features": [
    "24시간 운영",
    "주차가능",
    "최근 리모델링",
    "대중교통 접근성 우수"
  ],
  "facilityInfo": {
    "sliderEnabled": true,
    "descriptionEnabled": true,
    "pricingEnabled": true,
    "mapEnabled": true,
    "consultEnabled": true,
    "description": "교원예움 서서울장례식장은 유가족과 조문객의 편의를 최우선으로 생각하는 고품격 장례문화 공간입니다.",
    "parkingInfo": "동시 400여 대 주차 가능 (상주 및 유가족 무료 주차권 지급)",
    "visitorsCapacity": "충분함",
    "hallCount": "12",
    "structure": "다양한 평형대의 12개 빈소 운영, 넓고 쾌적한 접객실 완비",
    "procedures": "24시간 안치 및 운구차 지원, 체계적인 장례 상담 지원",
    "parkingAccess": "지하철 2, 5호선 영등포구청역 인근",
    "quickPoint": "교원그룹이 운영하여 서비스 품질이 보장되는 프리미엄 장례식장",
    "mortuaryCapacity": 30
  },
  "moduleOrder": [
    "slider",
    "description",
    "pricing",
    "map",
    "consult"
  ],
  "photos": [
    "https://15774129.go.kr/BCUser/facilitypic/1685676626396.JPG",
    "https://15774129.go.kr/BCUser/facilitypic/1685676633066.JPG"
  ],
  "pricingData": [
    {
      "itemType": "빈소사용료",
      "itemName": "특실 (100평형)",
      "price": 2500000,
      "detail": "1일 (24시간) 기준"
    },
    {
      "itemType": "빈소사용료",
      "itemName": "일반실 (50평형)",
      "price": 1200000,
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
console.log("Successfully added 교원예움 서서울장례식장 to realData.json");
