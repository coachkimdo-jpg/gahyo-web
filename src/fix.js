const fs = require('fs');
const data = require('./src/lib/realData.json');

let modified = 0;
data.forEach(hall => {
  let originalName = hall.name;
  let realName = hall.name;
  let realAddress = hall.address || '';

  if (realName === '사설' || realName === '공설' || realName.includes('광역시') || realName.includes('도 ') || realName.includes('특별시') || realName.includes('시 ') || realName.length > 15) {
    let textToSearch = (realName !== '사설' && realName !== '공설' && realName.length > 5) ? realName : realAddress;
    const match = textToSearch.match(/\((?:[^,]+,\s*)?([^)]+)\)/);
    if (match && match[1]) {
      realName = match[1].trim();
    }
  }

  // Fallback if still "사설"
  if (realName === '사설' || realName === '공설') {
    realName = "이름없음";
  }

  if (realName !== originalName) {
    hall.name = realName;
    modified++;
  }
});

fs.writeFileSync('./src/lib/realData.json', JSON.stringify(data, null, 2));
console.log('Modified ' + modified + ' halls');
