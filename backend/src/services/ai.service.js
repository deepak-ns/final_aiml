import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

export async function generateAIAnalysis(interpretations) {
    const prompt = `
Analyze the hydraulic system based on the last 100 cycles.

Give:
- Component-wise condition
- Trends
- Maintenance advice
- Future predictions


Cite specific timestamps for critical events.
Do NOT use markdown symbols.
Do not use quotes
Use plain text only.

Data:
${JSON.stringify(interpretations)}
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
}
