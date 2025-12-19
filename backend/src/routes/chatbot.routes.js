import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyCPbfiq4HMt_ZBnW8If0CxpP9GxNxty038";
const router = express.Router();

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction:
        "You are an expert in hydraulic systems. You answer questions on components and maintenance. Speak concisely and do not use any markdown formatting like bold, italics, or lists. Dont answer any question that is not related to hydraulic systems",
});

router.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const chat = model.startChat({ history: [] });
        const result = await chat.sendMessage(message);

        res.json({ reply: result.response.text() });
    } catch (err) {
        console.error("Chatbot error:", err.message);
        res.status(500).json({ error: "Chatbot failed" });
    }
});

export default router;
