const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:\\Users\\PC\\Downloads\\장례식장_조문객구간별_예상견적_정규화_최소최대-1.xlsx';
const outputPath = path.join(__dirname, '..', 'src', 'lib', 'estimateData.json');

const workbook = xlsx.readFile(inputPath);
const sheetName = workbook.SheetNames[0];
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

const estimateData = {};

data.forEach((row) => {
  const hallName = row['장례식장명'];
  if (!hallName) return;

  const rawGuestCategory = row['조문객 구간'];
  let guestKey = '';
  if (rawGuestCategory.includes('무빈소') || rawGuestCategory === '0명(무빈소)' || rawGuestCategory === '0명') guestKey = '0';
  else if (rawGuestCategory.includes('50~100명')) guestKey = '50-100';
  else if (rawGuestCategory.includes('100~200명')) guestKey = '100-200';
  else if (rawGuestCategory.includes('200~300명')) guestKey = '200-300';
  else return; // Ignore other categories if any

  if (!estimateData[hallName]) {
    estimateData[hallName] = {};
  }

  estimateData[hallName][guestKey] = {
    min: row['예상견적 최소'] || 0,
    max: row['예상견적 최대'] || 0,
    details: {
      anchi: row['안치실 사용료(48시간)'] || 0,
      ipgwan: row['입관실 사용료(1회)'] || 0,
      susi: row['초기 수시/위생비'] || 0,
      binso: row['빈소 사용료(48시간)'] || 0,
      binsoName: row['선택 빈소'] || '',
      gwanri: row['관리비(48시간)'] || 0,
      chungso: row['청소비/수거료(48시간)'] || 0,
      meal: row['식음료비'] || 0,
      floralMin: (row['제사 상차림비 최소'] || 0) + (row['제단 꽃 장식비 최소'] || 0),
      floralMax: (row['제사 상차림비 최대'] || 0) + (row['제단 꽃 장식비 최대'] || 0)
    }
  };
});

fs.writeFileSync(outputPath, JSON.stringify(estimateData, null, 2), 'utf8');
console.log(`Successfully parsed ${data.length} rows and wrote estimateData.json`);
