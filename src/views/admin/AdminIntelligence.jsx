import { Brain, TrendingUp, Users } from 'lucide-react'
import { HighRiskAppointments } from '@/components/admin/intelligence/HighRiskAppointments'
import { RevenueForecastWidget } from '@/components/admin/intelligence/RevenueForecastWidget'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function AdminIntelligence() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
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
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
              Estado del Modelo IA
              <Brain className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Activo</div>
            <p className="text-xs text-muted-foreground mt-1 text-primary">
              Precisión de validación: 100%
            </p>
          </CardContent>
        </Card>

        {/* Placeholder for future ML models (e.g., Demand Forecasting) */}
        <Card className="opacity-50 grayscale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
              Pronóstico de Demanda
              <TrendingUp className="w-4 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Próximamente</div>
            <p className="text-xs text-muted-foreground mt-1">
              Serie temporal de servicios
            </p>
          </CardContent>
        </Card>

        {/* Placeholder for future ML models (e.g., Churn Prediction) */}
        <Card className="opacity-50 grayscale hidden lg:block">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
              Riesgo de Fuga de Clientes
              <Users className="w-4 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Próximamente</div>
            <p className="text-xs text-muted-foreground mt-1">
              Análisis predictivo de retención
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 border-t-4 border-t-destructive rounded-xl shadow-lg">
          <HighRiskAppointments />
        </div>

        <div className="col-span-1 lg:col-span-2">
          <RevenueForecastWidget />
        </div>
      </div>
    </div>
  )
}
