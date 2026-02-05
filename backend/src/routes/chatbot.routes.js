import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// ✅ FIX 1: correct FastAPI endpoint
const FASTAPI_URL = "http://127.0.0.1:8000/ask";

router.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // 🔁 Forward request to FastAPI SQL Agent
        const fastApiResponse = await fetch(FASTAPI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // ✅ FIX 2: FastAPI expects "question"
            body: JSON.stringify({ question: message }),
        });

        if (!fastApiResponse.ok) {
            const errorText = await fastApiResponse.text();
            throw new Error(errorText);
        }

        const data = await fastApiResponse.json();

        // ✅ FIX 3: FastAPI returns { response: ... }
        res.json({
            reply: data.response,
        });

    } catch (err) {
        console.error("Chatbot proxy error:", err);
        res.status(500).json({ error: "Chatbot failed" });
    }
});

export default router;
