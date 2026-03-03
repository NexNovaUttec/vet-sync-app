import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger
} from '@/components/ui/drawer'
import { CheckCircle, LoaderCircle } from 'lucide-react'

export function CompleteDialog({ children, onConfirm }) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 64rem)')

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await onConfirm()
      setOpen(false)
    } catch (error) {
      console.error('Error al completar la cita:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px] z-[200] flex flex-col gap-3">
          <AlertDialogHeader>
            <div className="flex justify-center mb-2">
              <CheckCircle className="w-20 h-20 text-green-500/80" />
            </div>
            <AlertDialogTitle className="font-semibold text-xl text-center">
              ¿Marcar cita como completada?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-md text-center">
            Esta acción actualizará el estado de la cita indicando que el servicio ya fue realizado exitosamente.
          </AlertDialogDescription>
          <AlertDialogFooter className="pt-4 gap-3 md:justify-center">
            <Button variant="secondary" className="text-md" onClick={() => setOpen(false)}>
              Rechazar
            </Button>
            <Button className="text-md sm:w-32 bg-green-600 hover:bg-green-700 text-white" onClick={handleConfirm} disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Confirmar
                  <CheckCircle className="w-4 h-4" />{' '}
                </span>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="z-[200] w-full flex flex-col gap-3">
        <div className="mx-auto w-full max-w-[600px] px-4">
          <DrawerHeader className="px-0 text-center">
            <div className="flex justify-center mb-2">
              <CheckCircle className="w-20 h-20 text-green-500/80" />
            </div>
            <DrawerTitle className="text-lg font-semibold text-center">
              ¿Marcar cita como completada?
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="text-md text-center">
            Esta acción actualizará el estado de la cita indicando que el servicio ya fue realizado exitosamente.
          </DrawerDescription>
          <DrawerFooter className="px-0 pt-6 gap-3 flex-col sm:flex-row">
            <Button className="text-md w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleConfirm} disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin h-5 w-5" />
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  Confirmar
                  <CheckCircle className="w-4 h-4" />{' '}
                </span>
              )}
            </Button>
            <Button variant="secondary" className="text-md w-full" onClick={() => setOpen(false)}>
              Rechazar
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
