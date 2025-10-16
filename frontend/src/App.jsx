import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import RoleSelection from './components/RoleSelection';
import ServiceSelection from './components/ServiceSelection';
import CustomerDashboard from './components/CustomerDashboard';
import StaffDashboard from './components/StaffDashboard';
import { useApp } from './context/AppContext';
import './App.css';

function AppContent() {
  const { userRole, setUserRole, addToQueue } = useApp();
  const [currentView, setCurrentView] = useState('role-selection');
  const [selectedService, setSelectedService] = useState(null);
  const [customerTicket, setCustomerTicket] = useState(null);

  const handleRoleSelect = (role) => {
    console.log(`Role selected in App: ${role}`);
    setUserRole(role);
    if (role === 'customer') {
      setCurrentView('service-selection');
    } else {
      setCurrentView(`${role}-dashboard`);
    }
  };

  const handleServiceSelect = (service) => {
    console.log(`Service selected: ${service}`);
    setSelectedService(service);
    setCurrentView('customer-dashboard');
    
    // Generate a ticket and add to global queue
    const newTicket = {
      id: Math.floor(Math.random() * 1000) + 1,
      service: service.id,
      timestamp: new Date().toLocaleTimeString(),
      status: 'waiting'
    };
    
    const ticketWithPosition = addToQueue(newTicket);
    setCustomerTicket(ticketWithPosition);
  };

  const handleBackToRoleSelection = () => {
    setCurrentView('role-selection');
    setUserRole(null);
    setSelectedService(null);
    setCustomerTicket(null);
  };

  const handleBackToServiceSelection = () => {
    setCurrentView('service-selection');
    setSelectedService(null);
    setCustomerTicket(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'customer-dashboard':
        return (
          <div>
            <button 
              onClick={handleBackToServiceSelection}
              className="btn btn-primary back-button"
            >
              ← Back to Services
            </button>
            <CustomerDashboard 
              ticket={customerTicket}
              selectedService={selectedService}
            />
          </div>
        );
      case 'service-selection':
        return (
          <div>
            <button 
              onClick={handleBackToRoleSelection}
              className="btn btn-primary back-button"
            >
              ← Back to Role Selection
            </button>
            <ServiceSelection onServiceSelect={handleServiceSelect} />
          </div>
        );
      case 'staff-dashboard':
        return (
          <div>
            <button 
              onClick={handleBackToRoleSelection}
              className="btn btn-primary back-button"
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