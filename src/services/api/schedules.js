import api from './client'

export const getSchedules = async (profesional_id) => {
  const config = { requiresAuth: true }
  const url = profesional_id ? `/schedules?profesional_id=${profesional_id}` : '/schedules'
  const response = await api.get(url, config)
  return response.data
}

export const addSchedule = async (scheduleData) => {
  const config = { requiresAuth: true }
  const response = await api.post('/schedules', scheduleData, config)
  return response.data
}

export const updateSchedule = async (id, scheduleData) => {
  const config = { requiresAuth: true }
  const response = await api.patch(`/schedules/${id}`, scheduleData, config)
  return response.data
}

export const deleteSchedule = async (id) => {
  const config = { requiresAuth: true }
  const response = await api.delete(`/schedules/${id}`, config)
  return response.data
}
