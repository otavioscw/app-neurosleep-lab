'use client'

import { useState } from 'react'
import { X, Moon, Sun, Star, Activity, Brain, Zap, Thermometer } from 'lucide-react'
import { SleepRecord } from '@/lib/types'

interface SleepFormProps {
  onSubmit: (record: Omit<SleepRecord, 'id'>) => void
  onCancel: () => void
}

export function SleepForm({ onSubmit, onCancel }: SleepFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    bedTime: '23:00',
    wakeTime: '07:00',
    sleepQuality: 3,
    interruptions: 0,
    mood: 'neutral' as const,
    productivity: 3,
    notes: '',
    factors: {
      caffeine: false,
      alcohol: false,
      exercise: false,
      stress: false,
      lateScreen: false
    },
    // Novos campos
    mentalActivity: 'moderate' as const,
    physicalActivity: 'moderate' as const,
    mealTiming: 'moderate' as const,
    screenTime: 2,
    meditation: false,
    roomTemperature: 'comfortable' as const,
    energyLevel: 3,
    focusLevel: 3,
    stressLevel: 3
  })

  const calculateDuration = () => {
    const [bedHour, bedMin] = formData.bedTime.split(':').map(Number)
    const [wakeHour, wakeMin] = formData.wakeTime.split(':').map(Number)
    
    let duration = (wakeHour * 60 + wakeMin) - (bedHour * 60 + bedMin)
    if (duration < 0) duration += 24 * 60
    
    return Math.round((duration / 60) * 10) / 10
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      sleepDuration: calculateDuration(),
      sleepQuality: formData.sleepQuality as 1 | 2 | 3 | 4 | 5,
      productivity: formData.productivity as 1 | 2 | 3 | 4 | 5,
      energyLevel: formData.energyLevel as 1 | 2 | 3 | 4 | 5,
      focusLevel: formData.focusLevel as 1 | 2 | 3 | 4 | 5,
      stressLevel: formData.stressLevel as 1 | 2 | 3 | 4 | 5
    })
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/95 to-blue-900/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Registrar Noite de Sono</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data e Horários */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">Data</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              <Moon className="w-4 h-4 inline mr-1" />
              Hora de Dormir
            </label>
            <input
              type="time"
              value={formData.bedTime}
              onChange={(e) => setFormData({ ...formData, bedTime: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              <Sun className="w-4 h-4 inline mr-1" />
              Hora de Acordar
            </label>
            <input
              type="time"
              value={formData.wakeTime}
              onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Duração Calculada */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <p className="text-blue-200 text-sm">Duração total do sono</p>
          <p className="text-3xl font-bold text-white">{calculateDuration()}h</p>
        </div>

        {/* Seção Neural - Atividade Mental */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Dimensão Neural</h3>
          </div>

          <div className="space-y-4">
            {/* Atividade Mental */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Atividade Mental Antes de Dormir
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'low', label: 'Baixa' },
                  { value: 'moderate', label: 'Moderada' },
                  { value: 'high', label: 'Alta' },
                  { value: 'intense', label: 'Intensa' }
                ].map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, mentalActivity: level.value as 'low' | 'moderate' | 'high' | 'intense' })}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      formData.mentalActivity === level.value
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-white/5 text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nível de Foco */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Capacidade de Foco no Dia Seguinte
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, focusLevel: rating })}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                      formData.focusLevel >= rating
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white/5 text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>

            {/* Nível de Estresse */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Nível de Estresse Antes de Dormir
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, stressLevel: rating })}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                      formData.stressLevel >= rating
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                        : 'bg-white/5 text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>

            {/* Tempo de Tela */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Horas de Tela Antes de Dormir
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={formData.screenTime}
                onChange={(e) => setFormData({ ...formData, screenTime: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Meditação */}
            <div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, meditation: !formData.meditation })}
                className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                  formData.meditation
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white/5 text-blue-300 hover:bg-white/10'
                }`}
              >
                🧘 Praticou Meditação/Relaxamento
              </button>
            </div>
          </div>
        </div>

        {/* Seção Física */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Dimensão Física</h3>
          </div>

          <div className="space-y-4">
            {/* Atividade Física */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Atividade Física no Dia
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'none', label: 'Nenhuma' },
                  { value: 'light', label: 'Leve' },
                  { value: 'moderate', label: 'Moderada' },
                  { value: 'intense', label: 'Intensa' }
                ].map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, physicalActivity: level.value as 'none' | 'light' | 'moderate' | 'intense' })}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      formData.physicalActivity === level.value
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-white/5 text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Horário da Refeição */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Horário da Última Refeição
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'early', label: '3h+ antes' },
                  { value: 'moderate', label: '2-3h antes' },
                  { value: 'late', label: 'Menos de 2h' }
                ].map((timing) => (
                  <button
                    key={timing.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, mealTiming: timing.value as 'early' | 'moderate' | 'late' })}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      formData.mealTiming === timing.value
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-white/5 text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    {timing.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperatura do Ambiente */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                <Thermometer className="w-4 h-4 inline mr-1" />
                Temperatura do Quarto
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 'cold', label: '❄️ Frio' },
                  { value: 'comfortable', label: '✨ Ideal' },
                  { value: 'warm', label: '🌡️ Quente' },
                  { value: 'hot', label: '🔥 Muito Quente' }
                ].map((temp) => (
                  <button
                    key={temp.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, roomTemperature: temp.value as 'cold' | 'comfortable' | 'warm' | 'hot' })}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      formData.roomTemperature === temp.value
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-white/5 text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    {temp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Seção Energética */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Dimensão Energética</h3>
          </div>

          <div className="space-y-4">
            {/* Nível de Energia */}
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Nível de Energia ao Acordar
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, energyLevel: rating })}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                      formData.energyLevel >= rating
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                        : 'bg-white/5 text-blue-300 hover:bg-white/10'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Qualidade do Sono */}
        <div className="border-t border-white/10 pt-6">
          <label className="block text-sm font-medium text-blue-200 mb-3">
            <Star className="w-4 h-4 inline mr-1" />
            Qualidade Geral do Sono
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setFormData({ ...formData, sleepQuality: rating })}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  formData.sleepQuality >= rating
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/5 text-blue-300 hover:bg-white/10'
                }`}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>

        {/* Interrupções */}
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-2">
            Interrupções durante a noite
          </label>
          <input
            type="number"
            min="0"
            value={formData.interruptions}
            onChange={(e) => setFormData({ ...formData, interruptions: parseInt(e.target.value) })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Humor ao Acordar */}
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-3">Humor ao Acordar</label>
          <div className="grid grid-cols-5 gap-2">
            {[
              { value: 'terrible', label: '😫', color: 'from-red-500 to-red-600' },
              { value: 'poor', label: '😕', color: 'from-orange-500 to-orange-600' },
              { value: 'neutral', label: '😐', color: 'from-yellow-500 to-yellow-600' },
              { value: 'good', label: '😊', color: 'from-green-500 to-green-600' },
              { value: 'excellent', label: '🤩', color: 'from-emerald-500 to-emerald-600' }
            ].map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => setFormData({ ...formData, mood: mood.value as 'terrible' | 'poor' | 'neutral' | 'good' | 'excellent' })}
                className={`py-3 rounded-xl text-2xl transition-all ${
                  formData.mood === mood.value
                    ? `bg-gradient-to-r ${mood.color} shadow-lg scale-110`
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>

        {/* Produtividade */}
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-3">
            <Activity className="w-4 h-4 inline mr-1" />
            Produtividade no Dia Seguinte
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setFormData({ ...formData, productivity: rating })}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  formData.productivity >= rating
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white/5 text-blue-300 hover:bg-white/10'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>

        {/* Fatores */}
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-3">Fatores que Afetaram o Sono</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { key: 'caffeine', label: '☕ Cafeína' },
              { key: 'alcohol', label: '🍷 Álcool' },
              { key: 'exercise', label: '💪 Exercício' },
              { key: 'stress', label: '😰 Estresse' },
              { key: 'lateScreen', label: '📱 Tela Tarde' }
            ].map((factor) => (
              <button
                key={factor.key}
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  factors: { ...formData.factors, [factor.key]: !formData.factors[factor.key as keyof typeof formData.factors] }
                })}
                className={`py-3 px-4 rounded-xl font-medium transition-all ${
                  formData.factors[factor.key as keyof typeof formData.factors]
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/5 text-blue-300 hover:bg-white/10'
                }`}
              >
                {factor.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notas */}
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-2">Observações (opcional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Alguma observação sobre esta noite..."
          />
        </div>

        {/* Botões */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-6 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Salvar Registro
          </button>
        </div>
      </form>
    </div>
  )
}
