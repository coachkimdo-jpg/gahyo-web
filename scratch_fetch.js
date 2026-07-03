const https = require('https');
const fs = require('fs');

const url = "https://15774129.go.kr/portal/esky/fnlfac/fac_view.do?menuId=M0001000100000000&facilitycd=7000002416&facilitygroupcd=TBC0700001&loc=price&sanbundiv=N";

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('raw_content.html', data);
    console.log('Saved to raw_content.html. Length:', data.length);
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
