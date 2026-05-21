const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Try to see if standard generateContent supports imagen
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });
    const result = await model.generateContent('A beautiful landscape of a funeral home in the mountains, high quality, realistic');
    console.log(result.response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
run();
