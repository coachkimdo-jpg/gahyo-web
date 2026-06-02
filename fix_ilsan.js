const fs = require('fs');
const path = './src/lib/realData.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let modified = false;

data.forEach(hall => {
  if (hall.name && hall.name.includes("일산백병원B2층")) {
    hall.name = "일산백병원장례식장";
    hall.address = "경기도 고양시 일산서구 주화로 170, 일산백병원 B2층 (대화동)";
    
    if (hall.facilityInfo && hall.facilityInfo.description) {
        hall.facilityInfo.description = "일산백병원장례식장은(는) 쾌적한 환경과 최상의 서비스를 제공합니다.";
    }
    
    modified = true;
  }
});

if (modified) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log("File updated successfully.");
} else {
  console.log("Could not find the hall to fix.");
}
