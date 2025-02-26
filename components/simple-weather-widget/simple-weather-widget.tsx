"use client"

import { useState, useCallback, useEffect } from 'react'
import { 
  OpenMeteoWeatherData, 
  DailyForecast,
  getOpenMeteoWeatherData
} from './open-meteo-service'
import { cn } from '@/lib/utils'
import MeteoconIcon from './meteocon-icon'
import Weather10DayForecast from './weather-10day-forecast'
import WeatherTemperatureChart from './weather-temperature-chart'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search,
  Droplets,
  Wind,
  Thermometer,
  Clock,
  Loader2,
  Eye
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Анімаційні варіанти
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

const cityVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function SimpleWeatherWidget() {
  const [city, setCity] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [weatherData, setWeatherData] = useState<OpenMeteoWeatherData | null>(null)
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  
  // Функція для форматування часу
  const formatTime = (timeString: string) => {
    if (!timeString) return "N/A";
    return timeString; // Дані вже приходять у потрібному форматі
  }
  
  // Функція для форматування дати
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
  }
  
  // Отримання погоди для міста
  const fetchWeather = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await getOpenMeteoWeatherData(cityName)
      setWeatherData(data)
      setDailyForecast(data.dailyForecast || [])
      setCity(cityName)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Помилка отримання даних про погоду')
      setWeatherData(null)
      setDailyForecast([])
    } finally {
      setLoading(false)
    }
  }, [])
  
  const handleSearch = useCallback(() => {
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim())
    }
  }, [searchInput, fetchWeather])
  
  // Перевірка, чи це ніч
  const isNight = useCallback(() => {
    if (!weatherData) return false
    
    const now = new Date()
    const hours = now.getHours()
    return hours < 6 || hours >= 20
  }, [weatherData])
  
  // Ініціалізація з Києва при першому рендері
  useEffect(() => {
    fetchWeather('Київ')
  }, [fetchWeather])
  
  return (
    <div className="min-h-screen flex flex-col w-screen bg-gradient-to-br from-slate-950 to-indigo-950">
      <div className="w-[80%] mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200"
            >
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col gap-6">
          {/* Пошук */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  type="text" 
                  value={searchInput} 
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Введіть назву міста..."
                  className="pl-10 bg-slate-800/60 border-slate-700 text-slate-200 placeholder:text-slate-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Пошук'}
              </Button>
            </div>
          </motion.div>
          
          {/* Основний контент віджету */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {loading ? (
              <motion.div 
                className="col-span-full flex justify-center items-center p-20"
                variants={itemVariants}
              >
                <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
              </motion.div>
            ) : weatherData ? (
              <>
                {/* Основна інформація про погоду */}
                <motion.div 
                  className="col-span-full md:col-span-6"
                  variants={itemVariants}
                >
                  <Card className="overflow-hidden border-slate-700/50 bg-slate-800/30 backdrop-blur-sm h-full">
                    <CardHeader className="pb-2">
                      <motion.div variants={cityVariants}>
                        <CardTitle className="text-xl text-slate-100 flex items-center gap-2">
                          {city}
                          <Badge variant="outline" className="text-xs font-normal text-indigo-300 border-indigo-500/30">
                            Україна
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-slate-400 text-xs">
                          {new Date().toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </CardDescription>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-start gap-3">
                        <div className="flex flex-col items-start">
                          <MeteoconIcon 
                            condition={weatherData.condition.toLowerCase().replace(/\s+/g, '-')} 
                            isDay={weatherData.isDay} 
                            size="xxl"
                            className="mb-0"
                          />
                          <p className="text-lg font-medium text-slate-300 capitalize mt-1">
                            {weatherData.condition}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-start mt-0 w-full">
                          <div className="text-5xl font-bold text-slate-100 mb-3">
                            {Math.round(weatherData.temperature)}°C
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 w-full">
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-white" />
                              <span className="text-xs text-slate-300">
                                Відчувається як{" "}
                                <span className="font-medium text-slate-200">
                                  {Math.round(weatherData.temperature)}°C
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Wind className="h-4 w-4 text-white" />
                              <span className="text-xs text-slate-300">
                                Вітер{" "}
                                <span className="font-medium text-slate-200">
                                  {Math.round(weatherData.windSpeed)} км/г
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Droplets className="h-4 w-4 text-white" />
                              <span className="text-xs text-slate-300">
                                Вологість{" "}
                                <span className="font-medium text-slate-200">
                                  {weatherData.humidity}%
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4 text-white" />
                              <span className="text-xs text-slate-300">
                                Видимість{" "}
                                <span className="font-medium text-slate-200">
                                  10 км
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-6 pt-3 border-t border-slate-700/40">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-white" />
                          <div className="flex flex-col">
                            <span className="text-sm text-slate-400">Схід сонця</span>
                            <span className="text-base font-medium text-slate-300">{formatTime(weatherData.sunrise)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-white" />
                          <div className="flex flex-col">
                            <span className="text-sm text-slate-400">Захід сонця</span>
                            <span className="text-base font-medium text-slate-300">{formatTime(weatherData.sunset)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Прогноз на 10 днів */}
                <motion.div 
                  className="col-span-full md:col-span-6"
                  variants={itemVariants}
                >
                  <Card className="h-full border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-slate-100">Прогноз на 10 днів</CardTitle>
                      <CardDescription className="text-slate-400">
                        {city}, Україна
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 overflow-y-auto" style={{ maxHeight: '350px' }}>
                      <Weather10DayForecast forecast={dailyForecast} />
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Графік температури та вітру */}
                <motion.div 
                  className="col-span-full"
                  variants={itemVariants}
                >
                  <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-slate-100">Графіки температури та вітру</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <WeatherTemperatureChart forecast={dailyForecast} />
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            ) : (
              <motion.div 
                className="col-span-full text-center p-10 text-slate-400"
                variants={itemVariants}
              >
                Введіть назву міста для пошуку
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 