import React from 'react';
import './Search.css';
import { useState } from 'react';
import { fetchWeatherByCity } from '../../services/weatherService.js';

const Search = ({ setWeather, setLoading }) => {
  const [city, setCity] = useState('');

  const handleClick = async () => {
    setLoading(true);
    try {
      const weatherData = await fetchWeatherByCity(city);
      setWeather(weatherData);
    } catch (error) {
      console.error('Failed to fetch city weather due to error:', error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="search"
        placeholder="Search City..."
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button onClick={handleClick}>Search</button>
    </>
  );
};

export default Search;
