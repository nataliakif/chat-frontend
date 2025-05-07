import { useState, useMemo } from 'react';
import { addNewChat, getAllChats, deleteChat } from '../../api/chatApi';
import ChatListHeader from '../ChatListHeader/ChatListHeader';
import AddChatModal from '../AddChatModal/AddChatModal';
import ChatItem from '../ChatItem/ChatItem';
import './ChatList.css';
import { toast } from 'react-toastify';

const ChatList = ({ chats, setChats, selectedChatId, onSelectChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddChat = async newChatData => {
    try {
      const createdChat = await addNewChat(newChatData);
      if (createdChat && createdChat._id) {
        setChats(prev => [...prev, createdChat]);
      } else {
        const updatedChats = await getAllChats();
        setChats(updatedChats);
      }
    } catch (err) {
      console.error('Failed to add chat:', err);
    }
  };

  const handleDelete = async chatId => {
    if (!window.confirm('Are you sure you want to delete this chat?')) return;
    try {
      await deleteChat(chatId);
      setChats(prev => prev.filter(chat => chat._id !== chatId));
      toast.success('Chat deleted!');
    } catch (error) {
      console.error('Failed to delete chat:', error);
      toast.error('Failed to delete chat.');
    }
  };

  const filteredChats = useMemo(
    () =>
      chats.filter(chat =>
        `${chat.firstName} ${chat.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [chats, searchQuery]
  );

  return (
    <div className="chat_list">
      <ChatListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="chat_list_container">
        <div className="chat_list_title">Chats</div>
        <button
          className="add_chat_button"
          onClick={() => setShowAddModal(true)}
        >
          ＋ Add Chat
        </button>
      </div>

      {showAddModal && (
        <AddChatModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddChat}
        />
      )}

      <div className="chat_list_items">
        {filteredChats.map(chat => (
          <ChatItem
            key={chat._id}
            chat={{
              ...chat,
              ownerLabel: chat.owner ? 'My chat' : 'Default chat', // добавляем безопасную подпись
            }}
            isSelected={chat._id === selectedChatId}
            onSelect={onSelectChat}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
