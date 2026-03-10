import { useState, useEffect } from 'react'
import html2canvas from 'html2canvas'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PetCarnet } from './PetCarnet'
import { Download, CreditCard } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function PetCarnetDialog({ pet, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [petImageBase64, setPetImageBase64] = useState(null)
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const { user } = useAuth()

  // Crear objeto owner desde los datos del usuario
  const owner = user
    ? {
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono || '+52 555-0123',
        direccion: user.direccion || 'Calle Falsa 123, Ciudad de Ejemplo'
      }
    : null

  // Convertir la imagen de la mascota a base64 cuando se abre el diálogo
  useEffect(() => {
    if (isOpen && pet.img_url) {
      setIsLoadingImage(true)
      
      // Intentar convertir a base64 para evitar problemas CORS
      const loadImage = async () => {
        try {
          // Crear un proxy para evitar CORS usando fetch
          const response = await fetch(pet.img_url)
          const blob = await response.blob()
          const reader = new FileReader()
          
          reader.onloadend = () => {
            setPetImageBase64(reader.result)
            setIsLoadingImage(false)
          }
          
          reader.onerror = () => {
            console.warn('Error leyendo imagen como base64, usando URL original')
            setPetImageBase64(pet.img_url)
            setIsLoadingImage(false)
          }
          
          reader.readAsDataURL(blob)
        } catch (error) {
          console.warn('Error cargando imagen, usando URL original:', error)
          setPetImageBase64(pet.img_url)
          setIsLoadingImage(false)
        }
      }
      
      loadImage()
    } else if (isOpen && !pet.img_url) {
      setPetImageBase64(null)
      setIsLoadingImage(false)
    }
  }, [isOpen, pet.img_url])

  const handleDownload = async () => {
    setIsGenerating(true)
    
    try {
      const carnetElement = document.getElementById('pet-carnet')
      if (!carnetElement) {
        console.error('No se encontró el elemento del carnet')
        alert('No se pudo encontrar el carnet. Por favor, inténtalo de nuevo.')
        return
      }

      // Esperar un momento para asegurar que todo esté renderizado
      await new Promise(resolve => setTimeout(resolve, 300))

      // Generar el canvas con alta calidad
      const canvas = await html2canvas(carnetElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false, // Desactivar logging ahora que funciona
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        imageTimeout: 0,
        removeContainer: true,
        onclone: (clonedDoc) => {
          const clonedCarnet = clonedDoc.getElementById('pet-carnet')
          if (clonedCarnet) {
            // Remover TODAS las hojas de estilo del documento clonado
            const styleSheets = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]')
            styleSheets.forEach(sheet => sheet.remove())
            
            // Remover clases y limpiar estilos inline con oklch
            const allElements = clonedCarnet.querySelectorAll('*')
            allElements.forEach((el) => {
              // Remover clases de Tailwind
              el.removeAttribute('class')
              
              // Limpiar estilos inline que contengan oklch
              const inlineStyle = el.getAttribute('style')
              if (inlineStyle && inlineStyle.includes('oklch')) {
                // Remover el atributo style completamente si tiene oklch
                // Los estilos inline del componente React no tienen oklch
                const cleanStyle = inlineStyle
                  .split(';')
                  .filter(rule => !rule.includes('oklch'))
                  .join(';')
                
                if (cleanStyle.trim()) {
                  el.setAttribute('style', cleanStyle)
                } else {
                  el.removeAttribute('style')
                }
              }
            })
          }
        }
      })

      // Convertir a imagen y descargar
      const image = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.href = image
      link.download = `carnet-${pet.nombre.toLowerCase().replace(/\s+/g, '-')}.png`
      link.click()
      
    } catch (error) {
      console.error('Error al generar el carnet:', error)
      alert(`Error al generar el carnet:\n\n${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[950px] max-h-[95vh] overflow-hidden p-0">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-t-lg border-b border-orange-100">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl text-orange-900">
              <CreditCard className="w-6 h-6" />
              Carnet de {pet.nombre}
            </DialogTitle>
            <DialogDescription className="text-orange-700">
              Descarga el carnet de identificación de tu mascota. Puedes imprimirlo o guardarlo en tu dispositivo.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Preview del carnet */}
        <div className="flex justify-center items-center py-6 bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto max-h-[calc(95vh-200px)]">
          {isLoadingImage ? (
            <div className="flex items-center justify-center h-[525px]">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-orange-900 font-semibold">Cargando carnet...</p>
              </div>
            </div>
          ) : (
            <div className="shadow-2xl rounded-2xl" style={{ width: '875px', height: '525px', flexShrink: 0 }}>
              <PetCarnet pet={{ ...pet, img_url: petImageBase64 || pet.img_url }} owner={owner} />
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3 justify-between px-6 py-4 bg-white border-t border-gray-200">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="border-orange-200 text-orange-900 hover:bg-orange-50">
            Cerrar
          </Button>
          <Button 
            onClick={handleDownload} 
            disabled={isGenerating || isLoadingImage}
            className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg disabled:opacity-50"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generando imagen...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Descargar Carnet PNG
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
