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
  // console.log(weatherData);
  const { location, current } = weatherData;
  const dateTime = new Date(location.localtime);

  return (
    <div data-testid="weather-result">
      <h2 className="location">
        {location.name}, {location.country}
      </h2>
      <p className="date" data-testid="weather-date">
        {dateTime.toLocaleDateString('en-AU', options)}
      </p>

      <ul className="weather-info">
        <li className="weather">
          <img alt="weather icon" src={current.condition.icon} />
          <p data-testid="weather-condition">{current.condition.text}</p>
        </li>
        <li className="temperature">Temperature: {current.temp_c}°C</li>
        <li className="wind">Wind Speed: {current.wind_kph} m/s</li>
      </ul>
    </div>
  );
};

export default WeatherResult;
