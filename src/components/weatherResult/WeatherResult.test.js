import React from 'react';
import WeatherResult from './WeatherResult';
import { render, screen } from '@testing-library/react';

test('WeatherResult with weatherData as below', () => {
  const weather = {
    location: {
      localtime: '2023-03-23 20:15',
      name: 'Melbourne',
      country: 'Australia',
    },
    current: {
      condition: { text: 'Clear', icon: '//cdn.weatherapi.com/weather/.png' },
      temp_c: 19,
      wind_kph: 16.9,
    },
  };
  render(<WeatherResult weatherData={weather} />);

  // if it only renders the content you pass in, you can either completely skip the test or write at most one test.
  const conditionEl = screen.getByTestId('weather-condition');
  expect(conditionEl.textContent).toBe('Clear');
  //   expect(conditionEl).toHaveTextContent('Clear');

  // if it renders the content with some logic changes, you must write test
  const dateEl = screen.getByTestId('weather-date');
  expect(dateEl.textContent).toBe('Thu, 23 March 2023, 20:15:00');
});
