import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/loaders/LoadingSpinner'

export function UserRoute() {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  // Si está autenticado y es admin, lo redirigimos al dashboard de admin
  if (isAuthenticated && user?.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  // Si no está autenticado, o es un usuario normal, permitimos ver la ruta
  return <Outlet />
}
