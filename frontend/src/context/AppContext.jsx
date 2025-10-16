import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

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
    handleLogout
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