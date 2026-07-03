const fs = require('fs');

const html = fs.readFileSync('raw_content.html', 'utf8');

// Find facility name
const nameMatch = html.match(/<h2[^>]*>(.*?)<\/h2>/i);
if (nameMatch) {
  console.log("Found h2:", nameMatch[1]);
}

const titleMatch = html.match(/<title>(.*?)<\/title>/i);
if (titleMatch) console.log("Title:", titleMatch[1]);

// Find image
const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi);
if (imgMatch) {
  imgMatch.forEach(img => {
     if (img.includes('facility') || img.includes('photo')) {
         console.log("Image:", img);
     }
  });
}

const allTextMatches = html.match(/>([^<]+)</g);
if (allTextMatches) {
    const text = allTextMatches.map(t => t.replace(/[><]/g, '').trim()).filter(t => t.length > 0).join('\n');
    fs.writeFileSync('parsed_text.txt', text);
    console.log("Text saved to parsed_text.txt. Length:", text.length);
}
