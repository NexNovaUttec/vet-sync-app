import { createContext, useCallback, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const ProfessionalsContext = createContext()

import {
  getProfessionals as getProfessionalsApi,
  addProfessional as addProfessionalApi,
  updateProfessional as updateProfessionalApi,
  assignCategories as assignCategoriesApi,
  deleteProfessional as deleteProfessionalApi
} from '@/services/api/professionals'
import {
  getSchedules as getSchedulesApi,
  addSchedule as addScheduleApi,
  updateSchedule as updateScheduleApi,
  deleteSchedule as deleteScheduleApi
} from '@/services/api/schedules'

export function ProfessionalsProvider({ children }) {
  const [professionals, setProfessionals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialized, setInitialized] = useState(false)

  const fetchProfessionals = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getProfessionalsApi()
      setProfessionals(data || [])
      setInitialized(true)
      return data
    } catch (error) {
      console.error('Error fetching professionals:', error)
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const initializeProfessionals = useCallback(() => {
    if (!initialized && !loading) {
      fetchProfessionals()
    }
  }, [initialized, loading, fetchProfessionals])

  // Form state
  const [formState, setFormState] = useState({
    isOpen: false,
    mode: 'add', // 'add' | 'edit'
    selectedProfessionalId: null,
    selectedProfessional: null
  })

  const openAddForm = useCallback(() => {
    setFormState({
      isOpen: true,
      mode: 'add',
      selectedProfessionalId: null,
      selectedProfessional: null
    })
  }, [])

  const openEditForm = useCallback(
    (professionalId) => {
      const professional = professionals.find((p) => p.id === professionalId)
      setFormState({
        isOpen: true,
        mode: 'edit',
        selectedProfessionalId: professionalId,
        selectedProfessional: professional
      })
    },
    [professionals]
  )

  const closeForm = useCallback(() => {
    setFormState({
      isOpen: false,
      mode: 'add',
      selectedProfessionalId: null,
      selectedProfessional: null
    })
  }, [])

  const addProfessional = useCallback(
    async (professionalData, schedulesData, categories) => {
      try {
        setLoading(true)
        const { toast } = await import('sonner')

        // 1. Create professional
        const vetResponse = await addProfessionalApi(professionalData)
        const newVetId = vetResponse.data[0].id

        // 2. Add schedules
        if (schedulesData && schedulesData.length > 0) {
          const schedulePromises = schedulesData.map((schedule) =>
            addScheduleApi({
              profesional_id: newVetId,
              dias_trabajo: schedule.dias_trabajo,
              hora_inicio: schedule.hora_inicio,
              hora_fin: schedule.hora_fin
            })
          )
          await Promise.all(schedulePromises)
        }

        // 3. Assign categories
        if (categories && categories.length > 0) {
          await assignCategoriesApi(newVetId, categories)
        }

        toast.success('Profesional registrado exitosamente.')
        await fetchProfessionals()
        closeForm()
        return vetResponse
      } catch (error) {
        console.error('Error adding professional:', error)
        setError(error)
        const { toast } = await import('sonner')

        const errorMessage = error.response?.data?.message || 'No se pudo registrar al profesional. Por favor, inténtalo de nuevo.'
        toast.error(errorMessage)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [fetchProfessionals, closeForm]
  )

  const updateProfessional = useCallback(
    async (professionalId, professionalData, schedulesData, categories) => {
      try {
        setLoading(true)
        const { toast } = await import('sonner')

        // 1. Update basic info
        await updateProfessionalApi(professionalId, professionalData)

        // 2. Update, Create or Delete schedules
        if (schedulesData) {
          const { data: currentSchedules } = await getSchedulesApi(professionalId)
          const currentScheduleIds = (currentSchedules || []).map((s) => s.id)
          const formScheduleIds = schedulesData.map((s) => s.id).filter((id) => id !== undefined)

          const schedulesToDelete = currentScheduleIds.filter((id) => !formScheduleIds.includes(id))
          const schedulesToAdd = schedulesData.filter((s) => s.id === undefined)
          const schedulesToUpdate = schedulesData.filter((s) => s.id !== undefined)

          const updateOperations = []

          // Delete removed schedules
          schedulesToDelete.forEach((id) => {
            updateOperations.push(deleteScheduleApi(id))
          })

          // Add pending schedules
          schedulesToAdd.forEach((schedule) => {
            updateOperations.push(
              addScheduleApi({
                profesional_id: professionalId,
                dias_trabajo: schedule.dias_trabajo,
                hora_inicio: schedule.hora_inicio,
                hora_fin: schedule.hora_fin
              })
            )
          })

          // Update existing schedules only if they changed
          schedulesToUpdate.forEach((schedule) => {
            const currentSchedule = currentSchedules.find(s => s.id === schedule.id)

            // Check if any relevant field actually changed
            const hasChanged = !currentSchedule ||
                               currentSchedule.dias_trabajo !== schedule.dias_trabajo ||
                               currentSchedule.hora_inicio !== schedule.hora_inicio ||
                               currentSchedule.hora_fin !== schedule.hora_fin

            if (hasChanged) {
              updateOperations.push(
                updateScheduleApi(schedule.id, {
                  profesional_id: professionalId,
                  dias_trabajo: schedule.dias_trabajo,
                  hora_inicio: schedule.hora_inicio,
                  hora_fin: schedule.hora_fin
                })
              )
            }
          })

          if (updateOperations.length > 0) {
            await Promise.all(updateOperations)
          }
        }

        // 3. Update categories
        if (categories !== undefined) {
          await assignCategoriesApi(professionalId, categories)
        }

        toast.success('Profesional actualizado exitosamente.')
        await fetchProfessionals()
        closeForm()
      } catch (error) {
        console.error('Error updating professional:', error)
        setError(error)
        const { toast } = await import('sonner')

        const errorMessage = error.response?.data?.message || 'No se pudo actualizar al profesional. Por favor, inténtalo de nuevo.'
        toast.error(errorMessage)
        throw error
      } finally {
        setLoading(false)
      }
    },
    [fetchProfessionals, closeForm]
  )

  const deleteProfessional = useCallback(
    async (professionalId) => {
      try {
        setLoading(true)
        const { toast } = await import('sonner')

        await deleteProfessionalApi(professionalId)
        await fetchProfessionals()
        toast.success('Profesional eliminado correctamente')
      } catch (error) {
        console.error('Error deleting professional:', error)
        setError(error)
        const { toast } = await import('sonner')
        toast.error('No se pudo eliminar al profesional. Por favor, inténtalo de nuevo.')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [fetchProfessionals]
  )

  const submitForm = useCallback(
    async (professionalData, schedulesData, categories) => {
      if (formState.mode === 'add') {
        return await addProfessional(professionalData, schedulesData, categories)
      } else {
        return await updateProfessional(
          formState.selectedProfessionalId,
          professionalData,
          schedulesData,
          categories
        )
      }
    },
    [formState.mode, formState.selectedProfessionalId, addProfessional, updateProfessional]
  )

  const value = {
    professionals,
    loading,
    error,
    initialized,
    fetchProfessionals,
    initializeProfessionals,

    formState,
    openAddForm,
    openEditForm,
    closeForm,
    submitForm,
    deleteProfessional
  }

  return <ProfessionalsContext.Provider value={value}>{children}</ProfessionalsContext.Provider>
}
