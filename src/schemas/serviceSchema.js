import { z } from 'zod'

export const serviceSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre del servicio es obligatorio',
    invalid_type_error: 'El nombre debe ser una cadena de texto'
  })
    .trim()
    .min(1, 'El nombre del servicio es obligatorio')
    .max(100, 'El nombre no debe exceder los 100 caracteres'),

  descripcion: z.string({
    required_error: 'La descripción es obligatoria',
    invalid_type_error: 'La descripción debe ser una cadena de texto'
  })
    .trim()
    .min(1, 'La descripción es obligatoria')
    .max(255, 'La descripción no debe exceder los 255 caracteres'),

  categoria_id: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number({
      required_error: 'La categoría es obligatoria'
    })
      .int('La categoría debe ser un número entero')
      .positive('La categoría debe ser un número positivo')
  ),

  precio: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number({
      required_error: 'El precio es obligatorio'
    })
      .nonnegative('El precio no puede ser negativo')
  ),

  duracion_estimada: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number({
      required_error: 'La duración estimada es obligatoria'
    })
      .int('La duración estimada debe ser un número entero')
      .positive('La duración estimada debe ser un número positivo')
  ),

  activo: z.preprocess((val) => {
    if (val === 'true' || val === true) return true
    if (val === 'false' || val === false) return false
    return val
  }, z.boolean()).optional(),

  image: z.any().optional()
})
