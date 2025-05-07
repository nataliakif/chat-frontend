import './ChatItem.css';
import Avatar from '../Avatar/Avatar';

const ChatItem = ({ chat, isSelected, onSelect, onDelete }) => {
  return (
    <div
      className={`chat_item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(chat._id)}
    >
      <Avatar
        avatarUrl={chat.avatarUrl}
        fallbackId={chat._id}
        alt={`${chat.firstName} ${chat.lastName}`}
        isOnline={chat.isOnline}
      />
      <div className="chat_info">
        <div className="chat_name">
          {chat.firstName} {chat.lastName}
        </div>
        <div className="chat_last_message">
          {chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1].text
            : 'No messages yet'}
        </div>
      </div>
      <button
        onClick={e => {
          e.stopPropagation();
          onDelete(chat._id);
        }}
        className="delete_button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ff4d4d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6l-1 14H6L5 6"></path>
          <path d="M10 11v6"></path>
          <path d="M14 11v6"></path>
          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"></path>
        </svg>
      </button>
    </div>
  );
};

export default ChatItem;
