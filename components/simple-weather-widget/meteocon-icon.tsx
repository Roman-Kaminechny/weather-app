"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloudy,
  WiRain,
  WiSnow,
  WiFog,
  WiThunderstorm,
  WiShowers,
  WiDayHaze,
  WiNightFog,
  WiNightShowers,
  WiNightSnow,
  WiNightThunderstorm,
  WiBarometer,
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset
} from "react-icons/wi";

interface MeteoconIconProps {
  condition: string;
  isDay: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
}

// Розміри іконок
const sizeMap = {
  sm: 24,
  md: 40,
  lg: 56,
  xl: 100,
  xxl: 120,
};

// Кольори для іконок
const colors = {
  sun: '#FFD700', // золотий
  moon: '#E1E1E1', // сріблястий
  cloud: '#F8F8FF', // білий
  rain: '#6495ED', // синій
  snow: '#F0F8FF', // світло-блакитний
  lightning: '#FFA500', // помаранчевий
  fog: '#D3D3D3', // світло-сірий
  drizzle: '#87CEFA', // світло-блакитний
  hail: '#B0E0E6', // світло-блакитний
};

// Анімаційні варіанти
const sunRotate = {
  animate: {
    rotate: 360,
    transition: { 
      duration: 20, 
      repeat: Infinity, 
      ease: "linear" 
    }
  }
};

const cloudFloat = {
  animate: {
    y: [0, -5, 0],
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
};

const rainDrop = {
  animate: {
    y: [0, 10],
    opacity: [1, 0.7],
    transition: { 
      duration: 1, 
      repeat: Infinity, 
      ease: "easeIn",
      repeatType: "loop"
    }
  }
};

const snowFall = {
  animate: {
    y: [0, 10],
    x: [0, 2, 0, -2, 0],
    opacity: [1, 0.7],
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
};

const lightningFlash = {
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [0.95, 1.05, 0.95],
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut",
      repeatDelay: 3
    }
  }
};

const fogMove = {
  animate: {
    x: [0, 5, 0, -5, 0],
    transition: { 
      duration: 5, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  }
};

// Компонент для відображення іконки погоди
const MeteoconIcon: React.FC<MeteoconIconProps> = ({ 
  condition, 
  isDay = true, 
  size = 'md',
  className = '',
}) => {
  const iconSize = sizeMap[size];
  
  // Розширюємо renderIcon для використання нових іконок
  const renderIcon = () => {
    const getWeatherIcon = () => {
      const iconProps = {
        size: iconSize,
        style: { color: isDay ? colors.sun : colors.moon }
      };

      switch (condition.toLowerCase()) {
        case 'clear-sky':
          return isDay ? <WiDaySunny {...iconProps} /> : <WiNightClear {...iconProps} />;
        case 'partly-cloudy':
          return isDay ? <WiDayCloudy {...iconProps} /> : <WiNightAltCloudy {...iconProps} />;
        case 'cloudy':
          return <WiCloudy {...iconProps} style={{ color: colors.cloud }} />;
        case 'rain':
          return isDay ? <WiRain {...iconProps} style={{ color: colors.rain }} /> : 
                        <WiNightShowers {...iconProps} style={{ color: colors.rain }} />;
        case 'snow':
          return isDay ? <WiSnow {...iconProps} style={{ color: colors.snow }} /> :
                        <WiNightSnow {...iconProps} style={{ color: colors.snow }} />;
        case 'fog':
          return isDay ? <WiFog {...iconProps} style={{ color: colors.fog }} /> :
                        <WiNightFog {...iconProps} style={{ color: colors.fog }} />;
        case 'thunderstorm':
          return isDay ? <WiThunderstorm {...iconProps} style={{ color: colors.lightning }} /> :
                        <WiNightThunderstorm {...iconProps} style={{ color: colors.lightning }} />;
        case 'drizzle':
          return isDay ? <WiShowers {...iconProps} style={{ color: colors.drizzle }} /> :
                        <WiNightShowers {...iconProps} style={{ color: colors.drizzle }} />;
        case 'haze':
          return isDay ? <WiDayHaze {...iconProps} style={{ color: colors.fog }} /> :
                        <WiNightFog {...iconProps} style={{ color: colors.fog }} />;
        default:
          return isDay ? <WiDaySunny {...iconProps} /> : <WiNightClear {...iconProps} />;
      }
    };

    return (
      <motion.div
        className={`inline-flex items-center justify-center ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {getWeatherIcon()}
      </motion.div>
    );
  };
  
  return (
    <div className={className}>
      {renderIcon()}
    </div>
  );
};

export default MeteoconIcon; 