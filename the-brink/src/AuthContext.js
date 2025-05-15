import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

/**
 * Provides:
 *  - user: { id, role, firstName, email } or null
 *  - login(userObj) – sets user in context + localStorage
 *  - logout() – clears context + localStorage
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On mount, hydrate from localStorage if present
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

