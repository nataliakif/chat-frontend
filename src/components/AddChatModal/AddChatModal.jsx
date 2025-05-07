import React, { useState } from 'react';
import Button from '../Button/Button';
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

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal_overlay" onClick={handleOverlayClick}>
      <div className="modal_content">
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
          <div className="modal_buttons">
            <Button className="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button className="primary" type="submit">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChatModal;
