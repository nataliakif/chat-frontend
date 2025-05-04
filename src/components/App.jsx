import React, { useState } from 'react';
import ChatWindow from './ChatWindow/ChatWindow';
import ChatList from './ChatList/ChatList';

// Пример заранее заданных чатов
const initialChats = [
  {
    id: 1,
    name: 'Alice Freeman',
    avatar: 'https://i.pravatar.cc/150?img=1',
    messages: [
      { text: 'Hi, how are you?', isUser: false, time: '8/17/2022, 7:43 AM' },
      {
        text: 'Not bad. What about you?',
        isUser: true,
        time: '8/17/2022, 7:45 AM',
      },
      {
        text: 'How was your meeting?',
        isUser: true,
        time: '8/17/2022, 7:46 AM',
      },
    ],
  },
  {
    id: 2,
    name: 'Josefina',
    avatar: 'https://i.pravatar.cc/150?img=2',
    messages: [
      {
        text: 'Hi! No, I am going for a walk.',
        isUser: false,
        time: '8/16/2022',
      },
    ],
  },
  {
    id: 3,
    name: 'Velazquez',
    avatar: 'https://i.pravatar.cc/150?img=3',
    messages: [
      {
        text: 'Hi! I am a little sad, tell me a joke please.',
        isUser: false,
        time: '8/14/2022',
      },
    ],
  },
];
export const App = () => {
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  const handleSendMessage = text => {
    const newMessage = {
      text,
      isUser: true,
      time: new Date().toLocaleString(),
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
      />

      {selectedChat ? (
        <ChatWindow
          selectedChat={selectedChat}
          messages={selectedChat.messages}
          onSendMessage={handleSendMessage}
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
  );
};
