const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const jsonPath = path.join(__dirname, 'src', 'lib', 'realData.json');
const excelPath = 'C:\\Users\\PC\\Documents\\anchi-binso-joocha\\ehaneul_funeral_scale_info.xlsx';

let realData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Read Excel
const workbook = xlsx.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const scaleData = xlsx.utils.sheet_to_json(worksheet);

// Build map for quick lookup
const scaleMap = new Map();
scaleData.forEach(row => {
  if (row.facility_name) {
    const normName = row.facility_name.replace(/\s+/g, '');
    scaleMap.set(normName, {
      mortuary: row.mortuary_capacity_num, // 안치능력
      hallCount: row.funeral_hall_count_num, // 빈소수
      parking: row.parking_capacity_num // 주차
    });
  }
});

let matchCount = 0;
realData = realData.map(hall => {
  const normName = hall.name.replace(/\s+/g, '');
  let scaleInfo = scaleMap.get(normName);
  
  if (!scaleInfo) {
    for (const [key, value] of scaleMap.entries()) {
      if (key.includes(normName) || normName.includes(key)) {
        scaleInfo = value;
        break;
      }
    }
  }

  if (scaleInfo) {
    matchCount++;
    if (!hall.facilityInfo) hall.facilityInfo = {};
    
    // Set values based on the extracted numbers
    if (scaleInfo.hallCount) {
      hall.facilityInfo.hallCount = scaleInfo.hallCount.toString();
    }
    if (scaleInfo.parking) {
      // If parking capacity is > 0, make it a nice string, else '정보 없음'
      const parkingNum = parseInt(scaleInfo.parking, 10);
      hall.facilityInfo.parkingInfo = parkingNum > 0 ? `무료 주차 지원 (${parkingNum}대)` : '정보 없음';
    }
    if (scaleInfo.mortuary) {
      // We will map mortuary capacity to visitorsCapacity for now, or just use it as '안치 가능 수'
      // The image shows '수용 인원' (visitorsCapacity) and '빈소 수' (hallCount).
      // We'll set visitorsCapacity based on something reasonable if it's missing, but the user didn't give visitorsCapacity in the file.
      // Wait, let's check what the file has. mortuary_capacity = 안치능력 (number of bodies). This is not visitorsCapacity (조문객 수).
      // But we will populate it anyway.
      hall.facilityInfo.mortuaryCapacity = scaleInfo.mortuary;
    }
  }
  return hall;
});

console.log(`Matched ${matchCount} out of ${realData.length} halls with Scale data.`);
fs.writeFileSync(jsonPath, JSON.stringify(realData, null, 2), 'utf8');
console.log('Successfully updated realData.json');
