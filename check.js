const fs = require('fs');
fetch('https://gahyo.co.kr/halls/%EC%84%9C%EC%9A%B8-%EA%B2%BD%ED%9D%AC%EC%9D%98%EB%A3%8C%EC%9B%90%EC%9E%A5%EB%A1%80%EC%8B%9D%EC%9E%A5')
  .then(r => r.text())
  .then(t => {
    console.log('Length:', t.length);
    console.log('Contains noindex:', t.toLowerCase().includes('noindex'));
    const canonicalMatch = t.match(/<link rel="canonical" href="([^"]+)"/);
    console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : null);
  });
