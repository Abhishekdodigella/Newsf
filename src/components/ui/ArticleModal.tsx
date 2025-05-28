import React, { useEffect, useRef } from 'react';
import { X, Clock, Bookmark, ExternalLink } from 'lucide-react';
import { Article } from '../../types';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useAuth } from '../../contexts/AuthContext';
import { getTimeAgo } from '../../services/newsService';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  isOpen: boolean;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, isOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isSaved = isFavorite(article.id);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveClick = () => {
    if (isSaved) {
      removeFavorite(article.id);
    } else {
      addFavorite(article);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl flex flex-col animate-fadeIn"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded capitalize">
              {article.category}
            </span>
            <span className="text-xs text-gray-500">
              {getTimeAgo(article.publishedAt)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <button 
                onClick={handleSaveClick}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isSaved ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400 hover:text-gray-600'
                }`}
                aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
              >
                <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
              </button>
            )}
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Open in new tab"
            >
              <ExternalLink size={18} />
            </a>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        {/* Image */}
        <div className="h-64 sm:h-80 relative">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-4">
            <span className="text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded">
              {article.source.name}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-gray-900 mb-4">
            {article.title}
          </h2>
          
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <Clock size={16} className="mr-1" />
            <span>{article.readingTimeMinutes} min read</span>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg mb-4">{article.description}</p>
            <div className="text-gray-700 leading-relaxed">
              {article.content}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Source: <a href={article.source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{article.source.name}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;