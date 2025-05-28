import React from 'react';

interface ArticleSkeletonProps {
  isCompact?: boolean;
}

const ArticleSkeleton: React.FC<ArticleSkeletonProps> = ({ isCompact = false }) => {
  if (isCompact) {
    return (
      <div className="py-4 animate-pulse">
        <div className="flex items-center space-x-2 mb-1">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="flex items-center mt-2 space-x-2">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-5 bg-gray-200 rounded-full w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;