export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
  category: string;
  readingTimeMinutes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  categories: string[];
  sources: string[];
  keywords: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface FavoritesState {
  favorites: Article[];
  isLoading: boolean;
  error: string | null;
}