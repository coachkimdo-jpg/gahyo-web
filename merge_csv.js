const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'lib', 'realData.json');
const csvPath = 'C:\\Users\\PC\\Downloads\\aaa.csv';

let realData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const csvData = fs.readFileSync(csvPath, 'utf8').split('\n');

const parseCSVLine = (line) => {
  const result = [];
  let currentStr = '';
  let insideQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      result.push(currentStr.trim());
      currentStr = '';
    } else {
      currentStr += char;
    }
  }
  result.push(currentStr.trim());
  return result;
};

const extraDataMap = new Map();

for (let i = 1; i < csvData.length; i++) {
  const line = csvData[i];
  if (!line.trim()) continue;
  
  const columns = parseCSVLine(line);
  if (columns.length >= 6) {
    const name = columns[0];
    const location = columns[1];
    const structure = columns[2];
    const procedures = columns[3];
    const parkingAccess = columns[4];
    const quickPoint = columns[5];
    
    // Some names in CSV might have slight differences, try to match closely
    extraDataMap.set(name.replace(/\s+/g, ''), {
      structure, procedures, parkingAccess, quickPoint
    });
  }
}

// Update realData
let matchCount = 0;
realData = realData.map(hall => {
  const normalizedName = hall.name.replace(/\s+/g, '');
  let extra = extraDataMap.get(normalizedName);
  
  if (!extra) {
    // Try substring matching
    for (const [key, value] of extraDataMap.entries()) {
      if (key.includes(normalizedName) || normalizedName.includes(key)) {
        extra = value;
        break;
      }
    }
  }

  if (extra) {
    matchCount++;
    if (!hall.facilityInfo) hall.facilityInfo = {};
    hall.facilityInfo.structure = extra.structure;
    hall.facilityInfo.procedures = extra.procedures;
    hall.facilityInfo.parkingAccess = extra.parkingAccess;
    hall.facilityInfo.quickPoint = extra.quickPoint;
  }
  return hall;
});

console.log(`Matched ${matchCount} out of ${realData.length} halls with CSV data.`);

fs.writeFileSync(jsonPath, JSON.stringify(realData, null, 2), 'utf8');
console.log('Successfully updated realData.json');
