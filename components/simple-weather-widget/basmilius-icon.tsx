"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';

// Типи іконок basmilius/weather-icons
type IconStyle = 'fill' | 'line' | 'monochrome';

// Типи умов погоди, для яких існують іконки
type WeatherCondition = 
  | 'clear-day'
  | 'clear-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'overcast'
  | 'drizzle'
  | 'rain'
  | 'rain-snow'
  | 'snow'
  | 'flurries'
  | 'fog'
  | 'thunderstorms'
  | 'thunderstorms-rain'
  | 'thunderstorms-snow'
  | 'wind'
  | 'tornado'
  | 'hurricane'
  | 'hail';

interface BasmiliusIconProps {
  condition: string;
  style?: IconStyle;
  isDay?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

// Анімаційні варіанти для іконок
const iconVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

/**
 * Компонент для відображення іконок погоди з basmilius/weather-icons
 */
export default function BasmiliusIcon({ 
  condition, 
  style = 'fill',
  isDay = true, 
  size = 'md',
  className = '',
  animate = true
}: BasmiliusIconProps) {
  // Визначення розміру іконки
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };
  
  const sizeClass = sizeMap[size];
  
  // Конвертування внутрішнього формату умови погоди в формат basmilius
  const getIconName = (condition: string, isDay: boolean): string => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition === 'clear-sky' || lowerCondition === 'mainly-clear') {
      return isDay ? 'clear-day' : 'clear-night';
    }
    
    if (lowerCondition === 'partly-cloudy') {
      return isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
    }
    
    if (lowerCondition === 'cloudy' || lowerCondition === 'overcast') {
      return 'cloudy';
    }
    
    if (lowerCondition === 'fog') {
      return 'fog';
    }
    
    if (lowerCondition === 'drizzle') {
      return 'drizzle';
    }
    
    if (lowerCondition === 'rain' || lowerCondition.includes('rain')) {
      return 'rain';
    }
    
    if (lowerCondition === 'snow' || lowerCondition.includes('snow')) {
      return 'snow';
    }
    
    if (lowerCondition === 'thunderstorm') {
      return 'thunderstorms';
    }
    
    // За замовчуванням
    return 'cloudy';
  };
  
  // Отримання шляху до іконки
  const iconName = getIconName(condition, isDay);
  const iconPath = `/weather-icons/${iconName}.svg`;
  
  return (
    <motion.div
      className={`${sizeClass} ${className}`}
      variants={animate ? iconVariants : undefined}
      whileHover={animate ? "hover" : undefined}
      whileTap={animate ? "tap" : undefined}
    >
      <Image 
        src={iconPath}
        alt={`Weather condition: ${condition}`}
        width={64}
        height={64}
        className="w-full h-full"
      />
    </motion.div>
  );
} 