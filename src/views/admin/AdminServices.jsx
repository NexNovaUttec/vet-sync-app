// src/views/admin/AdminServices.jsx
import { useState, useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useServices } from '@/hooks/useServices'
import { AdminServiceCard } from '@/components/Services/AdminServiceCard'
import { ServicesSkeleton } from '@/components/loaders/ServicesSkeleton'
import { Separator } from '@/components/ui/separator'
import { filterServicesByCategory } from '@/lib/utils'

export function AdminServices() {
  const { allServices, fetchAllServices, loading } = useServices()
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false)

  useEffect(() => {
    fetchAllServices()
  }, [fetchAllServices])

  // Filtrado por término de búsqueda
  const filteredServices =
    allServices?.filter((service) => {
      const term = searchTerm.toLowerCase()
      return (
        service.nombre.toLowerCase().includes(term) ||
        (service.descripcion && service.descripcion.toLowerCase().includes(term))
      )
    }) || []

  const veterinariaServices = filterServicesByCategory(filteredServices, 'Veterinaria')
  const esteticaServices = filterServicesByCategory(filteredServices, 'Estética')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Servicios</h2>
          <p className="text-muted-foreground">Gestiona el catálogo de servicios ofrecidos en la clínica.</p>
        </div>

        <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Servicio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-125">
            <DialogHeader>
              <DialogTitle>Agregar Servicio</DialogTitle>
              <DialogDescription>Ingresa los detalles del nuevo servicio de la clínica.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input id="name" placeholder="Ej. Consulta de Especialidad" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoría
                </Label>
                <Input id="category" placeholder="Ej. Cardíaco" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Precio ($)
                </Label>
                <Input id="price" type="number" placeholder="500" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duración (min)
                </Label>
                <Input id="duration" type="number" placeholder="45" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right mt-2">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  placeholder="Pequeña descripción para el cliente..."
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddMenuOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" onClick={() => setIsAddMenuOpen(false)}>
                Guardar Servicio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative w-full">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar servicio..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cargando */}
      {loading && <ServicesSkeleton />}

      {/* Contenido */}
      {!loading && (
        <div className="space-y-10">
          {/* Sección Veterinaria */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">Veterinaria</h3>
            <Separator />
            {veterinariaServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {veterinariaServices.map((service) => (
                  <AdminServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4">No se encontraron servicios de veterinaria.</p>
            )}
          </section>

          {/* Sección Estética */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">Estética / Spa</h3>
            <Separator />
            {esteticaServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {esteticaServices.map((service) => (
                  <AdminServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4">No se encontraron servicios de estética.</p>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
