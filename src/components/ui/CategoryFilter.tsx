import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'technology', name: 'Technology' },
  { id: 'business', name: 'Business' },
  { id: 'science', name: 'Science' },
  { id: 'health', name: 'Health' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'politics', name: 'Politics' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onChange }) => {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;