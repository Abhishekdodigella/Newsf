import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, BookmarkCheck, Home, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
            <span className="font-serif font-bold text-2xl text-blue-600">NewsAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">Categories</Link>
            {isAuthenticated && (
              <>
                <Link to="/favorites" className="text-gray-700 hover:text-blue-600 transition-colors">Saved</Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">Profile</Link>
              </>
            )}
          </nav>

          {/* Desktop Search & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="py-2 pl-10 pr-4 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Hi, {user?.name.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
            
            <nav className="space-y-1">
              <Link
                to="/"
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={20} className="text-gray-500" />
                <span>Home</span>
              </Link>
              <Link
                to="/categories"
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={20} className="text-gray-500" />
                <span>Categories</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/favorites"
                    className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookmarkCheck size={20} className="text-gray-500" />
                    <span>Saved Articles</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} className="text-gray-500" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left p-3 text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    to="/login"
                    className="w-full bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md text-center font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-center font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;