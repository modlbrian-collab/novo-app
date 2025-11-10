"use client"

import { useState, useRef } from 'react'
import { Upload, Camera, TrendingUp, TrendingDown, Minus, Clock, Target, BarChart3, Activity, Zap, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { analyzeChartImage, calculateEntryTime } from '@/lib/trading-ai'

interface AnalysisResult {
  id: string
  timestamp: string
  entryTime: string
  operation: 'BUY' | 'SELL'
  trend: 'ALTA' | 'BAIXA' | 'LATERAL'
  confidence: number
  explanation: string
  technicalFactors: {
    priceAction: string
    candlestickPattern: string
    supportResistance: string
    indicators: string
    volume: string
  }
  imageUrl: string
}

export default function TraderEasyAI() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null)
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([])
  const [successRate, setSuccessRate] = useState(73)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simular progresso da análise
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 300)

    try {
      const analysis = await analyzeChartImage(file)
      
      const result: AnalysisResult = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString('pt-BR'),
        entryTime: calculateEntryTime(),
        ...analysis,
        imageUrl: URL.createObjectURL(file)
      }

      setCurrentAnalysis(result)
      setAnalysisHistory(prev => [result, ...prev.slice(0, 9)])
      setAnalysisProgress(100)
      
      setTimeout(() => {
        setIsAnalyzing(false)
        setAnalysisProgress(0)
      }, 500)
      
    } catch (error) {
      console.error('Erro na análise:', error)
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }
  }

  const handleCameraCapture = () => {
    // Em produção, abriria a câmera do dispositivo
    fileInputRef.current?.click()
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'ALTA': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'BAIXA': return <TrendingDown className="w-4 h-4 text-red-500" />
      default: return <Minus className="w-4 h-4 text-yellow-500" />
    }
  }

  const getOperationColor = (operation: string) => {
    return operation === 'BUY' ? 'bg-green-500' : 'bg-red-500'
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400'
    if (confidence >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Trader Easy AI</h1>
                <p className="text-sm text-blue-200">Análise Profissional de Trading</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-300">Taxa de Acerto</div>
                <div className="text-xl font-bold text-green-400">{successRate}%</div>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/20 border border-white/10">
            <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-500">
              <Target className="w-4 h-4 mr-2" />
              Análise de Gráfico
            </TabsTrigger>
            <TabsTrigger value="realtime" className="data-[state=active]:bg-blue-500">
              <Zap className="w-4 h-4 mr-2" />
              Tempo Real
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-6">
            {/* Upload Section */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Enviar Gráfico para Análise
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Faça upload ou tire uma foto do gráfico de candlestick para análise profissional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="h-24 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
                    disabled={isAnalyzing}
                  >
                    <Upload className="w-6 h-6 mr-2" />
                    Upload de Imagem
                  </Button>
                  <Button
                    onClick={handleCameraCapture}
                    className="h-24 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                    disabled={isAnalyzing}
                  >
                    <Camera className="w-6 h-6 mr-2" />
                    Capturar Tela
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {/* Aviso sobre análise simulada */}
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-200">
                    <strong>Demonstração:</strong> Esta versão usa análise simulada para fins educativos. 
                    Em produção, seria integrada com GPT-4o Vision para análise real de gráficos.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading */}
            {isAnalyzing && (
              <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <div className="text-white">
                      <div className="font-semibold">Analisando gráfico...</div>
                      <div className="text-sm text-gray-300">
                        {analysisProgress < 30 && "Identificando padrões de candlestick..."}
                        {analysisProgress >= 30 && analysisProgress < 60 && "Analisando suporte e resistência..."}
                        {analysisProgress >= 60 && analysisProgress < 90 && "Calculando indicadores técnicos..."}
                        {analysisProgress >= 90 && "Gerando sinal de entrada..."}
                      </div>
                    </div>
                  </div>
                  <Progress value={analysisProgress} className="mt-4" />
                </CardContent>
              </Card>
            )}

            {/* Analysis Result */}
            {currentAnalysis && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Signal Card */}
                <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span>Sinal de Entrada</span>
                      <Badge className={`${getOperationColor(currentAnalysis.operation)} text-white`}>
                        {currentAnalysis.operation}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-sm text-gray-300">Horário de Entrada</div>
                        <div className="text-lg font-bold text-white flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {currentAnalysis.entryTime}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Horário de Brasília</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg">
                        <div className="text-sm text-gray-300">Tendência</div>
                        <div className="text-lg font-bold text-white flex items-center gap-2">
                          {getTrendIcon(currentAnalysis.trend)}
                          {currentAnalysis.trend}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-sm text-gray-300 mb-2">Confiança da Análise</div>
                      <div className="flex items-center gap-3">
                        <Progress value={currentAnalysis.confidence} className="flex-1" />
                        <span className={`font-bold ${getConfidenceColor(currentAnalysis.confidence)}`}>
                          {currentAnalysis.confidence}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-sm text-gray-300 mb-2">Explicação Técnica</div>
                      <p className="text-white text-sm leading-relaxed">
                        {currentAnalysis.explanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Analysis */}
                <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Análise Técnica Detalhada</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-sm font-semibold text-blue-300">Price Action</div>
                      <div className="text-sm text-white">{currentAnalysis.technicalFactors.priceAction}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-sm font-semibold text-green-300">Padrão de Candlestick</div>
                      <div className="text-sm text-white">{currentAnalysis.technicalFactors.candlestickPattern}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-sm font-semibold text-yellow-300">Suporte/Resistência</div>
                      <div className="text-sm text-white">{currentAnalysis.technicalFactors.supportResistance}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-sm font-semibold text-purple-300">Indicadores</div>
                      <div className="text-sm text-white">{currentAnalysis.technicalFactors.indicators}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-sm font-semibold text-cyan-300">Volume</div>
                      <div className="text-sm text-white">{currentAnalysis.technicalFactors.volume}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            {/* Real-time Status */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Status do Mercado
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Monitoramento em tempo real dos principais pares
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
                    <div className="text-green-300 text-sm font-medium">EUR/USD</div>
                    <div className="text-white text-xl font-bold">ALTA</div>
                    <div className="text-green-400 text-sm">+0.23% • 1.0875</div>
                  </div>
                  <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30">
                    <div className="text-red-300 text-sm font-medium">GBP/USD</div>
                    <div className="text-white text-xl font-bold">BAIXA</div>
                    <div className="text-red-400 text-sm">-0.18% • 1.2634</div>
                  </div>
                  <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30">
                    <div className="text-yellow-300 text-sm font-medium">USD/JPY</div>
                    <div className="text-white text-xl font-bold">LATERAL</div>
                    <div className="text-yellow-400 text-sm">+0.02% • 149.85</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis History */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Histórico de Sinais</CardTitle>
                <CardDescription className="text-gray-300">
                  Últimas análises realizadas com taxa de acerto de {successRate}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysisHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <div className="font-medium">Nenhuma análise realizada ainda</div>
                    <div className="text-sm">Envie um gráfico para começar!</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {analysisHistory.map((analysis) => (
                      <div key={analysis.id} className="bg-white/5 p-4 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                          <Badge className={`${getOperationColor(analysis.operation)} text-white`}>
                            {analysis.operation}
                          </Badge>
                          <div>
                            <div className="text-white font-semibold">{analysis.entryTime}</div>
                            <div className="text-gray-300 text-sm">{analysis.timestamp}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getTrendIcon(analysis.trend)}
                          <span className={`font-bold ${getConfidenceColor(analysis.confidence)}`}>
                            {analysis.confidence}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}