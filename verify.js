const fs = require('fs');
const http = require('http');
const https = require('https');

async function testRedirect(urlPath) {
  return new Promise((resolve) => {
    https.get(`https://gahyo.co.kr${urlPath}`, (res) => {
      resolve({ status: res.statusCode, location: res.headers.location });
    }).on('error', (e) => {
      resolve({ error: e.message });
    });
  });
}

async function verify() {
  console.log('Testing redirects for legacy numeric URLs...');
  
  const testCases = [
    '/halls/1000000069',
    '/halls/1000000577',
    '/cemeteries/graveyard/2000000390',
    '/cemeteries/graveyard/2000000338',
    '/cemeteries/natural/2000000201',
    '/cemeteries/ossuary/2000000033'
  ];

  for (const url of testCases) {
    const result = await testRedirect(url);
    if (result.status === 308) {
      console.log(`✅ SUCCESS: ${url} -> Redirects to: ${result.location}`);
    } else {
      console.log(`❌ FAILED: ${url} returned status ${result.status}`);
    }
  }
}

verify();
