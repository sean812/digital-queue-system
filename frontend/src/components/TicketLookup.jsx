import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const TicketLookup = ({ onTicketFound, onBack }) => {
  const { darkMode } = useApp();
  const [searchType, setSearchType] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/api/tickets');
      const tickets = await res.json();
      
      let foundTicket = null;
      if (searchType === 'id') {
        foundTicket = tickets.find(t => t.id === parseInt(searchValue));
      } else {
        foundTicket = tickets.find(t => t.phone === searchValue);
      }

      if (foundTicket) {
        // Calculate position in queue
        const waitingTickets = tickets.filter(t => t.status === 'waiting').sort((a, b) => a.id - b.id);
        const position = waitingTickets.findIndex(t => t.id === foundTicket.id) + 1;
        
        onTicketFound({ 
          ...foundTicket, 
          position: position > 0 ? position : null,
          totalWaiting: waitingTickets.length
        });
      } else {
        setError('Ticket not found. Please check your information and try again.');
      }
    } catch (err) {
      console.error('Failed to search ticket:', err);
      setError('Failed to search for ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card fade-in" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="main-title">Track Your Ticket</h1>
          <p className="subtitle">
            Enter your ticket information to check your position in the queue
          </p>
        </div>

        <form onSubmit={handleSearch}>
          {/* Search Type Selection */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Search By:</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  value="id"
                  checked={searchType === 'id'}
                  onChange={(e) => {
                    setSearchType(e.target.value);
                    setSearchValue('');
                    setError('');
                  }}
                  style={{ marginRight: '0.5rem' }}
                />
                Ticket Number
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  value="phone"
                  checked={searchType === 'phone'}
                  onChange={(e) => {
                    setSearchType(e.target.value);
                    setSearchValue('');
                    setError('');
                  }}
                  style={{ marginRight: '0.5rem' }}
                />
                Phone Number
              </label>
            </div>
          </div>

          {/* Search Input */}
          <div className="form-group">
            <label htmlFor="search" className="form-label">
              {searchType === 'id' ? 'Ticket Number' : 'Phone Number'}
            </label>
            <input
              type={searchType === 'id' ? 'number' : 'tel'}
              id="search"
              className="form-input"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setError('');
              }}
              placeholder={searchType === 'id' ? 'Enter your ticket number (e.g., 1)' : 'Enter your phone number'}
              required
              autoFocus
            />
          </div>

          {error && (
            <div style={{
              padding: '1rem',
              background: 'rgba(220, 53, 69, 0.1)',
              border: '1px solid rgba(220, 53, 69, 0.3)',
              borderRadius: 'var(--border-radius)',
              color: '#dc3545',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={!searchValue.trim() || loading}
          >
            {loading ? 'Searching...' : 'Find My Ticket'}
          </button>

          <button
            type="button"
            className="btn"
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={onBack}
          >
            ← Back to Home
          </button>
        </form>

        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: 'rgba(13, 110, 253, 0.1)', 
          borderRadius: 'var(--border-radius)',
          fontSize: '0.9rem'
        }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            <strong>💡 Tip:</strong> Your ticket number was shown when you first got your ticket.
          </p>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>
            You can also search using the phone number you provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketLookup;