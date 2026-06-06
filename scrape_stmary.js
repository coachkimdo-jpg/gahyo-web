async function scrape() {
  try {
    const url = 'https://15774129.go.kr/portal/esky/fnlfac/fac_view.do?menuId=M0001000100000000&facilitycd=1000000382&facilitygroupcd=TBC0700001&loc=price&sanbundiv=N';
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    
    const html = await response.text();
    
    // Extract images using regex
    const imageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const images = [];
    let match;
    while ((match = imageRegex.exec(html)) !== null) {
      let src = match[1];
      if (src && !src.includes('no_img') && !src.includes('logo') && !src.includes('icon') && !src.includes('btn') && !src.includes('common')) {
        if (src.startsWith('/')) {
          src = 'https://15774129.go.kr' + src;
        }
        images.push(src);
      }
    }
    
    // Check if we can find something about price table
    // Let's just output the whole HTML to a file and we can parse it locally or grep
    const fs = require('fs');
    fs.writeFileSync('stmary.html', html);
    
    console.log(JSON.stringify({ images: [...new Set(images)] }, null, 2));
    console.log("Saved HTML to stmary.html");
  } catch (error) {
    console.error('Error:', error.message);
  }
}

scrape();
