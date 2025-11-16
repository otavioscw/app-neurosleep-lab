'use client'

import { ReactNode } from 'react'

interface StatsCardProps {
  icon: ReactNode
  title: string
  value: string
  subtitle: string
  trend: string
  color: string
}

export function StatsCard({ icon, title, value, subtitle, trend, color }: StatsCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white`}>
          {icon}
        </div>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
          {trend}
        </span>
      </div>
      <h3 className="text-sm font-medium text-blue-200 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-blue-300">{subtitle}</p>
    </div>
  )
}
