import React from 'react';
import App from './App';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import * as WeatherService from './services/weatherService';

test('shows loading paragraph when fetch call. After the call, removes loading and shows WeatherResult element', async () => {
  // use mockFetchFunc to mock the function "fetchWeatherByCity" (it's a async function as it includes a fetch call, so it is also a promise.)
  const mockFetchFunc = jest.spyOn(WeatherService, 'fetchWeatherByCity');

  /* 
  import { fetchWeatherByCity } from '../../services/weatherService.js';
  const mockFetchFunc = jest.fn(fetchWeatherByCity); 
  不能用这种方法，因为这样做不知道为什么mock没成功，fetchWeatherByCity 这个function真的会被call
  */

  const weatherData = {
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

  // set the mockFetchFunc is "Promise.resolve(weatherData)"", so its response is weatherData
  mockFetchFunc.mockImplementationOnce(() => Promise.resolve(weatherData));

  render(<App />);

  // Check if the loading doesn't exist originally
  let loadingEl = screen.queryByTestId('app-loading');
  expect(loadingEl).toBeFalsy();

  // Check if the weatherResult element doesn't exist originally
  let weatherResultEl = screen.queryByTestId('weather-result');
  expect(weatherResultEl).toBeFalsy();

  // Check if the loading is displayed
  const searchInput = screen.getByTestId('search-input');
  fireEvent.change(searchInput, { target: { value: 'beijing' } });
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);
  loadingEl = screen.queryByTestId('app-loading');
  expect(loadingEl).toBeTruthy();

  // Wait for the loading to be removed after the fetch call。相当于在测loading在fetch结束后是否被removed掉了。如果没等到，test就已经挂了，所以也就不用写下面两行再测一次了。
  await waitForElementToBeRemoved(() => screen.queryByTestId('app-loading'));
  // loadingEl = screen.queryByTestId('app-loading');
  // expect(loadingEl).toBeFalsy();

  // 测一些在loading被removed之后，应该发生的情况。
  weatherResultEl = screen.queryByTestId('weather-result');
  expect(weatherResultEl).toBeTruthy();
});

/* 
// 下面这种方法，mock的是 fetch，不是 fetchWeatherByCity function

import fetchMock from 'jest-fetch-mock';

beforeAll(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
// 这里set了 fetchMock 的 response 为 “{ success: true }”

fetchMock.mockImplementationOnce(() => 
Promise.resolve({ json: () => weatherData })
);
// 这里set了 fetchMock 为 "Promise.resolve({ json: () => weatherData }", 所以它的response 为 “{ json: () => weatherData }”, 所以 response.json 就为 weatherData.

*/
