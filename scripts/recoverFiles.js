const fs = require('fs');
const readline = require('readline');
const path = require('path');

const transcriptPath = String.raw`C:\Users\PC\.gemini\antigravity\brain\6a36c0b3-1a14-424f-ba72-3055c50fd306\.system_generated\logs\transcript.jsonl`;
const corruptedFiles = [
  'src/app/about/page.js',
  'src/app/api/generate-post/route.js',
  'src/app/cemeteries/layout.js',
  'src/app/estimate/layout.js',
  'src/app/guide/page.js',
  'src/app/products/page.js',
  'src/app/page.js',
  'src/components/Footer.js',
  'src/components/Header.js'
];

const latestContents = {};

async function processLineByLine() {
  const fileStream = fs.createReadStream(transcriptPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      
      // Check write_to_file / replace_file_content in tool_calls
      if (entry.tool_calls) {
        for (const call of entry.tool_calls) {
          if (call.name === 'write_to_file') {
            const targetFile = (call.args.TargetFile || '').replace(/\\/g, '/').toLowerCase();
            for (const c of corruptedFiles) {
              if (targetFile.endsWith(c.toLowerCase())) {
                latestContents[c] = call.args.CodeContent;
              }
            }
          }
        }
      }
      
      // Check view_file output
      if (entry.content && typeof entry.content === 'string') {
        if (entry.content.includes('File Path: `file:///')) {
          const match = entry.content.match(/File Path: `file:\/\/\/(.+?)`/i);
          if (match) {
            const targetFile = match[1].replace(/\\/g, '/').toLowerCase();
            for (const c of corruptedFiles) {
              if (targetFile.endsWith(c.toLowerCase())) {
                // Extract the file content
                const lines = entry.content.split('\n');
                let content = [];
                for (const l of lines) {
                  const lineMatch = l.match(/^(\d+): (.*)$/);
                  if (lineMatch) {
                    content.push(lineMatch[2]);
                  }
                }
                if (content.length > 0) {
                  latestContents[c] = content.join('\n');
                }
              }
            }
          }
        }
      }
    } catch(e) {}
  }

  // output results
  console.log('Recovered files:');
  for (const [file, content] of Object.entries(latestContents)) {
    console.log(`- ${file} (${content.length} chars)`);
    fs.writeFileSync(path.join('c:/Users/PC/Desktop/gahyo', file), content, 'utf8');
  }
}

processLineByLine();
