const fs = require('fs');
const path = './src/lib/realData.json';

const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.forEach(hall => {
  if (hall.id === 'stmary-1000000382' || hall.id === 'bokji-1000000381') {
    hall.photos = ["https://placehold.co/800x600/1e293b/FFFFFF/png?text=Preparing+Images..."];
  }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Fixed images for stmary and bokji");
