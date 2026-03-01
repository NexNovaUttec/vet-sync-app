// src/views/admin/AdminServices.jsx
import { useState, useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useServices } from '@/hooks/useServices'
import { AdminServiceCard } from '@/components/admin/services/AdminServiceCard'
import { ServicesSkeleton } from '@/components/loaders/ServicesSkeleton'
import { Separator } from '@/components/ui/separator'
import { filterServicesByCategory } from '@/lib/utils'
import { ServicesForm } from '@/components/admin/services/form/ServicesForm'

export function AdminServices() {
  const { allServices, fetchAllServices, loading, openAddForm } = useServices()
  const [searchTerm, setSearchTerm] = useState('')

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

        <Button className="w-full sm:w-auto" onClick={() => openAddForm()}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Servicio
        </Button>
      </div>

      <ServicesForm />

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
