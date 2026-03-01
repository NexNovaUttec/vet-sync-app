import { StatCard } from '@/components/admin/overview/StatCard'
import { OverviewChartSkeleton } from '@/components/admin/overview/OverviewChartSkeleton'
import { RecentActivity } from '@/components/admin/overview/RecentActivity'
import { Users, CalendarDays, Activity, DollarSign } from 'lucide-react'

export function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard General</h2>
        <p className="text-muted-foreground">
          Bienvenido al panel de control, aquí tienes un resumen del sistema.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Usuarios"
          value="1,245"
          icon={Users}
          trend={12.5}
        />
        <StatCard
          title="Citas Mensuales"
          value="850"
          icon={CalendarDays}
          trend={5.4}
        />
        <StatCard
          title="Servicios Activos"
          value="15"
          icon={Activity}
          trend={0}
        />
        <StatCard
          title="Ingresos Estimados"
          value="$45,231"
          icon={DollarSign}
          trend={-2.4}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 h-auto">
        {/* Placeholder chart taking up 4 columns */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <OverviewChartSkeleton />
        </div>

        {/* Recent activity taking up 3 columns */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
