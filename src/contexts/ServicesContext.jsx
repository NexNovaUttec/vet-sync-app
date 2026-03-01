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

  const value = {
    services,
    allServices,
    loading,
    error,
    initialized,
    fetchServices,
    fetchAllServices,
    initializeServices
  }

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>
}

export { ServicesContext }
