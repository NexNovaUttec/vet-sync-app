// src/components/dashboard/StatCard.jsx
import { Card, CardContent } from '@/components/ui/card'

export function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
              {trend && (
                <span
                  className={`text-xs font-semibold ${
                    trend > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {trend > 0 ? '+' : ''}
                  {trend}%
                </span>
              )}
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
