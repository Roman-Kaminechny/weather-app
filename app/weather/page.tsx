"use client"

import { SimpleWeatherWidget } from "@/components/simple-weather-widget"
import { motion } from "framer-motion"

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950">
      <SimpleWeatherWidget />
    </div>
  )
} 