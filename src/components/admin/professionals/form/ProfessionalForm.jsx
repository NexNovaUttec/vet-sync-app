import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { professionalSchema } from '@/schemas/professionalSchema'
import { useProfessionals } from '@/hooks/useProfessionals'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

const DAYS_OF_WEEK = [
  { id: 'L', label: 'Lunes' },
  { id: 'M', label: 'Martes' },
  { id: 'W', label: 'Miércoles' },
  { id: 'J', label: 'Jueves' },
  { id: 'V', label: 'Viernes' },
  { id: 'S', label: 'Sábado' },
  { id: 'D', label: 'Domingo' }
]

const CATEGORIES = [
  { id: 1, label: 'Veterinaria' },
  { id: 2, label: 'Estética' }
]

export function ProfessionalForm() {
  const { formState, closeForm, submitForm } = useProfessionals()
  const { isOpen, mode, selectedProfessional } = formState
  const isEditing = mode === 'edit'
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(professionalSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      especialidad: '',
      schedules: [
        {
          scheduleDays: [],
          hora_inicio: '08:00',
          hora_fin: '17:00'
        }
      ],
      categories: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules'
  })

  const watchSchedules = watch('schedules') || []
  const watchCategories = watch('categories') || []

  useEffect(() => {
    if (isOpen) {
      if (isEditing && selectedProfessional) {
        // Parse existing schedules
        let schedules = []

        if (selectedProfessional.horarios_profesionales && selectedProfessional.horarios_profesionales.length > 0) {
          schedules = selectedProfessional.horarios_profesionales.map(schedule => ({
            id: schedule.id,
            scheduleDays: schedule.dias_trabajo.split(''),
            // Format from HH:mm:ss to HH:mm
            hora_inicio: schedule.hora_inicio.substring(0, 5),
            hora_fin: schedule.hora_fin.substring(0, 5)
          }))
        } else {
          schedules = [
            {
              scheduleDays: [],
              hora_inicio: '08:00',
              hora_fin: '17:00'
            }
          ]
        }

        // Parse existing categories
        let categories = []
        if (selectedProfessional.profesional_categorias) {
          categories = selectedProfessional.profesional_categorias
            .filter((pc) => pc.activo)
            .map((pc) => pc.categoria_id)
        }

        reset({
          nombre: selectedProfessional.nombre,
          apellido: selectedProfessional.apellido,
          email: selectedProfessional.email || '',
          telefono: selectedProfessional.telefono || '',
          especialidad: selectedProfessional.especialidad || '',
          schedules,
          categories
        })
      } else {
        reset({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          especialidad: '',
          schedules: [
            {
              scheduleDays: [],
              hora_inicio: '08:00',
              hora_fin: '17:00'
            }
          ],
          categories: []
        })
      }
    }
  }, [isOpen, isEditing, selectedProfessional, reset])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // 1. Prepare Basic Data
      const professionalData = {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email || null,
        telefono: data.telefono || null,
        especialidad: data.especialidad || null
      }

      // 2. Prepare Schedules Data
      // Map back to 'LMWJV' format based on DAYS_OF_WEEK order to keep consistency
      const formattedSchedules = data.schedules.map(schedule => {
        const orderedDays = DAYS_OF_WEEK.filter(d => schedule.scheduleDays.includes(d.id)).map(d => d.id).join('')
        return {
          id: schedule.id, // Will be undefined for new schedules
          dias_trabajo: orderedDays,
          hora_inicio: `${schedule.hora_inicio}:00`,
          hora_fin: `${schedule.hora_fin}:00`
        }
      })

      // Instead of single schedule, we pass array
      await submitForm(professionalData, formattedSchedules, data.categories)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDaySelect = (scheduleIndex, dayId, checked) => {
    const currentDays = watchSchedules[scheduleIndex]?.scheduleDays || []
    if (checked) {
      setValue(`schedules.${scheduleIndex}.scheduleDays`, [...currentDays, dayId], { shouldValidate: true })
    } else {
      setValue(`schedules.${scheduleIndex}.scheduleDays`, currentDays.filter((id) => id !== dayId), { shouldValidate: true })
    }
  }

  const handleCategorySelect = (catId, checked) => {
    const current = watchCategories || []
    if (checked) {
      setValue('categories', [...current, catId], { shouldValidate: true })
    } else {
      setValue('categories', current.filter((id) => id !== catId), { shouldValidate: true })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeForm()}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto p-6 pb-12">
        <SheetHeader className="mb-6">
          <SheetTitle>{isEditing ? 'Editar Profesional' : 'Nuevo Profesional'}</SheetTitle>
          <SheetDescription>
            {isEditing
              ? 'Modifica los datos, horarios o categorías de servicio de este profesional.'
              : 'Agrega un nuevo miembro al equipo y configura sus servicios.'}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* DATOS BÁSICOS */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground border-l-2 border-primary pl-2 uppercase tracking-wider">
              Datos Personales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre <span className="text-destructive">*</span></Label>
                <Input id="nombre" {...register('nombre')} placeholder="Ej. Ana" />
                {errors.nombre && <p className="text-xs text-destructive">{errors.nombre.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido <span className="text-destructive">*</span></Label>
                <Input id="apellido" {...register('apellido')} placeholder="Ej. García" />
                {errors.apellido && <p className="text-xs text-destructive">{errors.apellido.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico <span className="text-destructive">*</span></Label>
                <Input id="email" type="email" {...register('email')} placeholder="ejemplo@clinica.com" />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono <span className="text-destructive">*</span></Label>
                <Input id="telefono" {...register('telefono')} placeholder="55 1234 5678" />
                {errors.telefono && <p className="text-xs text-destructive">{errors.telefono.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="especialidad">Especialidad (Título Público) <span className="text-destructive">*</span></Label>
              <Input id="especialidad" {...register('especialidad')} placeholder="Ej. Cirugía Veterinaria, Estética Canina..." />
              {errors.especialidad && <p className="text-xs text-destructive">{errors.especialidad.message}</p>}
            </div>
          </div>

          <Separator />

          {/* ASIGNACIÓN DE CATEGORÍAS */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground border-l-2 border-primary pl-2 uppercase tracking-wider">
              Áreas de Servicio
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Selecciona los tipos de citas que este profesional puede atender.
            </p>
            <div className="flex gap-6">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${cat.id}`}
                    checked={watchCategories.includes(cat.id)}
                    onCheckedChange={(checked) => handleCategorySelect(cat.id, checked)}
                  />
                  <Label htmlFor={`cat-${cat.id}`} className="font-normal cursor-pointer leading-none">
                    {cat.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.categories && <p className="text-xs text-destructive">{errors.categories.message}</p>}
          </div>

          <Separator />

          {/* HORARIOS */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-l-2 border-primary pl-2">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Horarios Laborales
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => append({ scheduleDays: [], hora_inicio: '08:00', hora_fin: '17:00' })}
              >
                <Plus className="w-4 h-4" />
                Agregar Horario
              </Button>
            </div>
            {errors.schedules?.root && <p className="text-xs text-destructive">{errors.schedules.root.message}</p>}

            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md relative space-y-4 bg-muted/10">
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

                <div className="space-y-3">
                  <Label>Días de Trabajo <span className="text-destructive">*</span></Label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map((day) => {
                      const isChecked = watchSchedules[index]?.scheduleDays?.includes(day.id) || false
                      return (
                        <div key={day.id}>
                          <Checkbox
                            id={`day-${index}-${day.id}`}
                            className="peer sr-only"
                            checked={isChecked}
                            onCheckedChange={(checked) => handleDaySelect(index, day.id, checked)}
                          />
                          <Label
                            htmlFor={`day-${index}-${day.id}`}
                            className="flex items-center justify-center rounded-full border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary cursor-pointer transition-all h-10 w-10 sm:h-11 sm:w-11 text-xs sm:text-sm"
                          >
                            {day.label.substring(0, 2)}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                  {errors.schedules?.[index]?.scheduleDays && (
                    <p className="text-xs text-destructive">{errors.schedules[index].scheduleDays.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor={`hora_inicio_${index}`}>Hora de Entrada <span className="text-destructive">*</span></Label>
                    <Input id={`hora_inicio_${index}`} type="time" {...register(`schedules.${index}.hora_inicio`)} />
                    {errors.schedules?.[index]?.hora_inicio && (
                      <p className="text-xs text-destructive">{errors.schedules[index].hora_inicio.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label htmlFor={`hora_fin_${index}`}>Hora de Salida <span className="text-destructive">*</span></Label>
                    <Input id={`hora_fin_${index}`} type="time" {...register(`schedules.${index}.hora_fin`)} />
                    {errors.schedules?.[index]?.hora_fin && (
                      <p className="text-xs text-destructive">{errors.schedules[index].hora_fin.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground italic text-center py-4 border rounded-md border-dashed">
                No hay horarios definidos. Haz clic en "Agregar Horario" para añadir disponibilidad.
              </p>
            )}
          </div>

          <div className="pt-6 border-t flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={closeForm} disabled={isSubmitting}>
                Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Registrar Profesional'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
