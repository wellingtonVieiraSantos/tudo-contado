'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  PiggyBank,
  Settings
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getDataForDashboardAction } from './actions/get-dashboard-action'
import valueFormatter from '@/lib/valueFormatter'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'
import { BarChart } from '@mui/x-charts/BarChart'
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart'
import { chartsTooltipClasses } from '@mui/x-charts/ChartsTooltip'
import { Badge } from '@/components/ui/Badge'
import { months } from '@/lib/dashboardMonths'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger
} from '@/components/ui/Dropdown'
import { Button } from '@/components/ui/Button'

export default function Dashboard() {
  const { data: session } = useSession()
  const [actualIncomeAmount, setActualIncomeAmount] = useState(0)
  const [actualExpenseAmount, setActualExpenseAmount] = useState(0)
  const [barChartData, setBarChartData] = useState<
    { incomeAmount: number; expenseAmount: number; balance: number }[]
  >([])

  useEffect(() => {
    const dashboardGetData = async () => {
      const { data } = await getDataForDashboardAction()
      if (!data) return

      const incomes = data.map(d => d.income).flat()
      const expenses = data.map(d => d.expense).flat()

      const dataBarChart = months.map(month => {
        const incomeAmount = incomes
          ?.filter(
            i => format(i.date, "MMMM 'de' yyyy", { locale: ptBR }) === month
          )
          .reduce((acc, curr) => acc + Number(curr.value), 0)
        const expenseAmount = expenses
          ?.filter(
            i => format(i.date, "MMMM 'de' yyyy", { locale: ptBR }) === month
          )
          .reduce((acc, curr) => acc + Number(curr.value), 0)
        const balance = incomeAmount - expenseAmount
        return { incomeAmount, expenseAmount, balance }
      })

      setBarChartData(dataBarChart)

      setActualIncomeAmount(
        incomes
          .filter(
            e =>
              format(e.date, "MMMM 'de' yyyy", { locale: ptBR }) ===
              format(new Date(), "MMMM 'de' yyyy", { locale: ptBR })
          )
          .map(i => i.value)
          .reduce((acc, current) => acc + current, 0)
      )

      setActualExpenseAmount(
        expenses
          .filter(
            e =>
              format(e.date, "MMMM 'de' yyyy", { locale: ptBR }) ===
              format(new Date(), "MMMM 'de' yyyy", { locale: ptBR })
          )
          .map(e => e.value)
          .reduce((acc, current) => acc + current, 0)
      )
    }
    dashboardGetData()
  }, [])

  const pieChartData = [
    {
      id: 0,
      value: 1000,
      label: 'Alimentação'
    },
    { id: 1, value: 1500, label: 'Aluguel' },
    { id: 2, value: 700, label: 'Boletos' },
    { id: 3, value: 1000, label: 'Outros' }
  ]

  const pieChartDataAmount = pieChartData.reduce(
    (acc, curr) => acc + curr.value,
    0
  )

  return (
    <div>
      <div className='flex justify-end items-center gap-4 text-right p-2 px-4 text-sm'>
        <span>{'Bem vindo, ' + session?.user?.name}</span>
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Settings />
            </Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem onClick={() => signOut()}>
              <LogOut />
              Sair
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
        <Avatar className='size-10'>
          <AvatarImage src={session?.user?.image || ''}></AvatarImage>
          <AvatarFallback className='bg-button-ghost'>
            {session?.user?.name?.slice(0, 2).toUpperCase() || '??'}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className='text-2xl pb-2'>
        <h2 className=''>Dashboard</h2>
        <p className='text-base text-foreground-secondary'>
          {format(new Date(), "MMMM 'de' yyyy", { locale: ptBR }).toUpperCase()}
        </p>
      </div>
      <div className='flex justify-between gap-4 pr-4'>
        <Card className='w-full flex-1 py-2'>
          <CardHeader>
            <CardTitle>Rendimentos</CardTitle>
            <CardDescription>Total de ganhos do mês</CardDescription>
            <CardContent className='px-0 flex-row justify-between'>
              <p className='text-2xl font-montserrat'>
                {valueFormatter(actualIncomeAmount / 100)}
              </p>
              <ChevronUp size={30} className='text-success' />
            </CardContent>
          </CardHeader>
        </Card>
        <Card className='w-full flex-1 py-2'>
          <CardHeader>
            <CardTitle>Despesas</CardTitle>
            <CardDescription>Total de gastos do mês</CardDescription>
            <CardContent className='px-0 flex-row justify-between'>
              <p className='text-2xl font-montserrat'>
                {valueFormatter(actualExpenseAmount / 100)}
              </p>
              <ChevronDown size={30} className='text-destructive' />
            </CardContent>
          </CardHeader>
        </Card>
        <Card className='w-full flex-1 py-2'>
          <CardHeader>
            <CardTitle>Saldo</CardTitle>
            <CardDescription>Saldo do mês</CardDescription>
            <CardContent className='px-0 flex-row justify-between'>
              <p
                className={`text-2xl font-montserrat ${
                  (actualIncomeAmount - actualExpenseAmount) / 100 < 0
                    ? 'text-destructive'
                    : 'text-success'
                }`}
              >
                {valueFormatter(
                  (actualIncomeAmount - actualExpenseAmount) / 100
                )}
              </p>
              <PiggyBank
                size={30}
                className={`text-yellow-200 ${
                  (actualIncomeAmount - actualExpenseAmount) / 100 < 0 &&
                  'rotate-180'
                } transition duration-300`}
              />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
      <div className='flex mr-4 mt-4 gap-4'>
        <Card className='flex flex-col justify-center w-full flex-1'>
          <CardHeader>
            <CardTitle>Controle mensal:</CardTitle>
            <CardDescription>Dados dos ultimos 6 meses</CardDescription>
          </CardHeader>
          <BarChart
            className=''
            series={[
              {
                data: [...barChartData.map(data => data.incomeAmount / 100)],
                label: 'Rendimentos',
                color: 'oklch(0.7729 0.1535 163.22)',
                valueFormatter
              },
              {
                data: [...barChartData.map(data => data.expenseAmount / 100)],
                label: 'Despesas',
                color: 'oklch(0.6368 0.2078 25.33)',
                valueFormatter
              },
              {
                data: [...barChartData.map(data => data.balance / 100)],
                label: 'Saldo',
                color: 'oklch(0.59 0.2143 289.47)',
                valueFormatter
              }
            ]}
            height={550}
            width={1000}
            xAxis={[
              {
                data: [...months],
                scaleType: 'band',
                tickSize: 5
              }
            ]}
            yAxis={[
              {
                scaleType: 'linear',
                tickSize: 5
              }
            ]}
            sx={{
              '& .MuiChartsAxis-line': {
                stroke: '#FFF !important'
              },
              '& .MuiChartsAxis-tick': {
                stroke: '#FFF !important'
              },
              '& text': {
                fill: '#FFF !important'
              },
              '& .MuiChartsAxis-tickLabel': {
                color: '#FFF !important'
              },
              '& .MuiChartsLegend-root': {
                color: '#FFF !important',
                fontSize: '16px',
                fontWeight: 'bold'
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
              }
            }}
          />
        </Card>
        <div className='flex flex-col justify-between gap-4 flex-1'>
          <Card className='flex flex-col justify-center flex-1 pb-2'>
            <CardHeader>
              <CardTitle>Gastos por categoria:</CardTitle>
              <CardDescription>Principais categorias do mês</CardDescription>
            </CardHeader>
            <PieChart
              series={[
                {
                  arcLabel: item =>
                    `${((item.value * 100) / pieChartDataAmount).toFixed(1)}%`,

                  data: pieChartData,
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
              width={250}
              height={250}
              sx={{
                '& .MuiChartsLegend-root': {
                  color: '#FFF',
                  fontSize: '16px',
                  fontWeight: 'bold'
                },
                [`& .${pieArcLabelClasses.root}`]: {
                  fontWeight: 'bold'
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
                }
              }}
            />
          </Card>
          <Card className='pb-2'>
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
              <CardDescription>
                Produtos esgotados, hora de reabastecer o estoque:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant='error'>Arroz</Badge>
              <Badge variant='error'>Feijão</Badge>
              <Badge variant='error'>Macarrão</Badge>
              <Badge variant='error'>Batata</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
