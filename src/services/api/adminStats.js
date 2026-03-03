import api from './client'

export const getAdminStats = async () => {
  try {
    const { data } = await api.get('/admin/stats', { requiresAuth: true })
    return data.data
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    throw error
  }
}
