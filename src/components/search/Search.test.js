import React from 'react';
import Search from './Search';
import { render, screen, fireEvent } from '@testing-library/react';
import * as WeatherService from '../../services/weatherService';

test('input value will be changed to the text that users type in, and become empty after users click the search button', () => {
  render(<Search setWeather={jest.fn()} setLoading={jest.fn()} />);

  const searchInput = screen.getByTestId('search-input');
  expect(searchInput.value).toBe('');
  fireEvent.change(searchInput, { target: { value: 'mel' } });
  expect(searchInput.value).toBe('mel');
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);
  //   expect(searchInput.value).toBe('');
});

test('fetchWeatherByCity function will be called with string mel', async () => {
  const mockFetchFunc = jest.spyOn(WeatherService, 'fetchWeatherByCity');

  render(<Search setWeather={jest.fn()} setLoading={jest.fn()} />);

  const searchInput = screen.getByTestId('search-input');
  fireEvent.change(searchInput, { target: { value: 'mel' } });
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);
  expect(mockFetchFunc).toHaveBeenCalledTimes(1);
});
