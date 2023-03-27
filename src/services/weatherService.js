const API_KEY = '2013e587351348be86c60134231903';

const FETCH_CITY_WEATHER_URL = 'http://api.weatherapi.com/v1/current.json';

export const fetchWeatherByCity = async (city) => {
  const url = new URL(FETCH_CITY_WEATHER_URL);
  url.searchParams.append('key', API_KEY);
  url.searchParams.append('q', city);
  url.searchParams.append('aqi', 'no');

  // 默认服务端饭回的数据是符合你期望的数据结构
  // 常见 1. 服务端直接throw error -> 4xx, 5xx -> 直接被catch
  // 不常见 2. 服务端返回空数据/错误信息(xx not found) -> 2xx -> 不会被catch
  const response = await fetch(url);
  // 如果有第二种情况
  // if (isError(response)) {
  //   throw Error('xxx');
  // }
  const data = await response.json();
  return data;
};

// const isError = (response) => {
//   // Check if response is an error
//   return false;
// };
