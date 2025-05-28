import React from 'react';
import { Article } from '../../types';
import ArticleCard from './ArticleCard';
import ArticleSkeleton from './ArticleSkeleton';

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  layout?: 'grid' | 'list';
  onArticleClick: (article: Article) => void;
}

const ArticleList: React.FC<ArticleListProps> = ({ 
  articles, 
  isLoading, 
  layout = 'grid',
  onArticleClick
}) => {
  if (isLoading) {
    return (
      <div className={layout === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        {[...Array(6)].map((_, index) => (
          <ArticleSkeleton key={index} isCompact={layout === 'list'} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className="space-y-1 divide-y divide-gray-100">
        {articles.map(article => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            isCompact={true}
            onClick={() => onArticleClick(article)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map(article => (
        <ArticleCard 
          key={article.id} 
          article={article}
          onClick={() => onArticleClick(article)}
        />
      ))}
    </div>
  );
};

export default ArticleList;