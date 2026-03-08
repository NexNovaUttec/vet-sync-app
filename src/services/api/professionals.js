import api from './client'

export const getProfessionals = async () => {
  const config = { requiresAuth: true }
  const response = await api.get('/vets', config)
  return response.data
}

export const getProfessionalById = async (id) => {
  const config = { requiresAuth: true }
  const response = await api.get(`/vets/${id}`, config)
  return response.data
}

export const addProfessional = async (vetData) => {
  const config = { requiresAuth: true }
  const response = await api.post('/vets', vetData, config)
  return response.data
}

export const updateProfessional = async (id, vetData) => {
  const config = { requiresAuth: true }
  const response = await api.patch(`/vets/${id}`, vetData, config)
  return response.data
}

export const assignCategories = async (id, categoriesIds) => {
  const config = { requiresAuth: true }
  const response = await api.post(`/vets/${id}/categories`, { categories: categoriesIds }, config)
  return response.data
}

export const deleteProfessional = async (id) => {
  const config = { requiresAuth: true }
  const response = await api.delete(`/vets/${id}`, config)
  return response.data
}
