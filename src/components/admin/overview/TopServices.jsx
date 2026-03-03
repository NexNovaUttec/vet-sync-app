import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Trophy } from 'lucide-react'

export function TopServices({ services = [] }) {
  if (!services || services.length === 0) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-muted-foreground py-10">
        <p>No se han registrado ingresos este mes.</p>
      </Card>
    )
  }

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Top 5 Servicios
        </CardTitle>
        <CardDescription>
          Servicios más rentables del mes actual
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {services.map((service, index) => {
            const isFirst = index === 0

            return (
              <div key={service.name} className="flex gap-4 items-center">
                <div className={`flex-none w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isFirst ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-muted text-muted-foreground'
                }`}>
                  #{index + 1}
                </div>
                <div className="flex-1 space-y-1 overflow-hidden">
                  <p className="text-sm font-medium leading-none truncate" title={service.name}>
                    {service.name}
                  </p>
                </div>
                <div className="text-right text-sm font-semibold">
                  ${service.revenue.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
