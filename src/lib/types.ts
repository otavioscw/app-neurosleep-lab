export interface SleepRecord {
  id: string
  date: string
  bedTime: string
  wakeTime: string
  sleepDuration: number // em horas
  sleepQuality: 1 | 2 | 3 | 4 | 5 // 1-5 estrelas
  deepSleepPercentage?: number
  remSleepPercentage?: number
  interruptions: number
  mood: 'excellent' | 'good' | 'neutral' | 'poor' | 'terrible'
  productivity: 1 | 2 | 3 | 4 | 5 // 1-5 rating
  notes?: string
  factors?: {
    caffeine?: boolean
    alcohol?: boolean
    exercise?: boolean
    stress?: boolean
    lateScreen?: boolean
  }
  // Novos campos para insights personalizados
  mentalActivity?: 'low' | 'moderate' | 'high' | 'intense' // Atividade mental antes de dormir
  physicalActivity?: 'none' | 'light' | 'moderate' | 'intense' // Atividade física no dia
  mealTiming?: 'early' | 'moderate' | 'late' // Horário da última refeição
  screenTime?: number // Horas de tela antes de dormir
  meditation?: boolean // Praticou meditação/relaxamento
  roomTemperature?: 'cold' | 'comfortable' | 'warm' | 'hot'
  energyLevel?: 1 | 2 | 3 | 4 | 5 // Nível de energia ao acordar
  focusLevel?: 1 | 2 | 3 | 4 | 5 // Capacidade de foco no dia seguinte
  stressLevel?: 1 | 2 | 3 | 4 | 5 // Nível de estresse antes de dormir
}

export interface SleepStats {
  averageDuration: number
  averageQuality: number
  averageProductivity: number
  totalNights: number
  bestStreak: number
  currentStreak: number
  optimalBedtime: string
  optimalWakeTime: string
}

export interface WeeklyTrend {
  week: string
  avgDuration: number
  avgQuality: number
  avgProductivity: number
}

export interface PersonalizedInsight {
  type: 'neural' | 'physical' | 'energetic'
  title: string
  description: string
  recommendations: string[]
  impact: 'high' | 'medium' | 'low'
  score: number // 0-100
}
