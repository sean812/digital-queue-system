import React, { useState } from 'react';

const CustomerDashboard = () => {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [queuePosition, setQueuePosition] = useState(null);

  const generateTicket = () => {
    const newTicket = Math.floor(Math.random() * 1000) + 1;
    const newPosition = Math.floor(Math.random() * 10) + 1;
    setTicketNumber(newTicket);
    setQueuePosition(newPosition);
  };

  return (
    <div className="container">
      <div className="card fade-in" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Customer Dashboard</h1>
        
        {!ticketNumber ? (
          <div style={{ textAlign: 'center' }}>
            <p>Welcome! Get a ticket to join the queue.</p>
            <button 
              className="btn btn-primary" 
              onClick={generateTicket}
              style={{ marginTop: '1rem' }}
            >
              Get Ticket
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div className="card" style={{ background: 'rgba(255, 123, 0, 0.1)', marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--primary-orange)' }}>Ticket #{ticketNumber}</h2>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Your position in queue: <span style={{ color: 'var(--primary-orange)' }}>{queuePosition}</span>
              </p>
            </div>
            <p>Please wait for your number to be called.</p>
            <button 
              className="btn btn-primary" 
              onClick={generateTicket}
              style={{ marginTop: '1rem' }}
            >
              Get New Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;