import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/loaders/LoadingSpinner'

export function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Usuarios</h2>
            <p className="text-muted-foreground">Gestión de usuarios del sistema</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Citas</h2>
            <p className="text-muted-foreground">Administrar todas las citas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Servicios</h2>
            <p className="text-muted-foreground">Configurar servicios disponibles</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
