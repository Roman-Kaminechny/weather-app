"use client"

import { useState, useEffect } from 'react'

// Типи одягу для різних погодних умов
type ClothingType = 'summer' | 'light-jacket' | 'jacket' | 'winter' | 'rain' | 'snow'

// Основний компонент для відображення персонажа
export default function WeatherPersonModel({ 
  temperature, 
  conditionCode, 
  isDay 
}: { 
  temperature: number, 
  conditionCode: number, 
  isDay: boolean 
}) {
  const [rotation, setRotation] = useState(0);
  
  // Анімація обертання
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 10);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
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
  
  // Отримання кольорів для різних частин одягу
  const getBodyColor = () => {
    switch (clothingType) {
      case 'summer': return '#60a5fa';
      case 'light-jacket': return '#93c5fd';
      case 'jacket': return '#1e40af';
      case 'winter': return '#1e3a8a';
      case 'rain': return '#3b82f6';
      case 'snow': return '#f9fafb';
      default: return '#6b7280';
    }
  };
  
  const getLegsColor = () => {
    switch (clothingType) {
      case 'summer': return '#d1d5db';
      default: return '#4b5563';
    }
  };
  
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
  
  // Функція для відображення аксесуарів
  const renderAccessories = () => {
    if (clothingType === 'rain') {
      return (
        <g transform="translate(0, -20)">
          {/* Парасолька */}
          <line x1="0" y1="0" x2="0" y2="30" stroke="#555" strokeWidth="3" />
          <path d="M-30,0 C-20,-15 20,-15 30,0" fill="#3b82f6" stroke="#3b82f6" strokeWidth="2" />
        </g>
      );
    }
    
    if (clothingType === 'winter') {
      return (
        <g transform="translate(0, -10)">
          {/* Шапка */}
          <ellipse cx="0" cy="-45" rx="15" ry="7" fill="#e5e7eb" />
        </g>
      );
    }
    
    if (clothingType === 'summer' && isDay) {
      return (
        <g transform="translate(0, -10)">
          {/* Сонцезахисні окуляри */}
          <rect x="-15" y="-40" width="30" height="5" fill="#000" />
        </g>
      );
    }
    
    return null;
  };
  
  // Невеликий рух для анімації
  const offsetX = Math.sin(rotation * 0.2) * 5;
  
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <svg 
          viewBox="-50 -100 100 150" 
          width="100%" 
          height="100%" 
          className="max-w-[300px] max-h-[300px]"
        >
          {/* Голова */}
          <circle cx={offsetX} cy="-40" r="15" fill="#f8d5c2" />
          
          {/* Тіло */}
          <rect x={offsetX - 15} y="-25" width="30" height="50" rx="5" fill={getBodyColor()} />
          
          {/* Руки */}
          <rect x={offsetX - 35} y="-20" width="20" height="10" rx="5" fill={getBodyColor()} />
          <rect x={offsetX + 15} y="-20" width="20" height="10" rx="5" fill={getBodyColor()} />
          
          {/* Ноги */}
          <rect x={offsetX - 15} y="25" width="10" height="30" rx="3" fill={getLegsColor()} />
          <rect x={offsetX + 5} y="25" width="10" height="30" rx="3" fill={getLegsColor()} />
          
          {/* Аксесуари */}
          <g transform={`translate(${offsetX}, 0)`}>
            {renderAccessories()}
          </g>
        </svg>
        
        <div className="mt-4 text-center text-blue-800 font-medium">
          <p>{getClothingDescription()}</p>
        </div>
      </div>
    </div>
  )
} 