import { formatDate, getCurrentDateInCDMX, filterServicesByCategory, sortAppointments, groupAppointmentsByStatus } from './utils'

describe('formatDate', () => {
  it('formatea una fecha YYYY-MM-DD a formato largo español', () => {
    expect(formatDate('2024-02-17')).toMatch(/17 de febrero de 2024/)
  })
})

describe('getCurrentDateInCDMX', () => {
  it('devuelve la fecha actual en formato YYYY-MM-DD', () => {
    const result = getCurrentDateInCDMX()
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

describe('filterServicesByCategory', () => {
  const services = [
    { id: 1, categoria_id: 1 },
    { id: 2, categoria_id: 2 }
  ]
  it('filtra servicios de Veterinaria', () => {
    expect(filterServicesByCategory(services, 'Veterinaria')).toEqual([
      { id: 1, categoria_id: 1 }
    ])
  })
  it('filtra servicios de Estética', () => {
    expect(filterServicesByCategory(services, 'Estética')).toEqual([
      { id: 2, categoria_id: 2 }
    ])
  })
})

describe('sortAppointments', () => {
  it('ordena primero las activas por fecha ascendente y luego las demás por fecha descendente', () => {
    const appointments = [
      { status: 'Finalizada', fecha: '2024-02-15', hora_inicio: '10:00' },
      { status: 'Programada', fecha: '2024-02-20', hora_inicio: '09:00' },
      { status: 'En Curso', fecha: '2024-02-18', hora_inicio: '11:00' },
      { status: 'Cancelada', fecha: '2024-02-10', hora_inicio: '08:00' }
    ]
    const sorted = sortAppointments([...appointments])
    expect(sorted[0].status).toBe('En Curso')
    expect(sorted[1].status).toBe('Programada')
    expect(sorted[2].status).toBe('Finalizada')
    expect(sorted[3].status).toBe('Cancelada')
  })
})

describe('groupAppointmentsByStatus', () => {
  it('agrupa citas en pendientes e historial', () => {
    const appointments = [
      { status: 'Programada' },
      { status: 'Finalizada' },
      { status: 'En Curso' },
      { status: 'Cancelada' }
    ]
    const grouped = groupAppointmentsByStatus(appointments)
    expect(grouped.pending).toHaveLength(2)
    expect(grouped.history).toHaveLength(2)
  })
})
