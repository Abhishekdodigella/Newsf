import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, UserPreferences } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (preferences: UserPreferences) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    preferences: {
      categories: ['technology', 'science'],
      sources: ['Tech Today', 'Space News'],
      keywords: ['AI', 'innovation'],
    },
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user in mock data
      const user = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = user;
      
      // Save to local storage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setAuthState({
        user: userWithoutPassword as User,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: (error as Error).message,
      });
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        preferences: {
          categories: [],
          sources: [],
          keywords: [],
        },
      };
      
      // Save to local storage
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: (error as Error).message,
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const updatePreferences = (preferences: UserPreferences) => {
    if (!authState.user) return;
    
    const updatedUser: User = {
      ...authState.user,
      preferences,
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setAuthState(prev => ({
      ...prev,
      user: updatedUser,
    }));
  };

  const value = {
    ...authState,
    login,
    signup,
    logout,
    updatePreferences,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};