import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function Chat() {
  const query = new URLSearchParams(useLocation().search);
  const user1 = query.get("user1"); // donor
  const user2 = query.get("user2"); // claimer

  const currentUser = localStorage.getItem("name"); // who is chatting now
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageObj = {
      sender: currentUser,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, messageObj]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4 text-center">
        Chat between <strong>{user1}</strong> and <strong>{user2}</strong>
      </h3>

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
                  msg.sender === currentUser ? "#007bff" : "#e4e6eb",
                color: msg.sender === currentUser ? "#fff" : "#000",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "70%",
              }}
            >
              <strong>{msg.sender}</strong>
              <div>{msg.content}</div>
              <div style={{ fontSize: "0.75rem", textAlign: "right", marginTop: "4px" }}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
