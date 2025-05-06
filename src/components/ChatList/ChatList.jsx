import { useState } from 'react';
import { addNewChat } from '../../api/chatApi';
import ChatListHeader from '../ChatListHeader/ChatListHeader';
import Avatar from '../Avatar/Avatar';
import AddChatModal from '../AddChatModal/AddChatModal';
import './ChatList.css';

const ChatList = ({ chats, setChats, selectedChatId, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredChats = chats.filter(chat =>
    `${chat.firstName} ${chat.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-list">
      <ChatListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="chat-list-title">Chats</div>
      <button onClick={() => setShowAddModal(true)}>+ Add Chat</button>

      {showAddModal && (
        <AddChatModal
          onClose={() => setShowAddModal(false)}
          onAdd={async newChatData => {
            try {
              const createdChat = await addNewChat(newChatData);
              setChats(prev => [...prev, createdChat]); // ← напрямую обновляем App-стейт
            } catch (err) {
              console.error('Failed to add chat:', err);
            }
          }}
        />
      )}

      <div className="chat-list-items">
        {filteredChats.map(chat => (
          <div
            key={chat._id}
            className={`chat-list-item ${
              chat._id === selectedChatId ? 'selected' : ''
            }`}
            onClick={() => onSelectChat(chat._id)}
          >
            <Avatar
              avatarUrl={chat.avatarUrl}
              fallbackId={chat._id}
              alt={`${chat.firstName} ${chat.lastName}`}
              isOnline={chat.isOnline}
            />
            <div className="chat-info">
              <div className="chat-name">
                {chat.firstName} {chat.lastName}
              </div>
              <div className="chat-last-message">
                {chat.messages.length > 0
                  ? chat.messages[chat.messages.length - 1].text
                  : 'No messages yet'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
