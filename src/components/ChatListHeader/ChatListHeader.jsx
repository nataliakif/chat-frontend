import React, { useEffect, useState } from 'react';
import './ChatListHeader.css';
import Button from '../Button/Button';
import { getCurrentUser } from '../../api/chatApi';

const ChatListHeader = ({ searchQuery, onSearchChange }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = () => {
    window.location.href = 'https://chat-backend-g81a.onrender.com/auth/google';
  };

  const handleLogout = () => {
    window.location.href = 'https://chat-backend-g81a.onrender.com/auth/logout';
  };

  const displayName = user
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.email
    : '';

  return (
    <div className="chat_list_header">
      <div className="chat_list_header_top">
        <div className="user_avatar">
          {user && user.avatarURL ? (
            <img src={user.avatarURL} alt="User avatar" />
          ) : (
            <div className="avatar_placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="#ccc"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M12 14c-5 0-8 2-8 4v2h16v-2c0-2-3-4-8-4z" />
              </svg>
            </div>
          )}
        </div>
        <div className="user_info">
          {user && <span>{displayName || user.email}</span>}
        </div>
        <div className="user_actions">
          {!loading && (
            <Button
              className="primary"
              onClick={user ? handleLogout : handleLogin}
            >
              {user ? 'Logout' : 'Login'}
            </Button>
          )}
        </div>
      </div>
      <div className="chat_search">
        <svg
          className="search_icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search or start new chat"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ChatListHeader;
