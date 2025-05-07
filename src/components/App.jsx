import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow/ChatWindow';
import ChatList from './ChatList/ChatList';
import { getAllChats } from '../api/chatApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllChats()
      .then(data => {
        setChats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load chats:', err);
        setLoading(false);
      });
  }, []);

  const selectedChat = chats.find(chat => chat._id === selectedChatId);

  if (loading) {
    return <div>Loading chats...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div style={{ display: 'flex', height: '100vh' }}>
        <ChatList
          chats={chats}
          setChats={setChats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
        />

        {selectedChat ? (
          <ChatWindow
            selectedChat={selectedChat}
            refreshChats={() => getAllChats().then(setChats)}
          />
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </>
  );
};
