"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SimpleWeatherWidgetTest() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Імітуємо завантаження даних
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Тестовий віджет погоди</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Завантаження...</div>
        ) : (
          <div>
            <p className="text-2xl font-bold">Київ</p>
            <p className="text-4xl font-bold mt-2">25°C</p>
            <p className="mt-2">Сонячно</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 