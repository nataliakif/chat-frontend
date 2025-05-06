import React, { useState } from 'react';
import './AddChatModal.css';

const AddChatModal = ({ onClose, onAdd }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    onAdd({ firstName, lastName });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Chat</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChatModal;
