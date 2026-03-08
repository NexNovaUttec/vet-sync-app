import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Clock, Stethoscope, Edit, Trash2 } from 'lucide-react'
import { useProfessionals } from '@/hooks/useProfessionals'
import { formatTime } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProfessionalDeleteDialog } from './ProfessionalDeleteDialog'

const DAYS_MAP = {
  'L': 'Lu',
  'M': 'Ma',
  'W': 'Mi',
  'J': 'Ju',
  'V': 'Vi',
  'S': 'Sá',
  'D': 'Do'
}

const formatDays = (daysString) => {
  if (!daysString) return ''
  return daysString.split('').map(dayId => DAYS_MAP[dayId] || dayId).join(', ')
}

export function ProfessionalCard({ professional }) {
  const { openEditForm, deleteProfessional } = useProfessionals()
  const schedules = professional.horarios_profesionales || []
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteProfessional(professional.id)
    } finally {
      setIsDeleting(false)
    }
  }

  const initials = `${professional.nombre?.[0] || ''}${professional.apellido?.[0] || ''}`.toUpperCase()

  // Extraer info de relaciones si existen
  const getCategories = () => {
    if (!professional.profesional_categorias) return []
    return professional.profesional_categorias
      .filter(pc => pc.activo)
      .map(pc => pc.categorias_servicio.nombre)
  }

  const categories = getCategories()

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center gap-4 pb-2 border-b bg-muted/20">
        <Avatar className="h-14 w-14 border-2 border-background shadow-sm shrink-0">
          <AvatarImage src={`https://api.dicebear.com/9.x/shapes/svg?seed=${professional.id}`} />
          <AvatarFallback className="text-lg bg-primary/10 text-primary">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate" title={`${professional.nombre} ${professional.apellido}`}>
            {professional.nombre} {professional.apellido}
          </h3>
          <p className="text-sm text-muted-foreground truncate" title={professional.especialidad}>
            {professional.especialidad || 'Sin especialidad'}
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4 shrink-0" />
            <span className="truncate" title={professional.email}>{professional.email || 'No email'}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4 shrink-0" />
            <span>{professional.telefono || 'No teléfono'}</span>
          </div>
        </div>

        {/* Schedule & Categories */}
        <div className="space-y-3 pt-3 border-t">
          {schedules.length > 0 ? (
            <div className="space-y-2">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="flex items-start text-sm text-muted-foreground bg-muted/20 p-2 rounded-md border text-xs">
                  <Clock className="w-4 h-4 mr-2" />
                  <div>
                    <span className="font-medium mr-1">{formatDays(schedule.dias_trabajo)}:</span>
                    {formatTime(schedule.hora_inicio)} - {formatTime(schedule.hora_fin)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic">Sin horario asignado</div>
          )}

          {categories.length > 0 && (
            <div className="flex items-start gap-2 text-sm">
              <Stethoscope className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-1">
                {categories.map((c, i) => (
                  <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0 md:text-xs md:px-2.5 md:py-0.5 border-primary text-primary bg-primary/5">{c}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <Button variant="default" className="flex-1 hover:cursor-pointer" onClick={() => openEditForm(professional.id)}>
            <Edit className="w-4 h-4" />
            Editar
          </Button>

          <ProfessionalDeleteDialog
            professionalName={professional.nombre}
            onConfirm={handleDelete}
          >
            <Button
              variant="outline"
              className="flex-1 text-destructive! border-destructive/30! hover:bg-destructive/10! hover:text-destructive! hover:cursor-pointer"
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </Button>
          </ProfessionalDeleteDialog>
        </div>
      </CardContent>
    </Card>
  )
}
