import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartConfig = {
  citas: {
    label: 'Citas',
    color: 'var(--color-primary)'
  }
}

export function AppointmentsChart({ trendData = [] }) {
  // Limitar a los últimos 7 días con datos
  const displayData = trendData.slice(-7)

  if (displayData.length === 0) {
    return (
      <Card className="h-full border shadow-sm flex flex-col items-center justify-center text-muted-foreground py-10">
        <p>No hay datos suficientes para mostrar la tendencia de este mes.</p>
      </Card>
    )
  }

  // Add formatted date string for the XAxis
  const formattedData = displayData.map(d => ({
    ...d,
    dateStr: d.date.split('-').slice(1).join('/')
  }))

  return (
    <Card className="h-full border shadow-sm flex flex-col">
      <CardHeader>
        <CardTitle>Tendencia de Citas</CardTitle>
        <CardDescription>
          Actividad de los últimos días del mes
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-[250px] pb-6">
        <ChartContainer config={chartConfig} className="w-full h-full max-h-[300px]">
          <AreaChart
            accessibilityLayer
            data={formattedData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12
            }}
          >
            <defs>
              <linearGradient id="fillCitas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-citas)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-citas)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dateStr"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="citas"
              type="natural"
              fill="url(#fillCitas)"
              fillOpacity={0.4}
              stroke="var(--color-citas)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
