import { useState, useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProfessionals } from '@/hooks/useProfessionals'
import { ServicesSkeleton } from '@/components/loaders/ServicesSkeleton'
import { ProfessionalForm } from '@/components/admin/professionals/form/ProfessionalForm'
import { ProfessionalCard } from '@/components/admin/professionals/ProfessionalCard'

export function AdminProfessionals() {
  const { professionals, fetchProfessionals, loading, openAddForm } = useProfessionals()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProfessionals()
  }, [fetchProfessionals])

  const filteredProfessionals =
    professionals?.filter((professional) => {
      const term = searchTerm.toLowerCase()
      const fullName = `${professional.nombre} ${professional.apellido}`.toLowerCase()
      return (
        fullName.includes(term) ||
        (professional.especialidad && professional.especialidad.toLowerCase().includes(term)) ||
        (professional.email && professional.email.toLowerCase().includes(term))
      )
    }) || []

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Veterinarios</h2>
          <p className="text-muted-foreground">Gestiona el personal veterinario y de estética.</p>
        </div>

        <Button className="w-full sm:w-auto" onClick={() => openAddForm()}>
          <Plus className="w-4 h-4" />
          Nuevo Profesional
        </Button>
      </div>

      <ProfessionalForm />

      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar profesional por nombre, correo o especialidad..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading && <ServicesSkeleton />}

      {/* Content */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))
          ) : (
            <p className="text-muted-foreground py-4 col-span-full text-center">
              No se encontraron profesionales que coincidan con la búsqueda.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
