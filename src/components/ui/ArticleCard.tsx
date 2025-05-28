import React from 'react';
import { Article } from '../../types';
import { Bookmark, Clock } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { getTimeAgo } from '../../services/newsService';
import { useAuth } from '../../contexts/AuthContext';

interface ArticleCardProps {
  article: Article;
  isCompact?: boolean;
  onClick?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  isCompact = false,
  onClick
}) => {
  const { isAuthenticated } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isSaved = isFavorite(article.id);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      removeFavorite(article.id);
    } else {
      addFavorite(article);
    }
  };

  if (isCompact) {
    return (
      <div 
        className="group flex border-b border-gray-200 py-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={onClick}
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <span className="font-medium text-blue-600">{article.source.name}</span>
            <span className="mx-2">•</span>
            <span>{getTimeAgo(article.publishedAt)}</span>
          </div>
          <h3 className="font-serif font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-200">
            {article.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <div className="flex items-center mr-3">
              <Clock size={12} className="mr-1" />
              <span>{article.readingTimeMinutes} min read</span>
            </div>
            <span className="px-2 py-1 bg-gray-100 rounded-full capitalize">{article.category}</span>
          </div>
        </div>
        {isAuthenticated && (
          <button 
            onClick={handleSaveClick}
            className={`self-start p-2 rounded-full transition-colors duration-200 ${
              isSaved ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
          >
            <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className="text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded capitalize">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span className="font-medium text-blue-600">{article.source.name}</span>
          <span className="mx-2">•</span>
          <span>{getTimeAgo(article.publishedAt)}</span>
        </div>
        <h3 className="font-serif font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-700 transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>{article.readingTimeMinutes} min read</span>
          </div>
          {isAuthenticated && (
            <button 
              onClick={handleSaveClick}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isSaved ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
            >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;