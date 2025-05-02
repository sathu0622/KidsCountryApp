// export default function Header({ search, setSearch, region, setRegion }) {
//     const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
//     return (
//       <div className="flex flex-col sm:flex-row gap-4 mb-4">
//         <input
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           placeholder="Search country..."
//           className="p-2 border rounded w-full sm:w-1/2"
//         />
//         <select value={region} onChange={e => setRegion(e.target.value)} className="p-2 border rounded">
//           <option value="">Filter by Region</option>
//           {regions.map(r => <option key={r} value={r}>{r}</option>)}
//         </select>
//       </div>
//     );
//   }
  

// Updated Header.jsx
import { useAuth } from '../context/AuthContext';
import { themes } from '../components/themes';

export default function Header({ search, setSearch, region, setRegion }) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const { theme } = useAuth();
  const currentTheme = themes[theme];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search country..."
        className="p-3 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2"
        style={{
          borderColor: currentTheme.primary,
          '--tw-ring-color': currentTheme.primary // Correct way to set focus ring color
        }}
      />
      <select 
        value={region} 
        onChange={e => setRegion(e.target.value)} 
        className="p-3 border rounded-lg focus:outline-none focus:ring-2"
        style={{
          borderColor: currentTheme.primary,
          '--tw-ring-color': currentTheme.primary // Correct way to set focus ring color
        }}
      >
        <option value="">Filter by Region</option>
        {regions.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
    </div>
  );
}