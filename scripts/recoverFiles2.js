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

const fileState = {};

async function processLineByLine() {
  const fileStream = fs.createReadStream(transcriptPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      
      if (entry.tool_calls) {
        for (const call of entry.tool_calls) {
          if (call.name === 'write_to_file') {
            const targetFile = (call.args.TargetFile || '').replace(/\\/g, '/').toLowerCase();
            for (const c of corruptedFiles) {
              if (targetFile.endsWith(c.toLowerCase())) {
                fileState[c] = call.args.CodeContent.split('\n');
              }
            }
          }
          
          if (call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
            const targetFile = (call.args.TargetFile || '').replace(/\\/g, '/').toLowerCase();
            for (const c of corruptedFiles) {
              if (targetFile.endsWith(c.toLowerCase()) && fileState[c]) {
                const chunks = call.args.ReplacementChunks || [call.args];
                
                // Sort chunks in reverse order by startLine to avoid shifting lines
                chunks.sort((a, b) => b.StartLine - a.StartLine);
                
                for (const chunk of chunks) {
                   const startLine = chunk.StartLine - 1;
                   const endLine = chunk.EndLine - 1;
                   const replacement = chunk.ReplacementContent.split('\n');
                   
                   // Apply replacement
                   fileState[c].splice(startLine, endLine - startLine + 1, ...replacement);
                }
              }
            }
          }
        }
      }
    } catch(e) {}
  }

  // output results
  console.log('Successfully recovered files from tool history:');
  for (const [file, lines] of Object.entries(fileState)) {
    const content = lines.join('\n');
    console.log(`- ${file} (${content.length} chars)`);
    fs.writeFileSync(path.join('c:/Users/PC/Desktop/gahyo', file), content, 'utf8');
  }
}

processLineByLine();
