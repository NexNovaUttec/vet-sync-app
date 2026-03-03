import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Dog, Cat, AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export function RecentPets({ pets = [] }) {
  if (!pets || pets.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl">Nuevos Pacientes</CardTitle>
          <CardDescription>
            Últimas mascotas registradas
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
          <p>No se encontraron registros recientes.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Nuevos Pacientes</CardTitle>
        <CardDescription>
          Últimas mascotas registradas en la clínica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {pets.map((pet, index) => {
            const isCat = pet.especie.toLowerCase().includes('gato') || pet.especie.toLowerCase().includes('felino')
            const Icon = isCat ? Cat : Dog

            // Format time ago safely
            let timeAgo = ''
            if (pet.fecha) {
              try {
                timeAgo = formatDistanceToNow(new Date(pet.fecha), { addSuffix: true, locale: es })
              } catch {
                timeAgo = pet.fecha
              }
            }

            return (
              <div key={pet.id || index} className="flex gap-4 items-center">
                <div className="flex-none w-10 h-10 rounded-full flex items-center justify-center bg-green-500/10 text-green-500">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {pet.nombre}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {pet.raza} ({pet.especie})
                  </p>
                </div>
                <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
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
