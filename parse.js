const fs = require('fs');
const html = fs.readFileSync('temp.html', 'utf8');
const scripts = html.split('<script type="application/ld+json">');
for (let i = 1; i < scripts.length; i++) {
  const jsonString = scripts[i].split('</script>')[0];
  console.log('--- JSON ' + i + ' ---');
  console.log(jsonString);
}
