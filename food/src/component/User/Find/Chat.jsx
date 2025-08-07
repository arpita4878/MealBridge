import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { __chatbotapiurl } from "./apiUrls"; // import your API url constant

function Chat() {
  const query = new URLSearchParams(useLocation().search);
  const user1 = query.get("user1"); // donor
  const user2 = query.get("user2"); // claimer

  const currentUser = localStorage.getItem("name") || "You";
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // Suggested questions for quick chat:
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
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMsg = {
      sender: currentUser,
      content: messageText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");

    try {
      const res = await axios.post(__chatbotapiurl, { message: messageText });
      const botReply = {
        sender: "FoodBot 🤖",
        content: res.data.reply,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Bot error:", err);
      const errorReply = {
        sender: "FoodBot 🤖",
        content: "Sorry, something went wrong. Please try again later.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorReply]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage(newMessage);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // When a suggestion is clicked, send that message immediately
  const onSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h4 className="mb-4 text-center">
        Chat between <strong>{user1}</strong> and <strong>{user2}</strong>
      </h4>

      <div style={{ marginBottom: "10px" }}>
        {/* Suggested questions */}
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              className="btn btn-outline-primary btn-sm"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "15px",
          height: "400px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.length === 0 && <p className="text-muted">Start chatting...</p>}
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === currentUser ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                backgroundColor:
                  msg.sender === currentUser
                    ? "#007bff"
                    : msg.sender === "FoodBot 🤖"
                    ? "#28a745"
                    : "#e4e6eb",
                color:
                  msg.sender === currentUser || msg.sender === "FoodBot 🤖"
                    ? "#fff"
                    : "#000",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "70%",
              }}
            >
              <strong>{msg.sender}</strong>
              <div>{msg.content}</div>
              <div
                style={{
                  fontSize: "0.75rem",
                  textAlign: "right",
                  marginTop: "4px",
                }}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={() => sendMessage(newMessage)}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
