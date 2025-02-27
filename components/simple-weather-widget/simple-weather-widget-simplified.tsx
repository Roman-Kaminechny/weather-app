"use client"

import { useState, useCallback, useEffect } from 'react'
import { 
  OpenMeteoWeatherData, 
  getOpenMeteoWeatherData
} from './open-meteo-service'
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SimpleWeatherWidgetSimplified() {
  const [city, setCity] = useState('Київ')
  const [inputCity, setInputCity] = useState('Київ')
  const [weather, setWeather] = useState<OpenMeteoWeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = useCallback(async () => {
    if (!city) return
    
    setLoading(true)
    setError(null)
    
    try {
      console.log('Fetching weather for city:', city);
      const data = await getOpenMeteoWeatherData(city)
      console.log('Weather data received:', data);
      setWeather(data)
    } catch (err) {
      console.error('Error fetching weather:', err)
      setError('Не вдалося отримати дані про погоду. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }, [city])

  // Автоматично завантажуємо погоду при першому рендерингу
  useEffect(() => {
    console.log('Component mounted, fetching weather...');
    fetchWeather()
  }, [fetchWeather])

  const handleSearch = () => {
    setCity(inputCity)
    fetchWeather()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Погода</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="Введіть місто" 
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        {weather && !loading && (
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{weather.location}</h2>
                <p className="text-4xl font-bold mt-2">{Math.round(weather.temperature)}°C</p>
                <p className="mt-1">{weather.condition}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Вологість</p>
                  <p className="font-medium">{weather.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Вітер</p>
                  <p className="font-medium">{weather.windSpeed} км/год</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Тиск</p>
                  <p className="font-medium">{weather.pressure} гПа</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Видимість</p>
                  <p className="font-medium">Хороша</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </CardContent>
    </Card>
  )
} 