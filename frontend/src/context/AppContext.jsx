import React, { createContext, useContext, useState, useEffect } from "react";
import io from 'socket.io-client';

const API_BASE = 'http://localhost:4000/api';
const SOCKET_URL = 'http://localhost:4000';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [globalQueue, setGlobalQueue] = useState([]);
  const [currentServing, setCurrentServing] = useState(null);
  const [servedTickets, setServedTickets] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
      document.body.setAttribute("data-theme", JSON.parse(savedDarkMode) ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    // Load initial tickets
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${API_BASE}/tickets`);
        const tickets = await res.json();
        setGlobalQueue(tickets.filter(t => t.status === 'waiting'));
        setServedTickets(tickets.filter(t => t.status === 'served'));
      } catch (err) {
        console.error('Failed to fetch tickets:', err);
      }
    };

    fetchTickets();

    // Connect to socket
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Listen for real-time updates
    newSocket.on('ticket:created', (ticket) => {
      setGlobalQueue(prev => [...prev, ticket]);
    });

    newSocket.on('ticket:served', (served) => {
      setCurrentServing(served.id);
      setGlobalQueue(prev => prev.filter(t => t.id !== served.id));
      setServedTickets(prev => [served, ...prev]);
    });

    return () => newSocket.close();
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    document.body.setAttribute("data-theme", newDarkMode ? "dark" : "light");
  };

  // Add a ticket to the global queue via backend
  const addToQueue = async (ticketData) => {
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
      });
      const ticket = await res.json();
      // Socket will handle adding to queue
      return ticket;
    } catch (err) {
      console.error('Failed to create ticket:', err);
      throw err;
    }
  };

  // Staff serves next customer via backend
  const serveNextCustomer = async (counter = '1') => {
    try {
      const res = await fetch(`${API_BASE}/queue/serve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ counter })
      });
      if (res.status === 404) {
        alert('No waiting tickets');
        return null;
      }
      const served = await res.json();
      // Socket will handle updates
      return served;
    } catch (err) {
      console.error('Failed to serve next:', err);
      throw err;
    }
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