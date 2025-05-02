import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCountryByName } from '../api/countries';
import CountryCard from '../components/CountryCard';
import CountryDetails from '../components/CountryDetails';

export default function Wishlist() {
  const { token, likedCountries } = useAuth();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCountry(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchFavoriteCountries = async () => {
      try {
        setIsLoading(true);
        const promises = likedCountries.map(countryName =>
          getCountryByName(countryName)
        );
        const results = await Promise.all(promises);
        const countries = results.flat().filter(c => c); // Filter out any undefined
        setFavoriteCountries(countries);
      } catch (error) {
        console.error("Error fetching favorite countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (likedCountries.length > 0) {
      fetchFavoriteCountries();
    } else {
      setFavoriteCountries([]);
      setIsLoading(false);
    }
  }, [likedCountries]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">
        My Favorite Countries
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : favoriteCountries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            You haven't liked any countries yet. Click the 🤍 on country cards to add them here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteCountries.map((country, index) => (
            <div key={index} onClick={() => openModal(country)} className="cursor-pointer">
              <CountryCard country={country} showLikeButton={false} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
          <button 
  onClick={closeModal}
  className="absolute top-4 right-4 text-4xl hover:scale-110 transition transform"
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
