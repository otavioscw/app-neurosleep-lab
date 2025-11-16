'use client'

import { SleepRecord } from '@/lib/types'
import { TrendingUp, BarChart3 } from 'lucide-react'

interface PerformanceChartProps {
  records: SleepRecord[]
}

export function PerformanceChart({ records }: PerformanceChartProps) {
  const sortedRecords = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const maxDuration = Math.max(...sortedRecords.map(r => r.sleepDuration), 10)

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Evolução de Performance</h3>
            <p className="text-sm text-blue-200">Últimos {sortedRecords.length} registros</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-blue-200">Duração</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-blue-200">Qualidade</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm text-blue-200">Produtividade</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {sortedRecords.map((record) => {
          const durationPercent = (record.sleepDuration / maxDuration) * 100
          const qualityPercent = (record.sleepQuality / 5) * 100
          const productivityPercent = (record.productivity / 5) * 100

          return (
            <div key={record.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-200 font-medium" suppressHydrationWarning>
                  {new Date(record.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </span>
                <div className="flex gap-4 text-xs">
                  <span className="text-blue-400">{record.sleepDuration}h</span>
                  <span className="text-purple-400">{record.sleepQuality}★</span>
                  <span className="text-amber-400">{record.productivity}/5</span>
                </div>
              </div>
              <div className="relative h-12 bg-white/5 rounded-lg overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded transition-all duration-500"
                  style={{ width: `${durationPercent}%` }}
                />
                <div
                  className="absolute top-4 left-0 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded transition-all duration-500"
                  style={{ width: `${qualityPercent}%` }}
                />
                <div
                  className="absolute top-8 left-0 h-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded transition-all duration-500"
                  style={{ width: `${productivityPercent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Insights */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Análise de Tendência</h4>
            <p className="text-sm text-blue-200">
              Sua qualidade de sono está melhorando consistentemente. Continue mantendo a rotina de exercícios físicos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
