import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { User, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export function RecentUsers({ users = [] }) {
  if (!users || users.length === 0) {
    return (
      <Card className="h-full border shadow-sm flex flex-col items-center justify-center text-muted-foreground py-10">
        <p>No hay usuarios recientes.</p>
      </Card>
    )
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Nuevos Clientes
        </CardTitle>
        <CardDescription>
          Últimos usuarios registrados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {users.map((user) => {
            // Forma segura de obtener las iniciales
            const initals = user.nombre ? user.nombre.substring(0, 2).toUpperCase() : 'U'

            // Format time ago safely
            let timeAgo = ''
            if (user.fecha) {
              try {
                timeAgo = formatDistanceToNow(new Date(user.fecha), { addSuffix: true, locale: es })
              } catch {
                timeAgo = user.fecha
              }
            }

            return (
              <div key={user.id} className="flex gap-4 items-center">
                <div className="flex-none w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary font-bold text-sm">
                  {initals}
                </div>
                <div className="flex-1 space-y-1 overflow-hidden">
                  <p className="text-sm font-medium leading-none truncate" title={user.nombre}>
                    {user.nombre}
                  </p>
                  <p className="text-xs text-muted-foreground truncate" title={user.email}>
                    {user.email}
                  </p>
                </div>
                <div className="text-right text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {timeAgo}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
