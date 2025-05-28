import React, { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import ArticleList from '../components/ui/ArticleList';
import ArticleModal from '../components/ui/ArticleModal';
import { Article } from '../types';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  const { favorites, isLoading } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-serif font-bold text-2xl text-gray-900 mb-4">
          Sign in to view your saved articles
        </h2>
        <p className="text-gray-600 mb-8">
          Create an account or sign in to save articles and access them from any device.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/login" 
            className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif font-bold text-3xl text-gray-900 mb-8">Saved Articles</h1>
      
      {!isLoading && favorites.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="font-serif font-bold text-xl text-gray-900 mb-4">
            You haven't saved any articles yet
          </h2>
          <p className="text-gray-600 mb-8">
            Articles you save will appear here for easy access.
          </p>
          <Link 
            to="/" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Articles
          </Link>
        </div>
      ) : (
        <ArticleList 
          articles={favorites} 
          isLoading={isLoading} 
          onArticleClick={handleArticleClick}
        />
      )}
      
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default FavoritesPage;