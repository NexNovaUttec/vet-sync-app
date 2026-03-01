// src/components/dashboard/OverviewChartSkeleton.jsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function OverviewChartSkeleton() {
  return (
    <Card className="h-full border shadow-sm">
      <CardHeader>
        <CardTitle>Resumen de Citas</CardTitle>
        <CardDescription>
          Citas programadas durante la última semana (Simulado)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4 flex items-end gap-2 px-6 pb-6 pt-4 border-b border-l border-muted relative">
          {/* Y axis mock */}
          <div className="absolute left-[-24px] top-0 bottom-6 w-4 flex flex-col justify-between text-xs text-muted-foreground mr-4">
            <span>100</span>
            <span>50</span>
            <span>0</span>
          </div>

          {/* Bars mock */}
          {[40, 70, 45, 90, 60, 85, 50].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end items-center group relative h-full">
              <div
                className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all duration-300 relative group-hover:bg-primary/60"
                style={{ height: `${height}%` }}
              >
                {/* Tooltip mock on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 hidden md:block pointer-events-none">
                  {Math.floor(height * 1.5)} citas
                </div>
              </div>
              {/* X axis labels mock */}
              <span className="absolute -bottom-6 text-xs text-muted-foreground hidden sm:block">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][i]}
              </span>
              <span className="absolute -bottom-6 text-xs text-muted-foreground sm:hidden">
                {['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
