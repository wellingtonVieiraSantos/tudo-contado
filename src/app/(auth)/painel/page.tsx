'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  ChevronDown,
  ChevronUp,
  PiggyBank
} from 'lucide-react'

import valueFormatter from '@/lib/valueFormatter'

import { UserBarSettings } from '@/components/UserBarSettings'

import { ChartPie } from './components/ChartPie'
import { ChartLine } from './components/ChartLine'
import { Divider } from '@/components/ui/Divider'
import { useGetDashboard } from './hooks/use-get-dashboard'
import { ScrollArea, Scrollbar } from '@/components/ui/ScrollArea'

export default function Dashboard() {
  const {
    lineChartData,
    pieChartData,
    totalExpenseCurrent,
    totalIncomeCurrent,
    recentTransactions
  } = useGetDashboard()

  return (
    <div
      className='w-full lg:h-screen p-2 gap-2 grid grid-cols-1 lg:grid-rows-[1fr_auto_auto_auto]
     xl:grid-rows-[0.5fr_1fr_6fr] lg:grid-cols-2 xl:grid-cols-[1fr_1fr_auto]'
    >
      <UserBarSettings title='Dashboard' />
      <div className='lg:col-span-2 xl:col-span-3'>
        <Card className='w-full p-2 lg:hidden'>
          <CardHeader className='p-0 pb-2'>
            <CardTitle>Balança Financeira</CardTitle>
            <CardDescription>Movimentação financeira do mês</CardDescription>
          </CardHeader>
          <CardContent className='text-center gap-2'>
            <h2
              className={`text-4xl tracking-wide ${
                totalIncomeCurrent - totalExpenseCurrent < 0
                  ? 'text-destructive'
                  : 'text-success'
              }`}
            >
              {valueFormatter(totalIncomeCurrent - totalExpenseCurrent)}
            </h2>
            <div className='flex flex-row justify-center gap-8'>
              <div className='text-xl tracking-wide flex items-center gap-2'>
                <ChevronUp className='text-success size-8' />
                <div className='flex flex-col text-left'>
                  <span className='font-montserrat'>
                    {valueFormatter(totalIncomeCurrent)}
                  </span>
                  <span className='text-sm text-foreground-secondary'>
                    Rendimentos
                  </span>
                </div>
              </div>
              <div className='text-xl tracking-wide flex items-center gap-2'>
                <ChevronDown className='text-destructive size-8' />
                <div className='flex flex-col text-left'>
                  <span className='font-montserrat'>
                    {valueFormatter(totalExpenseCurrent)}
                  </span>
                  <span className='text-sm text-foreground-secondary'>
                    Despesas
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='hidden lg:flex gap-2'>
          <Card className='w-full p-2'>
            <CardHeader className='p-0 pb-2'>
              <CardTitle>Ganhos</CardTitle>
              <CardDescription>Total de Rendimentos do mês</CardDescription>
            </CardHeader>
            <CardContent className='justify-around flex-row'>
              <h2 className={`text-4xl tracking-wide`}>
                {valueFormatter(totalIncomeCurrent)}
              </h2>
              <BanknoteArrowUp size={45} />
            </CardContent>
          </Card>
          <Card className='w-full p-2'>
            <CardHeader className='p-0 pb-2'>
              <CardTitle>Despesas</CardTitle>
              <CardDescription>Total de despesas do mês</CardDescription>
            </CardHeader>
            <CardContent className='justify-around flex-row'>
              <h2 className={`text-4xl tracking-wide`}>
                {valueFormatter(totalExpenseCurrent)}
              </h2>
              <BanknoteArrowDown size={45} />
            </CardContent>
          </Card>
          <Card className='w-full p-2'>
            <CardHeader className='p-0 pb-2'>
              <CardTitle>Saldo</CardTitle>
              <CardDescription>Balanço financeiro do mês</CardDescription>
            </CardHeader>
            <CardContent className='justify-around flex-row'>
              <h2
                className={`text-4xl tracking-wide ${
                  totalIncomeCurrent - totalExpenseCurrent < 0
                    ? 'text-destructive'
                    : 'text-success'
                }`}
              >
                {valueFormatter(totalIncomeCurrent - totalExpenseCurrent)}
              </h2>
              <PiggyBank size={45} />
            </CardContent>
          </Card>
        </div>
      </div>
      <ChartPie pieChartData={pieChartData} />
      <div className='flex flex-col gap-2'>
        <ChartLine lineChartData={lineChartData} />
        <Card className='p-2 h-full'>
          <CardHeader className='p-0 pb-2'>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>
              Produtos esgotados, hora de reabastecer o estoque
            </CardDescription>
            <Divider />
          </CardHeader>
          <CardContent className='pt-10 items-center justify-center'>
            {/* {response?.data?.productLifetime.length === 0 && (
              <div className='pt-10 text-center text-foreground-secondary'>
                <p>Nenhum produto esgotado encontrado...</p>
              </div>
            )}
            <div className='grid grid-cols-1 lg:grid-cols-3'>
              {response?.data?.productLifetime.map(product => (
                <Badge key={product.id} variant='error'>
                  {product.productVariantId.productVariant.product.name}
                </Badge>
              ))}
            </div> */}
            <p className='text-foreground-secondary'>Em breve...</p>
          </CardContent>
        </Card>
      </div>

      <div className='lg:col-span-2 xl:col-span-1'>
        <Card className='h-full mb-22 lg:mb-0 '>
          <CardHeader>
            <CardTitle>Movimentações Financeiras</CardTitle>
            <CardDescription>
              Ultimas transações financeiras realizadas
            </CardDescription>
            <Divider />
          </CardHeader>
          <CardContent className='lg:h-20 xl:h-max'>
            {recentTransactions.length === 0 && (
              <p className='text-foreground-secondary text-center'>
                Nemhuma transação recente...
              </p>
            )}
            <ScrollArea orientation='vertical'>
              {recentTransactions.map(trans => (
                <div
                  key={trans.id}
                  className=' p-1 px-2 flex items-center gap-3'
                >
                  {trans.type === 'income' ? (
                    <ChevronUp className='text-success' />
                  ) : (
                    <ChevronDown className='text-destructive' />
                  )}
                  <div>
                    <h3 className='font-poppins text-foreground-secondary'>
                      {trans.description}
                    </h3>
                    <p>{valueFormatter(trans.value)}</p>
                  </div>
                </div>
              ))}
              <Scrollbar orientation='vertical' />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
