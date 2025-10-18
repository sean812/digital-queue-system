import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const NameEntry = ({ selectedService, onNameSubmit }) => {
  const { darkMode } = useApp();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="container">
      <div className="card fade-in" style={{ maxWidth: '500px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="main-title">Enter Your Name</h1>
          <p className="subtitle">
            Please provide your full name for the ticket
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={!name.trim()}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameEntry;
