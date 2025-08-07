import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { __chatbotapiurl } from "../../../Api_Url";
import "./Chat.css"; // custom styling for animations + mobile

function Chat() {
  const query = new URLSearchParams(useLocation().search);
  const user1 = query.get("user1");
  const user2 = query.get("user2");

  const currentUser = localStorage.getItem("name") || "You";
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    "How do I donate food?",
    "How do I claim food?",
    "Where is the service available?",
    "How can I volunteer?",
    "How to become a partner?",
    "Hello",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMsg = {
      sender: currentUser,
      content: messageText,
      timestamp: new Date().toLocaleTimeString(),
      animated: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true); // show typing indicator

    try {
      const res = await axios.post(__chatbotapiurl, { message: messageText });

      const botReply = {
        sender: "FoodBot 🤖",
        content: res.data.reply,
        timestamp: new Date().toLocaleTimeString(),
        animated: true,
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 700); // simulate delay
    } catch (err) {
      console.error("Bot error:", err);
      const errorReply = {
        sender: "FoodBot 🤖",
        content: "Sorry, something went wrong. Please try again later.",
        timestamp: new Date().toLocaleTimeString(),
        animated: true,
      };
      setMessages((prev) => [...prev, errorReply]);
      setIsTyping(false);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-container container mt-4">
      <h5 className="mb-3 text-center">
        Chat between <strong>{user1}</strong> and <strong>{user2}</strong>
      </h5>

      {/* Suggestions */}
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            className="btn btn-outline-primary btn-sm"
            onClick={() => sendMessage(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div className="chat-box">
        {messages.length === 0 && (
          <p className="text-muted">Select a question to start chatting...</p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.animated ? "fade-in" : ""}`}
            style={{
              justifyContent:
                msg.sender === currentUser ? "flex-end" : "flex-start",
            }}
          >
            <div
              className={`bubble-content ${
                msg.sender === currentUser
                  ? "user-bubble"
                  : msg.sender === "FoodBot 🤖"
                  ? "bot-bubble"
                  : "default-bubble"
              }`}
            >
              <strong>{msg.sender}</strong>
              <div>{msg.content}</div>
              <div className="timestamp">{msg.timestamp}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-bubble fade-in">
            <div className="bubble-content bot-bubble">
              <strong>FoodBot 🤖</strong>
              <div className="typing-indicator">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

export default Chat;
