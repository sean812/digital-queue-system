import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const PhoneEntry = ({ selectedService, customerName, onPhoneSubmit }) => {
  const { darkMode, addToQueue } = useApp();
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.trim()) {
      try {
        const ticket = await addToQueue({
          service: selectedService.id,
          name: customerName,
          phone: phone.trim()
        });
        onPhoneSubmit(ticket);
      } catch (err) {
        alert('Failed to create ticket. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="card fade-in" style={{ maxWidth: '500px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="main-title">Enter Your Phone Number</h1>
          <p className="subtitle">
            We'll use this to contact you when it's your turn
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={!phone.trim()}
          >
            Get Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhoneEntry;
