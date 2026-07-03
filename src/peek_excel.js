const xlsx = require('xlsx');

const workbook = xlsx.readFile('C:\\Users\\PC\\Downloads\\장례식장_조문객구간별_예상견적_정규화_최소최대-1.xlsx');
const sheetName = workbook.SheetNames[0];
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

console.log('Total rows:', data.length);
console.log('First 3 rows:', JSON.stringify(data.slice(0, 3), null, 2));
