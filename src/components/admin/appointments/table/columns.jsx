import { MoreHorizontal, ArrowUpDown, CalendarX, CheckCircle, ListTodo } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

export const createColumns = (onAction) => [
  {
    accessorKey: 'nombre_cliente',
    header: 'Cliente',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('nombre_cliente')}</div>
    },
    filterFn: (row, id, value) => {
      const cellValue = row.getValue(id)
      return cellValue?.toLowerCase().includes(value.toLowerCase()) || false
    }
  },
  {
    accessorKey: 'nombre_mascota',
    header: 'Paciente',
    cell: ({ row }) => {
      const imgUrl = row.original.img_url
      const nombreMascota = row.getValue('nombre_mascota')
      return (
        <div className="flex items-center">
          {imgUrl && (
            <div className="mr-1.5 sm:mr-3 w-8 sm:w-11 aspect-square rounded-full overflow-hidden">
              <img
                loading="lazy"
                decoding="async"
                src={imgUrl}
                alt={nombreMascota}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
          <span>{nombreMascota}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const cellValue = row.getValue(id)
      return cellValue?.toLowerCase().includes(value.toLowerCase()) || false
    }
  },
  {
    accessorKey: 'fecha',
    header: ({ column }) => {
      return (
        <Button
          variant="primary"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto font-medium"
        >
          Fecha
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fecha = row.getValue('fecha')
      const [year, month, day] = fecha.split('-').map(Number)
      const date = new Date(year, month - 1, day)

      const formattedDate = date.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
      return <div className="font-medium">{formattedDate}</div>
    },
    sortingFn: (a, b) => {
      const dateA = new Date(a.getValue('fecha'))
      const dateB = new Date(b.getValue('fecha'))
      return dateB.getTime() - dateA.getTime()
    }
  },
  {
    accessorKey: 'hora_inicio',
    header: 'Hora',
    cell: ({ row }) => {
      const hora_inicio = row.getValue('hora_inicio')
      const [hours, minutes] = hora_inicio.split(':').map(Number)
      const date = new Date()
      date.setHours(hours, minutes, 0, 0)

      const localTime = date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })

      return <div className="font-medium whitespace-nowrap">{localTime}</div>
    }
  },
  {
    accessorKey: 'nombre_servicio',
    header: 'Servicio'
  },
  {
    accessorKey: 'nombre_profesional',
    header: 'Profesional'
  },
  {
    accessorKey: 'status',
    header: <div className="text-center">Estado</div>,
    cell: ({ row }) => {
      const status = row.getValue('status')

      const statusColors = {
        Programada: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
        Completada: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
        Cancelada: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
        Reprogramada: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
        'No asistió': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
        'En Curso': 'bg-primary/20 text-primary border-primary/30'
      }

      const colorClass = statusColors[status] || 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'

      return (
        <div className="flex justify-center">
          <Badge variant="outline" className={`${colorClass} whitespace-nowrap px-2.5 py-0.5 rounded-full font-semibold border`}>
            {status}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (value === 'todos') return true
      return row.getValue(id) === value
    }
  },
  {
    id: 'acciones',
    cell: ({ row }) => {
      const appointment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center cursor-pointer"
              onClick={() => onAction && onAction('view', appointment)}
            >
              <ListTodo className="h-4 w-4 mr-2" />
              Ver Detalles
            </DropdownMenuItem>

            {appointment.status === 'Programada' && (
              <>
                <DropdownMenuItem
                  className="flex items-center cursor-pointer text-green-600 dark:text-green-400"
                  onClick={() => onAction && onAction('complete', appointment)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marcar Completada
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="flex items-center text-red-600 dark:text-red-400 cursor-pointer"
                  onClick={() => onAction && onAction('cancel', appointment)}
                >
                  <CalendarX className="h-4 w-4 mr-2" />
                  Cancelar Cita
                </DropdownMenuItem>
              </>
            )}

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
