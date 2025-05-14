import SpeechButton from './SpeechButton';

export default function CountryDetails({ country }) {
  if (!country) return null;

  const languages = Object.values(country.languages || {}).join(', ');
  const currencies = Object.values(country.currencies || {})
    .map(c => `${c.name} (${c.symbol})`)
    .join(', ');
  
  const funFacts = [
    `The capital of ${country.name.common} is ${country.capital?.[0] || 'unknown'}.`,
    `People in ${country.name.common} speak ${languages}.`,
    `They use ${currencies} as their currency.`,
    `It's located in ${country.region}${country.subregion ? `, specifically in ${country.subregion}` : ''}.`,
    `The population is about ${country.population.toLocaleString()} people.`,
    `The country covers an area of ${country.area.toLocaleString()} square kilometers.`
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="sticky top-4">
            <img 
              src={country.flags.svg} 
              alt={`Flag of ${country.name.common}`} 
              className="w-full rounded-lg shadow-md border"
            />
            {country.coatOfArms?.svg && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Coat of Arms</h3>
                <img 
                  src={country.coatOfArms.svg} 
                  alt={`Coat of Arms of ${country.name.common}`}
                  className="w-32 h-32 object-contain mx-auto"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-indigo-800 mb-4">{country.name.common}</h1>
            <SpeechButton text={funFacts.join(' ')} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem label="Official Name" value={country.name.official} />
            <DetailItem label="Capital" value={country.capital?.[0]} />
            <DetailItem label="Region" value={`${country.region}${country.subregion ? ` (${country.subregion})` : ''}`} />
            <DetailItem label="Population" value={country.population.toLocaleString()} />
            <DetailItem label="Area" value={`${country.area.toLocaleString()} km²`} />
            <DetailItem label="Languages" value={languages} />
            <DetailItem label="Currency" value={currencies} />
            <DetailItem label="Time Zones" value={country.timezones.join(', ')} />
          </div>
          
          {country.borders?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Neighboring Countries</h3>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((border, i) => (
                  <span key={i} className="bg-gray-100 px-3 py-1 rounded-full">
                    {border}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <a
              href={country.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="mr-2">🗺️</span>
              View on Google Maps
            </a>
          </div>
          
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">Fun Facts</h3>
            <ul className="space-y-3">
              {funFacts.map((fact, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-yellow-500 mr-2">✨</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <h4 className="font-semibold text-gray-700">{label}</h4>
      <p className="text-gray-900">{value || 'Unknown'}</p>
    </div>
  );
}