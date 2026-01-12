import React, { createContext, useState, useContext, useEffect } from 'react';

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
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('fynd_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, userType) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('fynd_users') || '[]');
    
    // Find user
    const foundUser = users.find(
      u => u.email === email && u.password === password && u.userType === userType
    );

    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password; // Don't store password in session
      setUser(userData);
      localStorage.setItem('fynd_user', JSON.stringify(userData));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (userData) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('fynd_users') || '[]');
    
    // Check if email exists
    if (users.some(u => u.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }

    // Add new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('fynd_users', JSON.stringify(users));

    // Auto login
    const userSession = { ...newUser };
    delete userSession.password;
    setUser(userSession);
    localStorage.setItem('fynd_user', JSON.stringify(userSession));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fynd_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
    isWorker: user?.userType === 'worker',
    isCustomer: user?.userType === 'customer'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
