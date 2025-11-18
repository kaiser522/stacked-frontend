import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('__login_user_token__') || localStorage.getItem('token');
    const userData = localStorage.getItem('__user__') || localStorage.getItem('user');

    try {
      const parsed = userData ? JSON.parse(userData) : null;
      if (token && parsed) {
        setUser(parsed);
      }
    } catch (err) {
      console.error('Failed to parse stored user data', err);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    // Persist under both key variants to remain compatible with code that
    // reads from either `token`/`user` or `__login_user_token__`/`__user__`.
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('__login_user_token__', token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('__user__', JSON.stringify(userData));
    } catch (err) {
      console.error('Failed to save user to localStorage', err);
    }
    setUser(userData);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');

      // Call backend logout endpoint
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Logout request failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear both variants of the keys to avoid stale references.
      localStorage.removeItem('token');
      localStorage.removeItem('__login_user_token__');
      localStorage.removeItem('user');
      localStorage.removeItem('__user__');
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};