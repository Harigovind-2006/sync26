'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if session exists in storage
    const storedUser = localStorage.getItem('lr_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Mock login verification
    const mockUser: User = {
      name: 'Anna Dvorakova',
      email: email,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
      createdAt: 'August 1, 2026',
    };
    localStorage.setItem('lr_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
    return true;
  };

  const signup = async (name: string, email: string, pass: string): Promise<boolean> => {
    // Mock signup registration
    const mockUser: User = {
      name: name,
      email: email,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
      createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    // Save in storage so login works afterwards
    localStorage.setItem('lr_signup_credentials', JSON.stringify({ name, email, pass }));
    return true;
  };

  const logout = () => {
    localStorage.removeItem('lr_user');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      login: async () => false,
      signup: async () => false,
      logout: () => {},
    };
  }
  return context;
}
