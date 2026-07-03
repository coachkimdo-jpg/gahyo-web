const fs = require('fs');
const path = './src/lib/realData.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let modified = false;

data.forEach(hall => {
  if (hall.id === '7000000695') {
    hall.address = "경기도 파주시 파주읍 통일로 1568 (봉서리)";
    
    if (hall.facilityInfo) {
      if (hall.facilityInfo.structure) {
        hall.facilityInfo.structure = hall.facilityInfo.structure.replace("김해 시내권의", "파주 지역의");
      }
      if (hall.facilityInfo.parkingAccess) {
        hall.facilityInfo.parkingAccess = hall.facilityInfo.parkingAccess.replace("부원역 연계 편리", "차량 접근성 우수");
      }
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
