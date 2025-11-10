interface TechnicalAnalysis {
  trend: 'ALTA' | 'BAIXA' | 'LATERAL'
  operation: 'BUY' | 'SELL'
  confidence: number
  explanation: string
  technicalFactors: {
    priceAction: string
    candlestickPattern: string
    supportResistance: string
    indicators: string
    volume: string
  }
}

export async function analyzeChartImage(imageFile: File): Promise<TechnicalAnalysis> {
  // Em produção, esta função faria uma chamada real para GPT-4o Vision
  // Por enquanto, retorna dados simulados para demonstração
  
  const mockAnalyses = [
    {
      trend: 'ALTA' as const,
      operation: 'BUY' as const,
      confidence: 78,
      explanation: "Padrão de martelo identificado em zona de suporte forte. RSI mostra divergência positiva e volume crescente confirma reversão de tendência.",
      technicalFactors: {
        priceAction: "Reversão em suporte de Fibonacci 61.8%",
        candlestickPattern: "Martelo (Hammer) - Sinal de reversão",
        supportResistance: "Suporte em 1.0820 / Resistência em 1.0890",
        indicators: "RSI(14): 32 ↗️ | MACD convergindo | MA20 testando",
        volume: "Volume 45% acima da média - Forte interesse"
      }
    },
    {
      trend: 'BAIXA' as const,
      operation: 'SELL' as const,
      confidence: 82,
      explanation: "Padrão de estrela cadente após movimento de alta. Rompimento de linha de tendência com volume confirmativo.",
      technicalFactors: {
        priceAction: "Rompimento de linha de tendência ascendente",
        candlestickPattern: "Estrela Cadente (Shooting Star)",
        supportResistance: "Resistência em 1.0950 / Suporte em 1.0880",
        indicators: "RSI(14): 68 ↘️ | MACD divergindo | MA50 como resistência",
        volume: "Volume 38% acima da média - Pressão vendedora"
      }
    },
    {
      trend: 'LATERAL' as const,
      operation: 'BUY' as const,
      confidence: 65,
      explanation: "Consolidação em canal lateral. Preço testando suporte inferior com sinais de reversão técnica.",
      technicalFactors: {
        priceAction: "Teste de suporte em canal lateral",
        candlestickPattern: "Doji - Indecisão com viés de alta",
        supportResistance: "Canal: Suporte 1.0840 / Resistência 1.0920",
        indicators: "RSI(14): 42 | MACD neutro | Bollinger Bands contraindo",
        volume: "Volume médio - Aguardando definição"
      }
    }
  ]

  // Simula tempo de processamento da IA
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000))

  // Retorna análise aleatória para demonstração
  return mockAnalyses[Math.floor(Math.random() * mockAnalyses.length)]
}

export function calculateEntryTime(): string {
  const now = new Date()
  const entryTime = new Date(now.getTime() + 2 * 60000) // 2 minutos depois
  
  return entryTime.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  })
}