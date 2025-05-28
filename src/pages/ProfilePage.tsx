import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserPreferences } from '../types';
import { useNavigate } from 'react-router-dom';
import { X, Plus } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, updatePreferences } = useAuth();
  const navigate = useNavigate();
  
  const [preferences, setPreferences] = useState<UserPreferences>(
    user?.preferences || { categories: [], sources: [], keywords: [] }
  );
  const [newKeyword, setNewKeyword] = useState('');
  const [newSource, setNewSource] = useState('');
  
  const availableCategories = [
    'technology', 'business', 'science', 'health', 'entertainment', 'politics', 'sports'
  ];

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleCategoryToggle = (category: string) => {
    setPreferences(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories };
    });
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !preferences.keywords.includes(newKeyword.trim())) {
      setPreferences(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setPreferences(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword),
    }));
  };

  const addSource = () => {
    if (newSource.trim() && !preferences.sources.includes(newSource.trim())) {
      setPreferences(prev => ({
        ...prev,
        sources: [...prev.sources, newSource.trim()],
      }));
      setNewSource('');
    }
  };

  const removeSource = (source: string) => {
    setPreferences(prev => ({
      ...prev,
      sources: prev.sources.filter(s => s !== source),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(preferences);
    alert('Preferences updated successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="font-serif font-bold text-3xl text-gray-900 mb-6">Profile Settings</h1>
        
        <div className="mb-8">
          <div className="flex items-center">
            <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-medium">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">News Preferences</h3>
            <p className="text-gray-600 mb-4">
              Customize your news feed by selecting categories, sources, and keywords that interest you.
            </p>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Categories</label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                      preferences.categories.includes(category)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Keywords</label>
              <div className="flex">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add a keyword (e.g. AI, climate)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {preferences.keywords.map(keyword => (
                  <div 
                    key={keyword}
                    className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="ml-1 text-blue-800 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {preferences.keywords.length === 0 && (
                  <p className="text-gray-500 text-sm">No keywords added yet</p>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Preferred Sources</label>
              <div className="flex">
                <input
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="Add a news source (e.g. BBC, CNN)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addSource}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {preferences.sources.map(source => (
                  <div 
                    key={source}
                    className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {source}
                    <button
                      type="button"
                      onClick={() => removeSource(source)}
                      className="ml-1 text-blue-800 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {preferences.sources.length === 0 && (
                  <p className="text-gray-500 text-sm">No sources added yet</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;