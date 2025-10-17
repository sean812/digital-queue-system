import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const StaffDashboard = () => {
  const { 
    globalQueue, 
    currentServing, 
    servedTickets, 
    serveNextCustomer, 
    callTicket, 
    skipTicket, 
    removeTicket, 
    clearServedHistory,
    getWaitDuration 
  } = useApp();

  const [activeTab, setActiveTab] = useState('queue');

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

  const getStatusColor = (status) => {
    const colors = {
      'completed': '#28a745',
      'called': '#17a2b8',
      'skipped': '#ffc107',
      'removed': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const getStatusText = (status) => {
    const texts = {
      'completed': 'Served',
      'called': 'Called',
      'skipped': 'Skipped',
      'removed': 'Removed'
    };
    return texts[status] || 'Unknown';
  };

  return (
    <div className="container">
      <div className="fade-in">
        {/* Header Stats */}
        <div className="card" style={{ maxWidth: '1000px', margin: '0 auto 2rem auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Staff Dashboard</h1>
          
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
              <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Now Serving</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-orange)' }}>
                #{currentServing || '---'}
              </div>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
              <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>In Queue</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-green)' }}>
                {globalQueue.length}
              </div>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.8rem' }}>customers</p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
              <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Served Today</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-blue)' }}>
                {servedTickets.length}
              </div>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.8rem' }}>tickets</p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
              <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Avg Wait Time</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-purple)' }}>
                {globalQueue.length > 0 ? Math.round(globalQueue.reduce((acc, t) => acc + t.waitTime, 0) / globalQueue.length) : 0}m
              </div>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.8rem' }}>average</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary" 
              onClick={async () => {
                try {
                  await serveNextCustomer();
                } catch (err) {
                  console.error('Failed to serve next:', err);
                }
              }}
              disabled={globalQueue.length === 0}
              style={{ minWidth: '160px' }}
            >
              Serve Next Customer
            </button>
            
            {servedTickets.length > 0 && (
              <button 
                className="btn" 
                onClick={clearServedHistory}
                style={{ 
                  background: '#6c757d',
                  color: 'white',
                  minWidth: '140px'
                }}
              >
                Clear History
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="card" style={{ maxWidth: '1000px', margin: '0 auto 1rem auto', padding: '0' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color-light)' }}>
            <button
              className={`tab-button ${activeTab === 'queue' ? 'active' : ''}`}
              onClick={() => setActiveTab('queue')}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: activeTab === 'queue' ? 'var(--primary-orange)' : 'transparent',
                color: activeTab === 'queue' ? 'white' : 'var(--text-dark)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Current Queue ({globalQueue.length})
            </button>
            <button
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
              style={{
                flex: 1,
                padding: '1rem',
                border: 'none',
                background: activeTab === 'history' ? 'var(--primary-orange)' : 'transparent',
                color: activeTab === 'history' ? 'white' : 'var(--text-dark)',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Served History ({servedTickets.length})
            </button>
          </div>
        </div>

        {/* Current Queue Tab */}
        {activeTab === 'queue' && (
          <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Current Queue</h2>
            
            {globalQueue.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                <h3>No Customers in Queue</h3>
                <p>Waiting for customers to generate tickets...</p>
              </div>
            ) : (
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {globalQueue.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1.25rem',
                      marginBottom: '0.75rem',
                      background: index === 0 ? 'rgba(255, 123, 0, 0.15)' : 'rgba(0, 0, 0, 0.03)',
                      border: index === 0 ? '2px solid var(--primary-orange)' : '1px solid var(--border-color-light)',
                      borderRadius: 'var(--border-radius)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '50%', 
                      background: getServiceColor(ticket.service),
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.5rem',
                      marginRight: '1.5rem',
                      flexShrink: 0
                    }}>
                      {getServiceIcon(ticket.service)}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: '700', fontSize: '1.3rem', marginRight: '1rem' }}>
                          #{ticket.id}
                        </div>
                        <div style={{ 
                          background: getServiceColor(ticket.service),
                          color: 'white',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {getServiceName(ticket.service)}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <div>
                          <strong>Position:</strong> {ticket.position}
                        </div>
                        <div>
                          <strong>Wait Time:</strong> {getWaitDuration(ticket.joinTime)}
                        </div>
                        <div>
                          <strong>Est. Time:</strong> {ticket.waitTime} min
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      {ticket.position === 1 ? (
                        <div style={{ 
                          background: 'var(--primary-green)', 
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600'
                        }}>
                          NEXT IN LINE
                        </div>
                      ) : (
                        <>
                          <button 
                            className="btn btn-primary"
                            onClick={() => callTicket(ticket.id)}
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                          >
                            Call
                          </button>
                          <button 
                            className="btn"
                            onClick={() => skipTicket(ticket.id)}
                            style={{ 
                              padding: '0.5rem 1rem', 
                              fontSize: '0.9rem',
                              background: '#ffc107',
                              color: 'black'
                            }}
                          >
                            Skip
                          </button>
                          <button 
                            className="btn"
                            onClick={() => removeTicket(ticket.id)}
                            style={{ 
                              padding: '0.5rem 1rem', 
                              fontSize: '0.9rem',
                              background: '#dc3545',
                              color: 'white'
                            }}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Served History Tab */}
        {activeTab === 'history' && (
          <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Served Tickets History</h2>
            
            {servedTickets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                <h3>No History Yet</h3>
                <p>Served tickets will appear here</p>
              </div>
            ) : (
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {servedTickets.map((ticket, index) => (
                  <div
                    key={`${ticket.id}-${index}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem',
                      marginBottom: '0.5rem',
                      background: 'rgba(0, 0, 0, 0.02)',
                      border: `2px solid ${getStatusColor(ticket.status)}`,
                      borderRadius: 'var(--border-radius)',
                      opacity: 0.9
                    }}
                  >
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: getServiceColor(ticket.service),
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.2rem',
                      marginRight: '1rem',
                      flexShrink: 0
                    }}>
                      {getServiceIcon(ticket.service)}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem', marginRight: '1rem' }}>
                          #{ticket.id}
                        </div>
                        <div style={{ 
                          background: getStatusColor(ticket.status),
                          color: 'white',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {getStatusText(ticket.status)}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <div>
                          <strong>Service:</strong> {getServiceName(ticket.service)}
                        </div>
                        <div>
                          <strong>Served:</strong> {ticket.servedAt ? new Date(ticket.servedAt).toLocaleTimeString() : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;