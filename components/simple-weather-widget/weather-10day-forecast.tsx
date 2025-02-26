"use client"

import { DailyForecast } from './open-meteo-service'
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudFog, 
  CloudLightning, 
  Wind, 
  Droplets,
  Moon,
  CloudDrizzle
} from 'lucide-react'
import { motion } from 'framer-motion'
import MeteoconIcon from './meteocon-icon'

// Анімаційні варіанти для елементів списку
const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  })
};

// Функція для отримання іконки погоди
const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case 'clear-sky':
      return <Sun className="h-6 w-6 text-yellow-400" />;
    case 'partly-cloudy':
      return (
        <div className="relative">
          <Sun className="h-6 w-6 text-yellow-400" />
          <Cloud className="h-4 w-4 text-gray-400 absolute right-0 bottom-0" />
        </div>
      );
    case 'cloudy':
      return <Cloud className="h-6 w-6 text-gray-400" />;
    case 'fog':
      return <CloudFog className="h-6 w-6 text-gray-300" />;
    case 'drizzle':
      return <CloudDrizzle className="h-6 w-6 text-blue-300" />;
    case 'rain':
      return <CloudRain className="h-6 w-6 text-blue-400" />;
    case 'snow':
      return <CloudSnow className="h-6 w-6 text-indigo-200" />;
    case 'thunderstorm':
      return <CloudLightning className="h-6 w-6 text-yellow-300" />;
    default:
      return <Cloud className="h-6 w-6 text-gray-400" />;
  }
};

// Функція форматування дати
const formatDate = (dateString: string, index: number) => {
  if (!dateString || dateString === 'undefined') {
    // Якщо дата відсутня або невалідна, створюємо нову дату на основі сьогодні + індекс
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + index);
    
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short'
    };
    return futureDate.toLocaleDateString('uk-UA', options);
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Якщо дата невалідна, створюємо нову
      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + index);
      
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short'
      };
      return futureDate.toLocaleDateString('uk-UA', options);
    }
    
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short'
    };
    return date.toLocaleDateString('uk-UA', options);
  } catch (error) {
    console.error("Помилка форматування дати:", error);
    
    // Повертаємо резервну дату
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + index);
    
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short'
    };
    return futureDate.toLocaleDateString('uk-UA', options);
  }
};

// Компонент для відображення прогнозу погоди на 10 днів
export default function Weather10DayForecast({ forecast }: { forecast: DailyForecast[] }) {
  
  if (!forecast || forecast.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-slate-400">Немає даних про прогноз погоди</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {forecast.map((day, index) => (
        <motion.div
          key={day.date || `day-${index}`}
          custom={index}
          variants={listItemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.01 }}
          className="flex items-center justify-between gap-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          {/* Дата */}
          <div className="w-20 sm:w-28">
            <p className="text-sm text-blue-300 font-medium">
              {formatDate(day.date, index)}
            </p>
          </div>
          
          {/* Погодні умови */}
          <div className="flex items-center gap-2 flex-1">
            <div className="bg-indigo-900/20 p-1.5 rounded-full">
              <MeteoconIcon condition={day.condition} size="sm" isDay={true} />
            </div>
            <p className="text-sm text-gray-300 hidden sm:block">
              {day.condition.split('-').join(' ')}
            </p>
          </div>
          
          {/* Опади */}
          <div className="hidden sm:flex items-center gap-1 w-16">
            <Droplets className="h-4 w-4 text-white" />
            <p className="text-sm text-gray-300">{day.precipitation}мм</p>
          </div>
          
          {/* Вітер */}
          <div className="flex items-center gap-1 w-20">
            <Wind className="h-4 w-4 text-white" />
            <p className="text-sm text-gray-300">{day.windSpeed} км/г</p>
          </div>
          
          {/* Температури */}
          <div className="flex items-center gap-1 w-16 sm:w-20">
            <p className="text-sm font-medium text-blue-300">{Math.round(day.temperatureMin)}°</p>
            <div className="h-0.5 w-4 bg-white/20 rounded-full"></div>
            <p className="text-sm font-medium text-indigo-200">{Math.round(day.temperatureMax)}°</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 