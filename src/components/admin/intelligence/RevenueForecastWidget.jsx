import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, AlertCircle, RefreshCw, HandCoins } from 'lucide-react'
import { getRevenueForecast } from '@/services/api/ml'

export const RevenueForecastWidget = () => {
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchForecast = async () => {
    try {
      setLoading(true)
      const data = await getRevenueForecast()
      setForecast(data.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching revenue forecast:', err)
      setError('No se pudo cargar la predicción financiera.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchForecast()
  }, [])

  if (loading) {
    return (
      <Card className="border-slate-800 bg-[#0f1115] shadow-xl pt-6 pb-6">
        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
          <p className="text-sm font-medium">Analizando historial y proyectando ingresos...</p>
        </div>
      </Card>
    )
  }

  if (error || !forecast) {
    return (
      <Card className="border-slate-800 bg-[#0f1115] shadow-xl pt-6 pb-6">
        <div className="flex flex-col items-center justify-center h-full text-red-400 gap-4">
          <AlertCircle className="w-8 h-8" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      </Card>
    )
  }

  // Format currency
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  })

  // Calculate percentages for the progress bar
  const total = forecast.totalProjectedRevenue
  const realizedPct = (forecast.realizedRevenue / total) * 100
  const scheduledPct = (forecast.adjustedScheduledRevenue / total) * 100
  const extraPct = (forecast.predictedExtraRevenue / total) * 100

  return (
    <Card className="border-slate-800 bg-gradient-to-br from-[#12161f] to-[#0f1115] shadow-xl overflow-hidden relative group">
      {/* Glow effect */}
      <div className="absolute inset-x-0 -top-px h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Proyección a Cierre de Mes
            </CardTitle>
            <p className="text-sm text-slate-400">
              Basado en Machine Learning y predicción de inasistencias.
            </p>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1">
            Quedan {forecast.daysRemaining} días
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {/* Big Number */}
        <div className="flex flex-col">
          <span className="text-4xl font-bold tracking-tight text-white mb-2">
            {formatter.format(forecast.totalProjectedRevenue)}
          </span>
          <span className="text-sm text-emerald-400 font-medium flex items-center gap-1">
            <HandCoins className="w-4 h-4" />
            Ingreso Bruto Total Estimado
          </span>
        </div>

        {/* Breakdown Stacked Bar */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-800">
            <div
              style={{ width: `${realizedPct}%` }}
              className="h-full bg-slate-300 transition-all duration-1000"
              title="Ingreso Realizado"
            ></div>
            <div
              style={{ width: `${scheduledPct}%` }}
              className="h-full bg-blue-500 transition-all duration-1000"
              title="Futuro Asegurado (Ajustado)"
            ></div>
            <div
              style={{ width: `${extraPct}%` }}
              className="h-full bg-emerald-500 transition-all duration-1000"
              title="Predicción Extra IA"
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Ya Ganado</span>
              </div>
              <span className="text-sm font-semibold text-slate-200">{formatter.format(forecast.realizedRevenue)}</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">Agendado</span>
              </div>
              <span className="text-sm font-semibold text-slate-200">{formatter.format(forecast.adjustedScheduledRevenue)}</span>
              <span className="text-[10px] text-slate-500 leading-tight">Valor total: {formatter.format(forecast.scheduledBaseRevenue)} <br/> Ajustado por riesgo.</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Pronóstico IA</span>
              </div>
              <span className="text-sm font-semibold text-slate-200">{formatter.format(forecast.predictedExtraRevenue)}</span>
              <span className="text-[10px] text-slate-500 leading-tight">Clientes nuevos /<br/> urgencias estimadas.</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RevenueForecastWidget
