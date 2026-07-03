const fs = require('fs');

async function run() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }
    
    const data = await response.json();
    const imagenModels = data.models.filter(m => m.name.toLowerCase().includes('imagen') || m.name.toLowerCase().includes('image'));
    console.log(JSON.stringify(imagenModels, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}
run();
