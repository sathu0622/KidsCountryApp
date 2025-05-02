import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const [likedCountries, setLikedCountries] = useState([]);
  const [theme, setThemeState] = useState('boys'); 
  // Check token validity
  const isTokenValid = () => {
    if (!token || !tokenExpiration) return false;
    return new Date().getTime() < tokenExpiration;
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'boys';
    setThemeState(storedTheme);
  }, []);
  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedExpiration = localStorage.getItem('tokenExpiration');
    
    if (storedToken && storedExpiration && new Date().getTime() < parseInt(storedExpiration)) {
      setTokenState(storedToken);
      setTokenExpiration(parseInt(storedExpiration));
    } else {
      // Clear invalid or expired token
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    }
  }, []);
  const setTheme = (newTheme) => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  // Save token to localStorage on change
  const setToken = (newToken, expiresIn = 3600) => {
    if (newToken) {
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem('token', newToken);
      localStorage.setItem('tokenExpiration', expirationTime.toString());
      setTokenState(newToken);
      setTokenExpiration(expirationTime);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      setTokenState(null);
      setTokenExpiration(null);
      setLikedCountries([]);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      setToken, 
      likedCountries, 
      setLikedCountries,
      isTokenValid,
      theme,
      setTheme 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);