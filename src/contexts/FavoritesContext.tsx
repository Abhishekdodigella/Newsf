import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article, FavoritesState } from '../types';
import { useAuth } from './AuthContext';

interface FavoritesContextType extends FavoritesState {
  addFavorite: (article: Article) => void;
  removeFavorite: (articleId: string) => void;
  isFavorite: (articleId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [favoritesState, setFavoritesState] = useState<FavoritesState>({
    favorites: [],
    isLoading: true,
    error: null,
  });

  // Load favorites from localStorage when authenticated user changes
  useEffect(() => {
    if (!isAuthenticated) {
      setFavoritesState({
        favorites: [],
        isLoading: false,
        error: null,
      });
      return;
    }

    try {
      const savedFavorites = localStorage.getItem(`favorites-${user?.id}`);
      if (savedFavorites) {
        setFavoritesState({
          favorites: JSON.parse(savedFavorites),
          isLoading: false,
          error: null,
        });
      } else {
        setFavoritesState({
          favorites: [],
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setFavoritesState({
        favorites: [],
        isLoading: false,
        error: 'Error loading favorites',
      });
    }
  }, [user, isAuthenticated]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`favorites-${user.id}`, JSON.stringify(favoritesState.favorites));
    }
  }, [favoritesState.favorites, user, isAuthenticated]);

  const addFavorite = (article: Article) => {
    if (!isAuthenticated) return;
    
    setFavoritesState(prev => {
      // Check if already in favorites
      if (prev.favorites.some(fav => fav.id === article.id)) {
        return prev;
      }
      
      return {
        ...prev,
        favorites: [...prev.favorites, article],
      };
    });
  };

  const removeFavorite = (articleId: string) => {
    if (!isAuthenticated) return;
    
    setFavoritesState(prev => ({
      ...prev,
      favorites: prev.favorites.filter(article => article.id !== articleId),
    }));
  };

  const isFavorite = (articleId: string): boolean => {
    return favoritesState.favorites.some(article => article.id === articleId);
  };

  const value = {
    ...favoritesState,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};