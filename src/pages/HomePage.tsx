import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleList from '../components/ui/ArticleList';
import ArticleModal from '../components/ui/ArticleModal';
import CategoryFilter from '../components/ui/CategoryFilter';
import { getTopHeadlines, getRecommendedArticles } from '../services/newsService';
import { Article } from '../types';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [recommendedArticles, setRecommendedArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        let fetchedArticles: Article[];
        
        if (selectedCategory === 'all') {
          fetchedArticles = await getTopHeadlines();
        } else {
          fetchedArticles = await getTopHeadlines(selectedCategory);
        }
        
        setArticles(fetchedArticles);
        
        // Fetch recommended articles if user is authenticated
        if (isAuthenticated && user) {
          const preferences = [
            ...user.preferences.categories,
            ...user.preferences.keywords,
          ];
          
          if (preferences.length > 0) {
            const recommended = await getRecommendedArticles(preferences);
            setRecommendedArticles(recommended);
          }
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, [selectedCategory, isAuthenticated, user]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Your Personalized News Experience
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            AI-powered news curation tailored to your interests. Discover what matters to you.
          </p>
        </div>
      </section>

      {/* Recommended Articles Section (Only for authenticated users) */}
      {isAuthenticated && recommendedArticles.length > 0 && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif font-bold text-2xl text-gray-900">Recommended For You</h2>
            <button 
              onClick={() => navigate('/profile')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Customize
            </button>
          </div>
          <ArticleList 
            articles={recommendedArticles.slice(0, 3)} 
            isLoading={isLoading} 
            onArticleClick={handleArticleClick}
          />
        </section>
      )}

      {/* Categories Filter */}
      <section className="mb-6">
        <h2 className="font-serif font-bold text-2xl text-gray-900 mb-4">Browse News</h2>
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onChange={handleCategoryChange} 
        />
      </section>

      {/* Main Articles List */}
      <section>
        <ArticleList 
          articles={articles} 
          isLoading={isLoading} 
          onArticleClick={handleArticleClick}
        />
      </section>

      {/* Article Modal */}
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

export default HomePage;