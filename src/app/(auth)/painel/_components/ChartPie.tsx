import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { chartsTooltipClasses } from '@mui/x-charts/ChartsTooltip'
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart'

export const ChartPie = ({
  pieChartData
}: {
  pieChartData: {
    expenseAmounthPerCategory: {
      id: number
      value: number
      label: string
    }[]
    total: number
  }
}) => {
  return (
    <Card className='flex flex-col p-2 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3'>
      <CardHeader>
        <CardTitle>Gastos por categoria</CardTitle>
        <CardDescription>Principais categorias do mês</CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className='h-full'>
        <PieChart
          localeText={{
            loading: 'Carregando dados...',
            noData: 'Nenhum dado encontrado'
          }}
          series={[
            {
              arcLabel: item =>
                `${((item.value * 100) / pieChartData.total).toFixed(1)}%`,

              data: pieChartData.expenseAmounthPerCategory,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: 'gray'
              },
              cornerRadius: 5,
              valueFormatter: item => {
                return new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.value || 0)
              }
            }
          ]}
          width={200}
          height={200}
          sx={{
            '& .MuiChartsLegend-root': {
              color: 'oklch(0.99 0.0146 98.28)',
              fontSize: '14px',
              fontWeight: 'bold'
            },
            '& .MuiChartsNoDataOverlay-root': {
              color: 'oklch(0.99 0.0146 98.28)',
              fontSize: 18
            },
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: 'bold',
              fontSize: '18px',
              fill: 'oklch(0.99 0.0146 98.28)'
            }
          }}
          slotProps={{
            tooltip: {
              sx: {
                [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.paper}`]:
                  {
                    backgroundColor: 'oklch(0.24 0.01 285)',
                    color: 'oklch(0.99 0.0146 98.28)'
                  },
                [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.valueCell}`]:
                  {
                    color: 'oklch(0.99 0.0146 98.28)'
                  },
                [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.labelCell}`]:
                  {
                    color: 'oklch(0.99 0.0146 98.28)'
                  }
              }
            },
            loadingOverlay: {
              sx: {
                fill: 'oklch(0.99 0.0146 98.28)',
                fontSize: '1rem'
              }
            },
            noDataOverlay: {
              sx: {
                fill: 'oklch(0.99 0.0146 98.28)',
                fontSize: '1rem'
              }
            }
          }}
        />
      </CardContent>
    </Card>
  )
}
