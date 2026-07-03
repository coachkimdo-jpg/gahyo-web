import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testImageGen() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("No API key");
    return;
  }
  
  const models = ['imagen-3.0-generate-001', 'imagen-4.0-generate-001'];
  
  for (const model of models) {
    try {
      console.log(`Testing ${model}...`);
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict`,
        {
          method: 'POST',
          headers: {
            'x-goog-api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            instances: [{ prompt: "A photorealistic cat" }],
            parameters: { sampleCount: 1, aspectRatio: '1:1' },
          }),
        }
      );
      
      console.log(`${model} Status: ${res.status}`);
      if (!res.ok) {
        console.log(`Error: await res.text()`, await res.text());
      } else {
        const data = await res.json();
        console.log(`${model} Success! Image base64 length:`, data.predictions[0].bytesBase64Encoded.length);
      }
    } catch(e) {
      console.error("Fetch error:", e);
    }
  }
}

testImageGen();
