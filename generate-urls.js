const fs = require('fs');
const path = require('path');

const baseUrl = 'https://gahyo.co.kr';

const staticPages = [
  '/',
  '/about',
  '/terms',
  '/privacy',
  '/guide',
  '/products',
  '/estimate',
  '/cemeteries',
  '/halls',
  '/qna',
];

let urls = [...staticPages.map(p => baseUrl + (p === '/' ? '' : p))];

try {
  const ossuaries = JSON.parse(fs.readFileSync('./src/lib/ossuaries.json', 'utf8'));
  ossuaries.forEach(o => urls.push(`${baseUrl}/cemeteries/ossuary/${o.id}`));
} catch (e) {}

try {
  const naturalBurials = JSON.parse(fs.readFileSync('./src/lib/naturalBurials.json', 'utf8'));
  naturalBurials.forEach(n => urls.push(`${baseUrl}/cemeteries/natural/${n.id}`));
} catch (e) {}

try {
  const graveyards = JSON.parse(fs.readFileSync('./src/lib/graveyards.json', 'utf8'));
  graveyards.forEach(g => urls.push(`${baseUrl}/cemeteries/graveyard/${g.id}`));
} catch (e) {}

try {
  const articles = JSON.parse(fs.readFileSync('./src/lib/db.json', 'utf8'));
  articles.forEach(a => urls.push(`${baseUrl}/guide/${a.id}`));
} catch (e) {}

try {
  const halls = JSON.parse(fs.readFileSync('./src/lib/realData.json', 'utf8'));
  halls.forEach(h => urls.push(`${baseUrl}/halls/${h.id}`));
} catch (e) {}

fs.writeFileSync('./public/urls.txt', urls.join('\n'), 'utf8');
console.log(`Generated ${urls.length} URLs in public/urls.txt`);
