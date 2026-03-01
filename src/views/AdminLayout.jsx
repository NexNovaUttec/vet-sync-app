// src/views/AdminLayout.jsx
import { Outlet, Navigate } from 'react-router-dom'
import { Sidebar, SidebarContent } from '@/components/dashboard/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/loaders/LoadingSpinner'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { PanelRightOpen, PanelRightClose } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

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
      <main className="flex-1 flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:thin [-ms-overflow-style:none] [scrollbar-width:thin]">
        <div className="container max-w-7xl mx-auto px-4 py-2 sm:px-4 lg:p-8">
          {/* Mobile inline control (scrolls away with page) */}
          <div className="md:hidden mb-6 mt-1 flex flex-col gap-2">
            <div className="flex items-center gap-3">
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
            <Separator />
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  )
}
