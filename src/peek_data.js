const fs = require('fs');

const path = 'C:\\Users\\PC\\Documents\\자연장지\\ehaneul_natural_burial_facilities.jsonl';
const lines = fs.readFileSync(path, 'utf8').split('\n');

for (let i = 0; i < 1; i++) {
  if (lines[i]) {
    const data = JSON.parse(lines[i]);
    // Simplify for console
    data.pricing_text = data.pricing_text ? data.pricing_text.substring(0, 100) + '...' : '';
    data.etc_intro = data.etc_intro ? data.etc_intro.substring(0, 100) + '...' : '';
    console.log(JSON.stringify(data, null, 2));
  }
}
