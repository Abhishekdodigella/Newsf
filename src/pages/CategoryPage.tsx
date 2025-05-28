import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleList from '../components/ui/ArticleList';
import ArticleModal from '../components/ui/ArticleModal';
import { getArticlesByCategory } from '../services/newsService';
import { Article } from '../types';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!category) return;
      
      setIsLoading(true);
      try {
        const fetchedArticles = await getArticlesByCategory(category);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching articles by category:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, [category]);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif font-bold text-3xl text-gray-900 mb-8 capitalize">
        {category || 'Category'} News
      </h1>
      
      <ArticleList 
        articles={articles} 
        isLoading={isLoading} 
        onArticleClick={handleArticleClick}
      />
      
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

export default CategoryPage;