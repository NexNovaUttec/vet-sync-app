import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceSchema } from '@/schemas/serviceSchema'
import { LoaderCircle, FilePlus } from 'lucide-react'
import { processImage } from '@/services/processImage'
import { ServiceBasicFields } from './fields/ServiceBasicFields'
import { ServiceImageField } from './fields/ServiceImageField'
import { useServices } from '@/hooks/useServices'

export function ServiceFormContent() {
  const [selectedImage, setSelectedImage] = useState(null)
  const { formState, submitForm, closeForm, loading } = useServices()

  const { mode, selectedService } = formState
  const isEditMode = mode === 'edit'

  const getInitialValues = useCallback(() => {
    return {
      nombre: selectedService?.nombre || '',
      categoria_id: selectedService?.categoria_id ? String(selectedService.categoria_id) : '',
      precio: selectedService?.precio ? String(selectedService.precio) : '',
      duracion_estimada: selectedService?.duracion_estimada ? String(selectedService.duracion_estimada) : '',
      descripcion: selectedService?.descripcion || '',
      activo: selectedService?.activo !== undefined ? String(selectedService.activo) : 'true'
    }
  }, [selectedService])

  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: getInitialValues()
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    control
  } = form

  useEffect(() => {
    if (selectedService) {
      const newValues = getInitialValues()
      reset(newValues)
    }
  }, [selectedService, reset, getInitialValues])

  const handleImageChange = (file) => {
    setSelectedImage(file === null ? 'null' : file)
  }

  const handleImageError = (errorMessage) => {
    setError('image', { message: errorMessage })
  }

  const onSubmit = async (data) => {
    try {
      let imageToUpload = null

      if (selectedImage === 'null') {
        data.img_url = 'null'
      } else if (selectedImage) {
        try {
          const processedImage = await processImage(selectedImage)
          imageToUpload = new File([processedImage], selectedImage.name.replace(/\.[^/.]+$/, '.webp'), {
            type: 'image/webp'
          })
        } catch (imageError) {
          console.error('Error al procesar la imagen:', imageError)
          setError('image', {
            message: 'Error al procesar la imagen. Por favor, intenta con otra imagen.'
          })
          return
        }
      }

      await submitForm(data, imageToUpload)
      handleFormReset()
    } catch (error) {
      console.error('Error al procesar el servicio:', error)
      setError('root', {
        message: `Ocurrió un error al ${isEditMode ? 'actualizar' : 'registrar'} el servicio. Inténtalo de nuevo.`
      })
    }
  }

  const handleFormReset = () => {
    reset()
    setSelectedImage(null)
  }

  const handleCancel = () => {
    handleFormReset()
    closeForm()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-6">
        <ServiceImageField
          error={errors.image}
          onImageChange={handleImageChange}
          onImageError={handleImageError}
          initialImage={selectedService?.img_url}
        />
        <ServiceBasicFields
          control={control}
          errors={errors}
          isEditMode={isEditMode}
          initialValues={{
            categoria_id: selectedService?.categoria_id,
            activo: selectedService?.activo
          }}
        />
      </div>

      {errors.root && <div className="mt-4 rounded-md bg-red-50 p-4 text-red-600">{errors.root.message}</div>}

      <div className="grid grid-cols-1 justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={handleCancel} disabled={isSubmitting || loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || loading}>
          {isSubmitting
            ? isEditMode
              ? 'Actualizando...'
              : 'Registrando...'
            : isEditMode
              ? 'Actualizar Servicio'
              : 'Registrar Servicio'}
          {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin ml-2" /> : <FilePlus className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </form>
  )
}
