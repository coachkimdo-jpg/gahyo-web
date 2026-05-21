const fs = require('fs');
const readline = require('readline');
const path = require('path');

const brainDir = String.raw`C:\Users\PC\.gemini\antigravity\brain`;
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
const allEvents = []; // Store events to sort them globally

function getTranscripts() {
  const dirs = fs.readdirSync(brainDir);
  const paths = [];
  for (const d of dirs) {
    const tPath = path.join(brainDir, d, '.system_generated', 'logs', 'transcript.jsonl');
    if (fs.existsSync(tPath)) {
      paths.push(tPath);
    }
  }
  return paths;
}

async function collectEvents() {
  const paths = getTranscripts();
  for (const tPath of paths) {
    const fileStream = fs.createReadStream(tPath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    for await (const line of rl) {
      try {
        const entry = JSON.parse(line);
        if (entry.tool_calls) {
          for (const call of entry.tool_calls) {
            if (['write_to_file', 'replace_file_content', 'multi_replace_file_content'].includes(call.name)) {
              const targetFile = (call.args.TargetFile || '').replace(/\\/g, '/').toLowerCase();
              for (const c of corruptedFiles) {
                if (targetFile.endsWith(c.toLowerCase())) {
                  allEvents.push({
                    timestamp: new Date(entry.created_at || 0).getTime(),
                    type: call.name,
                    file: c,
                    args: call.args
                  });
                }
              }
            }
          }
        }
      } catch(e) {}
    }
  }
}

async function rebuild() {
  await collectEvents();
  // Sort events chronologically
  allEvents.sort((a, b) => a.timestamp - b.timestamp);
  
  for (const event of allEvents) {
    if (event.type === 'write_to_file') {
      fileState[event.file] = event.args.CodeContent.split('\n');
    } else if ((event.type === 'replace_file_content' || event.type === 'multi_replace_file_content') && fileState[event.file]) {
      const chunks = event.args.ReplacementChunks || [event.args];
      // Sort reverse by line number to safely splice
      chunks.sort((a, b) => b.StartLine - a.StartLine);
      for (const chunk of chunks) {
         const startLine = chunk.StartLine - 1;
         const endLine = chunk.EndLine - 1;
         const replacement = chunk.ReplacementContent.split('\n');
         fileState[event.file].splice(startLine, endLine - startLine + 1, ...replacement);
      }
    }
  }

  console.log('Successfully recovered files from global tool history:');
  for (const [file, lines] of Object.entries(fileState)) {
    const content = lines.join('\n');
    console.log(`- ${file} (${content.length} chars)`);
    fs.writeFileSync(path.join('c:/Users/PC/Desktop/gahyo', file), content, 'utf8');
  }
}

rebuild();
