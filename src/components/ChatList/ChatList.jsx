import React, { useState } from 'react';
import ChatListHeader from '../ChatListHeader/ChatListHeader';
import './ChatList.css';

const ChatList = ({ chats, selectedChatId, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-list">
      <ChatListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="chat-liat-title">Chats</div>
      <div className="chat-list-items">
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            className={`chat-list-item ${
              chat.id === selectedChatId ? 'selected' : ''
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-last-message">
                {chat.messages[chat.messages.length - 1]?.text ||
                  'No messages yet'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
