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
            Please select your role to continue
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-2">
          {/* Customer Card */}
          <div 
            className="card role-card customer"
            onClick={() => onRoleSelect('customer')}
          >
            <div className="role-icon">👤</div>
            <h3 className="role-title" style={{ color: 'var(--primary-orange)' }}>
              Customer
            </h3>
            <p className="role-description">
              Get a digital ticket and track your real-time position in the queue with live updates and estimated wait times.
            </p>
            <button 
              className="btn btn-primary" 
              onClick={(e) => {
                e.stopPropagation();
                onRoleSelect('customer');
              }}
            >
              Enter as Customer
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
              Manage customer queues efficiently, serve customers in order, and monitor queue statistics in real-time.
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