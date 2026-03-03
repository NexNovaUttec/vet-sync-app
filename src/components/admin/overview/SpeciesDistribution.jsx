import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Pie, PieChart } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export function SpeciesDistribution({ data = [] }) {
  const totalPets = data.reduce((acc, curr) => acc + curr.value, 0)

  if (data.length === 0 || totalPets === 0) {
    return (
      <Card className="h-full border shadow-sm flex flex-col items-center justify-center text-muted-foreground py-10">
        <p>No hay registro de mascotas.</p>
      </Card>
    )
  }

  // Define colors based on the theme variables
  const chartColors = [
    'var(--color-chart-1)',
    'var(--color-chart-2)',
    'var(--color-chart-3)',
    'var(--color-chart-4)',
    'var(--color-chart-5)'
  ]

  const chartConfig = {
    especies: {
      label: 'Mascotas'
    }
  }

  // Format the data for the Pie Chart and inject colors
  const formattedData = [...data]
    .sort((a, b) => b.value - a.value)
    .map((item, i) => {
      chartConfig[item.name] = {
        label: item.name,
        color: chartColors[i % chartColors.length]
      }
      return {
        name: item.name,
        value: item.value,
        fill: chartColors[i % chartColors.length]
      }
    })

  return (
    <Card className="h-full border shadow-sm flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tipos de Pacientes</CardTitle>
        <CardDescription>Distribución global por especies</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
