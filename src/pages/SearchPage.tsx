import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/ui/SearchBar';
import ArticleList from '../components/ui/ArticleList';
import ArticleModal from '../components/ui/ArticleModal';
import { searchArticles } from '../services/newsService';
import { Article } from '../types';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const query = searchParams.get('q') || '';
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setArticles([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const results = await searchArticles(query);
        setArticles(results);
      } catch (error) {
        console.error('Error searching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
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
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="font-serif font-bold text-3xl text-gray-900 mb-6">Search News</h1>
        <SearchBar onSearch={handleSearch} initialQuery={query} />
      </div>
      
      {query && (
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            {isLoading ? 'Searching...' : `Search results for "${query}"`}
          </h2>
          {!isLoading && articles.length > 0 && (
            <p className="text-gray-600">{articles.length} articles found</p>
          )}
        </div>
      )}
      
      <ArticleList 
        articles={articles} 
        isLoading={isLoading} 
        layout="list"
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

export default SearchPage;