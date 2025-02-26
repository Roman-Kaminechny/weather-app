"use client"

import { motion } from 'framer-motion';

// Анімаційні варіанти для іконок
const iconVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

// Стилі для SVG елементів
const sunColor = '#fbbf24'; // amber-400
const cloudColor = '#e2e8f0'; // slate-200
const rainColor = '#93c5fd'; // blue-300
const snowColor = '#cbd5e1'; // slate-300
const stormColor = '#fde68a'; // amber-200
const fogColor = '#94a3b8'; // slate-400
const moonColor = '#d1d5db'; // gray-300

interface WeatherIconProps {
  condition: string;
  isDay?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function WeatherIcon({ 
  condition, 
  isDay = true, 
  size = 'md',
  className = ''
}: WeatherIconProps) {
  // Визначення розміру SVG іконки
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };
  
  const sizeClass = sizeMap[size];
  
  // Рендер відповідної іконки в залежності від умов погоди
  switch (condition) {
    case 'clear-sky':
      return isDay ? (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            <circle cx="32" cy="32" r="12" fill={sunColor} />
            <g>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.line
                  key={`ray-${i}`}
                  x1="32"
                  y1="32"
                  x2={32 + 16 * Math.cos(angle * Math.PI / 180)}
                  y2={32 + 16 * Math.sin(angle * Math.PI / 180)}
                  stroke={sunColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ opacity: 0.6, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.6, 1, 0.6], 
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: i * 0.2 
                  }}
                />
              ))}
            </g>
          </g>
        </motion.svg>
      ) : (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            <motion.path
              d="M36,24 a12,12 0 1,0 0,24 a12,12 0 0,0 0,-24 M36,24 a10,10 0 0,1 -10,-10"
              fill={moonColor}
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={`star-${i}`}
                cx={15 + i * 8}
                cy={15 + (i % 3) * 10}
                r={0.8 + (i % 2) * 0.4}
                fill="#ffffff"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ 
                  duration: 2 + (i % 3), 
                  repeat: Infinity,
                  delay: i * 0.5 
                }}
              />
            ))}
          </g>
        </motion.svg>
      );
      
    case 'partly-cloudy':
      return isDay ? (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            <circle cx="24" cy="24" r="10" fill={sunColor} />
            <g>
              {[45, 90, 135, 180].map((angle, i) => (
                <motion.line
                  key={`ray-${i}`}
                  x1="24"
                  y1="24"
                  x2={24 + 12 * Math.cos(angle * Math.PI / 180)}
                  y2={24 + 12 * Math.sin(angle * Math.PI / 180)}
                  stroke={sunColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ opacity: 0.6, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.6, 1, 0.6], 
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: i * 0.2 
                  }}
                />
              ))}
            </g>
            <motion.path
              d="M46,40 a8,8 0 0,0 -16,0 a8,6 0 0,0 -8,6 a8,6 0 0,0 8,6 h16 a8,6 0 0,0 8,-6 a8,6 0 0,0 -8,-6 z"
              fill={cloudColor}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </g>
        </motion.svg>
      ) : (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            <motion.path
              d="M28,22 a8,8 0 1,0 0,16 a8,8 0 0,0 0,-16 M28,22 a6,6 0 0,1 -6,-6"
              fill={moonColor}
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
              d="M46,40 a8,8 0 0,0 -16,0 a8,6 0 0,0 -8,6 a8,6 0 0,0 8,6 h16 a8,6 0 0,0 8,-6 a8,6 0 0,0 -8,-6 z"
              fill={cloudColor}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </g>
        </motion.svg>
      );
      
    case 'cloudy':
      return (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            <motion.path
              d="M46,36 a8,8 0 0,0 -16,0 a8,6 0 0,0 -8,6 a8,6 0 0,0 8,6 h16 a8,6 0 0,0 8,-6 a8,6 0 0,0 -8,-6 z"
              fill={cloudColor}
              initial={{ y: 5, opacity: 0.8 }}
              animate={{ y: [5, 0, 5], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
              d="M32,26 a8,8 0 0,0 -16,0 a8,6 0 0,0 -8,6 a8,6 0 0,0 8,6 h16 a8,6 0 0,0 8,-6 a8,6 0 0,0 -8,-6 z"
              fill="white"
              initial={{ y: -5, opacity: 0.9 }}
              animate={{ y: [-5, 0, -5], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
            />
          </g>
        </motion.svg>
      );
      
    case 'rain':
      return (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            <motion.path
              d="M46,30 a8,8 0 0,0 -16,0 a8,6 0 0,0 -8,6 a8,6 0 0,0 8,6 h16 a8,6 0 0,0 8,-6 a8,6 0 0,0 -8,-6 z"
              fill={cloudColor}
              initial={{ y: 0 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            />
            {[25, 32, 39, 46].map((x, i) => (
              <motion.line
                key={`rain-${i}`}
                x1={x}
                y1="45"
                x2={x - 2}
                y2="55"
                stroke={rainColor}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ y: -10, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  repeatDelay: 0.2
                }}
              />
            ))}
          </g>
        </motion.svg>
      );
      
    case 'snow':
      return (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            <motion.path
              d="M46,30 a8,8 0 0,0 -16,0 a8,6 0 0,0 -8,6 a8,6 0 0,0 8,6 h16 a8,6 0 0,0 8,-6 a8,6 0 0,0 -8,-6 z"
              fill={cloudColor}
              initial={{ y: 0 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            />
            {[24, 32, 40, 28, 36].map((x, i) => (
              <motion.circle
                key={`snow-${i}`}
                cx={x}
                cy={48 + (i % 2) * 8}
                r="1.5"
                fill={snowColor}
                initial={{ y: -10, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: [0, 1, 0],
                  rotate: 180
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  repeatDelay: 0.1
                }}
              />
            ))}
          </g>
        </motion.svg>
      );
    
    case 'thunderstorm':
      return (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            <motion.path
              d="M46,30 a8,8 0 0,0 -16,0 a8,6 0 0,0 -8,6 a8,6 0 0,0 8,6 h16 a8,6 0 0,0 8,-6 a8,6 0 0,0 -8,-6 z"
              fill={cloudColor}
              initial={{ y: 0 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
            />
            <motion.path
              d="M33,44 l-3,6 l6,0 l-3,8"
              stroke={stormColor}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                pathLength: [0, 1, 1, 1],
              }}
              transition={{ 
                duration: 2,
                times: [0, 0.3, 0.9, 1],
                repeat: Infinity, 
                repeatDelay: 2
              }}
            />
            {[28, 38].map((x, i) => (
              <motion.line
                key={`rain-${i}`}
                x1={x}
                y1="45"
                x2={x - 2}
                y2="52"
                stroke={rainColor}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ y: -10, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.4 + 0.5,
                  repeatDelay: 0.2
                }}
              />
            ))}
          </g>
        </motion.svg>
      );
      
    case 'fog':
      return (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            {[22, 28, 34, 40, 46].map((y, i) => (
              <motion.line
                key={`fog-${i}`}
                x1="15"
                y1={y}
                x2="49"
                y2={y}
                stroke={fogColor}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ x: 0, opacity: 0.6 }}
                animate={{ 
                  x: [-5, 5, -5], 
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{ 
                  duration: 3 + (i % 2), 
                  repeat: Infinity,
                  delay: i * 0.2 
                }}
              />
            ))}
          </g>
        </motion.svg>
      );
      
    case 'drizzle':
      return (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            <motion.path
              d="M46,30 a8,8 0 0,0 -16,0 a8,6 0 0,0 -8,6 a8,6 0 0,0 8,6 h16 a8,6 0 0,0 8,-6 a8,6 0 0,0 -8,-6 z"
              fill={cloudColor}
              initial={{ y: 0 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            />
            {[26, 32, 38, 44].map((x, i) => (
              <motion.line
                key={`drizzle-${i}`}
                x1={x}
                y1="45"
                x2={x - 1}
                y2="50"
                stroke={rainColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ y: -5, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: [0, 1, 0],
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                }}
              />
            ))}
          </g>
        </motion.svg>
      );
      
    default:
      return (
        <motion.svg
          className={`${sizeClass} ${className}`}
          viewBox="0 0 64 64"
          variants={iconVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <g>
            <circle cx="32" cy="32" r="16" fill="#cbd5e1" />
            <text x="32" y="36" textAnchor="middle" fontSize="12" fill="#475569">?</text>
          </g>
        </motion.svg>
      );
  }
} 