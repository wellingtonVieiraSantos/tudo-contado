import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import valueFormatter from '@/lib/valueFormatter'
import { chartsTooltipClasses } from '@mui/x-charts/ChartsTooltip'
import {
  LineChart,
  lineElementClasses,
  markElementClasses
} from '@mui/x-charts/LineChart'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const ChartLine = ({
  lineChartData
}: {
  lineChartData: {
    incomeAmountPerMonth: number | null
    expenseAmountPerMonth: number | null
  }[]
}) => {
  return (
    <Card className='flex flex-col p-2 lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-5'>
      <CardHeader>
        <CardTitle>Controle mensal</CardTitle>
        <CardDescription>Dados dos ultimos 6 meses</CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className='size-full pt-3 max-h-100'>
        <LineChart
          className='min-w-85'
          localeText={{
            loading: 'Carregando dados...',
            noData: 'Nenhum dado encontrado.'
          }}
          series={[
            {
              data: [...lineChartData.map(data => data.incomeAmountPerMonth)],
              label: 'Rendimentos',
              showMark: false,
              color: 'oklch(0.8729 0.1535 163.22)',
              valueFormatter
            },
            {
              data: [...lineChartData.map(data => data.expenseAmountPerMonth)],
              label: 'Despesas',
              showMark: false,
              color: 'oklch(0.7368 0.2078 25.33)',
              valueFormatter
            }
          ]}
          colors={['blue', 'green']}
          xAxis={[
            {
              data: Array.from({ length: 6 }, (_, i) => {
                const date = new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() - (5 - i),
                  1
                )
                return format(date, 'MMMM', { locale: ptBR })
              }),
              scaleType: 'band',
              disableTicks: true
            }
          ]}
          yAxis={[{ disableTicks: true }]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              strokeWidth: 2
            },
            [`& .${markElementClasses.root}`]: {
              fill: '#fff',
              strokeWidth: 0
            },
            '.css-j6h5qe-MuiAreaElement-root': {
              fill: 'url(#gradient-income)'
            },
            '.css-tvglr0-MuiAreaElement-root': {
              fill: 'url(#gradient-expense)'
            },

            '& .MuiChartsAxis-line': {
              stroke: '#FFF !important'
            },

            '& text': {
              fill: '#FFF !important'
            },

            '& .MuiChartsLegend-root': {
              color: '#FFF !important',
              fontSize: '14px',
              fontWeight: 'bold'
            }
          }}
          disableAxisListener
          slotProps={{
            tooltip: {
              sx: {
                [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.paper}`]:
                  {
                    backgroundColor: 'oklch(0.24 0.01 285)',
                    color: 'oklch(0.99 0.0146 98.28)',
                    border: '1px solid oklch(0.3 0.01 270)'
                  },
                [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.valueCell}`]:
                  {
                    color: 'oklch(0.99 0.0146 98.28)',
                    fontSize: '14px'
                  },
                [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.labelCell}`]:
                  {
                    color: 'oklch(0.99 0.0146 98.28)',
                    fontSize: '14px'
                  }
              }
            }
          }}
        />
      </CardContent>
    </Card>
  )
}
