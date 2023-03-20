import React from 'react';
import './WeatherResult.css';

const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

const WeatherResult = ({ weatherData }) => {
  const { location, current } = weatherData;
  const dateTime = new Date(location.localtime);
  console.log(weatherData);

  return (
    <div className="weather-container">
      <h2 className="location">
        {location.name}, {location.country}
      </h2>
      <p className="date">{dateTime.toLocaleDateString('en-AU', options)}</p>

      <ul className="weather-info">
        <li className="weather">
          <img alt="weather icon" src={current.condition.icon} />
          <p>{current.condition.text}</p>
        </li>
        <li className="temperature">Temperature: {current.temp_c}°C</li>
        <li className="wind">Wind Speed: {current.wind_kph} m/s</li>
      </ul>
    </div>
  );
};

export default WeatherResult;
