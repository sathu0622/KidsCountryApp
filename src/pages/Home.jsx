import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllCountries, getCountryByName, getCountriesByRegion } from '../api/countries';
import CountryCard from '../components/CountryCard';
import CountryDetails from '../components/CountryDetails';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { themes } from '../components/themes';

export default function Home() {
  const { token, likedCountries, setLikedCountries, theme } = useAuth();
  const currentTheme = themes[theme];
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        let data;
        if (search) {
          data = await getCountryByName(search);
        } else if (region) {
          data = await getCountriesByRegion(region);
        } else {
          data = await getAllCountries();
        }
        setCountries(data || []);
        setCurrentPage(1); // Reset to first page when search/filter changes
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLikedCountries = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://localhost:5000/api/users/likes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setLikedCountries(data);
      } catch (error) {
        console.error("Error fetching liked countries:", error);
      }
    };

    fetchCountries();
    fetchLikedCountries();
  }, [search, region, token, navigate, setLikedCountries]);

  // Get current countries for pagination
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const handleLikeClick = (e, countryName) => {
    e.stopPropagation();
    if (!token) {
      toast.info(
        <div>
          <p>Please login or register to save favorites!</p>
          <div className="flex justify-center gap-2 mt-2">
            <button 
              onClick={() => navigate('/login')}
              className="px-3 py-1 rounded text-white"
              style={{ backgroundColor: currentTheme.primary }}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-3 py-1 rounded text-white"
              style={{ backgroundColor: currentTheme.secondary }}
            >
              Register
            </button>
          </div>
        </div>,
        { autoClose: 5000 }
      );
      return;
    }
  };

  const closeModal = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header search={search} setSearch={setSearch} region={region} setRegion={setRegion} />
      
      <div className="mb-8">
        <h1 
          className="text-3xl font-bold text-center mb-2"
          style={{ color: currentTheme.primary }}
        >
          Explore Countries Around the World!
        </h1>
        <p className="text-center max-w-2xl mx-auto" style={{ color: currentTheme.text }}>
          Click on any country to learn fun facts about it. Use the 🔊 button to hear the information read aloud!
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: currentTheme.primary }}
          ></div>
        </div>
      ) : countries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: currentTheme.accent }}>
            No countries found. Try a different search!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentCountries.map((country, index) => (
              <CountryCard 
                key={index} 
                country={country} 
                onClick={() => setSelectedCountry(country)}
                onLikeClick={handleLikeClick}
              />
            ))}
          </div>
          
          {/* Pagination */}
          {countries.length > countriesPerPage && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded disabled:opacity-50"
                  style={{ 
                    backgroundColor: currentPage === 1 ? '#e5e7eb' : currentTheme.primary,
                    color: currentPage === 1 ? '#6b7280' : 'white'
                  }}
                >
                  Prev
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'font-bold' : ''}`}
                    style={{ 
                      backgroundColor: currentPage === i + 1 ? currentTheme.primary : '#e5e7eb',
                      color: currentPage === i + 1 ? 'white' : currentTheme.text
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded disabled:opacity-50"
                  style={{ 
                    backgroundColor: currentPage === totalPages ? '#e5e7eb' : currentTheme.primary,
                    color: currentPage === totalPages ? '#6b7280' : 'white'
                  }}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
      
      {/* Country Details Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div 
  className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
  style={{ backgroundColor: currentTheme.bg }}
>
<button 
  onClick={closeModal}
  className="absolute top-4 right-4 text-4xl hover:scale-110 transition transform"
  style={{ color: currentTheme.red }}
>
&times;
</button>

            <CountryDetails country={selectedCountry} />
          </div>
        </div>
      )}
    </div>
  );
}