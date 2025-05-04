import React from 'react';
import './ChatListHeader.css';

const ChatListHeader = ({
  searchQuery,
  onSearchChange,
  loggedIn,
  userAvatarUrl,
}) => {
  return (
    <div className="chat-list-header">
      <div className="chat-list-header-top">
        <div className="user-avatar">
          {loggedIn ? (
            <img src={userAvatarUrl} alt="User avatar" />
          ) : (
            <div className="avatar-placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#ccc"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M12 14c-5 0-8 2-8 4v2h16v-2c0-2-3-4-8-4z" />
              </svg>
            </div>
          )}
        </div>
        <button className="login-button">Log in</button>
      </div>
      <div className="chat-search">
        <svg
          className="search-icon"
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
