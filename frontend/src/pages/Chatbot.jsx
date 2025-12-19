import { useState } from "react";
import api from "../services/api";
import "./Chatbot.css";

export default function Chatbot() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);

        const userMsg = { role: "user", text: message };
        setChat((prev) => [...prev, userMsg]);

        try {
            const res = await api.post("/chatbot", { message });
            const botMsg = { role: "bot", text: res.data.reply };

            setChat((prev) => [...prev, botMsg]);
        } catch {
            setChat((prev) => [
                ...prev,
                { role: "bot", text: "AI service unavailable." },
            ]);
        }

        setMessage("");
        setLoading(false);
    };

    return (
        <div className="chat-page">
            <h2>Hydraulic AI Assistant</h2>

            <div className="chat-box">
                {chat.map((msg, i) => (
                    <div key={i} className={`chat-msg ${msg.role}`}>
                        {msg.text}
                    </div>
                ))}

                {loading && <div className="chat-msg bot">Thinking...</div>}
            </div>

            <form onSubmit={sendMessage} className="chat-input">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about hydraulic components or maintenance..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
