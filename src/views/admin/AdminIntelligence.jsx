import { Brain, TrendingUp } from 'lucide-react'
import { HighRiskAppointments } from '@/components/admin/intelligence/HighRiskAppointments'
import { RevenueForecastWidget } from '@/components/admin/intelligence/RevenueForecastWidget'
import { DemandForecastWidget } from '@/components/admin/intelligence/DemandForecastWidget'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function AdminIntelligence() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Brain className="w-8 h-8 text-primary" />
          Inteligencia de Negocio
        </h2>
        <p className="text-muted-foreground mt-1">
          Predicciones de Machine Learning y análisis avanzado en tiempo real.
        </p>
      </div>

      {/* Hero section for ML overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-destructive/10 to-transparent border-destructive/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Brain className="w-16 h-16 text-destructive" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
              Riesgo de Inasistencia
              <Brain className="w-4 h-4 text-destructive" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Activo</div>
            <p className="text-xs font-medium text-destructive mt-1">
              Predicción de cancelaciones
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <TrendingUp className="w-16 h-16 text-emerald-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
              Proyección Financiera
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Activo</div>
            <p className="text-xs font-medium text-emerald-500 mt-1">
              Cierre de mes estimado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <TrendingUp className="w-16 h-16 text-purple-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
              Pronóstico de Demanda
              <TrendingUp className="w-4 h-4 text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Activo</div>
            <p className="text-xs font-medium text-purple-500 mt-1">
              Volumen de inventario
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1">
          <HighRiskAppointments />
        </div>

        <div className="col-span-1 lg:col-span-2">
          <RevenueForecastWidget />
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <DemandForecastWidget />
        </div>
      </div>
    </div>
  )
}
