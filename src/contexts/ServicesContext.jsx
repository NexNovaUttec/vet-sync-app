import { createContext, useCallback, useState } from 'react'
import { getServices as getServicesApi, getAllServices as getAllServicesApi } from '@/services/api/services'

const ServicesContext = createContext()

export function ServicesProvider({ children }) {
  const [services, setServices] = useState([])
  const [allServices, setAllServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialized, setInitialized] = useState(false)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getServicesApi()
      setServices(data)
      setInitialized(true)
      return data
    } catch (error) {
      console.error('Error fetching services:', error)
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchAllServices = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getAllServicesApi()
      setAllServices(data)
      return data
    } catch (error) {
      console.error('Error fetching all services:', error)
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const initializeServices = useCallback(() => {
    if (!initialized && !loading) {
      fetchServices()
    }
  }, [initialized, loading, fetchServices])

  // Estado para el formulario
  const [formState, setFormState] = useState({
    isOpen: false,
    mode: 'add', // 'add' | 'edit'
    selectedServiceId: null,
    selectedService: null
  })

  // Funciones para manejar el formulario
  const openAddForm = useCallback(() => {
    setFormState({
      isOpen: true,
      mode: 'add',
      selectedServiceId: null,
      selectedService: null
    })
  }, [])

  const openEditForm = useCallback(
    (serviceId) => {
      const service = allServices.find((s) => s.id === serviceId)
      setFormState({
        isOpen: true,
        mode: 'edit',
        selectedServiceId: serviceId,
        selectedService: service
      })
    },
    [allServices]
  )

  const closeForm = useCallback(() => {
    setFormState({
      isOpen: false,
      mode: 'add',
      selectedServiceId: null,
      selectedService: null
    })
  }, [])

  const addService = useCallback(
    async (serviceData, imageFile = null) => {
      try {
        setLoading(true)

        // API calls are mocked or imported
        const { addService: addServiceApi, uploadServiceImage } = await import('@/services/api/services')
        const { toast } = await import('sonner')

        const response = await addServiceApi(serviceData)

        if (imageFile && response.data?.[0]?.id) {
          try {
            const serviceId = response.data[0].id
            await uploadServiceImage(serviceId, imageFile)
            toast.success(`${serviceData.nombre} ha sido registrado exitosamente.`)
          } catch (imageError) {
            console.error('Error uploading image:', imageError)
            toast.warning(`${serviceData.nombre} fue registrado pero no se pudo subir la imagen.`)
          }
        } else {
          toast.success(`${serviceData.nombre} ha sido registrado exitosamente.`)
        }

        await fetchAllServices()
        closeForm()

        return response
      } catch (error) {
        console.error('Error adding service:', error)
        setError(error)
        const { toast } = await import('sonner')
        toast.error('No se pudo registrar el servicio. Por favor, inténtalo de nuevo.')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [fetchAllServices, closeForm]
  )

  const updateService = useCallback(
    async (serviceId, serviceData, imageFile = null) => {
      try {
        setLoading(true)

        const { updateService: updateServiceApi, uploadServiceImage } = await import('@/services/api/services')
        const { toast } = await import('sonner')

        const response = await updateServiceApi(serviceId, serviceData)

        if (imageFile) {
          try {
            await uploadServiceImage(serviceId, imageFile)
            toast.success(`${serviceData.nombre} ha sido actualizado exitosamente.`)
          } catch (imageError) {
            console.error('Error uploading image:', imageError)
            toast.warning(`${serviceData.nombre} fue actualizado pero no se pudo subir la imagen.`)
          }
        } else {
          toast.success(`${serviceData.nombre} ha sido actualizado exitosamente.`)
        }

        await fetchAllServices()
        closeForm()

        return response
      } catch (error) {
        console.error('Error updating service:', error)
        setError(error)
        const { toast } = await import('sonner')
        toast.error('No se pudo actualizar el servicio. Por favor, inténtalo de nuevo.')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [fetchAllServices, closeForm]
  )

  const deleteService = useCallback(
    async (serviceId) => {
      try {
        setLoading(true)
        const { deleteService: deleteServiceApi } = await import('@/services/api/services')
        const { toast } = await import('sonner')

        await deleteServiceApi(serviceId)

        await fetchAllServices()
        toast.success('Servicio eliminado correctamente')
      } catch (error) {
        console.error('Error deleting service:', error)
        setError(error)
        const { toast } = await import('sonner')
        toast.error('No se pudo eliminar el servicio. Por favor, inténtalo de nuevo.')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [fetchAllServices]
  )

  const submitForm = useCallback(
    async (serviceData, imageFile = null) => {
      if (formState.mode === 'add') {
        return await addService(serviceData, imageFile)
      } else {
        return await updateService(formState.selectedServiceId, serviceData, imageFile)
      }
    },
    [formState.mode, formState.selectedServiceId, addService, updateService]
  )

  const value = {
    services,
    allServices,
    loading,
    error,
    initialized,
    fetchServices,
    fetchAllServices,
    initializeServices,

    // Form state
    formState,

    // Form actions
    openAddForm,
    openEditForm,
    closeForm,
    submitForm,
    deleteService
  }

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>
}

export { ServicesContext }
