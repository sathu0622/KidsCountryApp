import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { themes } from './themes';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaHome, FaGamepad, FaHeart, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';

export default function Layout({ children }) {
  const { token, setToken, theme, setTheme } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentTheme = themes[theme];
  
  const handleLogout = () => {
    setToken(null);
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'boys' ? 'girls' : 'boys');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundColor: currentTheme.bg,
        fontFamily: "'Comic Sans MS', cursive, sans-serif"
      }}
    >
      {/* Navigation */}
      <nav 
        className="p-4 shadow-lg sticky top-0 z-50"
        style={{ backgroundColor: currentTheme.primary }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center text-white hover:scale-105 transition-transform"
            onClick={() => setMobileMenuOpen(false)}
          >
            <GiEarthAmerica className="mr-2 text-3xl" />
            <span className="text-shadow">World Explorers</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition hover:scale-110 text-2xl"
              aria-label={`Switch to ${theme === 'boys' ? 'girls' : 'boys'} theme`}
            >
              {theme === 'boys' ? '👧' : '👦'}
            </button>
            <div className="flex space-x-6 text-white text-lg">
              <Link to="/home" className="hover:underline flex items-center">
                <FaHome className="mr-1" /> Home
              </Link>
              <Link to="/games" className="hover:underline flex items-center">
                <FaGamepad className="mr-1" /> Games
              </Link>
              {token && (
                <Link to="/wishlist" className="hover:underline flex items-center">
                  <FaHeart className="mr-1" /> My Favorites
                </Link>
              )}
              {token ? (
                <button onClick={handleLogout} className="hover:underline flex items-center">
                  <FaSignOutAlt className="mr-1" /> Logout
                </button>
              ) : (
                <Link to="/login" className="hover:underline flex items-center">
                  <FaSignInAlt className="mr-1" /> Login
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none hover:scale-110 transition-transform"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden mt-4 pb-4 space-y-3 rounded-lg"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <div className="flex justify-center mb-3">
              <button 
                onClick={toggleTheme}
                className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition text-2xl hover:scale-110"
                aria-label={`Switch to ${theme === 'boys' ? 'girls' : 'boys'} theme`}
              >
                {theme === 'boys' ? '👧' : '👦'}
              </button>
            </div>
            <div className="flex flex-col items-center space-y-3 text-white text-lg">
              <Link 
                to="/home" 
                className="w-full text-center py-3 hover:bg-white hover:bg-opacity-20 rounded-lg flex justify-center items-center"
                onClick={toggleMobileMenu}
              >
                <FaHome className="mr-2" /> Home
              </Link>
              <Link 
                to="/games" 
                className="w-full text-center py-3 hover:bg-white hover:bg-opacity-20 rounded-lg flex justify-center items-center"
                onClick={toggleMobileMenu}
              >
                <FaGamepad className="mr-2" /> Games
              </Link>
              {token && (
                <Link 
                  to="/wishlist" 
                  className="w-full text-center py-3 hover:bg-white hover:bg-opacity-20 rounded-lg flex justify-center items-center"
                  onClick={toggleMobileMenu}
                >
                  <FaHeart className="mr-2" /> My Favorites
                </Link>
              )}
              {token ? (
                <button 
                  onClick={handleLogout}
                  className="w-full text-center py-3 hover:bg-white hover:bg-opacity-20 rounded-lg flex justify-center items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="w-full text-center py-3 hover:bg-white hover:bg-opacity-20 rounded-lg flex justify-center items-center"
                  onClick={toggleMobileMenu}
                >
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer 
        className="p-4 text-center text-white"
        style={{ backgroundColor: currentTheme.primary }}
      >
        <div className="container mx-auto">
          <p className="text-lg mb-2">© {new Date().getFullYear()} World Explorers</p>
          <p className="text-sm">Learn about our amazing world in a fun way!</p>
          <div className="flex justify-center space-x-4 mt-3 text-2xl">
            <span role="img" aria-label="earth">🌍</span>
            <span role="img" aria-label="flag">🏳️</span>
            <span role="img" aria-label="globe">🌎</span>
            <span role="img" aria-label="map">🗺️</span>
            <span role="img" aria-label="earth">🌏</span>
          </div>
        </div>
      </footer>
    </div>
  );
}