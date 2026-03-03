import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function ServiceBasicFields({ control, errors, isEditMode, initialValues = {} }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Controller
          name="nombre"
          control={control}
          render={({ field }) => (
            <Input id="nombre" placeholder="Ej. Consulta General" className={errors?.nombre ? 'border-red-500' : ''} {...field} />
          )}
        />
        {errors?.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="grid gap-2 w-full">
          <Label htmlFor="categoria_id">Categoría</Label>
          <Controller
            name="categoria_id"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(val) => field.onChange(val)}
                value={field.value ? String(field.value) : undefined}
                defaultValue={initialValues.categoria_id ? String(initialValues.categoria_id) : undefined}
              >
                <SelectTrigger className={`w-full ${errors?.categoria_id ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Veterinaria</SelectItem>
                  <SelectItem value="2">Estética</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors?.categoria_id && <p className="text-sm text-red-500">{errors.categoria_id.message}</p>}
        </div>

        <div className="grid gap-2 w-full">
          <Label htmlFor="precio">Precio ($)</Label>
          <Controller
            name="precio"
            control={control}
            render={({ field }) => (
              <Input
                id="precio"
                type="number"
                placeholder="250.00"
                className={`w-full ${errors?.precio ? 'border-red-500' : ''}`}
                {...field}
              />
            )}
          />
          {errors?.precio && <p className="text-sm text-red-500">{errors.precio.message}</p>}
        </div>
      </div>

      <div className={isEditMode ? 'grid grid-cols-2 gap-4 w-full' : 'grid gap-2'}>
        <div className="grid gap-2 w-full">
          <Label htmlFor="duracion_estimada">Duración estimada (minutos)</Label>
          <Controller
            name="duracion_estimada"
            control={control}
            render={({ field }) => (
              <Input
                id="duracion_estimada"
                type="number"
                placeholder="Ej: 30"
                className={`w-full ${errors?.duracion_estimada ? 'border-red-500' : ''}`}
                {...field}
              />
            )}
          />
          {errors?.duracion_estimada && <p className="text-sm text-red-500">{errors.duracion_estimada.message}</p>}
        </div>

        {isEditMode && (
          <div className="grid gap-2 w-full">
            <Label htmlFor="activo">Estado del Servicio</Label>
            <Controller
              name="activo"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(val) => field.onChange(val)}
                  value={field.value !== undefined ? String(field.value) : undefined}
                  defaultValue={initialValues.activo !== undefined ? String(initialValues.activo) : undefined}
                >
                  <SelectTrigger className={`w-full ${errors?.activo ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Activo</SelectItem>
                    <SelectItem value="false">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.activo && <p className="text-sm text-red-500">{errors.activo.message}</p>}
          </div>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Controller
          name="descripcion"
          control={control}
          render={({ field }) => (
            <Textarea
              id="descripcion"
              placeholder="Detalles del servicio..."
              className={errors?.descripcion ? 'border-red-500 min-h-[100px]' : 'min-h-[100px]'}
              {...field}
            />
          )}
        />
        {errors?.descripcion && <p className="text-sm text-red-500">{errors.descripcion.message}</p>}
      </div>
    </div>
  )
}
