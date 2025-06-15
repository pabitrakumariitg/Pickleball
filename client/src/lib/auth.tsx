"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from './axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (token: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (data: { name?: string; email?: string; profilePicture?: string }) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('/api/v1/auth/me');
          setUser(response.data.data);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await axios.post('/api/v1/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      // Fetch user data after successful login
      const userResponse = await axios.get('/api/v1/auth/me');
      setUser(userResponse.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      throw err;
    }
  };

  const loginWithGoogle = async (token: string) => {
    try {
      setError(null);
      const response = await axios.post('/api/v1/auth/google', { token });
      const { token: authToken } = response.data;
      localStorage.setItem('token', authToken);
      
      // Fetch user data after successful login
      const userResponse = await axios.get('/api/v1/auth/me');
      setUser(userResponse.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Google login failed');
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      const response = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      // Fetch user data after successful registration
      const userResponse = await axios.get('/api/v1/auth/me');
      setUser(userResponse.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/v1/auth/logout');
      localStorage.removeItem('token');
      setUser(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Logout failed');
      throw err;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      await axios.post('/api/v1/auth/forgotpassword', { email });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send reset instructions');
      throw err;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      setError(null);
      await axios.put(`/api/v1/auth/resetpassword/${token}`, { password });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reset password');
      throw err;
    }
  };

  const updateProfile = async (data: { name?: string; email?: string; profilePicture?: string }) => {
    try {
      setError(null);
      const response = await axios.put('/api/v1/auth/updatedetails', data);
      setUser(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Profile update failed');
      throw err;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setError(null);
      await axios.put('/api/v1/auth/updatepassword', {
        currentPassword,
        newPassword
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Password update failed');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        loginWithGoogle,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        updatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 