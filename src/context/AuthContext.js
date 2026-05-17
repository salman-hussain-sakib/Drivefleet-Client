'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Enforce credentials transport globally for cross-origin session cookies
axios.defaults.withCredentials = true;
export const API_URL = 'https://drivefleet-server.vercel.app/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light'); // Default to light theme

  // Fetch current profile on mount (reloads protection)
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(`${API_URL}/auth/me`);
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.log('No active session found.');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  // Sync and persist theme (default light, adaptive system dark mode)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const root = window.document.documentElement;

    const applyTheme = (themeName) => {
      setTheme(themeName);
      if (themeName === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // Adaptive system dark mode: auto-detect user's device/PC/mobile theme
      const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(systemPrefersDark ? 'dark' : 'light');
    }

    // Dynamic real-time system/device theme change listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    const root = window.document.documentElement;
    if (nextTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    toast.success(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`, {
      style: {
        background: nextTheme === 'dark' ? '#111827' : '#ffffff',
        color: nextTheme === 'dark' ? '#f1f5f9' : '#0f172a',
        border: nextTheme === 'dark' ? '1px solid #1f2937' : '1px solid #e2e8f0',
      }
    });
  };

  const register = async (name, email, photoURL, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { name, email, photoURL, password });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
      }
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const googleLogin = async (name, email, photoURL) => {
    try {
      const res = await axios.post(`${API_URL}/auth/google-login`, { name, email, photoURL });
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
      }
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Google Sign-In failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
      setUser(null);
      toast.success('Logged out successfully');
    } catch (err) {
      console.error('Logout error', err);
      toast.error('Logout failed');
    }
  };

  const updateProfile = async (name, email, photoURL, dateOfBirth, phone) => {
    try {
      const res = await axios.put(`${API_URL}/auth/update-profile`, { name, email, photoURL, dateOfBirth, phone });
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
      }
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Profile update failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, theme, toggleTheme, register, login, googleLogin, logout, updateProfile, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
