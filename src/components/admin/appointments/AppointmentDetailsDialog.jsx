import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/use-media-query'

export function AppointmentDetailsDialog({ appointment, isOpen, onClose }) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (!appointment) return null

  const hasNotes = appointment.motivo_consulta && appointment.motivo_consulta.trim() !== ''

  const content = (
    <div className="mt-4 space-y-4 px-4 sm:px-0 mb-4 sm:mb-0">
      <div className="flex items-center gap-3">
        {appointment.img_url ? (
          <img
            src={appointment.img_url}
            alt={appointment.nombre_mascota}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">
            {appointment.nombre_mascota?.charAt(0) || 'M'}
          </div>
        )}
        <div>
          <p className="font-semibold">{appointment.nombre_mascota}</p>
          <p className="text-sm text-muted-foreground">{appointment.nombre_cliente}</p>
        </div>
      </div>

      <div className="grid gap-2 bg-muted/50 p-4 rounded-lg">
        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Motivo de consulta / Notas</p>
          <p className="text-sm whitespace-pre-wrap">
            {hasNotes ? (
              appointment.motivo_consulta
            ) : (
              <span className="italic text-muted-foreground">No se proporcionaron notas para esta cita.</span>
            )}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Badge variant="outline">{appointment.nombre_servicio}</Badge>
        <Badge variant="outline">{appointment.status}</Badge>
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <DialogTitle>Detalles de la Cita</DialogTitle>
            </div>
            <DialogDescription>
              Notas o motivo de consulta proporcionados por el cliente.
            </DialogDescription>
          </DialogHeader>

          {content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <DrawerTitle>Detalles de la Cita</DrawerTitle>
          </div>
          <DrawerDescription>
            Notas o motivo de consulta proporcionados por el cliente.
          </DrawerDescription>
        </DrawerHeader>

        {content}

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
