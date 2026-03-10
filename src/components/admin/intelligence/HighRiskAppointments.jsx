import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CalendarClock, BrainCircuit } from 'lucide-react'
import { getAllAppointments } from '@/services/api/appointments'
import { getNoShowRisk } from '@/services/api/ml'
import { LoadingSpinner } from '@/components/loaders/LoadingSpinner'
import { format, isAfter, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { ScrollArea } from '@/components/ui/scroll-area'

export function HighRiskAppointments() {
  const [highRiskAppointments, setHighRiskAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAndAnalyzeAppointments = async () => {
      try {
        setLoading(true)
        // 1. Obtener todas las citas
        const responseData = await getAllAppointments()
        const allAppointments = Array.isArray(responseData) ? responseData : (responseData?.data || [])

        // 2. Filtrar citas futuras y en estado 'agendada'
        const now = new Date()
        const upcomingAppointments = allAppointments.filter(app => {
          const isUpcoming = isAfter(parseISO(app.fecha), now)
          const isScheduled = app.status?.toLowerCase() === 'agendada'
          return isUpcoming && isScheduled
        })

        // 3. Consultar a la IA por el riesgo de cada cita pendiente
        // Hacemos las peticiones en paralelo para que sea más rápido
        const risksPromises = upcomingAppointments.map(async (app) => {
          try {
            const riskData = await getNoShowRisk(app.id)
            return {
              ...app,
              riesgo_ausencia: riskData?.data?.riesgo_ausencia || 0,
              riesgo_explicacion: riskData?.data?.explicacion || ''
            }
          } catch (err) {
            console.warn(`No se pudo obtener riesgo para cita ${app.id}`, err)
            return {
              ...app,
              riesgo_ausencia: 0,
              riesgo_explicacion: 'No disponible'
            }
          }
        })

        const appointmentsWithRisk = await Promise.all(risksPromises)

        // 4. Filtrar solo los de alto riesgo (ej. > 60%) y ordenar de mayor a menor riesgo
        const highRisk = appointmentsWithRisk
          .filter(app => app.riesgo_ausencia > 0.60)
          .sort((a, b) => b.riesgo_ausencia - a.riesgo_ausencia)

        setHighRiskAppointments(highRisk)
      } catch (err) {
        console.error('Error analizando citas de alto riesgo:', err)
        setError('No se pudo analizar el riesgo de las citas.')
      } finally {
        setLoading(false)
      }
    }

    fetchAndAnalyzeAppointments()
  }, [])

  if (loading) {
    return (
      <Card className="col-span-1 h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <LoadingSpinner />
          <p className="text-sm">IA Analizando patrones de inasistencia...</p>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Error de Análisis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-1 flex flex-col h-full ring-1 ring-destructive/20 shadow-sm">
      <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <BrainCircuit className="w-5 h-5 text-destructive" />
            Riesgo de Inasistencia
          </CardTitle>
          {highRiskAppointments.length > 0 && (
            <Badge variant="destructive" className="font-bold">
              {highRiskAppointments.length} Alertas
            </Badge>
          )}
        </div>
        <CardDescription>
          Citas detectadas por Machine Learning con alta probabilidad de ser canceladas o ignoradas.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full max-h-[400px]">
          {highRiskAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground p-6 text-center">
              <CalendarClock className="w-12 h-12 mb-3 text-emerald-500/50" />
              <p>Tu agenda luce estable.</p>
              <p className="text-sm">La IA no detectó anomalías en las próximas citas.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {highRiskAppointments.map((app) => {
                const percentage = Math.round(app.riesgo_ausencia * 100)
                const dateFormatted = format(parseISO(app.fecha), 'EEEE d \'de\' MMMM', { locale: es })

                return (
                  <div key={app.id} className="p-4 hover:bg-muted/30 transition-colors flex flex-col gap-2 relative overflow-hidden">
                    {/* Background Progress Bar for visual impact */}
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-destructive/60"
                      style={{ width: `${percentage}%` }}
                    />

                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">
                          {app.mascotas?.nombre || 'Mascota'} - {app.servicios?.nombre || 'Servicio'}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {dateFormatted} a las {app.hora_inicio?.substring(0, 5)}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-destructive border-destructive font-bold bg-destructive/10">
                        {percentage}% Riesgo
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md border text-balance">
                        <span className="font-semibold text-foreground mr-1">Tutor:</span>
                        {app.usuarios?.nombre} {app.usuarios?.apellido} ({app.usuarios?.telefono})
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
