import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif font-bold text-xl mb-4">NewsAI</h3>
            <p className="text-gray-300 text-sm">
              AI-powered news application that personalizes your news experience based on your preferences.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-3">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/technology" className="text-gray-300 hover:text-white text-sm">Technology</Link></li>
              <li><Link to="/category/business" className="text-gray-300 hover:text-white text-sm">Business</Link></li>
              <li><Link to="/category/science" className="text-gray-300 hover:text-white text-sm">Science</Link></li>
              <li><Link to="/category/health" className="text-gray-300 hover:text-white text-sm">Health</Link></li>
              <li><Link to="/category/entertainment" className="text-gray-300 hover:text-white text-sm">Entertainment</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-3">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-300 hover:text-white text-sm">Login</Link></li>
              <li><Link to="/signup" className="text-gray-300 hover:text-white text-sm">Sign Up</Link></li>
              <li><Link to="/profile" className="text-gray-300 hover:text-white text-sm">Profile</Link></li>
              <li><Link to="/favorites" className="text-gray-300 hover:text-white text-sm">Saved Articles</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-3">About</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white text-sm">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} NewsAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;