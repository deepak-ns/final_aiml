import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
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

    const response = await client.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            {
                role: "system",
                content:
                    "You are an expert in hydraulic systems. You analyze system behavior, degradation patterns, and maintenance needs. Respond concisely and professionally.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.2,
    });

    return response.choices[0].message.content;
}
