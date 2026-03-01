import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Edit, Trash2, ImageOff } from 'lucide-react'
import { useServices } from '@/hooks/useServices'
import { ServiceDeleteDialog } from './ServiceDeleteDialog'

export function AdminServiceCard({ service }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { openEditForm, deleteService } = useServices()

  const handleEdit = () => openEditForm(service.id)
  const handleDelete = () => deleteService(service.id)

  const handleImageLoad = () => setImageLoaded(true)
  const handleImageError = () => setImageError(true)

  return (
    <Card key={service.id} className={'h-full flex flex-col overflow-hidden group pt-0'}>
      {service.img_url && !imageError && (
        <div className="relative w-full aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10" />
          {!imageLoaded && <Skeleton className="w-full h-full rounded-none" />}
          <img
            loading="lazy"
            decoding="async"
            src={service.img_url}
            alt={service.nombre}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-102 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Badge de estado sobre la imagen */}
          <div className="absolute top-2 right-2 z-20">
            <Badge variant={service.activo ? 'default' : 'secondary'}>{service.activo ? 'Activo' : 'Inactivo'}</Badge>
          </div>
        </div>
      )}

      {/* Si no hay imagen, mostrar placeholder con icono */}
      {(!service.img_url || imageError) && (
        <div className="relative w-full aspect-video overflow-hidden bg-muted flex items-center justify-center">
          <ImageOff className="h-12 w-12 text-muted-foreground/50" />
          <div className="absolute top-2 right-2 z-20">
            <Badge variant={service.activo ? 'default' : 'secondary'}>{service.activo ? 'Activo' : 'Inactivo'}</Badge>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold">{service.nombre}</CardTitle>
          <CardDescription className="line-clamp-2 text-md">{service.descripcion}</CardDescription>
        </CardHeader>

        <CardContent className="mt-auto">
          <section className="flex justify-between mb-4 bg-secondary px-8 py-3 rounded-md text-center">
            <div className="flex flex-col justify-center">
              <p className="text-sm">Duración</p>
              <p className="font-semibold text-md">{service.duracion_estimada} min</p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm">Precio</p>
              <p className="font-semibold text-md">${service.precio}</p>
            </div>
          </section>

          <div className="flex gap-2">
            <Button variant="default" className="flex-1 hover:cursor-pointer" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <ServiceDeleteDialog onConfirm={handleDelete}>
              <Button
                variant="outline"
                className="flex-1 text-destructive! border-destructive/30! hover:bg-destructive/10! hover:text-destructive! hover:cursor-pointer"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </ServiceDeleteDialog>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
