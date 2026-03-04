import { Card, CardContent } from '@/components/ui/card'

export function StatCard({ title, value, icon: Icon, className }) {
  return (
    <Card className={className}>
      <CardContent className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground leading-none">{title}</p>
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight break-words">{value}</h2>
        </div>
      </CardContent>
    </Card>
  )
}
