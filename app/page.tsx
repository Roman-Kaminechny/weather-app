"use client"

import { SimpleWeatherWidget } from "@/components/simple-weather-widget"

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 flex justify-center items-center">
      <SimpleWeatherWidget />
    </div>
  )
} 