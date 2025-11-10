// Simulação de análise de IA para fins educativos
// Em produção, seria integrada com GPT-4o Vision

interface TechnicalFactors {
  priceAction: string
  candlestickPattern: string
  supportResistance: string
  indicators: string
  volume: string
}

interface AnalysisData {
  operation: 'BUY' | 'SELL'
  trend: 'ALTA' | 'BAIXA' | 'LATERAL'
  confidence: number
  explanation: string
  technicalFactors: TechnicalFactors
}

// Simula análise de gráfico
export async function analyzeChartImage(file: File): Promise<AnalysisData> {
  // Simula tempo de processamento
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Análises simuladas para demonstração
  const analyses: AnalysisData[] = [
    {
      operation: 'BUY',
      trend: 'ALTA',
      confidence: 85,
      explanation: 'Padrão de martelo identificado em zona de suporte forte. RSI mostra divergência bullish e volume crescente confirma movimento de alta.',
      technicalFactors: {
        priceAction: 'Estrutura de alta com impulso forte e correção saudável',
        candlestickPattern: 'Martelo em suporte - padrão de reversão bullish',
        supportResistance: 'Suporte em 1.0850 respeitado, resistência em 1.0920',
        indicators: 'RSI(14): 35 - sobrevendido, MACD divergência positiva',
        volume: 'Volume acima da média nas últimas 3 velas'
      }
    },
    {
      operation: 'SELL',
      trend: 'BAIXA',
      confidence: 78,
      explanation: 'Padrão de estrela cadente em resistência. Médias móveis em tendência de baixa e volume confirmando pressão vendedora.',
      technicalFactors: {
        priceAction: 'Estrutura de baixa com rompimento de suporte',
        candlestickPattern: 'Estrela cadente - padrão de reversão bearish',
        supportResistance: 'Resistência em 1.2650 rejeitada, próximo suporte em 1.2580',
        indicators: 'RSI(14): 72 - sobrecomprado, Médias em tendência de baixa',
        volume: 'Volume elevado na rejeição da resistência'
      }
    },
    {
      operation: 'BUY',
      trend: 'LATERAL',
      confidence: 65,
      explanation: 'Mercado em consolidação próximo ao suporte. Padrão de doji indica indecisão, mas contexto favorece alta.',
      technicalFactors: {
        priceAction: 'Movimento lateral com teste de suporte',
        candlestickPattern: 'Doji em suporte - indecisão com viés de alta',
        supportResistance: 'Range entre 149.20-150.80, testando suporte',
        indicators: 'RSI neutro em 45, Bollinger Bands contraídas',
        volume: 'Volume baixo típico de consolidação'
      }
    }
  ]
  
  // Retorna análise aleatória para demonstração
  const randomIndex = Math.floor(Math.random() * analyses.length)
  return analyses[randomIndex]
}

// Calcula horário de entrada (2 minutos após o momento atual)
export function calculateEntryTime(): string {
  const now = new Date()
  const entryTime = new Date(now.getTime() + 2 * 60 * 1000) // +2 minutos
  
  return entryTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  })
}