import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import RoleSelection from './components/RoleSelection';
import ServiceSelection from './components/ServiceSelection';
import NameEntry from './components/NameEntry';
import PhoneEntry from './components/PhoneEntry';
import CustomerDashboard from './components/CustomerDashboard';
import StaffDashboard from './components/StaffDashboard';
import TicketLookup from './components/TicketLookup';
import QueueStatus from './components/QueueStatus';
import { useApp } from './context/AppContext';
import './App.css';

function AppContent() {
  const { userRole, setUserRole } = useApp();
  const [currentView, setCurrentView] = useState('role-selection');
  const [selectedService, setSelectedService] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [customerTicket, setCustomerTicket] = useState(null);

  const handleRoleSelect = (role) => {
    console.log(`Role selected in App: ${role}`);
    setUserRole(role);
    if (role === 'customer') {
      setCurrentView('service-selection');
    } else if (role === 'check-status') {
      setCurrentView('ticket-lookup');
    } else {
      setCurrentView(`${role}-dashboard`);
    }
  };

  const handleServiceSelect = (service) => {
    console.log(`Service selected: ${service}`);
    setSelectedService(service);
    setCurrentView('name-entry');
  };

  const handleNameSubmit = (name) => {
    setCustomerName(name);
    setCurrentView('phone-entry');
  };

  const handlePhoneSubmit = (ticket) => {
    setCustomerTicket(ticket);
    setCurrentView('customer-dashboard');
  };

  const handleBackToRoleSelection = () => {
    setCurrentView('role-selection');
    setUserRole(null);
    setSelectedService(null);
    setCustomerName(null);
    setCustomerTicket(null);
  };

  const handleBackToServiceSelection = () => {
    setCurrentView('service-selection');
    setSelectedService(null);
    setCustomerName(null);
    setCustomerTicket(null);
  };

  const handleBackToNameEntry = () => {
    setCurrentView('name-entry');
    setCustomerName(null);
    setCustomerTicket(null);
  };

  const handleTicketFound = (ticket) => {
    setCustomerTicket(ticket);
    setCurrentView('queue-status');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'queue-status':
        return (
          <div>
            <button 
              onClick={handleBackToRoleSelection}
              className="btn btn-primary back-button"
            >
              ← Back to Home
            </button>
            <QueueStatus 
              ticket={customerTicket}
              onBack={handleBackToRoleSelection}
            />
          </div>
        );
      case 'ticket-lookup':
        return (
          <div>
            <button 
              onClick={handleBackToRoleSelection}
              className="btn btn-primary back-button"
            >
              ← Back to Home
            </button>
            <TicketLookup 
              onTicketFound={handleTicketFound}
              onBack={handleBackToRoleSelection}
            />
          </div>
        );
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
      case 'phone-entry':
        return (
          <div>
            <button 
              onClick={handleBackToNameEntry}
              className="btn btn-primary back-button"
            >
              ← Back
            </button>
            <PhoneEntry 
              selectedService={selectedService}
              customerName={customerName}
              onPhoneSubmit={handlePhoneSubmit}
            />
          </div>
        );
      case 'name-entry':
        return (
          <div>
            <button 
              onClick={handleBackToServiceSelection}
              className="btn btn-primary back-button"
            >
              ← Back to Services
            </button>
            <NameEntry 
              selectedService={selectedService}
              onNameSubmit={handleNameSubmit}
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