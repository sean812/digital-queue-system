import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [globalQueue, setGlobalQueue] = useState([]);
  const [currentServing, setCurrentServing] = useState(null);
  const [servedTickets, setServedTickets] = useState([]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
      document.body.setAttribute("data-theme", JSON.parse(savedDarkMode) ? "dark" : "light");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    document.body.setAttribute("data-theme", newDarkMode ? "dark" : "light");
  };

  // Add a ticket to the global queue
  const addToQueue = (ticket) => {
    const newPosition = globalQueue.length + 1;
    const newTicket = {
      ...ticket,
      position: newPosition,
      waitTime: newPosition * 2 + Math.floor(Math.random() * 5),
      timestamp: new Date(),
      joinTime: new Date()
    };
    setGlobalQueue(prev => [...prev, newTicket]);
    return newTicket;
  };

  // Staff serves next customer
  const serveNextCustomer = () => {
    if (globalQueue.length > 0) {
      const nextCustomer = globalQueue[0];
      setCurrentServing(nextCustomer.id);
      
      // Remove the served customer and update positions
      const updatedQueue = globalQueue.slice(1).map((ticket, index) => ({
        ...ticket,
        position: index + 1,
        waitTime: Math.max(1, ticket.waitTime - 2)
      }));
      
      setGlobalQueue(updatedQueue);
      
      // Add to served tickets with completion time
      const servedTicket = {
        ...nextCustomer,
        servedAt: new Date(),
        status: 'completed'
      };
      setServedTickets(prev => [servedTicket, ...prev]);
      
      return nextCustomer;
    }
    setCurrentServing(null);
    return null;
  };

  // Call a specific ticket (skip to a particular customer)
  const callTicket = (ticketId) => {
    const ticketIndex = globalQueue.findIndex(t => t.id === ticketId);
    if (ticketIndex !== -1) {
      const calledTicket = globalQueue[ticketIndex];
      setCurrentServing(calledTicket.id);
      
      // Remove the called ticket and reorder queue
      const remainingTickets = globalQueue.filter(t => t.id !== ticketId);
      const updatedQueue = remainingTickets.map((ticket, index) => ({
        ...ticket,
        position: index + 1,
        waitTime: Math.max(1, ticket.waitTime - 2)
      }));
      
      setGlobalQueue(updatedQueue);
      
      // Add to served tickets
      const servedTicket = {
        ...calledTicket,
        servedAt: new Date(),
        status: 'called'
      };
      setServedTickets(prev => [servedTicket, ...prev]);
      
      return calledTicket;
    }
    return null;
  };

  // Skip a ticket (customer didn't show up)
  const skipTicket = (ticketId) => {
    const ticketIndex = globalQueue.findIndex(t => t.id === ticketId);
    if (ticketIndex !== -1) {
      const skippedTicket = globalQueue[ticketIndex];
      
      // Remove the skipped ticket and reorder queue
      const remainingTickets = globalQueue.filter(t => t.id !== ticketId);
      const updatedQueue = remainingTickets.map((ticket, index) => ({
        ...ticket,
        position: index + 1,
        waitTime: Math.max(1, ticket.waitTime - 2)
      }));
      
      setGlobalQueue(updatedQueue);
      
      // Add to served tickets as skipped
      const servedTicket = {
        ...skippedTicket,
        servedAt: new Date(),
        status: 'skipped'
      };
      setServedTickets(prev => [servedTicket, ...prev]);
      
      return skippedTicket;
    }
    return null;
  };

  // Remove a ticket from queue (customer left)
  const removeTicket = (ticketId) => {
    const ticketIndex = globalQueue.findIndex(t => t.id === ticketId);
    if (ticketIndex !== -1) {
      const removedTicket = globalQueue[ticketIndex];
      
      // Remove the ticket and reorder queue
      const remainingTickets = globalQueue.filter(t => t.id !== ticketId);
      const updatedQueue = remainingTickets.map((ticket, index) => ({
        ...ticket,
        position: index + 1,
        waitTime: Math.max(1, ticket.waitTime - 2)
      }));
      
      setGlobalQueue(updatedQueue);
      
      // Add to served tickets as removed
      const servedTicket = {
        ...removedTicket,
        servedAt: new Date(),
        status: 'removed'
      };
      setServedTickets(prev => [servedTicket, ...prev]);
      
      return removedTicket;
    }
    return null;
  };

  // Clear served tickets history
  const clearServedHistory = () => {
    setServedTickets([]);
  };

  // Calculate how long a ticket has been waiting
  const getWaitDuration = (joinTime) => {
    const now = new Date();
    const join = new Date(joinTime);
    const diffMs = now - join;
    const diffMins = Math.floor(diffMs / 60000);
    const diffSecs = Math.floor((diffMs % 60000) / 1000);
    
    if (diffMins > 0) {
      return `${diffMins}m ${diffSecs}s`;
    }
    return `${diffSecs}s`;
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
  };

  const value = {
    user,
    setUser,
    userRole,
    setUserRole,
    darkMode,
    toggleDarkMode,
    language,
    setLanguage,
    handleLogout,
    // Queue management
    globalQueue,
    currentServing,
    servedTickets,
    addToQueue,
    serveNextCustomer,
    callTicket,
    skipTicket,
    removeTicket,
    clearServedHistory,
    getWaitDuration
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};