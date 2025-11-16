'use client'

import { SleepRecord } from '@/lib/types'
import { Moon, Sun, Star, Activity, AlertCircle } from 'lucide-react'

interface SleepHistoryProps {
  records: SleepRecord[]
}

export function SleepHistory({ records }: SleepHistoryProps) {
  const getMoodEmoji = (mood: string) => {
    const moods = {
      excellent: '🤩',
      good: '😊',
      neutral: '😐',
      poor: '😕',
      terrible: '😫'
    }
    return moods[mood as keyof typeof moods] || '😐'
  }

  const getMoodColor = (mood: string) => {
    const colors = {
      excellent: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
      good: 'from-green-500/20 to-green-600/20 border-green-500/30',
      neutral: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
      poor: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
      terrible: 'from-red-500/20 to-red-600/20 border-red-500/30'
    }
    return colors[mood as keyof typeof colors] || colors.neutral
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
          <Moon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Histórico de Sono</h3>
          <p className="text-sm text-blue-200">Registros detalhados das suas noites</p>
        </div>
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className={`bg-gradient-to-br ${getMoodColor(record.mood)} backdrop-blur-sm border rounded-xl p-5 hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{getMoodEmoji(record.mood)}</span>
                  <h4 className="text-lg font-bold text-white">
                    {new Date(record.date).toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      day: '2-digit', 
                      month: 'long' 
                    })}
                  </h4>
                </div>
                <div className="flex items-center gap-4 text-sm text-blue-200">
                  <span className="flex items-center gap-1">
                    <Moon className="w-4 h-4" />
                    {record.bedTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Sun className="w-4 h-4" />
                    {record.wakeTime}
                  </span>
                  <span className="font-semibold text-white">
                    {record.sleepDuration}h de sono
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold">{record.sleepQuality}/5</span>
                </div>
                <div className="flex items-center gap-1 text-blue-300 text-sm">
                  <Activity className="w-4 h-4" />
                  <span>Produtividade: {record.productivity}/5</span>
                </div>
              </div>
            </div>

            {/* Interrupções */}
            {record.interruptions > 0 && (
              <div className="flex items-center gap-2 mb-3 text-sm">
                <AlertCircle className="w-4 h-4 text-orange-400" />
                <span className="text-orange-200">
                  {record.interruptions} {record.interruptions === 1 ? 'interrupção' : 'interrupções'} durante a noite
                </span>
              </div>
            )}

            {/* Fatores */}
            {record.factors && Object.values(record.factors).some(v => v) && (
              <div className="flex flex-wrap gap-2 mb-3">
                {record.factors.caffeine && (
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-200 rounded-full text-xs font-medium">
                    ☕ Cafeína
                  </span>
                )}
                {record.factors.alcohol && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-xs font-medium">
                    🍷 Álcool
                  </span>
                )}
                {record.factors.exercise && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-200 rounded-full text-xs font-medium">
                    💪 Exercício
                  </span>
                )}
                {record.factors.stress && (
                  <span className="px-3 py-1 bg-red-500/20 text-red-200 rounded-full text-xs font-medium">
                    😰 Estresse
                  </span>
                )}
                {record.factors.lateScreen && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs font-medium">
                    📱 Tela Tarde
                  </span>
                )}
              </div>
            )}

            {/* Notas */}
            {record.notes && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-sm text-blue-100 italic">{`"${record.notes}"`}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {records.length === 0 && (
        <div className="text-center py-12">
          <Moon className="w-16 h-16 text-blue-500/30 mx-auto mb-4" />
          <p className="text-blue-200">Nenhum registro ainda. Comece a rastrear seu sono!</p>
        </div>
      )}
    </div>
  )
}
