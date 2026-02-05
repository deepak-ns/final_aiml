import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import { Mic, Volume2, Send } from "lucide-react";
import "./Chatbot.css";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const recognitionRef = useRef(null);

  /* ---------- SPEECH TO TEXT ---------- */
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Listening...");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsVoiceMode(true); // Flag that the next send should be voiced
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      setIsVoiceMode(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ---------- AUTO-SEND ON VOICE ---------- */
  // This effect triggers the send automatically once the voice transcript is set
  useEffect(() => {
    if (isVoiceMode && message !== "") {
      sendMessage();
    }
  }, [message, isVoiceMode]);

  /* ---------- TEXT TO SPEECH ---------- */
  const speakText = (text) => {
    // Cancel any ongoing speech before starting new one
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    // Capture the current voice state and immediately reset for the next message
    const shouldSpeak = isVoiceMode;
    setIsVoiceMode(false);

    setLoading(true);
    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage(""); // Clear input

    try {
      const res = await api.post("/chatbot", { message: userMsg.text });
      const botText = res.data.reply;
      const botMsg = { role: "bot", text: botText };

      setChat((prev) => [...prev, botMsg]);

      // Only auto-speak if the user used the Mic button
      if (shouldSpeak) {
        speakText(botText);
      }
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "AI service unavailable. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <h3>Hydraulic AI Assistant</h3>
      </div>

      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.role}`}>
            <div className="msg-content">
              {msg.text}
              {msg.role === "bot" && (
                <button 
                  className="speak-icon-btn" 
                  onClick={() => speakText(msg.text)}
                  title="Listen to response"
                >
                  <Volume2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && <div className="chat-msg bot thinking">Thinking...</div>}
      </div>

      <form onSubmit={sendMessage} className="chat-input">
        <button 
          type="button" 
          onClick={startListening} 
          className={`icon-btn mic-btn ${isVoiceMode ? "active" : ""}`}
        >
          <Mic size={18} />
        </button>

        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setIsVoiceMode(false); // If user starts typing, disable auto-speech
          }}
          placeholder="Ask about hydraulic systems..."
        />

        <button type="submit" className="send-btn" disabled={!message.trim()}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}