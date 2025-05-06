import './Avatar.css';
const Avatar = ({ avatarUrl, fallbackId, alt, isOnline }) => {
  const displayUrl = avatarUrl || `https://i.pravatar.cc/150?u=${fallbackId}`;

  return (
    <div className="avatar_container">
      <img src={displayUrl} alt={alt} className="avatar_image" />
      <span className={`status_indicator ${isOnline ? 'online' : 'offline'}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="14"
          height="14"
        >
          <path
            fill={isOnline ? 'green' : 'gray'}
            d="M6.173 12.414l-3.89-3.89 1.414-1.414L6.173 9.586l6.293-6.293 1.414 1.414z"
          />
        </svg>
      </span>
    </div>
  );
};
export default Avatar;
