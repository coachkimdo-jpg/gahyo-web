const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();
  
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  
  await page.emulate(puppeteer.KnownDevices['iPhone 12']);
  
  console.log('Navigating...');
  await page.goto('https://gahyo.co.kr', {waitUntil: 'networkidle2'});
  
  console.log('Waiting 3 seconds...');
  await new Promise(r => setTimeout(r, 3000));
  
  const bodyHtml = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
  console.log('Body HTML:', bodyHtml);
  
  await browser.close();
})();
