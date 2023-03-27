import React from 'react';
import './Search.css';
import { useState } from 'react';
import { fetchWeatherByCity } from '../../services/weatherService.js';

const Search = ({ setWeather, setLoading }) => {
  const [city, setCity] = useState('');

  const handleClick = async () => {
    if (!city) {
      setCity('');
      alert('City name cannot be empty');
      return;
    }

    if (!city.match(/^[a-zA-Z]+$/)) {
      setCity('');
      alert('City name can only be letters');
      return;
    }

    if (city.length < 2) {
      setCity('');
      alert('City name is invalid');
      return;
    }

    setLoading(true);
    try {
      const weatherData = await fetchWeatherByCity(city);
      setWeather(weatherData);
    } catch (error) {
      console.error('Failed to fetch city weather due to error:', error);
    } finally {
      setLoading(false);
      setCity('');
    }
  };

  return (
    <>
      <input
        type="search"
        placeholder="Search City..."
        value={city}
        onChange={(event) => setCity(event.target.value)}
        data-testid="search-input"
      />
      <button onClick={handleClick} data-testid="search-button">
        Search
      </button>
    </>
  );
};

export default Search;
