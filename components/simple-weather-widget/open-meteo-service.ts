import axios from 'axios';

// Типи даних для API Open-Meteo
export interface OpenMeteoWeatherData {
  location: string;
  temperature: number;
  condition: string;
  conditionCode: number;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  isDay: boolean;
  sunrise: string;
  sunset: string;
  dailyForecast?: DailyForecast[];
}

// Додаємо інтерфейс для денного прогнозу
export interface DailyForecast {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  conditionCode: number;
  condition: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

// Інтерфейс для відповіді від API Open-Meteo
interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    precipitation: string;
    rain: string;
    showers: string;
    snowfall: string;
    weather_code: string;
    cloud_cover: string;
    pressure_msl: string;
    surface_pressure: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    weather_code: number;
    cloud_cover: number;
    pressure_msl: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  daily_units: {
    time: string;
    sunrise: string;
    sunset: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
    weather_code: string;
    wind_speed_10m_max: string;
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weather_code: number[];
    wind_speed_10m_max: number[];
  };
}

// Інтерфейс для геокодування
interface GeocodingResponse {
  results?: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
    admin2?: string;
    admin3?: string;
    admin4?: string;
  }[];
  error?: boolean;
  reason?: string;
}

// Функція для перетворення коду погоди в текстовий опис
function getWeatherCondition(code: number): string {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  switch (code) {
    case 0:
      return 'Clear sky';
    case 1:
      return 'Mainly clear';
    case 2:
      return 'Partly cloudy';
    case 3:
      return 'Overcast';
    case 45:
    case 48:
      return 'Fog';
    case 51:
    case 53:
    case 55:
      return 'Drizzle';
    case 56:
    case 57:
      return 'Freezing Drizzle';
    case 61:
    case 63:
    case 65:
      return 'Rain';
    case 66:
    case 67:
      return 'Freezing Rain';
    case 71:
    case 73:
    case 75:
      return 'Snow';
    case 77:
      return 'Snow grains';
    case 80:
    case 81:
    case 82:
      return 'Rain showers';
    case 85:
    case 86:
      return 'Snow showers';
    case 95:
      return 'Thunderstorm';
    case 96:
    case 99:
      return 'Thunderstorm with hail';
    default:
      return 'Unknown';
  }
}

// Функція для перетворення коду погоди в категорію для іконки
function getWeatherCategory(code: number): string {
  if (code === 0) return 'clear-sky';
  if (code === 1) return 'clear-sky';  // Mainly clear
  if (code === 2) return 'partly-cloudy';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'rain';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 95 && code <= 99) return 'thunderstorm';
  return 'cloudy';
}

// Функція для отримання іконки погоди
function getWeatherIcon(code: number, isDay: boolean): string {
  const category = getWeatherCategory(code);
  return category;
}

// Функція для геокодування (пошук координат за назвою міста)
export async function geocodeCity(cityName: string): Promise<{ lat: number; lon: number; name: string } | null> {
  try {
    const response = await axios.get<GeocodingResponse>(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=uk&format=json`
    );

    if (response.data.results && response.data.results.length > 0) {
      const result = response.data.results[0];
      return {
        lat: result.latitude,
        lon: result.longitude,
        name: result.name + (result.admin1 ? `, ${result.admin1}` : '') + (result.country ? ` (${result.country})` : '')
      };
    }
    return null;
  } catch (error) {
    console.error('Помилка геокодування:', error);
    return null;
  }
}

// Основна функція для отримання даних про погоду
export async function getOpenMeteoWeatherData(cityName: string): Promise<OpenMeteoWeatherData> {
  try {
    // Спочатку отримуємо координати міста
    const geoData = await geocodeCity(cityName);
    
    if (!geoData) {
      throw new Error(`Не вдалося знайти місто: ${cityName}`);
    }
    
    // Отримуємо дані про погоду за координатами, включаючи прогноз на 10 днів
    const response = await axios.get<OpenMeteoResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=${geoData.lat}&longitude=${geoData.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,wind_speed_10m_max,sunrise,sunset&timezone=auto&forecast_days=10`
    );
    
    const data = response.data;
    const current = data.current;
    const daily = data.daily;
    
    // Форматуємо час сходу і заходу сонця
    const formatTime = (timeString: string) => {
      if (!timeString) return "N/A";
      try {
        const date = new Date(timeString);
        if (isNaN(date.getTime())) return "N/A";
        return date.toLocaleTimeString('uk-UA', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
      } catch (error) {
        console.error('Помилка форматування часу:', error);
        return "N/A";
      }
    };
    
    // Форматуємо дату для прогнозу
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'short' });
    };
    
    // Підготувати дані денного прогнозу
    const dailyForecast: DailyForecast[] = [];
    for (let i = 0; i < daily.time.length; i++) {
      dailyForecast.push({
        date: formatDate(daily.time[i]),
        temperatureMax: daily.temperature_2m_max[i],
        temperatureMin: daily.temperature_2m_min[i],
        conditionCode: daily.weather_code[i],
        condition: getWeatherCondition(daily.weather_code[i]),
        icon: getWeatherIcon(daily.weather_code[i], true), // Використовуємо денну іконку для прогнозу
        precipitation: daily.precipitation_sum[i],
        windSpeed: daily.wind_speed_10m_max[i]
      });
    }
    
    // Повертаємо дані у форматі, який очікує наш віджет
    const result = {
      location: geoData.name,
      temperature: current.temperature_2m,
      condition: getWeatherCondition(current.weather_code),
      conditionCode: current.weather_code,
      icon: getWeatherIcon(current.weather_code, current.is_day === 1),
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      pressure: current.pressure_msl,
      isDay: current.is_day === 1,
      sunrise: formatTime(daily.sunrise[0]),
      sunset: formatTime(daily.sunset[0]),
      dailyForecast: dailyForecast
    };

    console.log('Raw sunrise data:', daily.sunrise[0]);
    console.log('Raw sunset data:', daily.sunset[0]);
    console.log('Formatted sunrise:', result.sunrise);
    console.log('Formatted sunset:', result.sunset);

    return result;
  } catch (error) {
    console.error('Помилка отримання даних про погоду:', error);
    throw error;
  }
} 