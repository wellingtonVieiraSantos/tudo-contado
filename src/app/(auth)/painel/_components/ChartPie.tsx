'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { chartsTooltipClasses } from '@mui/x-charts/ChartsTooltip'
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart'
import { useState } from 'react'
import { useGetSumByCategory } from '../_hooks/use-get-sumByCategory'

export default function ChartPie() {
  const { pieChartData } = useGetSumByCategory()
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null)

  if (!pieChartData) return

  const chartData = pieChartData.map((item, i) => ({
    id: i,
    value: item._sum,
    label: categoryFormatter(item.category)
  }))

  const total = pieChartData.reduce((acc, cur) => acc + cur._sum, 0)

  return (
    <Card className='flex flex-col p-2 col-span-3 xl:col-span-1 xl:row-span-2'>
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
              arcLabel: item => {
                return item.id === highlightedItem
                  ? `${((item.value * 100) / total).toFixed(2)}%`
                  : ''
              },
              data: chartData,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: {
                innerRadius: 30,
                additionalRadius: -10,
                color: 'gray'
              },
              cornerRadius: 3,
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
          onHighlightChange={highlightedItem => {
            setHighlightedItem(highlightedItem?.dataIndex ?? null)
          }}
          sx={{
            '& .MuiChartsLegend-root': {
              color: 'oklch(0.99 0.0146 98.28)',
              fontSize: '12px',
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
                    color: 'oklch(0.99 .0146 98.28)'
                  },
                [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.markContainer}`]:
                  {
                    display: 'none'
                  },
                [`&.${chartsTooltipClasses.root} .${chartsTooltipClasses.labelCell}`]:
                  {
                    color: 'oklch(0.99 0.0146 98.28)',
                    fontSize: '12px'
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
