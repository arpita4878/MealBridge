import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { __chatbotapiurl } from "../../../Api_Url";
import "./ChatBot.css";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "FoodBot 🤖", content: "Hi! How can I help you today?", timestamp: getTime() }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const userMsg = {
      sender: "You",
      content: trimmed,
      timestamp: getTime(),
      animated: true,
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(__chatbotapiurl, { message: trimmed });

      const botReply = {
        sender: "FoodBot 🤖",
        content: res.data.reply?.trim() || "Sorry, I didn’t understand that.",
        timestamp: getTime(),
        animated: true,
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botReply]);
        setIsTyping(false);
      }, 700);
    } catch (err) {
      console.error("Bot error:", err);
      setMessages(prev => [...prev, {
        sender: "FoodBot 🤖",
        content: "Server error. Try again later.",
        timestamp: getTime()
      }]);
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>FoodBot 🤖</span>
            <button onClick={() => setIsOpen(false)}>&times;</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender === "You" ? "user" : "bot"}`}>
                <div className="msg-content">{msg.content}</div>
                <div className="timestamp">{msg.timestamp}</div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-msg bot">
                <div className="msg-content typing-indicator">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
