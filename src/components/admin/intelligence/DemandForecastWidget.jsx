import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, AlertCircle, RefreshCw, BriefcaseMedical } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { getDemandForecast } from '@/services/api/ml'

export function DemandForecastWidget() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchForecast = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await getDemandForecast()
      if (res.success && res.data) {
        setData(res.data)
      } else {
        throw new Error('Formato de respuesta inválido')
      }
    } catch (err) {
      console.error('Error fetching demand forecast:', err)
      setError(err.message || 'Error al obtener datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchForecast()
  }, [])

  return (
    <Card className="bg-card shadow-sm h-full flex flex-col justify-between">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl text-foreground">
              <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Pronóstico de Demanda
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Basado en Machine Learning y volumen histórico. Sugerencia de inventario.
            </p>
          </div>
          <Badge variant="outline" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
            Próximos {data?.timeframeDays || 14} días
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-[250px] bg-muted" />
            <Skeleton className="h-10 w-full bg-muted" />
            <Skeleton className="h-10 w-full bg-muted" />
            <Skeleton className="h-10 w-full bg-muted" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-6 h-full text-destructive space-y-3">
            <AlertCircle className="h-8 w-8" />
            <p className="text-sm font-medium">{error}</p>
            <button
              onClick={fetchForecast}
              className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded hover:opacity-80 flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" /> Reintentar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            <div className="col-span-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/40 pb-6 md:pb-0 md:pr-6 space-y-2">
              <span className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">~{data.totalExpectedServices}</span>
              <span className="text-sm text-muted-foreground font-medium pb-1 flex items-center gap-1">
                <BriefcaseMedical className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                citas totales proyectadas
              </span>
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed hidden md:block">
                Recomendamos ajustar el inventario clínico y la programación de personal con base en este volumen sugerido por la Inteligencia Artificial para los próximos {data?.timeframeDays || 14} días.
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-4 flex flex-col justify-center">
              {data.distribution.map((item, index) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">{index + 1}. {item.category}</span>
                    <span className="text-muted-foreground font-mono">{item.expectedVol} <span className="text-xs">peticiones</span></span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${index === 0 ? 'bg-purple-600 dark:bg-purple-500' : index === 1 ? 'bg-purple-400 dark:bg-purple-400' : 'bg-slate-400 dark:bg-slate-500'}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-right text-xs text-muted-foreground">{item.percentage}% del total</div>
                </div>
              ))}

              {data.distribution.length === 0 && (
                <div className="text-center text-muted-foreground py-4 text-sm">
                  No hay suficientes datos históricos para pronosticar categorías.
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
