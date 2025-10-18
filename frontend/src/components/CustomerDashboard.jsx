import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const CustomerDashboard = ({ ticket, selectedService }) => {
  const { globalQueue, currentServing } = useApp();
  const [waitTime, setWaitTime] = useState('Calculating...');

  // Calculate wait time for current ticket
  useEffect(() => {
    if (ticket && globalQueue.length > 0) {
      const ticketInQueue = globalQueue.find(t => t.id === ticket.id);
      if (ticketInQueue) {
        const minutes = ticketInQueue.waitTime;
        setWaitTime(`${minutes} min`);
      } else {
        setWaitTime('Almost there!');
      }
    }
  }, [globalQueue, ticket]);

  const getServiceColor = (serviceType) => {
    const colors = {
      'account-sim': '#007bff',
      'payments-billing': '#28a745',
      'network-data': '#6f42c1',
      'device-support': '#fd7e14',
      'service-plans': '#e83e8c',
      'customer-support': '#20c997'
    };
    return colors[serviceType] || '#6c757d';
  };

  const getServiceIcon = (serviceType) => {
    const icons = {
      'account-sim': '📱',
      'payments-billing': '💰',
      'network-data': '📶',
      'device-support': '🔧',
      'service-plans': '📋',
      'customer-support': '👥'
    };
    return icons[serviceType] || '👤';
  };

  const getServiceName = (serviceType) => {
    const names = {
      'account-sim': 'Account & SIM',
      'payments-billing': 'Payments & Billing',
      'network-data': 'Network & Data',
      'device-support': 'Device Support',
      'service-plans': 'Service Plans',
      'customer-support': 'Customer Support'
    };
    return names[serviceType] || 'General';
  };

  if (!ticket) {
    return (
      <div className="container">
        <div className="card fade-in" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <h2>No Active Ticket</h2>
          <p>Please select a service to get a ticket.</p>
        </div>
      </div>
    );
  }

  const currentPosition = globalQueue.find(t => t.id === ticket.id)?.position;
  const isBeingServed = currentServing === ticket.id;

  return (
    <div className="container">
      <div className="fade-in">
        {/* Current Ticket Card */}
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto 2rem auto', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '1rem' }}>Your Ticket</h1>
          
          <div style={{ 
            background: getServiceColor(ticket.service),
            color: 'white',
            padding: '2rem',
            borderRadius: 'var(--border-radius)',
            marginBottom: '1.5rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
              {getServiceIcon(ticket.service)}
            </div>
            <h2 style={{ fontSize: '3rem', margin: '0', fontWeight: 'bold' }}>
              #{ticket.id}
            </h2>
            <p style={{ fontSize: '1.2rem', margin: '0.5rem 0', opacity: 0.9 }}>
              {getServiceName(ticket.service)}
            </p>
          </div>

          {isBeingServed ? (
            <div style={{ 
              background: 'rgba(40, 167, 69, 0.15)',
              border: '2px solid var(--primary-green)',
              padding: '1.5rem',
              borderRadius: 'var(--border-radius)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
              <h3 style={{ color: 'var(--primary-green)', margin: '0' }}>You're Being Served!</h3>
              <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)' }}>
                Please proceed to the counter
              </p>
            </div>
          ) : (
            <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                  Your Position
                </h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-orange)' }}>
                  {currentPosition || 'N/A'}
                </div>
              </div>
              
              <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                  Estimated Wait
                </h3>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-orange)' }}>
                  {waitTime}
                </div>
              </div>
            </div>
          )}

          <div style={{ 
            padding: '1rem', 
            background: 'rgba(255, 123, 0, 0.1)', 
            borderRadius: 'var(--border-radius)',
            fontSize: '0.9rem'
          }}>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
              📍 <strong>Now Serving:</strong> #{currentServing || '---'}
            </p>
          </div>
        </div>

        {/* Queue Overview */}
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Live Queue</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Currently Waiting: {globalQueue.length} customers
            </h3>
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {globalQueue.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                No customers in queue
              </p>
            ) : (
              globalQueue.map((queueTicket) => (
                <div
                  key={queueTicket.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    background: queueTicket.id === ticket.id 
                      ? 'rgba(255, 123, 0, 0.15)' 
                      : queueTicket.position === 1
                      ? 'rgba(40, 167, 69, 0.1)'
                      : 'rgba(0, 0, 0, 0.03)',
                    border: queueTicket.id === ticket.id 
                      ? '2px solid var(--primary-orange)' 
                      : queueTicket.position === 1
                      ? '2px solid var(--primary-green)'
                      : '1px solid var(--border-color-light)',
                    borderRadius: 'var(--border-radius)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: getServiceColor(queueTicket.service),
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem',
                    marginRight: '1rem'
                  }}>
                    {getServiceIcon(queueTicket.service)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                      #{queueTicket.id}
                      {queueTicket.id === ticket.id && (
                        <span style={{ 
                          background: 'var(--primary-orange)', 
                          color: 'white',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          marginLeft: '0.5rem'
                        }}>
                          YOU
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      {getServiceName(queueTicket.service)} • Position: {queueTicket.position} • Wait: ~{queueTicket.waitTime} min
                    </div>
                  </div>
                  
                  {queueTicket.position === 1 && (
                    <div style={{ 
                      background: 'var(--primary-green)', 
                      color: 'white',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      NEXT
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;