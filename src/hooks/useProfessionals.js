import { useContext } from 'react'
import { ProfessionalsContext } from '@/contexts/ProfessionalsContext'

export function useProfessionals() {
  const context = useContext(ProfessionalsContext)

  if (!context) {
    throw new Error('useProfessionals must be used within a ProfessionalsProvider')
  }

  return context
}
