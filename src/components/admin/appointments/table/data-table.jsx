import { useState, Fragment, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Filter,
  Clock,
  Stethoscope,
  User,
  NotepadText,
  CheckCircle,
  CalendarX
} from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMediaQuery } from '@/hooks/use-media-query'
import { CancelDialog } from '@/components/appointments/CancelDialog'
import { CompleteDialog } from '@/components/admin/appointments/CompleteDialog'

export function AdminDataTable({ columns, data, onAction }) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')
  const [columnVisibility, setColumnVisibility] = useState({})
  const [expanded, setExpanded] = useState({})
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isMobile) {
      setColumnVisibility({
        hora_inicio: false,
        nombre_servicio: false,
        nombre_profesional: false,
        nombre_cliente: false,
        acciones: false
      })
    } else {
      setColumnVisibility({})
    }
  }, [isMobile])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      expanded,
      globalFilter
    }
  })

  const handleStatusChange = (value) => {
    setStatusFilter(value)
    if (value === 'todos') {
      table.getColumn('status')?.setFilterValue(undefined)
    } else {
      table.getColumn('status')?.setFilterValue(value)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters Region */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Filto Búsqueda General */}
          <div className="relative w-full sm:w-[350px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por servicio, paciente, cliente..."
              className="pl-9 bg-background"
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(event.target.value)}
            />
          </div>
        </div>

        {/* Filtro de Estado */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los Estados</SelectItem>
              <SelectItem value="Programada">Programada</SelectItem>
              <SelectItem value="Completada">Completada</SelectItem>
              <SelectItem value="Reprogramada">Reprogramada</SelectItem>
              <SelectItem value="Cancelada">Cancelada</SelectItem>
              <SelectItem value="No asistió">No asistió</SelectItem>
              <SelectItem value="En Curso">En Curso</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-semibold text-foreground">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    className={isMobile ? 'cursor-pointer hover:bg-muted/50' : 'hover:bg-muted/50'}
                    onClick={() => isMobile && row.toggleExpanded()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={cell.column.id === 'acciones' ? 'w-12' : ''}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && isMobile && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="p-0 border-b">
                        <div className="bg-muted/30 p-4">
                          <div className="space-y-4">
                            {/* Cliente */}
                            <div className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/30 shadow-sm">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-orange-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                  Cliente
                                </p>
                                <p className="font-semibold text-foreground">{row.original.nombre_cliente}</p>
                              </div>
                            </div>

                            {/* Hora */}
                            <div className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/30 shadow-sm">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-blue-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                  Hora programada
                                </p>
                                <p className="font-semibold text-foreground">
                                  {(() => {
                                    const hora_inicio = row.original.hora_inicio
                                    const [hours, minutes] = hora_inicio.split(':').map(Number)
                                    const date = new Date()
                                    date.setHours(hours, minutes, 0, 0)
                                    return date.toLocaleTimeString('es-ES', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true
                                    })
                                  })()}
                                </p>
                              </div>
                            </div>

                            {/* Servicio */}
                            <div className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/30 shadow-sm">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Stethoscope className="w-5 h-5 text-green-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                  Servicio
                                </p>
                                <p className="font-semibold text-foreground">{row.original.nombre_servicio}</p>
                              </div>
                            </div>

                            {/* Profesional */}
                            <div className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/30 shadow-sm">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-purple-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                  Profesional asignado
                                </p>
                                <p className="font-semibold text-foreground">{row.original.nombre_profesional}</p>
                              </div>
                            </div>

                            {/* Notas (Opcional visualmente) */}
                            {row.original.motivo_consulta && row.original.motivo_consulta.trim() !== '' && (
                              <div className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/30 shadow-sm">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                  <NotepadText className="w-5 h-5 text-yellow-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                      Notas / Motivo
                                  </p>
                                  <p className="font-semibold text-foreground">{row.original.motivo_consulta}</p>
                                </div>
                              </div>
                            )}

                            {/* Acciones para celular */}
                            {row.original.status === 'Programada' && (
                              <div className="pt-4 flex flex-col gap-3 border-t border-border/50">
                                <CompleteDialog onConfirm={() => onAction && onAction('complete', row.original)}>
                                  <Button
                                    variant="outline"
                                    className="w-full bg-green-500/10 text-green-600 dark:text-green-500 hover:bg-green-500/20 hover:text-green-700 dark:hover:text-green-400 border-green-200 dark:border-green-900 shadow-sm"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Marcar Completada
                                  </Button>
                                </CompleteDialog>

                                <CancelDialog onConfirm={() => onAction && onAction('cancel', row.original)}>
                                  <Button
                                    variant="outline"
                                    className="w-full bg-red-500/10 text-red-600 dark:text-red-500 hover:bg-red-500/20 hover:text-red-700 dark:hover:text-red-400 border-red-200 dark:border-red-900 shadow-sm"
                                  >
                                    <CalendarX className="h-4 w-4 mr-2" />
                                    Cancelar Cita
                                  </Button>
                                </CancelDialog>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground h-32">
                    <Search className="w-8 h-8 mb-2 opacity-50" />
                    <p>No se encontraron resultados.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground hidden sm:block">
          Mostrando {table.getRowModel().rows.length} de {table.getFilteredRowModel().rows.length} citas
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-end">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
          </div>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isMobile && (
        <span className="text-xs text-muted-foreground/70 text-center block mt-2 px-4 shadow-sm">
          <strong className="font-semibold">Sugerencia: </strong>Puedes ver más detalles de la cita y acceder a las opciones haciendo clic en la fila de la cita.
        </span>
      )}
    </div>
  )
}
