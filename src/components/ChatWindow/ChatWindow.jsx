import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import Avatar from '../Avatar/Avatar';
import { sendMessageToChat } from '../../api/chatApi';
import { toast } from 'react-toastify';

const ChatWindow = ({ selectedChat, refreshChats }) => {
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);

  const lastMessageCount = useRef(0);

  useEffect(() => {
    if (!selectedChat) return;

    const currentCount = selectedChat.messages.length;

    // Если переключили чат → просто обновляем счётчик, но без уведомления
    if (
      lastMessageCount.current === 0 ||
      selectedChat._id !== lastMessageCount.chatId
    ) {
      lastMessageCount.current = currentCount;
      lastMessageCount.chatId = selectedChat._id;
      return;
    }

    // Если в этом чате появилось новое сообщение от бота
    if (currentCount > lastMessageCount.current) {
      const lastMessage = selectedChat.messages[currentCount - 1];
      if (lastMessage.sender === 'bot') {
        toast.info('You have a new auto-reply!');
      }
      lastMessageCount.current = currentCount;
    }
  }, [selectedChat]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setSending(true);
    toast.success('Message sent!');

    try {
      await sendMessageToChat(selectedChat._id, inputText);
      setInputText('');
      refreshChats();

      setTimeout(async () => {
        await refreshChats();

        const updatedChat = selectedChat; // в идеале — подтянуть обновлённый объект
        const currentCount = updatedChat.messages.length;

        if (currentCount > lastMessageCount.current) {
          const lastMessage = updatedChat.messages[currentCount - 1];
          if (lastMessage.sender === 'bot') {
            toast.info('You have a new auto-reply!');
          }
          lastMessageCount.current = currentCount;
        }
      }, 5000);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Something went wrong.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <Avatar
          avatarUrl={selectedChat.avatarUrl}
          fallbackId={selectedChat._id}
          alt={`${selectedChat.firstName} ${selectedChat.lastName}`}
          isOnline={selectedChat.isOnline}
        />
        <div className="chat-info">
          <div className="chat-name">
            {selectedChat.firstName} {selectedChat.lastName}
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {selectedChat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-time">
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} disabled={sending}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
