import api from './client'

export const getServices = async () => {
  try {
    const response = await api.get('/services/active/true')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getAllServices = async () => {
  try {
    const response = await api.get('/services')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const addService = async (serviceData) => {
  try {
    const config = { requiresAuth: true }
    const response = await api.post('/services', serviceData, config)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateService = async (serviceId, serviceData) => {
  try {
    const config = { requiresAuth: true }
    const response = await api.patch(`/services/${serviceId}`, serviceData, config)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteService = async (serviceId) => {
  try {
    const config = { requiresAuth: true }
    const response = await api.delete(`/services/${serviceId}`, config)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const uploadServiceImage = async (serviceId, imageFile) => {
  if (!serviceId || !imageFile) {
    const error = new Error('Se requiere ID de servicio y archivo de imagen')
    console.error('Error uploading service image:', error)
    throw error
  }

  try {
    const formData = new FormData()
    formData.append('imagen', imageFile)

    const config = {
      requiresAuth: true
    }

    const { data } = await api.post(`/services/${serviceId}/imagen`, formData, config)
    return data
  } catch (error) {
    console.error('Error uploading service image:', error)
    throw error
  }
}
