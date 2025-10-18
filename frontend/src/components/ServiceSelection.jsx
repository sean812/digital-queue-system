import React from 'react';
import { useApp } from '../context/AppContext';

const ServiceSelection = ({ onServiceSelect }) => {
  const { darkMode, toggleDarkMode } = useApp();

  const services = [
    {
      id: 'account-sim',
      name: 'Account & SIM Services',
      description: 'SIM activation, account management, number transfers, and profile updates',
      icon: '📱',
      color: '#007bff',
      waitTime: '5-8 min'
    },
    {
      id: 'payments-billing',
      name: 'Payments & Billing',
      description: 'Bill payments, payment plans, billing inquiries, and transaction history',
      icon: '💰',
      color: '#28a745',
      waitTime: '3-5 min'
    },
    {
      id: 'network-data',
      name: 'Network & Data Issues',
      description: 'Connection problems, data speed issues, network coverage, and signal problems',
      icon: '📶',
      color: '#6f42c1',
      waitTime: '10-15 min'
    },
    {
      id: 'device-support',
      name: 'Device Support',
      description: 'Phone setup, device troubleshooting, compatibility issues, and technical support',
      icon: '🔧',
      color: '#fd7e14',
      waitTime: '12-18 min'
    },
    {
      id: 'service-plans',
      name: 'Service Plans & Offers',
      description: 'Plan upgrades, new offers, package changes, and promotional deals',
      icon: '📋',
      color: '#e83e8c',
      waitTime: '8-12 min'
    },
    {
      id: 'customer-support',
      name: 'Customer Support',
      description: 'General inquiries, complaints, feedback, and additional assistance',
      icon: '👥',
      color: '#20c997',
      waitTime: '15-20 min'
    }
  ];

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </button>
      
      <div className="card fade-in" style={{ maxWidth: '1000px', margin: '2rem auto', height:'90vh', overflowY: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="main-title">Select Service Type</h1>
          <p className="subtitle">
            Choose the category that best matches your needs
          </p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {services.map((service) => (
            <div
              key={service.id}
              className="card role-card"
              onClick={() => onServiceSelect(service)}
              style={{ 
                cursor: 'pointer',
                borderTop: `4px solid ${service.color}`,
                textAlign: 'center',
                padding: '2rem 1.5rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div 
                className="role-icon"
                style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
              >
                {service.icon}
              </div>
              
              <h3 style={{ color: service.color, marginBottom: '0.5rem', fontSize: '1.3rem' }}>
                {service.name}
              </h3>
              
              <div 
                style={{ 
                  background: `${service.color}15`,
                  color: service.color,
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  display: 'inline-block'
                }}
              >
                ⏱️ {service.waitTime}
              </div>
              
              <p className="role-description" style={{ marginBottom: '1.5rem', flex: 1 }}>
                {service.description}
              </p>
              
              <button 
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onServiceSelect(service);
                }}
                style={{ 
                  background: service.color,
                  width: '100%',
                  marginTop: 'auto'
                }}
              >
                Select Service
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', background: 'rgba(255, 123, 0, 0.1)', borderRadius: 'var(--border-radius)' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            💡 <strong>Tip:</strong> Payments & Billing typically has the shortest wait times
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;