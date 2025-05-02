// const BASE_URL = 'https://restcountries.com/v3.1';

// export const getAllCountries = () => fetch(`${BASE_URL}/all`).then(res => res.json());
// export const getCountryByName = async (name) => {
//     try {
//       const res = await fetch(`${BASE_URL}/name/${name}`);
//       if (!res.ok) throw new Error('Country not found');
//       return await res.json();
//     } catch (err) {
//       return []; // Return empty array if not found
//     }
//   };
  
// export const getCountriesByRegion = (region) => fetch(`${BASE_URL}/region/${region}`).then(res => res.json());
// export const getCountryByCode = (code) => fetch(`${BASE_URL}/alpha/${code}`).then(res => res.json());


const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) throw new Error('Failed to fetch countries');
    return await response.json();
  } catch (error) {
    console.error("Error fetching all countries:", error);
    return [];
  }
};

export const getCountryByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}`);
    if (!response.ok) throw new Error('Country not found');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching country ${name}:`, error);
    return [];
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    if (!response.ok) throw new Error('Failed to fetch countries by region');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching countries in region ${region}:`, error);
    return [];
  }
};

export const getCountryByCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) throw new Error('Country not found by code');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching country by code ${code}:`, error);
    return [];
  }
};