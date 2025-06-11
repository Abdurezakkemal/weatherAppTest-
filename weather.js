const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeather(city) {
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error('City not found or API error');
  }
  return response.json();
}

export function getWeatherIcon(weatherMain) {
  const iconMap = {
    Clear: 'assets/clear-sky-day.svg',
    Clouds: 'assets/few-clouds-day.svg',
    Rain: 'assets/rain.svg',
    Snow: 'assets/snow.svg',
  };
  return iconMap[weatherMain] || 'assets/clear.png';
}