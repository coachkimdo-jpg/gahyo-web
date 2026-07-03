const https = require('https');

https.get('https://gahyo.co.kr/guide/%EC%9E%A5%EB%A1%80%EC%8B%9D-%EC%A0%88%EC%B0%A8-a-to-z-%EB%88%84%EA%B5%AC%EB%82%98-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-%ED%95%84%EC%88%98-%EC%A0%95%EB%B3%B4%EC%99%80-%EA%B0%80%ED%9A%A8%EC%83%81%EC%A1%B0%EC%9D%98-%EB%93%A0%EB%93%A0%ED%95%9C-%EC%A7%80%EC%9B%90', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const h1Matches = data.match(/<h1[^>]*>/gi);
    console.log('Total H1 tags:', h1Matches ? h1Matches.length : 0);
    if (h1Matches) {
      console.log('H1 tags found:', h1Matches);
    }
  });
}).on('error', err => {
  console.error('Error fetching URL:', err.message);
});
