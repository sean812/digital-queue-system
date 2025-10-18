import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const QueueStatus = ({ ticket, onBack }) => {
  const { globalQueue, currentServing } = useApp();
  const [myTicket, setMyTicket] = useState(ticket);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (myTicket) {
      const waitingTickets = globalQueue.filter(t => t.status === 'waiting');
      const pos = waitingTickets.findIndex(t => t.id === myTicket.id);
      setPosition(pos >= 0 ? pos + 1 : null);
    }
  }, [globalQueue, myTicket]);

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
    return names[serviceType] || serviceType;
  };

  const waitingTickets = globalQueue.filter(t => t.status === 'waiting').sort((a, b) => a.id - b.id);
  const isMyTurn = myTicket && position === 1;
  const ticketServed = myTicket && !waitingTickets.find(t => t.id === myTicket.id) && myTicket.status !== 'waiting';

  return (
    <div className="container">
      <div className="card fade-in" style={{ maxWidth: '900px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="main-title">Queue Status</h1>
          <p className="subtitle">Track your position and see the current queue</p>
        </div>

        {/* My Ticket Status */}
        {myTicket && (
          <div style={{
            padding: '1.5rem',
            background: isMyTurn ? 'linear-gradient(135deg, #28a745, #20c997)' :
                       ticketServed ? 'linear-gradient(135deg, #6c757d, #5a6268)' :
                       'linear-gradient(135deg, #007bff, #0056b3)',
            borderRadius: 'var(--border-radius)',
            color: 'white',
            marginBottom: '2rem',
            boxShadow: isMyTurn ? '0 8px 24px rgba(40, 167, 69, 0.3)' : 'var(--shadow)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>
                  {isMyTurn ? '🎉 Your Turn!' : ticketServed ? '✅ Served' : '🎫 Your Ticket'}
                </h2>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '1.1rem' }}>
                  Ticket #{myTicket.id} • {getServiceIcon(myTicket.service)} {getServiceName(myTicket.service)}
                </p>
                {myTicket.name && (
                  <p style={{ margin: '0.25rem 0 0 0', opacity: 0.8 }}>
                    Name: {myTicket.name}
                  </p>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                {!ticketServed && position !== null && (
                  <>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: 1 }}>
                      {position}
                    </div>
                    <div style={{ opacity: 0.9 }}>Position in Queue</div>
                  </>
                )}
                {ticketServed && (
                  <div style={{ fontSize: '2rem' }}>
                    Thank you!
                  </div>
                )}
              </div>
            </div>
            
            {isMyTurn && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 'var(--border-radius)',
                fontSize: '1.1rem',
                textAlign: 'center',
                fontWeight: '600'
              }}>
                Please proceed to the counter now!
              </div>
            )}
          </div>
        )}

        {/* Queue Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
              {waitingTickets.length}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Waiting</div>
          </div>
          
          {currentServing && (
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔔</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
                #{currentServing}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Now Serving</div>
            </div>
          )}
          
          {myTicket && position && (
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⏱️</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fd7e14' }}>
                {Math.max(1, (position - 1) * 3)} min
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Est. Wait</div>
            </div>
          )}
        </div>

        {/* Queue List */}
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Current Queue</h3>
          {waitingTickets.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
              <p style={{ margin: 0, fontSize: '1.1rem' }}>No one in queue</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto' }}>
              {waitingTickets.map((t, index) => {
                const isMyTicket = myTicket && t.id === myTicket.id;
                return (
                  <div
                    key={t.id}
                    className="card"
                    style={{
                      padding: '1rem',
                      background: isMyTicket ? 'linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 86, 179, 0.1))' : 'var(--card-bg)',
                      border: isMyTicket ? '2px solid #007bff' : '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: isMyTicket ? '#007bff' : 'var(--border-color)',
                        color: isMyTicket ? 'white' : 'var(--text-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                          Ticket #{t.id}
                          {isMyTicket && <span style={{ marginLeft: '0.5rem', color: '#007bff' }}>← You</span>}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {getServiceIcon(t.service)} {getServiceName(t.service)}
                          {t.name && ` • ${t.name}`}
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      padding: '0.5rem 1rem', 
                      background: `${getServiceColor(t.service)}20`,
                      color: getServiceColor(t.service),
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {index === 0 ? 'Next' : `${index * 3} min`}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '2rem' }}
          onClick={onBack}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default QueueStatus;
