import React from 'react';
import './ChatWindow.css';

const ChatWindow = ({ selectedChat, messages, onSendMessage }) => {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <img
          src={selectedChat.avatar}
          alt={selectedChat.name}
          className="chat-avatar"
        />
        <div className="chat-info">
          <div className="chat-name">{selectedChat.name}</div>
        </div>
      </div>

      {/* Сообщения */}
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.isUser ? 'user' : 'bot'}`}
          >
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-time">{msg.time}</div>
          </div>
        ))}
      </div>

      {/* Ввод нового сообщения */}
      <div className="chat-input">
        <input type="text" placeholder="Type your message" />
        <button>➤</button>
      </div>
    </div>
  );
};

export default ChatWindow;
