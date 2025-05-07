import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import { sendMessageToChat, updateChat } from '../../api/chatApi';
import { toast } from 'react-toastify';

const ChatWindow = ({ selectedChat, refreshChats }) => {
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState(selectedChat.firstName);
  const [editLastName, setEditLastName] = useState(selectedChat.lastName);
  const lastMessageCount = useRef(selectedChat.messages.length);

  useEffect(() => {
    setEditFirstName(selectedChat.firstName);
    setEditLastName(selectedChat.lastName);
    setIsEditing(false);
  }, [selectedChat]);

  useEffect(
    () => {
      lastMessageCount.current = selectedChat.messages.length;
    }, //eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedChat._id]
  );

  useEffect(() => {
    const newMessages = selectedChat.messages.slice(lastMessageCount.current);
    const hasNewBotMessages = newMessages.some(msg => msg.sender !== 'user');

    if (hasNewBotMessages) {
      setTimeout(() => {
        toast.info('New message received!');
      }, 100);
      lastMessageCount.current = selectedChat.messages.length;
    }
  }, [selectedChat.messages]);

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
      }, 5000);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Something went wrong.');
    } finally {
      setSending(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateChat(selectedChat._id, {
        firstName: editFirstName,
        lastName: editLastName,
      });
      toast.success('Chat updated!');
      setIsEditing(false);
      refreshChats();
    } catch (err) {
      console.error('Failed to update chat:', err);
      toast.error('Failed to update chat.');
    }
  };

  if (!selectedChat) {
    return <div className="chat_window">Please select a chat</div>;
  }

  return (
    <div className="chat_window">
      <div className="chat_header">
        <Avatar
          avatarUrl={selectedChat.avatarUrl}
          fallbackId={selectedChat._id}
          alt={`${selectedChat.firstName} ${selectedChat.lastName}`}
          isOnline={selectedChat.isOnline}
        />
        <div className="chat_info">
          <div className="chat_name">
            {isEditing ? (
              <>
                <input
                  value={editFirstName}
                  onChange={e => setEditFirstName(e.target.value)}
                  placeholder="First Name"
                />
                <input
                  value={editLastName}
                  onChange={e => setEditLastName(e.target.value)}
                  placeholder="Last Name"
                />
                <Button className="primary" onClick={handleSaveEdit}>
                  Save
                </Button>
                <Button
                  className="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                {selectedChat.firstName} {selectedChat.lastName}
                <button
                  className="edit_chat_button"
                  onClick={() => setIsEditing(true)}
                  title="Edit chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#4dc0d4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 21h4l11-11-4-4L4 17v4zm16.7-13.3c.4-.4.4-1 0-1.4l-2-2c-.4-.4-1-.4-1.4 0l-1.8 1.8 3.4 3.4 1.8-1.8z" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="chat_messages">
        {selectedChat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat_message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            <div className="chat_bubble">{msg.text}</div>
            <div className="chat_time">
              {new Date(msg.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="chat_input">
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
