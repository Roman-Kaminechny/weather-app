"use client"

import { useEffect, useState } from 'react'

// Типи одягу для різних погодних умов
type ClothingType = 'summer' | 'light-jacket' | 'jacket' | 'winter' | 'rain' | 'snow'

// Головний компонент з 2D зображенням та погодними ефектами
export default function WeatherPerson3DModel({ 
  temperature, 
  conditionCode, 
  isDay 
}: { 
  temperature: number, 
  conditionCode: number, 
  isDay: boolean 
}) {
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    // Запуск анімації при монтуванні компонента
    setAnimationActive(true);
  }, [temperature, conditionCode]);

  // Визначення типу одягу залежно від температури та погодних умов
  const getClothingType = (): ClothingType => {
    // Спочатку визначаємо за температурою
    let type: ClothingType = 'summer';
    
    if (temperature <= -10) {
      type = 'winter';
    } else if (temperature <= 0) {
      type = 'winter';
    } else if (temperature <= 10) {
      type = 'jacket';
    } else if (temperature <= 15) {
      type = 'light-jacket';
    } else {
      type = 'summer';
    }
    
    // Потім коригуємо за погодними умовами
    if (conditionCode >= 51 && conditionCode <= 67) {
      // Дощ або мряка
      type = 'rain';
    } else if (conditionCode >= 71 && conditionCode <= 77 || conditionCode >= 85 && conditionCode <= 86) {
      // Сніг
      type = 'snow';
    }
    
    return type;
  }
  
  const clothingType = getClothingType();
  
  // Отримання кольору залежно від типу одягу (для фону)
  const getBackgroundColor = () => {
    if (!isDay) return '#0f172a'; // Темний фон для ночі
    
    switch (clothingType) {
      case 'summer': return '#bae6fd'; // Світло-блакитний для літа
      case 'light-jacket': return '#bae6fd'; // Світло-блакитний з хмарами
      case 'jacket': return '#cbd5e1'; // Сіруватий для осені
      case 'winter': return '#e2e8f0'; // Білуватий для зими
      case 'rain': return '#64748b'; // Сірий для дощу
      case 'snow': return '#f8fafc'; // Білий для снігу
      default: return '#bae6fd'; // Світло-блакитний за замовчуванням
    }
  }
  
  // Визначення типу погоди для відображення відповідних ефектів
  const getWeatherType = () => {
    if (conditionCode === 0) return isDay ? 'clear-day' : 'clear-night';
    if (conditionCode === 1) return isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
    if (conditionCode === 2 || conditionCode === 3) return 'cloudy';
    if (conditionCode >= 51 && conditionCode <= 57) return 'drizzle';
    if (conditionCode >= 61 && conditionCode <= 67) return 'rain';
    if (conditionCode >= 71 && conditionCode <= 77 || conditionCode >= 85 && conditionCode <= 86) return 'snow';
    if (conditionCode >= 95 && conditionCode <= 99) return 'thunderstorm';
    return isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
  }
  
  // Отримання опису одягу
  const getClothingDescription = () => {
    switch (clothingType) {
      case 'summer': 
        return 'Легкий одяг: футболка, шорти/легкі штани';
      case 'light-jacket': 
        return 'Легка куртка, довгі штани';
      case 'jacket': 
        return 'Куртка, теплі штани';
      case 'winter': 
        return 'Зимова куртка, шапка, шарф, теплі штани';
      case 'rain': 
        return 'Дощовик, парасолька, водонепроникне взуття';
      case 'snow': 
        return 'Зимовий одяг, шапка, рукавиці, зимове взуття';
      default: 
        return 'Звичайний одяг';
    }
  };
  
  // Рендер погодних ефектів залежно від типу погоди
  const renderWeatherEffects = () => {
    const weatherType = getWeatherType();
    
    switch (weatherType) {
      case 'rain':
      case 'drizzle':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, index) => (
              <div 
                key={index}
                className="absolute w-px h-10 bg-blue-300 opacity-70 animate-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 10}%`,
                  animationDuration: `${0.7 + Math.random() * 0.3}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        );
        
      case 'snow':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, index) => (
              <div 
                key={index}
                className="absolute w-2 h-2 rounded-full bg-white opacity-80 animate-snow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 10}%`,
                  animationDuration: `${3 + Math.random() * 5}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        );
        
      case 'thunderstorm':
        return (
          <>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, index) => (
                <div 
                  key={index}
                  className="absolute w-px h-10 bg-blue-300 opacity-70 animate-rain"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 10}%`,
                    animationDuration: `${0.7 + Math.random() * 0.3}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
              <div className="w-full h-full absolute">
                <div className="absolute inset-0 bg-yellow-400 opacity-0 animate-lightning" />
              </div>
            </div>
          </>
        );
        
      case 'clear-day':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-yellow-400 animate-pulse shadow-2xl"></div>
            {[...Array(5)].map((_, index) => (
              <div 
                key={index}
                className="absolute h-0.5 bg-yellow-200 animate-sunray"
                style={{
                  top: '1.5rem',
                  right: '4.5rem',
                  width: '5rem',
                  transformOrigin: 'right',
                  transform: `rotate(${index * 72}deg)`,
                  animationDelay: `${index * 0.2}s`
                }}
              />
            ))}
          </div>
        );
        
      case 'partly-cloudy-day':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-yellow-400 shadow-lg"></div>
            <div className="absolute top-8 right-0 h-10 w-20 rounded-full bg-white shadow-md animate-float-slow"></div>
            <div className="absolute top-5 left-5 h-8 w-16 rounded-full bg-white shadow-md animate-float opacity-90" 
              style={{ animationDelay: '1s' }}></div>
          </div>
        );
        
      case 'cloudy':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-4 h-10 w-20 rounded-full bg-gray-200 shadow-md animate-float-slow"></div>
            <div className="absolute top-10 right-10 h-8 w-16 rounded-full bg-gray-300 shadow-md animate-float opacity-90" 
              style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-5 left-5 h-12 w-24 rounded-full bg-gray-200 shadow-md animate-float" 
              style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-20 left-10 h-8 w-16 rounded-full bg-gray-300 shadow-md animate-float-slow" 
              style={{ animationDelay: '1.5s' }}></div>
          </div>
        );
        
      case 'clear-night':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-gray-200 shadow-md opacity-90"></div>
            {[...Array(8)].map((_, index) => (
              <div 
                key={index}
                className="absolute h-1 w-1 rounded-full bg-white animate-twinkle"
                style={{
                  top: `${10 + Math.random() * 50}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        );
        
      case 'partly-cloudy-night':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-gray-200 shadow-md opacity-90"></div>
            <div className="absolute top-8 right-0 h-8 w-16 rounded-full bg-gray-600 shadow-md animate-float-slow opacity-70"></div>
            {[...Array(5)].map((_, index) => (
              <div 
                key={index}
                className="absolute h-1 w-1 rounded-full bg-white animate-twinkle"
                style={{
                  top: `${10 + Math.random() * 50}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Рендер фігури людини з відповідним одягом
  const renderPerson = () => {
    return (
      <div className="relative w-48 h-72 mx-auto">
        {/* Голова */}
        <div className="absolute w-20 h-20 bg-amber-200 rounded-full left-1/2 -translate-x-1/2 top-0"></div>
        
        {/* Тіло - колір залежить від типу одягу */}
        <div 
          className={`absolute w-40 h-40 rounded-md left-1/2 -translate-x-1/2 top-16`}
          style={{ 
            backgroundColor: clothingType === 'summer' ? '#60a5fa' : 
                             clothingType === 'light-jacket' ? '#93c5fd' : 
                             clothingType === 'jacket' ? '#1e40af' : 
                             clothingType === 'winter' ? '#1e3a8a' : 
                             clothingType === 'rain' ? '#3b82f6' : 
                             clothingType === 'snow' ? '#f9fafb' : '#6b7280'
          }}
        ></div>
        
        {/* Ноги - колір залежить від типу одягу */}
        <div 
          className="absolute w-12 h-32 left-1/4 top-48"
          style={{ 
            backgroundColor: clothingType === 'summer' ? '#d1d5db' : '#4b5563'
          }}
        ></div>
        <div 
          className="absolute w-12 h-32 right-1/4 top-48"
          style={{ 
            backgroundColor: clothingType === 'summer' ? '#d1d5db' : '#4b5563'
          }}
        ></div>
        
        {/* Аксесуари в залежності від погоди */}
        {clothingType === 'rain' && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-16">
            <div className="w-48 h-5 bg-blue-500 rounded-full"></div>
            <div className="absolute w-2 h-24 bg-gray-600 left-1/2 -translate-x-1/2 top-5"></div>
          </div>
        )}
        
        {clothingType === 'winter' && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-8 bg-gray-200 rounded-full"></div>
        )}
        
        {clothingType === 'snow' && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-8 bg-white rounded-full"></div>
        )}
      </div>
    );
  };
  
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center">
      <div
        className="w-full h-[400px] rounded-lg overflow-hidden relative"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        {/* Погодні ефекти */}
        {renderWeatherEffects()}
        
        {/* Фігура людини */}
        <div className="absolute inset-0 flex items-center justify-center">
          {renderPerson()}
        </div>
      </div>
      <div className="mt-4 text-center text-blue-800 font-medium">
        <p>{getClothingDescription()}</p>
      </div>
    </div>
  )
} 