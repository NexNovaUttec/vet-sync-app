import { useEffect, useState } from 'react'
import { useAppointments } from '@/hooks/useAppointments'
import { AdminDataTable } from '@/components/admin/appointments/table/data-table'
import { createColumns } from '@/components/admin/appointments/table/columns'
import { TableSkeleton } from '@/components/loaders/TableSkeleton'
import { ErrorCard } from '@/components/ErrorCard'
import { sortAppointments } from '@/lib/utils'
import { AppointmentDetailsDialog } from '@/components/admin/appointments/AppointmentDetailsDialog'

export function AdminAppointments() {
  const {
    allAppointments,
    fetchAllAppointments,
    loadingAll,
    error,
    cancelAppointment,
    completeAppointment
  } = useAppointments()
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  useEffect(() => {
    fetchAllAppointments()
  }, [fetchAllAppointments])

  const handleAction = async (action, appointment) => {
    if (action === 'view') {
      setSelectedAppointment(appointment)
      setIsDetailsOpen(true)
    } else if (action === 'complete') {
      await completeAppointment(appointment.id)
    } else if (action === 'cancel') {
      await cancelAppointment(appointment.id)
    }
  }

  const renderContent = () => {
    if (loadingAll) {
      return (
        <div className="mt-8">
          <TableSkeleton />
        </div>
      )
    }

    if (error) {
      return (
        <div className="mt-8">
          <ErrorCard message="Error al cargar las citas del sistema. Por favor, intenta de nuevo." />
        </div>
      )
    }

    const sortedAppointments = sortAppointments(allAppointments || [])
    const columns = createColumns(handleAction)

    return (
      <div className="mt-8">
        <AdminDataTable columns={columns} data={sortedAppointments} onAction={handleAction} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Citas</h2>
          <p className="text-muted-foreground">Supervisa y gestiona todas las citas programadas en la clínica.</p>
        </div>
      </div>

      {renderContent()}

      <AppointmentDetailsDialog
        appointment={selectedAppointment}
        isOpen={isDetailsOpen}
        onClose={setIsDetailsOpen}
      />
    </div>
  )
}
