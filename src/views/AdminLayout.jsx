// src/views/AdminLayout.jsx
import { Outlet, Navigate } from 'react-router-dom'
import { Sidebar, SidebarContent } from '@/components/dashboard/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/loaders/LoadingSpinner'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { PanelRightOpen, PanelRightClose } from 'lucide-react'

export function AdminLayout() {
  const { user, isAuthenticated, loading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // Al estar dentro de <main className="grow"> sin el Header global,
  // height 100vh permite usar todo el espacio de la ventana
  return (
    <div className="flex h-dvh w-full bg-background overflow-hidden relative">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header with Sheet */}
        <div className="md:hidden flex items-center p-4 pb-0 shrink-0">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 -ml-2 rounded-md hover:bg-accent text-foreground transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <PanelRightClose className="w-6 h-6" />
                ) : (
                  <PanelRightOpen className="w-6 h-6" />
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 flex flex-col bg-card border-r">
              <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
              <SidebarContent onNavigate={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Scrollable content body */}
        <div className="flex-1 overflow-y-auto">
          <div className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
