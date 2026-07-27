import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('retailstore_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const persist = (token, userData) => {
    localStorage.setItem('retailstore_token', token);
    localStorage.setItem('retailstore_user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await loginUser(credentials);
      persist(res.data.token, res.data.user);
      toast.success(res.message || 'Welcome back!');
      return res.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const res = await registerUser(payload);
      persist(res.data.token, res.data.user);
      toast.success('Account created successfully!');
      return res.data.user;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('retailstore_token');
    localStorage.removeItem('retailstore_user');
    setUser(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
