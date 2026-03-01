// src/components/dashboard/RecentActivity.jsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CalendarDays, HeartPulse, UserPlus } from 'lucide-react'

const activityLog = [
  {
    id: 1,
    type: 'appointment',
    title: 'Nueva cita programada',
    desc: 'Juan Pérez agendó para Max a las 10:00 AM',
    time: 'Hace 5 min',
    icon: CalendarDays,
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    id: 2,
    type: 'user',
    title: 'Nuevo cliente registrado',
    desc: 'María Gómez se unió a la plataforma',
    time: 'Hace 2 horas',
    icon: UserPlus,
    color: 'bg-green-500/10 text-green-500'
  },
  {
    id: 3,
    type: 'service',
    title: 'Servicio completado',
    desc: 'Vacunación de Luna terminada por Dr. Smith',
    time: 'Hace 4 horas',
    icon: HeartPulse,
    color: 'bg-purple-500/10 text-purple-500'
  }
]

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Actividad Reciente</CardTitle>
        <CardDescription>
          Últimos movimientos en el sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activityLog.map((activity) => (
            <div key={activity.id} className="flex gap-4 items-start">
              <div
                className={`flex-none w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}
              >
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.desc}</p>
              </div>
              <div className="text-right whitespace-nowrap text-xs text-muted-foreground">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
