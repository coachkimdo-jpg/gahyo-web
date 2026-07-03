const fs = require('fs');

async function run() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict`, {
      method: 'POST',
      headers: {
        'x-goog-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        instances: [{ prompt: 'A photorealistic image of a futuristic city at sunset' }],
        parameters: { sampleCount: 1, aspectRatio: '16:9' }
      })
    });
    
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }
    
    const data = await response.json();
    if (data.predictions && data.predictions.length > 0) {
      const base64Str = data.predictions[0].bytesBase64Encoded;
      fs.writeFileSync('test-imagen.jpeg', Buffer.from(base64Str, 'base64'));
      console.log('Image saved as test-imagen.jpeg');
    } else {
      console.log('No predictions returned', data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}
run();
