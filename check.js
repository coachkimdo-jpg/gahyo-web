const fs = require('fs');

function checkFile(filename, fields) {
  if (!fs.existsSync(filename)) return;
  const data = JSON.parse(fs.readFileSync(filename));
  console.log(`Checking ${filename} (${data.length} items)...`);
  
  let errors = 0;
  data.forEach(item => {
    fields.forEach(field => {
      let val = item;
      const parts = field.split('.');
      for(let part of parts) {
        if (val == null) {
          val = undefined;
          break;
        }
        val = val[part];
      }
      if (val === undefined) {
        // console.log(`Missing ${field} in`, item.name);
        errors++;
      }
    });
  });
  console.log(`Missing fields found: ${errors}`);
}

checkFile('./src/lib/realData.json', ['name', 'address', 'facilityInfo.parkingCount', 'facilityInfo.burialCapacity']);
checkFile('./src/lib/naturalBurials.json', ['name', 'address', 'description', 'photos', 'priceRange']);
checkFile('./src/lib/ossuaries.json', ['name', 'address', 'description', 'photos', 'priceRange']);
checkFile('./src/lib/graveyards.json', ['name', 'address', 'description', 'photos', 'priceRange']);
checkFile('./src/lib/cemeteryData.json', ['name', 'address', 'description', 'photos', 'priceRange']);
