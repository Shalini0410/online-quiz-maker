import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = userService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const loggedInUser = userService.login(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      totalQuizzes: 0,
      totalScore: 0,
      bestScore: 0,
      attempts: []
    };
    userService.saveUser(newUser);
    return login(userData.email, userData.password);
  };

  const logout = () => {
    userService.logout();
    setUser(null);
  };

  const updateStats = (score, total) => {
    if (user) {
      userService.updateStats(user.id, score, total);
      setUser(userService.getCurrentUser());
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateStats, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
