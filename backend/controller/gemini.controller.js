const { GoogleGenerativeAI } = require('@google/generative-ai');
require("dotenv").config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateReadme = async (req , res) =>{
    try{
        const {prompt} = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
        const result = await model.generateContent(`Generate a README markdown file based on the following prompt: ${prompt}`);

        const readmeContent = result.response.text();

        const markdownMatch = readmeContent.match(/```markdown\n([\s\S]*?)\n```/);
        const finalReadme = markdownMatch ? markdownMatch[1] : readmeContent;

        res.status(200).send(finalReadme);
    }
    catch (error) {
    console.error('Error generating README:', error);
    res.status(500).json({ error: 'Failed to generate README' });
  }
};