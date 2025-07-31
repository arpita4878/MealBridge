import React, { useState } from 'react';
import './ChatBot.css';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { from: 'user', text: userInput }];

    // Send userInput to backend/chat API here
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    newMessages.push({ from: 'bot', text: data.reply });

    setMessages(newMessages);
    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      <button onClick={toggleChat} className="chatbot-toggle">
        💬 Chat
      </button>
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me anything..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
        </div>
      )}
    </div>
  );
}

export default ChatBot;
