import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import CategoryPage from './pages/CategoryPage';
import { LoginPage, SignupPage } from './pages/AuthPages';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/categories" element={<Navigate to="/category/technology\" replace />} />
              <Route path="*" element={<Navigate to="/\" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;