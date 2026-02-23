import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, User, Database, Lock, Share2, Clock, Mail, FileText, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/header/mode-toggle.jsx'
import { Separator } from '@/components/ui/separator'
import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { ScrollArea } from '@/components/ui/scroll-area'

export function PrivacyNotice() {
  const sections = [
    {
      icon: User,
      title: '1. Responsable del Tratamiento de Datos',
      content: (
        <>
          <p>
            <strong>Vet Sync</strong> (en adelante, "la Plataforma"), con domicilio en México, es responsable del
            tratamiento de los datos personales que usted nos proporcione, los cuales serán protegidos conforme a lo
            dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y
            demás normativa aplicable.
          </p>
        </>
      )
    },
    {
      icon: Database,
      title: '2. Datos Personales Recabados',
      content: (
        <>
          <p className="mb-3">
            Para la prestación de nuestros servicios, recabamos los siguientes datos personales:
          </p>
          <div className="space-y-2">
            <p className="font-semibold text-foreground/90">Datos del usuario (propietario):</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
              <li>Nombre y apellido</li>
              <li>Correo electrónico</li>
              <li>Número telefónico (opcional)</li>
              <li>Dirección (opcional)</li>
              <li>Contraseña (almacenada de forma encriptada)</li>
            </ul>
          </div>
          <div className="space-y-2 mt-3">
            <p className="font-semibold text-foreground/90">Datos de las mascotas:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
              <li>Nombre de la mascota</li>
              <li>Especie y raza</li>
              <li>Edad y sexo</li>
              <li>Fotografía (opcional)</li>
            </ul>
          </div>
          <div className="space-y-2 mt-3">
            <p className="font-semibold text-foreground/90">Datos de citas:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
              <li>Fecha y hora de la cita</li>
              <li>Servicio solicitado</li>
              <li>Motivo de consulta</li>
              <li>Estado de la cita</li>
            </ul>
          </div>
        </>
      )
    },
    {
      icon: FileText,
      title: '3. Finalidades del Tratamiento',
      content: (
        <>
          <p className="mb-3">Los datos personales recabados serán utilizados para las siguientes finalidades:</p>
          <div className="space-y-2">
            <p className="font-semibold text-foreground/90">Finalidades primarias (necesarias):</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
              <li>Crear y administrar su cuenta de usuario en la Plataforma</li>
              <li>Gestionar el registro y perfil de sus mascotas</li>
              <li>Programar, modificar y cancelar citas veterinarias</li>
              <li>Proveer los servicios veterinarios solicitados</li>
              <li>Autenticación y seguridad de acceso a su cuenta</li>
            </ul>
          </div>
          <div className="space-y-2 mt-3">
            <p className="font-semibold text-foreground/90">Finalidades secundarias (opcionales):</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
              <li>Envío de recordatorios de citas y servicios</li>
              <li>Mejora continua de la Plataforma y experiencia de usuario</li>
              <li>Elaboración de estadísticas internas</li>
            </ul>
          </div>
        </>
      )
    },
    {
      icon: Lock,
      title: '4. Medidas de Seguridad',
      content: (
        <>
          <p className="mb-3">
            En Vet Sync implementamos medidas de seguridad técnicas, administrativas y físicas para proteger sus datos
            personales contra daño, pérdida, alteración, destrucción o uso no autorizado:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
            <li>Encriptación de contraseñas mediante algoritmos de hash seguros</li>
            <li>Comunicaciones protegidas con certificado SSL/TLS</li>
            <li>Autenticación mediante tokens JWT con expiración controlada</li>
            <li>Uso de tokens de refresco con rotación automática</li>
            <li>Almacenamiento seguro de cookies con atributos <code className="text-primary/80 bg-primary/10 px-1 rounded text-xs">Secure</code> y <code className="text-primary/80 bg-primary/10 px-1 rounded text-xs">SameSite</code></li>
            <li>Protección de endpoints mediante API Key</li>
          </ul>
        </>
      )
    },
    {
      icon: Share2,
      title: '5. Transferencia de Datos',
      content: (
        <p>
          Vet Sync <strong>no vende, alquila ni comparte</strong> sus datos personales con terceros para fines
          comerciales o publicitarios. Sus datos únicamente serán tratados dentro de la Plataforma para las
          finalidades descritas en este aviso. En caso de que sea necesaria una transferencia de datos, se le
          informará previamente y se solicitará su consentimiento expreso, salvo las excepciones previstas por la ley.
        </p>
      )
    },
    {
      icon: Eye,
      title: '6. Derechos ARCO',
      content: (
        <>
          <p className="mb-3">
            Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales
            (Derechos ARCO). Para ejercer cualquiera de estos derechos, puede:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
            <li>
              Modificar su información directamente desde su perfil en la Plataforma
            </li>
            <li>Eliminar su cuenta y todos los datos asociados desde la configuración de su cuenta</li>
            <li>
              Enviar una solicitud a nuestro correo electrónico de contacto indicando los datos que desea ejercer
            </li>
          </ul>
          <p className="mt-3">
            La solicitud será atendida en un plazo máximo de 20 días hábiles conforme a lo establecido por la
            LFPDPPP.
          </p>
        </>
      )
    },
    {
      icon: Clock,
      title: '7. Conservación de Datos',
      content: (
        <>
          <p className="mb-3">Sus datos personales serán conservados conforme a los siguientes criterios:</p>
          <ul className="list-disc list-inside space-y-1 ml-2 text-muted-foreground">
            <li>Los datos de su cuenta se conservarán mientras mantenga una cuenta activa en la Plataforma</li>
            <li>Al eliminar su cuenta, sus datos personales serán eliminados de forma permanente</li>
            <li>Los tokens de acceso expiran automáticamente después de 1 hora</li>
            <li>Los tokens de refresco expiran automáticamente después de 7 días</li>
          </ul>
        </>
      )
    },
    {
      icon: Mail,
      title: '8. Cambios al Aviso de Privacidad',
      content: (
        <p>
          Vet Sync se reserva el derecho de modificar el presente Aviso de Privacidad en cualquier momento. Cualquier
          cambio será notificado a través de la Plataforma. Le recomendamos consultar periódicamente este aviso para
          mantenerse informado sobre cómo protegemos su información.
        </p>
      )
    }
  ]

  return (
    <div className="relative flex min-h-screen w-full max-w-350 flex-col items-center justify-start gap-4 p-4 pt-20 md:pt-8">
      <Link to="/register" className="absolute left-4 top-4">
        <Button className="hover:cursor-pointer" variant="ghost">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </Link>

      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>

      <Card className="mx-auto w-full max-w-3xl">
        <Link to="/" className="flex items-center justify-center">
          <img src={VetsyncLogo} className="w-14 md:w-20" alt="Vetsync Logo" />
        </Link>

        <CardHeader className="text-center space-y-3 pb-2">
          <Badge variant="secondary" className="mx-auto w-fit text-sm bg-primary/15">
            <Shield className="w-4 h-4 mr-1" />
            Privacidad y Protección de Datos
          </Badge>
          <CardTitle className="text-2xl md:text-3xl uppercase font-bold">Aviso de Privacidad</CardTitle>
          <p className="text-muted-foreground text-sm">
            Última actualización: Febrero 2026
          </p>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <p className="text-muted-foreground leading-relaxed mb-6">
              En <strong className="text-foreground">Vet Sync</strong>, la protección de sus datos personales es una
              prioridad. El presente Aviso de Privacidad tiene como objetivo informarle sobre el tratamiento que se
              dará a sus datos personales cuando utilice nuestra plataforma de gestión veterinaria.
            </p>

            <div className="space-y-6">
              {sections.map((section, index) => {
                const IconComponent = section.icon
                return (
                  <div key={index}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground/90">{section.title}</h3>
                    </div>
                    <div className="ml-12 text-sm text-muted-foreground leading-relaxed">
                      {section.content}
                    </div>
                    {index < sections.length - 1 && <Separator className="mt-6" />}
                  </div>
                )
              })}
            </div>

            <Separator className="my-6" />

            <div className="text-center space-y-3 pb-2">
              <p className="text-sm text-muted-foreground">
                Al registrarse en Vet Sync, usted acepta los términos descritos en este Aviso de Privacidad.
              </p>
              <p className="text-xs text-muted-foreground/70">
                © {new Date().getFullYear()} Vet Sync App — Todos los derechos reservados
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
