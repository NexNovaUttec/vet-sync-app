import { lazy, Suspense } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Activity } from 'lucide-react'
import { LoadingSpinner } from '@/components/loaders/LoadingSpinner.jsx'
import { useServices } from '@/hooks/useServices'

const LazyFormContent = lazy(() => import('./ServiceFormContent').then(module => ({ default: module.ServiceFormContent })))

export function ServicesForm() {
  const { formState, closeForm } = useServices()
  const { isOpen, mode } = formState
  const isMobile = useMediaQuery('(max-width: 48rem)')

  const isEditMode = mode === 'edit'
  const title = isEditMode ? 'Editar Servicio' : 'Agregar Servicio'

  const formContent = (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <LoadingSpinner />
        </div>
      }
    >
      <LazyFormContent />
    </Suspense>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={closeForm}>
        {isOpen && (
          <SheetContent className="p-4 overflow-y-auto">
            <SheetHeader>
              <div className="flex items-center gap-4">
                <Activity className="w-6 h-6" />
                <SheetTitle>{title}</SheetTitle>
              </div>
              <SheetDescription className="hidden"></SheetDescription>
            </SheetHeader>
            <div className="pt-4">
              {formContent}
            </div>
          </SheetContent>
        )}
      </Sheet>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeForm}>
      {isOpen && (
        <DialogContent className="sm:max-w-[500px] gap-8 max-h-[98vh] overflow-y-auto">
          <DialogHeader className="gap-3">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6" />
              <DialogTitle>{title}</DialogTitle>
            </div>
          </DialogHeader>
          <DialogDescription className="hidden"></DialogDescription>
          {formContent}
        </DialogContent>
      )}
    </Dialog>
  )
}
