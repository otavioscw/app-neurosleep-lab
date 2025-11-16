'use client'

import { Brain, Activity, Zap, TrendingUp, AlertCircle } from 'lucide-react'
import { SleepRecord, PersonalizedInsight } from '@/lib/types'

interface PersonalizedInsightsProps {
  records: SleepRecord[]
}

export function PersonalizedInsights({ records }: PersonalizedInsightsProps) {
  // Função para gerar insights baseados nos dados
  const generateInsights = (): PersonalizedInsight[] => {
    if (records.length === 0) {
      return []
    }

    const insights: PersonalizedInsight[] = []
    const recentRecords = records.slice(0, 7) // Últimos 7 dias

    // INSIGHT NEURAL
    const avgFocus = recentRecords.reduce((acc, r) => acc + (r.focusLevel || 3), 0) / recentRecords.length
    const avgStress = recentRecords.reduce((acc, r) => acc + (r.stressLevel || 3), 0) / recentRecords.length
    const avgScreenTime = recentRecords.reduce((acc, r) => acc + (r.screenTime || 2), 0) / recentRecords.length
    const meditationCount = recentRecords.filter(r => r.meditation).length
    const highMentalActivity = recentRecords.filter(r => r.mentalActivity === 'high' || r.mentalActivity === 'intense').length

    const neuralRecommendations: string[] = []
    let neuralScore = 50

    if (avgStress > 3.5) {
      neuralRecommendations.push('Pratique técnicas de respiração profunda 10 minutos antes de dormir')
      neuralRecommendations.push('Evite decisões complexas ou trabalho intenso após 20h')
      neuralScore -= 15
    } else {
      neuralScore += 10
    }

    if (avgScreenTime > 2) {
      neuralRecommendations.push('Reduza o tempo de tela para menos de 1h antes de dormir')
      neuralRecommendations.push('Use filtro de luz azul ou modo noturno após 19h')
      neuralScore -= 10
    } else {
      neuralScore += 15
    }

    if (meditationCount < 3) {
      neuralRecommendations.push('Implemente 5-10 minutos de meditação guiada antes de dormir')
      neuralRecommendations.push('Experimente journaling para descarregar pensamentos do dia')
    } else {
      neuralScore += 20
    }

    if (highMentalActivity > 4) {
      neuralRecommendations.push('Crie um ritual de "desligamento mental" 1h antes de dormir')
      neuralRecommendations.push('Substitua atividades cognitivas intensas por leitura leve')
      neuralScore -= 10
    }

    if (neuralRecommendations.length === 0) {
      neuralRecommendations.push('Continue mantendo sua rotina mental equilibrada')
      neuralRecommendations.push('Sua desaceleração neural está otimizada')
    }

    insights.push({
      type: 'neural',
      title: 'Desaceleração Neural',
      description: avgFocus > 3.5 
        ? `Seu foco está em ${avgFocus.toFixed(1)}/5. Excelente! Continue priorizando a desaceleração mental antes do sono.`
        : `Seu foco está em ${avgFocus.toFixed(1)}/5. Melhorar a desaceleração mental pode aumentar significativamente seu desempenho cognitivo.`,
      recommendations: neuralRecommendations,
      impact: avgFocus < 3 ? 'high' : avgFocus < 4 ? 'medium' : 'low',
      score: Math.min(100, Math.max(0, neuralScore))
    })

    // INSIGHT FÍSICO
    const avgQuality = recentRecords.reduce((acc, r) => acc + r.sleepQuality, 0) / recentRecords.length
    const avgInterruptions = recentRecords.reduce((acc, r) => acc + r.interruptions, 0) / recentRecords.length
    const exerciseCount = recentRecords.filter(r => r.physicalActivity === 'moderate' || r.physicalActivity === 'intense').length
    const lateEatingCount = recentRecords.filter(r => r.mealTiming === 'late').length
    const idealTempCount = recentRecords.filter(r => r.roomTemperature === 'comfortable').length

    const physicalRecommendations: string[] = []
    let physicalScore = 50

    if (exerciseCount < 3) {
      physicalRecommendations.push('Pratique atividade física moderada 4-5x por semana')
      physicalRecommendations.push('Evite exercícios intensos 3h antes de dormir')
      physicalScore -= 15
    } else {
      physicalScore += 20
    }

    if (lateEatingCount > 3) {
      physicalRecommendations.push('Faça sua última refeição pelo menos 3h antes de dormir')
      physicalRecommendations.push('Se necessário, opte por lanches leves (frutas, iogurte)')
      physicalScore -= 15
    } else {
      physicalScore += 15
    }

    if (idealTempCount < 4) {
      physicalRecommendations.push('Mantenha o quarto entre 18-21°C para sono ideal')
      physicalRecommendations.push('Use roupas leves e respiráveis para dormir')
      physicalScore -= 10
    } else {
      physicalScore += 15
    }

    if (avgInterruptions > 2) {
      physicalRecommendations.push('Evite líquidos 2h antes de dormir para reduzir idas ao banheiro')
      physicalRecommendations.push('Use máscara de olhos e tampões de ouvido se necessário')
      physicalScore -= 10
    } else {
      physicalScore += 10
    }

    if (physicalRecommendations.length === 0) {
      physicalRecommendations.push('Sua rotina física está otimizada para recuperação')
      physicalRecommendations.push('Continue mantendo esses hábitos saudáveis')
    }

    insights.push({
      type: 'physical',
      title: 'Desaceleração Física',
      description: avgQuality > 3.5
        ? `Qualidade do sono em ${avgQuality.toFixed(1)}/5. Seu corpo está se recuperando bem!`
        : `Qualidade do sono em ${avgQuality.toFixed(1)}/5. Otimizar a desaceleração física pode melhorar significativamente sua recuperação.`,
      recommendations: physicalRecommendations,
      impact: avgQuality < 3 ? 'high' : avgQuality < 4 ? 'medium' : 'low',
      score: Math.min(100, Math.max(0, physicalScore))
    })

    // INSIGHT ENERGÉTICO
    const avgEnergy = recentRecords.reduce((acc, r) => acc + (r.energyLevel || 3), 0) / recentRecords.length
    const avgProductivity = recentRecords.reduce((acc, r) => acc + r.productivity, 0) / recentRecords.length
    const caffeineCount = recentRecords.filter(r => r.factors?.caffeine).length
    const alcoholCount = recentRecords.filter(r => r.factors?.alcohol).length
    const avgDuration = recentRecords.reduce((acc, r) => acc + r.sleepDuration, 0) / recentRecords.length

    const energeticRecommendations: string[] = []
    let energeticScore = 50

    if (avgDuration < 7) {
      energeticRecommendations.push('Aumente sua duração de sono para 7-9h por noite')
      energeticRecommendations.push('Vá para cama 30 minutos mais cedo gradualmente')
      energeticScore -= 20
    } else if (avgDuration > 9) {
      energeticRecommendations.push('Excesso de sono pode causar letargia - mantenha 7-9h')
      energeticScore -= 10
    } else {
      energeticScore += 20
    }

    if (caffeineCount > 4) {
      energeticRecommendations.push('Evite cafeína após 14h para não afetar seu sono')
      energeticRecommendations.push('Substitua café da tarde por chá verde ou água')
      energeticScore -= 15
    } else {
      energeticScore += 10
    }

    if (alcoholCount > 2) {
      energeticRecommendations.push('Álcool prejudica a qualidade do sono REM - reduza o consumo')
      energeticRecommendations.push('Se beber, faça pelo menos 3h antes de dormir')
      energeticScore -= 15
    } else {
      energeticScore += 10
    }

    if (avgEnergy < 3.5) {
      energeticRecommendations.push('Exponha-se à luz solar nos primeiros 30min após acordar')
      energeticRecommendations.push('Tome um copo de água gelada ao acordar para ativar o metabolismo')
      energeticScore -= 10
    } else {
      energeticScore += 15
    }

    if (energeticRecommendations.length === 0) {
      energeticRecommendations.push('Seus níveis energéticos estão otimizados')
      energeticRecommendations.push('Continue mantendo essa consistência')
    }

    insights.push({
      type: 'energetic',
      title: 'Desaceleração Energética',
      description: avgEnergy > 3.5
        ? `Energia ao acordar: ${avgEnergy.toFixed(1)}/5. Excelente! Você está maximizando sua disposição diária.`
        : `Energia ao acordar: ${avgEnergy.toFixed(1)}/5. Melhorar a desaceleração energética pode aumentar drasticamente sua disposição.`,
      recommendations: energeticRecommendations,
      impact: avgEnergy < 3 ? 'high' : avgEnergy < 4 ? 'medium' : 'low',
      score: Math.min(100, Math.max(0, energeticScore))
    })

    return insights
  }

  const insights = generateInsights()

  if (insights.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-900/40 to-blue-900/40 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Registre Seus Dados</h3>
        <p className="text-blue-200">
          Adicione pelo menos um registro de sono para receber insights personalizados sobre suas dimensões Neural, Física e Energética.
        </p>
      </div>
    )
  }

  const getIconByType = (type: string) => {
    switch (type) {
      case 'neural':
        return <Brain className="w-6 h-6" />
      case 'physical':
        return <Activity className="w-6 h-6" />
      case 'energetic':
        return <Zap className="w-6 h-6" />
      default:
        return <TrendingUp className="w-6 h-6" />
    }
  }

  const getColorByType = (type: string) => {
    switch (type) {
      case 'neural':
        return {
          bg: 'from-purple-900/40 to-purple-800/40',
          border: 'border-purple-500/20',
          iconBg: 'bg-purple-500/20',
          iconColor: 'text-purple-400',
          textColor: 'text-purple-200',
          progressBg: 'bg-purple-950/50',
          progressBar: 'from-purple-500 to-pink-500'
        }
      case 'physical':
        return {
          bg: 'from-green-900/40 to-green-800/40',
          border: 'border-green-500/20',
          iconBg: 'bg-green-500/20',
          iconColor: 'text-green-400',
          textColor: 'text-green-200',
          progressBg: 'bg-green-950/50',
          progressBar: 'from-green-500 to-emerald-500'
        }
      case 'energetic':
        return {
          bg: 'from-amber-900/40 to-amber-800/40',
          border: 'border-amber-500/20',
          iconBg: 'bg-amber-500/20',
          iconColor: 'text-amber-400',
          textColor: 'text-amber-200',
          progressBg: 'bg-amber-950/50',
          progressBar: 'from-amber-500 to-orange-500'
        }
      default:
        return {
          bg: 'from-blue-900/40 to-blue-800/40',
          border: 'border-blue-500/20',
          iconBg: 'bg-blue-500/20',
          iconColor: 'text-blue-400',
          textColor: 'text-blue-200',
          progressBg: 'bg-blue-950/50',
          progressBar: 'from-blue-500 to-cyan-500'
        }
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs font-semibold rounded-full">Alto Impacto</span>
      case 'medium':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-semibold rounded-full">Médio Impacto</span>
      case 'low':
        return <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full">Baixo Impacto</span>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Seus Insights Personalizados</h2>
        <p className="text-blue-200">Baseado nos seus últimos 7 dias de sono</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {insights.map((insight) => {
          const colors = getColorByType(insight.type)
          return (
            <div
              key={insight.type}
              className={`bg-gradient-to-br ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                    <div className={colors.iconColor}>
                      {getIconByType(insight.type)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
                    {getImpactBadge(insight.impact)}
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${colors.textColor}`}>Score de Otimização</span>
                  <span className="text-white font-bold text-lg">{insight.score}/100</span>
                </div>
                <div className={`w-full ${colors.progressBg} rounded-full h-3`}>
                  <div
                    className={`bg-gradient-to-r ${colors.progressBar} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${insight.score}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className={`${colors.textColor} text-sm leading-relaxed mb-4`}>
                {insight.description}
              </p>

              {/* Recommendations */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-3">Recomendações:</h4>
                <ul className="space-y-2">
                  {insight.recommendations.map((rec, index) => (
                    <li key={index} className={`${colors.textColor} text-sm flex items-start gap-2`}>
                      <span className="text-white mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
