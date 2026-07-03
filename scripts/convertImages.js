const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const exec = promisify(require('child_process').exec);

async function checkSharp() {
  try {
    require.resolve('sharp');
  } catch (e) {
    console.log('Installing sharp...');
    await exec('npm install sharp');
  }
}

async function run() {
  await checkSharp();
  const sharp = require('sharp');

  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const libDir = path.join(rootDir, 'src', 'lib');

  const databases = [
    { file: 'ossuaries.json', typeName: '납골당-봉안당' },
    { file: 'naturalBurials.json', typeName: '자연장-수목장' },
    { file: 'realData.json', typeName: '장례식장' },
  ];

  for (const db of databases) {
    const dbPath = path.join(libDir, db.file);
    if (!fs.existsSync(dbPath)) continue;

    console.log(`Processing ${db.file}...`);
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    let updatedCount = 0;

    for (const item of data) {
      if (!item.photos || !Array.isArray(item.photos)) continue;
      
      const newPhotos = [];
      for (let i = 0; i < item.photos.length; i++) {
        const photoUrl = item.photos[i];
        if (!photoUrl) continue;
        
        // Skip if already webp and correct format, or if it's external url
        if (photoUrl.startsWith('http')) {
          newPhotos.push(photoUrl);
          continue;
        }

        const oldFilePath = path.join(publicDir, photoUrl.replace(/^\//, ''));
        if (!fs.existsSync(oldFilePath)) {
          newPhotos.push(photoUrl);
          continue;
        }

        // SEO friendly name: gahyo-typeName-itemName-index.webp
        const safeItemName = (item.name || '상조').replace(/[^a-zA-Z0-9가-힣]/g, '-').replace(/-+/g, '-').replace(/(^-|-$)/g, '');
        const newFileName = `gahyo-${db.typeName}-${safeItemName}-시설전경-${i + 1}.webp`;
        
        const dirName = path.dirname(oldFilePath);
        const newFilePath = path.join(dirName, newFileName);
        const newPhotoUrl = path.dirname(photoUrl) + '/' + newFileName;

        if (oldFilePath !== newFilePath) {
          try {
            await sharp(oldFilePath)
              .webp({ quality: 80 }) // Compress to save bandwidth
              .resize({ width: 1200, withoutEnlargement: true }) // Max width 1200
              .toFile(newFilePath);
            
            // Delete old file
            fs.unlinkSync(oldFilePath);
            newPhotos.push(newPhotoUrl);
            updatedCount++;
            
            if (updatedCount % 50 === 0) {
              console.log(`  Converted ${updatedCount} images...`);
            }
          } catch (err) {
            console.error(`  Error converting ${oldFilePath}:`, err.message);
            newPhotos.push(photoUrl);
          }
        } else {
          newPhotos.push(photoUrl);
        }
      }
      item.photos = newPhotos;
    }

    // Save updated DB
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Finished ${db.file}. Converted ${updatedCount} images.`);
  }

  console.log('All images converted successfully!');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
