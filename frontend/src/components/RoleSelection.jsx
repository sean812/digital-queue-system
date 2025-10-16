import React from 'react';
import { useApp } from '../context/AppContext';

const RoleSelection = ({ onRoleSelect }) => {
  const { darkMode, toggleDarkMode } = useApp();

  const handleRoleSelect = (role) => {
    console.log(`Selected role: ${role}`);
    onRoleSelect(role);
  };

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </button>
      
      <div className="card fade-in" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>QueueFlow</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)' }}>
            Digital Queue Management System
          </p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>Welcome! Who are you?</h2>
          <p style={{ color: 'var(--text-dark)', opacity: 0.8, marginBottom: '0' }}>
            Please select your role to continue
          </p>
        </div>

        <div className="grid grid-2">
          <div 
            className="card role-card customer"
            onClick={() => handleRoleSelect('customer')}
          >
            <div className="role-icon">👤</div>
            <h3 style={{ color: 'var(--primary-orange)' }}>Customer</h3>
            <p style={{ fontSize: '0.95rem' }}>
              Get a ticket and track your position in queue
            </p>
            <button 
              className="btn btn-primary" 
              style={{ marginTop: '1rem' }}
              onClick={() => handleRoleSelect('customer')}
            >
              Enter as Customer
            </button>
          </div>

          <div 
            className="card role-card staff"
            onClick={() => handleRoleSelect('staff')}
          >
            <div className="role-icon">👨‍💼</div>
            <h3 style={{ color: 'var(--primary-green)' }}>Staff Member</h3>
            <p style={{ fontSize: '0.95rem' }}>
              Manage queue and serve customers efficiently
            </p>
            <button 
              className="btn btn-primary" 
              style={{ marginTop: '1rem' }}
              onClick={() => handleRoleSelect('staff')}
            >
              Enter as Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;