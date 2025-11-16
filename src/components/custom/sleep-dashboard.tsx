'use client'

import { useState } from 'react'
import { Moon, TrendingUp, Brain, Zap, Plus } from 'lucide-react'
import { SleepRecord, SleepStats } from '@/lib/types'
import { SleepForm } from './sleep-form'
import { StatsCard } from './stats-card'
import { PerformanceChart } from './performance-chart'
import { SleepHistory } from './sleep-history'
import { PersonalizedInsights } from './personalized-insights'

export function SleepDashboard() {
  const [showForm, setShowForm] = useState(false)
  const [records, setRecords] = useState<SleepRecord[]>([
    {
      id: '1',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      bedTime: '23:00',
      wakeTime: '07:00',
      sleepDuration: 8,
      sleepQuality: 4,
      interruptions: 1,
      mood: 'good',
      productivity: 4,
      factors: { exercise: true },
      mentalActivity: 'moderate',
      physicalActivity: 'moderate',
      mealTiming: 'moderate',
      screenTime: 1.5,
      meditation: true,
      roomTemperature: 'comfortable',
      energyLevel: 4,
      focusLevel: 4,
      stressLevel: 2
    },
    {
      id: '2',
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      bedTime: '00:30',
      wakeTime: '07:30',
      sleepDuration: 7,
      sleepQuality: 3,
      interruptions: 2,
      mood: 'neutral',
      productivity: 3,
      factors: { caffeine: true, lateScreen: true },
      mentalActivity: 'high',
      physicalActivity: 'light',
      mealTiming: 'late',
      screenTime: 3,
      meditation: false,
      roomTemperature: 'warm',
      energyLevel: 3,
      focusLevel: 3,
      stressLevel: 4
    },
    {
      id: '3',
      date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
      bedTime: '22:30',
      wakeTime: '06:30',
      sleepDuration: 8,
      sleepQuality: 5,
      interruptions: 0,
      mood: 'excellent',
      productivity: 5,
      factors: { exercise: true },
      mentalActivity: 'low',
      physicalActivity: 'intense',
      mealTiming: 'early',
      screenTime: 0.5,
      meditation: true,
      roomTemperature: 'comfortable',
      energyLevel: 5,
      focusLevel: 5,
      stressLevel: 1
    }
  ])

  const stats: SleepStats = {
    averageDuration: records.reduce((acc, r) => acc + r.sleepDuration, 0) / records.length,
    averageQuality: records.reduce((acc, r) => acc + r.sleepQuality, 0) / records.length,
    averageProductivity: records.reduce((acc, r) => acc + r.productivity, 0) / records.length,
    totalNights: records.length,
    bestStreak: 3,
    currentStreak: 2,
    optimalBedtime: '22:30',
    optimalWakeTime: '06:30'
  }

  const handleAddRecord = (record: Omit<SleepRecord, 'id'>) => {
    const newRecord: SleepRecord = {
      ...record,
      id: Date.now().toString()
    }
    setRecords([newRecord, ...records])
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">NeuroSleep LAB</h1>
                <p className="text-sm text-blue-200">Maximize seu desempenho através do sono</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Registrar Sono
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Controle - Otimize - <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Domine</span>
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-2">
            Aqui, seu sono vai ser sua vantagem competitiva.
          </p>
          <p className="text-base text-blue-300/80 max-w-2xl mx-auto">
            Sistema ORION-7 com dados precisos para decisões inteligentes.
          </p>
        </div>

        {/* Sleep Form Modal */}
        {showForm && (
          <div className="mb-8">
            <SleepForm onSubmit={handleAddRecord} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<Moon className="w-6 h-6" />}
            title="Duração Média"
            value={`${stats.averageDuration.toFixed(1)}h`}
            subtitle="por noite"
            trend="+12%"
            color="from-blue-500 to-cyan-500"
          />
          <StatsCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Qualidade"
            value={`${stats.averageQuality.toFixed(1)}/5`}
            subtitle="estrelas"
            trend="+8%"
            color="from-purple-500 to-pink-500"
          />
          <StatsCard
            icon={<Zap className="w-6 h-6" />}
            title="Produtividade"
            value={`${stats.averageProductivity.toFixed(1)}/5`}
            subtitle="performance"
            trend="+15%"
            color="from-amber-500 to-orange-500"
          />
          <StatsCard
            icon={<Brain className="w-6 h-6" />}
            title="Sequência"
            value={`${stats.currentStreak}`}
            subtitle="noites otimizadas"
            trend="Recorde: 3"
            color="from-emerald-500 to-teal-500"
          />
        </div>

        {/* Personalized Insights */}
        <div className="mb-8">
          <PersonalizedInsights records={records} />
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <PerformanceChart records={records} />
        </div>

        {/* Sleep History */}
        <SleepHistory records={records} />
      </main>
    </div>
  )
}
