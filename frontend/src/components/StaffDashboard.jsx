import React, { useState } from 'react';

const StaffDashboard = () => {
  const [queue, setQueue] = useState([101, 102, 103, 104, 105]);
  const [currentServing, setCurrentServing] = useState(100);

  const serveNextCustomer = () => {
    if (queue.length > 0) {
      const nextCustomer = queue[0];
      setCurrentServing(nextCustomer);
      setQueue(queue.slice(1));
    } else {
      setCurrentServing(null);
    }
  };

  const addCustomerToQueue = () => {
    const newTicket = Math.floor(Math.random() * 100) + 106;
    setQueue([...queue, newTicket]);
  };

  return (
    <div className="container">
      <div className="card fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Staff Dashboard</h1>
        
        <div className="grid grid-2">
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--primary-green)' }}>Now Serving</h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-orange)', margin: '1rem 0' }}>
              {currentServing || '---'}
            </div>
            <button 
              className="btn btn-primary" 
              onClick={serveNextCustomer}
              disabled={queue.length === 0}
            >
              Serve Next Customer
            </button>
          </div>

          <div className="card">
            <h3 style={{ color: 'var(--primary-green)' }}>Queue Status</h3>
            <p>Customers waiting: <strong>{queue.length}</strong></p>
            <div style={{ marginTop: '1rem' }}>
              <h4>Next in line:</h4>
              {queue.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {queue.slice(0, 5).map((ticket, index) => (
                    <li key={ticket} style={{ padding: '0.5rem', background: index === 0 ? 'rgba(255, 123, 0, 0.2)' : 'transparent' }}>
                      #{ticket} {index === 0 && '(Next)'}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No customers in queue</p>
              )}
            </div>
            <button 
              className="btn btn-primary" 
              onClick={addCustomerToQueue}
              style={{ marginTop: '1rem', width: '100%' }}
            >
              Add Test Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;