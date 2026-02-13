'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { useGetExpenseSumByMonth } from '@/hooks/use-get-expense-sum'
import { useGetIncomeSumByMonth } from '@/hooks/use-get-income-sum'
import valueFormatter from '@/lib/valueFormatter'
import { chartsTooltipClasses } from '@mui/x-charts/ChartsTooltip'
import {
  LineChart,
  lineElementClasses,
  markElementClasses
} from '@mui/x-charts/LineChart'

export default function ChartLine() {
  const { expenseSum } = useGetExpenseSumByMonth()
  const { incomeSum } = useGetIncomeSumByMonth()

  if (!expenseSum || !incomeSum) return

  const expense = expenseSum.map(item => item.total)
  const income = incomeSum.map(item => item.total)
  const months = incomeSum.map(item => {
    const [year, month] = item.month.split('-').map(Number)

    const date = new Date(year, month - 1, 1)
    return date.toLocaleString('pt-BR', { month: 'short' })
  })

  return (
    <Card className='overflow-hidden flex flex-col p-2 col-span-3 lg:col-span-2 row-start-3 row-span-2'>
      <CardHeader>
        <CardTitle>Controle mensal</CardTitle>
        <CardDescription>Dados dos ultimos 6 meses</CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className='h-full'>
        <LineChart
          className=''
          localeText={{
            loading: 'Carregando dados...',
            noData: 'Nenhum dado encontrado.'
          }}
          series={[
            {
              data: income,
              label: 'Rendimentos',
              showMark: false,
              color: 'oklch(0.8729 0.1535 163.22)',
              valueFormatter
            },
            {
              data: expense,
              label: 'Despesas',
              showMark: false,
              color: 'oklch(0.7368 0.2078 25.33)',
              valueFormatter
            }
          ]}
          height={250}
          colors={['blue', 'green']}
          xAxis={[
            {
              data: months,
              scaleType: 'band',
              disableTicks: true,
              tickPlacement: 'middle'
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
