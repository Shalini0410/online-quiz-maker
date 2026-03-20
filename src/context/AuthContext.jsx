import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('quiz_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('quiz_user', JSON.stringify(userData));
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('quiz_user', JSON.stringify(userData));
    // In a real app, we'd add to a users list in local storage
    const users = JSON.parse(localStorage.getItem('quiz_users') || '[]');
    users.push(userData);
    localStorage.setItem('quiz_users', JSON.stringify(users));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quiz_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
