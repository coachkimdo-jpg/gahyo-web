const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const docxPath = 'F:\\가효상조\\가효상조 계약서(최종 수정).docx';
const destZip = path.join(process.cwd(), 'temp.zip');
fs.copyFileSync(docxPath, destZip);

cp.execSync('powershell -Command "Expand-Archive -Path temp.zip -DestinationPath temp_docx_extract -Force"');
const xmlPath = path.join(process.cwd(), 'temp_docx_extract', 'word', 'document.xml');
const xml = fs.readFileSync(xmlPath, 'utf8');
const text = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log(text.substring(0, 3000));
