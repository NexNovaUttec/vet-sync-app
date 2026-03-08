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
import { Trash, TriangleAlert, LoaderCircle } from 'lucide-react'

export function ProfessionalDeleteDialog({ children, professionalName, onConfirm }) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 64rem)')

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await onConfirm()
      setOpen(false)
    } catch (error) {
      console.error('Error al dar de baja:', error)
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
              <TriangleAlert className="w-20 h-20 text-red-500/80" />
            </div>
            <AlertDialogTitle className="font-semibold text-xl text-center">
              ¿Dar de baja a {professionalName}?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-md text-center">
            Esta acción no borrará su historial de citas, pero el personal ya no podrá recibir nuevas citas ni aparecerá como disponible.
          </AlertDialogDescription>
          <AlertDialogFooter className="pt-4 gap-3">
            <Button variant="secondary" className="text-md" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button className="text-md" onClick={handleConfirm} disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Eliminar
                  <Trash className="w-4 h-4" />{' '}
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
              <TriangleAlert className="w-20 h-20 text-red-500/80" />
            </div>
            <DrawerTitle className="text-lg font-semibold text-center">
              ¿Dar de baja a {professionalName}?
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="text-md text-center">
            Esta acción no borrará su historial de citas, pero el personal ya no podrá recibir nuevas citas ni aparecerá como disponible.
          </DrawerDescription>
          <DrawerFooter className="px-0 pt-6 gap-3">
            <Button variant="secondary" className="text-md" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button className="text-md py-5" onClick={handleConfirm} disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin h-5 w-5" />
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  Eliminar
                  <Trash className="w-4 h-4" />{' '}
                </span>
              )}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
