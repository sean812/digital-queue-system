import React from 'react';
import { useApp } from '../context/AppContext';

const RoleSelection = ({ onRoleSelect }) => {
  const { darkMode, toggleDarkMode } = useApp();

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌙'}
      </button>
      
      <div className="card fade-in" style={{ maxWidth: '800px', margin: '2rem auto' }}>
        {/* Main Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 className="main-title">QueueFlow</h1>
          <p className="subtitle">
            Digital Queue Management System
          </p>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome! Who are you?</h2>
          <p className="welcome-subtitle">
            Please select an option to continue
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {/* Customer Card */}
          <div 
            className="card role-card customer"
            onClick={() => onRoleSelect('customer')}
          >
            <div className="role-icon">👤</div>
            <h3 className="role-title" style={{ color: 'var(--primary-orange)' }}>
              New Customer
            </h3>
            <p className="role-description">
              Get a digital ticket and join the queue for service.
            </p>
            <button 
              className="btn btn-primary" 
              onClick={(e) => {
                e.stopPropagation();
                onRoleSelect('customer');
              }}
            >
              Get Ticket
            </button>
          </div>

          {/* Check Status Card */}
          <div 
            className="card role-card"
            onClick={() => onRoleSelect('check-status')}
            style={{ borderTop: '4px solid #007bff' }}
          >
            <div className="role-icon">🔍</div>
            <h3 className="role-title" style={{ color: '#007bff' }}>
              Check Status
            </h3>
            <p className="role-description">
              Track your ticket and see your position in the queue.
            </p>
            <button 
              className="btn btn-primary" 
              onClick={(e) => {
                e.stopPropagation();
                onRoleSelect('check-status');
              }}
              style={{ background: '#007bff' }}
            >
              Track Ticket
            </button>
          </div>

          {/* Staff Card */}
          <div 
            className="card role-card staff"
            onClick={() => onRoleSelect('staff')}
          >
            <div className="role-icon">👨‍💼</div>
            <h3 className="role-title" style={{ color: 'var(--primary-green)' }}>
              Staff Member
            </h3>
            <p className="role-description">
              Manage customer queues and serve customers efficiently.
            </p>
            <button 
              className="btn btn-primary" 
              onClick={(e) => {
                e.stopPropagation();
                onRoleSelect('staff');
              }}
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