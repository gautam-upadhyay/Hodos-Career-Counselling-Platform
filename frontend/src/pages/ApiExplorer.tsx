import React, { useState } from 'react';
import axios from 'axios';

interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

const ApiExplorer: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // City coordinates mapping (simplified)
  const cityCoordinates: { [key: string]: { lat: number; lon: number } } = {
    'hyderabad': { lat: 17.385, lon: 78.486 },
    'mumbai': { lat: 19.076, lon: 72.877 },
    'delhi': { lat: 28.704, lon: 77.102 },
    'bangalore': { lat: 12.971, lon: 77.594 },
    'chennai': { lat: 13.082, lon: 80.270 },
    'kolkata': { lat: 22.572, lon: 88.363 },
    'pune': { lat: 18.520, lon: 73.856 },
    'london': { lat: 51.507, lon: -0.127 },
    'new york': { lat: 40.712, lon: -74.006 },
    'tokyo': { lat: 35.689, lon: 139.691 },
  };

  const getWeatherDescription = (code: number): string => {
    const weatherCodes: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail',
    };
    return weatherCodes[code] || 'Unknown';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setWeatherData(null);

    // Input validation
    if (!city.trim()) {
      setError('Please enter a valid city name');
      return;
    }

    const cityLower = city.toLowerCase().trim();
    const coords = cityCoordinates[cityLower];

    if (!coords) {
      setError('City not found. Try: Hyderabad, Mumbai, Delhi, Bangalore, Chennai, London, New York, or Tokyo');
      return;
    }

    setLoading(true);

    try {
      // Using Open-Meteo API with timeout and error handling
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast`,
        {
          params: {
            latitude: coords.lat,
            longitude: coords.lon,
            current_weather: true,
          },
          timeout: 10000, // 10 second timeout
        }
      );

      if (response.data && response.data.current_weather) {
        const weather = response.data.current_weather;
        setWeatherData({
          temperature: weather.temperature,
          windspeed: weather.windspeed,
          weathercode: weather.weathercode,
          time: weather.time,
        });
      } else {
        setError('API response invalid. Please try again.');
      }
    } catch (err: any) {
      console.error('API error:', err);
      
      // Detailed error handling
      if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        setError('Request timed out. Check your internet connection and try again.');
      } else if (err.response) {
        // Server responded with error status
        if (err.response.status === 429) {
          setError('Too many requests. Please wait a moment and try again.');
        } else if (err.response.status >= 500) {
          setError('API server error. Please try again later.');
        } else {
          setError('API request failed. Please try again.');
        }
      } else if (err.request) {
        // Request made but no response
        setError('Network error. Check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Weather API Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get real-time weather data for major cities using Open-Meteo API
          </p>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name (e.g., Hyderabad)"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Get Weather'}
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Supported cities: Hyderabad, Mumbai, Delhi, Bangalore, Chennai, Kolkata, Pune, London, New York, Tokyo
            </p>
          </form>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Fetching weather data...</p>
            </div>
          )}

          {/* Weather Data Display */}
          {weatherData && !loading && (
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Weather in {city.charAt(0).toUpperCase() + city.slice(1)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Temperature</p>
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {weatherData.temperature}°C
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Wind Speed</p>
                  <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {weatherData.windspeed} km/h
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Condition</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getWeatherDescription(weatherData.weathercode)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Last updated: {new Date(weatherData.time).toLocaleString()}
              </p>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Error Handling Features
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>✓ Input validation for empty or invalid city names</li>
              <li>✓ Network error detection and user-friendly messages</li>
              <li>✓ Request timeout handling (10 seconds)</li>
              <li>✓ API rate limit detection</li>
              <li>✓ Server error handling with retry suggestions</li>
              <li>✓ Loading states for better user experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiExplorer;

