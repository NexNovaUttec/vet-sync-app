// src/components/dashboard/Sidebar.jsx
import { NavLink, Link } from 'react-router-dom'

import { LayoutDashboard, Users, CalendarDays, Activity, Settings, ShieldAlert, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import VetsyncLogo from '@/assets/vetsync_logo.webp'
import { ModeToggle } from '@/components/header/mode-toggle'
import { useAuth } from '@/hooks/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogoutDialog } from '@/components/header/LogoutDialog'
import { Separator } from '@/components/ui/separator'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Usuarios', href: '/admin/users', icon: Users },
  { name: 'Citas', href: '/admin/appointments', icon: CalendarDays },
  { name: 'Servicios', href: '/admin/services', icon: Activity },
  { name: 'Reportes', href: '/admin/reports', icon: ShieldAlert },
  { name: 'Configuración', href: '/admin/settings', icon: Settings }
]

export function SidebarContent({ onNavigate }) {
  const { user, logout } = useAuth()

  const userInitials =
    user?.nombre && user?.apellido
      ? `${user.nombre.charAt(0).toUpperCase()}${user.apellido.charAt(0).toUpperCase()}`
      : 'U'

  return (
    <>
      <div className="h-16 border-b flex items-center px-6 shrink-0">
        <Link to="/admin" className="flex items-center gap-3" onClick={onNavigate}>
          <img src={VetsyncLogo} className="w-8" alt="Vetsync Logo" />
          <h2 className="text-xl font-bold tracking-tight text-foreground">Admin</h2>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-5">
        <ul className="space-y-1 px-4">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                end={item.href === '/admin'}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="px-4 py-2">
          <Separator className="my-2 bg-border/50" />
          <LogoutDialog onConfirm={logout}>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </LogoutDialog>
        </div>
      </nav>

      <div className="p-4 border-t mt-auto shrink-0 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.email}`} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate leading-tight">
            <span className="font-medium text-sm truncate">
              {user?.nombre} {user?.apellido}
            </span>
            <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <div className="p-1 scale-90">
            {' '}
            {/* Contenedor ajustado para alinearlo visualmente */}
            <ModeToggle />
          </div>
        </div>
      </div>
    </>
  )
}

export function Sidebar() {
  return (
    <aside className="w-64 h-full bg-card border-r hidden md:flex flex-col flex-none">
      <SidebarContent />
    </aside>
  )
}
