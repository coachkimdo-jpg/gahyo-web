const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const url = "https://15774129.go.kr/portal/esky/fnlfac/fac_view.do?menuId=M0001000100000000&facilitycd=7000001011&facilitygroupcd=TBC0700001&loc=price&sanbundiv=N";
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set User-Agent to avoid blocks
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  
  console.log("Navigating to URL...");
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  
  console.log("Waiting for tables...");
  // Try to wait for the data table
  try {
      await page.waitForSelector('.board_list', { timeout: 10000 });
  } catch (e) {
      console.log("Table not found, waiting 3 more seconds...");
      await new Promise(r => setTimeout(r, 3000));
  }
  
  const html = await page.content();
  fs.writeFileSync('puppeteer_scraped.html', html);
  console.log("HTML saved to puppeteer_scraped.html");

  // Extract prices
  const prices = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.board_list tbody tr'));
    return rows.map(tr => {
      const tds = Array.from(tr.querySelectorAll('td'));
      return tds.map(td => td.innerText.trim());
    });
  });

  // Extract images
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('.fac_photo img, .photo img, img[alt*="사진"]'));
    return imgs.map(img => img.src);
  });

  console.log("Prices:", JSON.stringify(prices, null, 2));
  console.log("Images:", JSON.stringify(images, null, 2));

  fs.writeFileSync('scraped_data.json', JSON.stringify({ prices, images }, null, 2));

  await browser.close();
})();
