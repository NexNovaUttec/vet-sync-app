import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CalendarDays, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

export function UpcomingAppointments({ appointments = [] }) {
  if (!appointments || appointments.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl">Próximas Citas</CardTitle>
          <CardDescription>
            Citas agendadas para los próximos días
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
          <p>No hay citas próximas agendadas.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Próximas Citas</CardTitle>
        <CardDescription>
          Citas agendadas para los próximos días
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {appointments.map((activity, index) => {
            // Formatear la fecha
            const dateObj = new Date(`${activity.fecha}T${activity.hora}`)
            let formattedTime = activity.hora
            try {
              formattedTime = format(dateObj, 'h:mm a')
            } catch {
              // fallback
            }

            return (
              <div key={activity.id || index} className="flex gap-4 items-start">
                <div className="flex-none w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/10 text-blue-500">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Cita para {activity.mascota}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Servicio: {activity.servicio}
                  </p>
                </div>
                <div className="text-right whitespace-nowrap space-y-1">
                  <p className="text-sm font-medium">{formattedTime}</p>
                  <p className="text-xs text-muted-foreground">{activity.fecha}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
