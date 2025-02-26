"use client"

import { useState } from 'react';
import { DailyForecast } from './open-meteo-service';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Area, 
  AreaChart, 
  ComposedChart,
  Bar
} from 'recharts';
import { motion } from 'framer-motion';
import { Thermometer, Wind } from 'lucide-react';

// Кольори для графіка
const colors = {
  temperatureMax: {
    stroke: '#fb7185', // rose-400
    fill: 'rgba(251, 113, 133, 0.15)',
  },
  temperatureMin: {
    stroke: '#38bdf8', // sky-400
    fill: 'rgba(56, 189, 248, 0.15)',
  },
  wind: {
    stroke: '#a5b4fc', // indigo-300
    fill: 'rgba(165, 180, 252, 0.15)',
  },
  axisLabel: '#94a3b8', // slate-400
  gridLine: 'rgba(255, 255, 255, 0.05)',
  tooltipBackground: 'rgba(30, 41, 59, 0.9)', // slate-800
  tooltipText: '#f8fafc', // slate-50
}

// Градієнти для графіків
const tempMaxGradientOffset = {
  '0%': 'rgba(251, 113, 133, 0.3)',
  '100%': 'rgba(251, 113, 133, 0)',
}

const tempMinGradientOffset = {
  '0%': 'rgba(56, 189, 248, 0.3)',
  '100%': 'rgba(56, 189, 248, 0)',
}

const windGradientOffset = {
  '0%': 'rgba(165, 180, 252, 0.3)',
  '100%': 'rgba(165, 180, 252, 0)',
}

// Форматування дати для осі X
const formatDate = (dateStr: string) => {
  if (!dateStr) return "Н/Д";
  
  try {
    // Перевірка, чи дата вже відформатована (містить день і місяць)
    if (dateStr.includes('.') || dateStr.includes(' ')) {
      return dateStr;
    }
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Н/Д";
    
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
  } catch (error) {
    return "Н/Д";
  }
}

// Кастомний тултіп
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label)
    const formattedDate = date.toLocaleDateString('uk-UA', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })

    return (
      <div className="rounded-lg bg-slate-800 p-3 shadow-lg border border-slate-700">
        <p className="text-sm font-medium text-slate-300 mb-2">{formattedDate}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-xs text-slate-300">
              {entry.name === 'temperatureMax' && 'Макс. темп.'}
              {entry.name === 'temperatureMin' && 'Мін. темп.'}
              {entry.name === 'windSpeed' && 'Швидкість вітру'}
              : <span className="font-medium text-slate-100">
                {entry.value}
                {entry.name.includes('temperature') ? '°C' : ' км/г'}
              </span>
            </p>
          </div>
        ))}
      </div>
    )
  }

  return null
}

// Компонент для відображення графіка температури та вітру
export default function WeatherTemperatureChart({ 
  forecast 
}: { 
  forecast: DailyForecast[] 
}) {
  const [activeTab, setActiveTab] = useState('temp');
  
  if (!forecast || forecast.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <p className="text-center text-gray-500">Немає даних для графіка</p>
        </CardContent>
      </Card>
    );
  }
  
  // Підготувати дані для графіка
  const chartData = forecast.map(day => ({
    date: day.date,
    temperatureMax: Math.round(day.temperatureMax),
    temperatureMin: Math.round(day.temperatureMin),
    windSpeed: Math.round(day.windSpeed),
  }));
  
  // Розрахунок максимальних і мінімальних значень
  const maxTemp = Math.max(...forecast.map((d) => d.temperatureMax));
  const minTemp = Math.min(...forecast.map((d) => d.temperatureMin));
  const tempRange = Math.max(Math.abs(maxTemp - minTemp), 10);
  
  const tempDomain = [
    Math.floor(minTemp - 2), 
    Math.ceil(maxTemp + 2)
  ];
  
  const maxWind = Math.max(...forecast.map((d) => d.windSpeed));
  const windDomain = [0, Math.ceil(maxWind * 1.2)];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-0.5"
    >
      <Tabs defaultValue="temp" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-slate-200">Графік температури і вітру</h3>
          <TabsList className="bg-slate-800/70 border border-slate-700">
            <TabsTrigger 
              value="temp" 
              className="text-xs data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300"
            >
              <Thermometer className="h-3.5 w-3.5 mr-1.5" />
              Температура
            </TabsTrigger>
            <TabsTrigger 
              value="combined" 
              className="text-xs data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300"
            >
              <Wind className="h-3.5 w-3.5 mr-1.5" />
              Температура + вітер
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="temp" className="mt-0">
          <div className="rounded-lg bg-slate-800/30 border border-slate-700/50 p-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="tempMaxGradient" x1="0" y1="0" x2="0" y2="1">
                    {Object.entries(tempMaxGradientOffset).map(([offset, color]) => (
                      <stop key={offset} offset={offset} stopColor={color} />
                    ))}
                  </linearGradient>
                  <linearGradient id="tempMinGradient" x1="0" y1="0" x2="0" y2="1">
                    {Object.entries(tempMinGradientOffset).map(([offset, color]) => (
                      <stop key={offset} offset={offset} stopColor={color} />
                    ))}
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate} 
                  stroke={colors.axisLabel}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={tempDomain} 
                  stroke={colors.axisLabel}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}°`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  formatter={(value) => {
                    return value === 'temperatureMax' ? 'Максимальна' : 'Мінімальна'
                  }}
                  wrapperStyle={{ fontSize: '12px', color: colors.axisLabel }}
                />
                <Area
                  type="monotone"
                  dataKey="temperatureMax"
                  name="temperatureMax"
                  stroke={colors.temperatureMax.stroke}
                  fill="url(#tempMaxGradient)"
                  dot={{ stroke: colors.temperatureMax.stroke, strokeWidth: 2, r: 4, fill: '#1e293b' }}
                  activeDot={{ stroke: colors.temperatureMax.stroke, strokeWidth: 2, r: 6, fill: '#1e293b' }}
                />
                <Area
                  type="monotone"
                  dataKey="temperatureMin"
                  name="temperatureMin"
                  stroke={colors.temperatureMin.stroke}
                  fill="url(#tempMinGradient)"
                  dot={{ stroke: colors.temperatureMin.stroke, strokeWidth: 2, r: 4, fill: '#1e293b' }}
                  activeDot={{ stroke: colors.temperatureMin.stroke, strokeWidth: 2, r: 6, fill: '#1e293b' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="combined" className="mt-0">
          <div className="rounded-lg bg-slate-800/30 border border-slate-700/50 p-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="tempMaxGradient2" x1="0" y1="0" x2="0" y2="1">
                    {Object.entries(tempMaxGradientOffset).map(([offset, color]) => (
                      <stop key={offset} offset={offset} stopColor={color} />
                    ))}
                  </linearGradient>
                  <linearGradient id="tempMinGradient2" x1="0" y1="0" x2="0" y2="1">
                    {Object.entries(tempMinGradientOffset).map(([offset, color]) => (
                      <stop key={offset} offset={offset} stopColor={color} />
                    ))}
                  </linearGradient>
                  <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                    {Object.entries(windGradientOffset).map(([offset, color]) => (
                      <stop key={offset} offset={offset} stopColor={color} />
                    ))}
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate} 
                  stroke={colors.axisLabel}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="left"
                  domain={tempDomain}
                  stroke={colors.axisLabel}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}°`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={windDomain}
                  stroke={colors.wind.stroke}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => {
                    if (value === 'temperatureMax') return 'Максимальна'
                    if (value === 'temperatureMin') return 'Мінімальна'
                    if (value === 'windSpeed') return 'Швидкість вітру'
                    return value
                  }}
                  wrapperStyle={{ fontSize: '12px', color: colors.axisLabel }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperatureMax"
                  name="temperatureMax"
                  stroke={colors.temperatureMax.stroke}
                  fill="url(#tempMaxGradient2)"
                  dot={{ stroke: colors.temperatureMax.stroke, strokeWidth: 2, r: 3, fill: '#1e293b' }}
                  activeDot={{ stroke: colors.temperatureMax.stroke, strokeWidth: 2, r: 5, fill: '#1e293b' }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperatureMin"
                  name="temperatureMin"
                  stroke={colors.temperatureMin.stroke}
                  fill="url(#tempMinGradient2)"
                  dot={{ stroke: colors.temperatureMin.stroke, strokeWidth: 2, r: 3, fill: '#1e293b' }}
                  activeDot={{ stroke: colors.temperatureMin.stroke, strokeWidth: 2, r: 5, fill: '#1e293b' }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="windSpeed"
                  name="windSpeed"
                  stroke={colors.wind.stroke}
                  strokeWidth={2}
                  dot={{ stroke: colors.wind.stroke, strokeWidth: 2, r: 3, fill: '#1e293b' }}
                  activeDot={{ stroke: colors.wind.stroke, strokeWidth: 2, r: 5, fill: '#1e293b' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
} 