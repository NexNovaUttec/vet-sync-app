import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Pie, PieChart, Label } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export function CancellationRate({ cancellationRate }) {
  if (!cancellationRate) {
    return (
      <Card className="h-full border shadow-sm flex flex-col items-center justify-center text-muted-foreground py-10">
        <p>No hay datos disponibles.</p>
      </Card>
    )
  }

  const { rate, canceled, total } = cancellationRate
  const completed = total - canceled

  const chartData = [
    { status: 'Completadas', value: completed, fill: 'var(--color-completed)' },
    { status: 'Canceladas', value: canceled, fill: 'var(--color-canceled)' }
  ]

  const chartConfig = {
    completed: {
      label: 'Completadas',
      color: 'var(--color-chart-2)' // Verde/Esmeralda usualmente
    },
    canceled: {
      label: 'Canceladas',
      color: 'var(--color-destructive)' // Rojo
    }
  }

  return (
    <Card className="h-full border shadow-sm flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Retención de Citas</CardTitle>
        <CardDescription>Tasa de cancelación del mes actual</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              stroke="none"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {rate}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Canceladas
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
