// // Updated CountryCard.jsx
// import { useAuth } from '../context/AuthContext';
// import SpeechButton from './SpeechButton';
// import { themes } from './themes';

// export default function CountryCard({ country, onClick, showLikeButton = true }) {
//   const { token, likedCountries, setLikedCountries, theme } = useAuth();
//   const currentTheme = themes[theme];
//   const isLiked = likedCountries.includes(country.name.common);

//   const handleLike = async (e) => {
//     e.stopPropagation();
//     try {
//       const response = await fetch('http://localhost:5000/api/users/like', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ countryName: country.name.common })
//       });
//       const data = await response.json();
//       setLikedCountries(data.likedCountries);
//     } catch (err) {
//       console.error("Error liking country:", err);
//     }
//   };

//   const funFact = `Did you know? ${country.name.common} is in ${country.region}. The capital is ${country.capital?.[0] || 'unknown'} and people speak ${Object.values(country.languages || {}).join(', ')}.`;

//   return (
//     <div 
//       onClick={() => onClick && onClick(country)}
//       className="rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
//       style={{ backgroundColor: currentTheme.cardBg }}
//     >
//       <div className="relative">
//         <img
//           src={country.flags.svg}
//           alt={`Flag of ${country.name.common}`}
//           className="w-full h-40 object-cover"
//         />
//         {showLikeButton && (
//           <button 
//             onClick={handleLike}
//             className="absolute top-2 right-2 text-3xl"
//             aria-label={isLiked ? "Unlike country" : "Like country"}
//           >
//             {isLiked ? "❤️" : "🤍"}
//           </button>
//         )}
//       </div>
//       <div className="p-4">
//         <div className="flex justify-between items-start">
//           <h2 
//             className="text-xl font-bold"
//             style={{ color: currentTheme.primary }}
//           >
//             {country.name.common}
//           </h2>
//           <SpeechButton text={funFact} />
//         </div>
//         <p className="text-gray-600">{country.region}</p>
//         <div className="mt-2 flex flex-wrap gap-1">
//           <span 
//             className="text-xs px-2 py-1 rounded"
//             style={{ backgroundColor: `${currentTheme.accent}20`, color: currentTheme.accent }}
//           >
//             {country.capital?.[0] || 'No capital'}
//           </span>
//           <span 
//             className="text-xs px-2 py-1 rounded"
//             style={{ backgroundColor: `${currentTheme.secondary}20`, color: currentTheme.secondary }}
//           >
//             {Object.values(country.languages || {}).slice(0, 2).join(', ')}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useAuth } from '../context/AuthContext';
import SpeechButton from './SpeechButton';
import { themes } from './themes';

export default function CountryCard({ country, onClick, onLikeClick }) {
  const { token, likedCountries, setLikedCountries, theme } = useAuth();
  const currentTheme = themes[theme];
  const isLiked = likedCountries.includes(country.name.common);

  const handleLike = async (e) => {
    if (!token) {
      onLikeClick(e, country.name.common);
      return;
    }
    
    e.stopPropagation();
    try {
      const response = await fetch('http://localhost:5000/api/users/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ countryName: country.name.common })
      });
      const data = await response.json();
      setLikedCountries(data.likedCountries);
    } catch (err) {
      console.error("Error liking country:", err);
    }
  };

  const funFact = `Did you know? ${country.name.common} is in ${country.region}. The capital is ${country.capital?.[0] || 'unknown'} and people speak ${Object.values(country.languages || {}).join(', ')}.`;

  return (
    <div 
      onClick={() => onClick(country)}
      className="rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
      style={{ backgroundColor: currentTheme.cardBg }}
    >
      <div className="relative">
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-40 object-cover"
        />
        <button 
          onClick={handleLike}
          className="absolute top-2 right-2 text-3xl"
          aria-label={isLiked ? "Unlike country" : "Like country"}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 
            className="text-xl font-bold"
            style={{ color: currentTheme.primary }}
          >
            {country.name.common}
          </h2>
          <SpeechButton text={funFact} />
        </div>
        <p className="text-gray-600">{country.region}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          <span 
            className="text-xs px-2 py-1 rounded"
            style={{ 
              backgroundColor: `${currentTheme.accent}20`, 
              color: currentTheme.accent 
            }}
          >
            {country.capital?.[0] || 'No capital'}
          </span>
          <span 
            className="text-xs px-2 py-1 rounded"
            style={{ 
              backgroundColor: `${currentTheme.secondary}20`, 
              color: currentTheme.secondary 
            }}
          >
            {Object.values(country.languages || {}).slice(0, 2).join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
}