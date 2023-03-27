import { fetchWeatherByCity } from './weatherService';

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

// 1. mock fetch, return data weatherData
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(weatherData),
  })
);

test('fetch will be called once and the returned value is expected', async () => {
  // 2. pass a city parameter
  const response = await fetchWeatherByCity('Beijing');

  // 3. expect fetchMock to be called with corresponding url
  expect(fetch).toHaveBeenCalledTimes(1);

  // 4. expect returned value to be xxx
  expect(response).toBe(weatherData);
});
