import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { themes } from './themes';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

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
      style={{ backgroundColor: currentTheme.bg }}
    >
      {/* Navigation */}
      <nav 
        className="p-4 shadow-lg"
        style={{ backgroundColor: currentTheme.primary }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold flex items-center text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span role="img" aria-label="globe" className="mr-2">🌐</span>
            Country Explorer
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition"
              aria-label={`Switch to ${theme === 'boys' ? 'girls' : 'boys'} theme`}
            >
              {theme === 'boys' ? '👧' : '👦'}
            </button>
            <div className="flex space-x-4 text-white">
              <Link to="/home" className="hover:underline">Home</Link>
              <Link to="/games" className="hover:underline">Games</Link>
              {token && <Link to="/wishlist" className="hover:underline">My Favorites</Link>}
              {token ? (
                <button onClick={handleLogout} className="hover:underline">Logout</button>
              ) : (
                <Link to="/login" className="hover:underline">Login</Link>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden mt-4 pb-2 space-y-3"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <div className="flex justify-center mb-2">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition"
                aria-label={`Switch to ${theme === 'boys' ? 'girls' : 'boys'} theme`}
              >
                {theme === 'boys' ? '👧' : '👦'}
              </button>
            </div>
            <div className="flex flex-col items-center space-y-3 text-white">
              <Link 
                to="/home" 
                className="w-full text-center py-2 hover:bg-white hover:bg-opacity-20 rounded"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/games" 
                className="w-full text-center py-2 hover:bg-white hover:bg-opacity-20 rounded"
                onClick={toggleMobileMenu}
              >
                Games
              </Link>
              {token && (
                <Link 
                  to="/wishlist" 
                  className="w-full text-center py-2 hover:bg-white hover:bg-opacity-20 rounded"
                  onClick={toggleMobileMenu}
                >
                  My Favorites
                </Link>
              )}
              {token ? (
                <button 
                  onClick={handleLogout}
                  className="w-full text-center py-2 hover:bg-white hover:bg-opacity-20 rounded"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="w-full text-center py-2 hover:bg-white hover:bg-opacity-20 rounded"
                  onClick={toggleMobileMenu}
                >
                  Login
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
        <p>© {new Date().getFullYear()} Country Explorer for Kids - Learn about the world!</p>
      </footer>
    </div>
  );
}