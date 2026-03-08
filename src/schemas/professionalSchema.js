import * as z from 'zod'

export const professionalSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellido: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  especialidad: z.string().min(2, 'Ingresa una especialidad válida'),
  schedules: z.array(z.object({
    id: z.number().optional(), // Existing ID to track updates/deletes
    scheduleDays: z.array(z.string()).min(1, 'Agrega al menos un día'),
    hora_inicio: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora inválida'),
    hora_fin: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora inválida')
  })).min(0), // Can be 0 if the professional doesn't have a schedule yet
  categories: z.array(z.number()).min(1, 'Debes seleccionar al menos una categoría de servicio') // 1 Veterinara, 2 Estetica
}).superRefine((data, ctx) => {
  if (data.schedules) {
    data.schedules.forEach((schedule, index) => {
      const start = new Date(`1970-01-01T${schedule.hora_inicio}:00`)
      const end = new Date(`1970-01-01T${schedule.hora_fin}:00`)
      if (start >= end) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'La hora de fin debe ser mayor a la hora de inicio',
          path: ['schedules', index, 'hora_fin']
        })
      }
    })
  }
})
