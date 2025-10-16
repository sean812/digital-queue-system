import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import RoleSelection from './components/RoleSelection';
import CustomerDashboard from './components/CustomerDashboard';
import StaffDashboard from './components/StaffDashboard';
import { useApp } from './context/AppContext';
import './App.css';

function AppContent() {
  const { userRole, setUserRole } = useApp();
  const [currentView, setCurrentView] = useState('role-selection');

  const handleRoleSelect = (role) => {
    console.log(`Role selected in App: ${role}`);
    setUserRole(role);
    setCurrentView(`${role}-dashboard`);
  };

  const handleBackToRoleSelection = () => {
    setCurrentView('role-selection');
    setUserRole(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'customer-dashboard':
        return (
          <div>
            <button 
              onClick={handleBackToRoleSelection}
              className="btn btn-primary"
              style={{ margin: '20px' }}
            >
              ← Back to Role Selection
            </button>
            <CustomerDashboard />
          </div>
        );
      case 'staff-dashboard':
        return (
          <div>
            <button 
              onClick={handleBackToRoleSelection}
              className="btn btn-primary"
              style={{ margin: '20px' }}
            >
              ← Back to Role Selection
            </button>
            <StaffDashboard />
          </div>
        );
      case 'role-selection':
      default:
        return <RoleSelection onRoleSelect={handleRoleSelect} />;
    }
  };

  return (
    <div>
      {renderCurrentView()}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;