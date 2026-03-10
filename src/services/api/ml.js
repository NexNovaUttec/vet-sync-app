import api from './client'

/**
 * Service to interact with the Machine Learning predictions endpoints.
 */

// Fetch the No-Show risk percentage for a given appointment
export const getNoShowRisk = async (citaId) => {
  try {
    const response = await api.get(`/ml/no-show-risk/${citaId}`, { requiresAuth: true })
    return response.data
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error('No se pudo obtener la predicción de inasistencia.')
  }
}

/**
 * Obtener la proyección financiera basada en ML
 * @returns {Promise<Object>} Datos del pronóstico (real/scheduled/extra)
 */
export const getRevenueForecast = async () => {
  try {
    const response = await api.get('/ml/revenue-forecast', { requiresAuth: true })
    return response.data
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    throw new Error('No se pudo obtener el pronóstico de ingresos.')
  }
}
