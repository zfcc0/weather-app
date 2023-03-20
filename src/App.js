import React from 'react';
import './App.css';
import Search from './components/search/Search';
import WeatherResult from './components/weatherResult/WeatherResult';
import { useState } from 'react';

function App() {
  const [weather, setWeather] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const setWeatherfunc = (weatherData) => setWeather(weatherData);

  const setLoadingfunc = (loading) => setLoading(loading);

  return (
    <div className="App">
      <div className="container">
        <header className="header">Weather App</header>
        <Search setWeather={setWeatherfunc} setLoading={setLoadingfunc} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          weather && <WeatherResult weatherData={weather} />
        )}
      </div>
    </div>
  );
}

export default App;
