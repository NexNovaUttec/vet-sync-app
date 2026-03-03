import { useEffect } from 'react'
import { StatCard } from '@/components/admin/overview/StatCard'
import { AppointmentsChart } from '@/components/admin/overview/AppointmentsChart'
import { UpcomingAppointments } from '@/components/admin/overview/UpcomingAppointments'
import { CategoryDistribution } from '@/components/admin/overview/CategoryDistribution'
import { RecentPets } from '@/components/admin/overview/RecentPets'
import { CancellationRate } from '@/components/admin/overview/CancellationRate'
import { TopServices } from '@/components/admin/overview/TopServices'
import { SpeciesDistribution } from '@/components/admin/overview/SpeciesDistribution'
import { RecentUsers } from '@/components/admin/overview/RecentUsers'
import { Users, CalendarDays, Activity, DollarSign, Stethoscope } from 'lucide-react'
import { useAdminStats } from '@/hooks/useAdminStats'
import { LoadingSpinner } from '@/components/loaders/LoadingSpinner'
import { ErrorCard } from '@/components/ErrorCard'

export function AdminOverview() {
  const { stats, loading, error, fetchStats } = useAdminStats()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="mt-8">
        <ErrorCard message="Error al cargar las estadísticas del sistema. Por favor, intenta de nuevo." />
      </div>
    )
  }

  // Si no hay stats pero no está cargando ni hay error, inicializamos por defecto
  const data = stats || {
    cards: { totalUsers: 0, newUsersThisMonth: 0, todayAppointments: 0, totalPets: 0, monthlyRevenue: 0, activeServicesCount: 0 },
    chartData: [],
    trendData: [],
    recentAppointments: [],
    recentPets: [],
    cancellationRate: { rate: 0, canceled: 0, total: 0 },
    topServices: [],
    speciesDistribution: [],
    recentUsers: []
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard General</h2>
        <p className="text-muted-foreground">
          Bienvenido al panel de control, aquí tienes un resumen del sistema.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <StatCard
          title="Total Usuarios"
          value={data.cards.totalUsers}
          icon={Users}
        />
        <StatCard
          title="Citas Hoy"
          value={data.cards.todayAppointments}
          icon={CalendarDays}
        />
        <StatCard
          title="Mascotas"
          value={data.cards.totalPets}
          icon={Activity}
        />
        <StatCard
          title="Servicios Activos"
          value={data.cards.activeServicesCount}
          icon={Stethoscope}
        />
        <StatCard
          title="Ingresos Mes"
          value={`$${Number(data.cards.monthlyRevenue).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={DollarSign}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 h-auto">
        {/* Gráfico principal de tendencia (Más ancho) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <AppointmentsChart trendData={data.trendData} />
        </div>

        {/* Tasa de Cancelación (KPI crítico de la agenda) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <CancellationRate cancellationRate={data.cancellationRate} />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 h-auto">
        {/* Top Servicios (Ranking de rentabilidad) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <TopServices services={data.topServices} />
        </div>

        {/* Distribución de Categorías (Relacionado a servicios) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <CategoryDistribution data={data.chartData} />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 h-auto">
        {/* Próximas Citas (Operación diaria) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <UpcomingAppointments appointments={data.recentAppointments} />
        </div>

        {/* Distribución de Especies (Demografía) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <SpeciesDistribution data={data.speciesDistribution} />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 h-auto pb-8">
        {/* Mascotas Recientes (Nuevos registros) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <RecentPets pets={data.recentPets} />
        </div>

        {/* Clientes Recientes (Leads) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <RecentUsers users={data.recentUsers} />
        </div>
      </div>
    </div>
  )
}
