'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Trophy,
  Sigma,
  Plus
} from 'lucide-react'

import valueFormatter from '@/lib/valueFormatter'

import { UserBarSettings } from '@/components/UserBarSettings'

import { ChartPie } from './_components/ChartPie'
import { ChartLine } from './_components/ChartLine'
import { Divider } from '@/components/ui/Divider'
import { useGetDashboard } from './_hooks/use-get-dashboard'
import { ScrollArea, Scrollbar } from '@/components/ui/ScrollArea'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function Dashboard() {
  const {
    lineChartData,
    pieChartData,
    totalExpenseCurrent,
    totalIncomeCurrent,
    recentTransactions
  } = useGetDashboard()

  return (
    <div className='w-full lg:h-screen grid grid-cols-1 lg:grid-rows-[auto_1fr_1fr_1fr] lg:grid-cols-3 gap-3 p-3 pb-24 lg:pb-0'>
      <UserBarSettings title='Dashboard' />
      <Card className='lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 p-2 lg:bg-none lg:bg-card bg-gradient-to-br from-button to-badge'>
        <CardHeader>
          <CardTitle className=' flex items-center gap-3'>
            <Sigma />
            Balança Financeira
          </CardTitle>
          <CardDescription className='hidden lg:flex'>
            Visão geral do balanço financeiro do mês
          </CardDescription>
          <Divider className='hidden lg:flex' />
        </CardHeader>
        <CardContent className='relative flex flex-col md:items-center gap-6 justify-center lg:-mt-12 lg:h-full'>
          <div className='absolute top-1 lg:top-auto lg:bottom-13 right-1'>
            {totalIncomeCurrent - totalExpenseCurrent > 0 ? (
              <Trophy strokeWidth={1.2} className='size-7' />
            ) : (
              <AlertTriangle
                strokeWidth={1.2}
                className='size-7 lg:text-destructive'
              />
            )}
          </div>
          <h2
            className={`text-3xl tracking-wide ${
              totalIncomeCurrent - totalExpenseCurrent < 0
                ? 'lg:text-destructive'
                : 'lg:text-success'
            }`}
          >
            {valueFormatter(totalIncomeCurrent - totalExpenseCurrent)}
          </h2>
          <div className='flex md:justify-center gap-2 flex-wrap lg:gap-2'>
            <div className='tracking-wide flex items-center gap-2'>
              <TrendingUp className='text-success size-6' />
              <p className='font-montserrat'>
                <span className='text-sm font-poppins'>Rendimentos:</span>{' '}
                {valueFormatter(totalIncomeCurrent)}
              </p>
            </div>
            <div className=' tracking-wide flex items-center gap-2'>
              <TrendingDown className='text-destructive size-6' />
              <p className='font-montserrat'>
                <span className='text-sm font-poppins'>Gastos: </span>
                {valueFormatter(totalExpenseCurrent)}
              </p>
            </div>
          </div>
          <div className='w-full px-5 flex flex-col lg:flex-row items-center gap-2'>
            <Link href={'/ganhos'} className='flex-1 w-full'>
              <Button variant='border' className='w-full bg-card'>
                <Plus />
                Renda
              </Button>
            </Link>
            <Link href={'/despesas'} className='flex-1 w-full'>
              <Button variant='border' className='w-full bg-card'>
                <Plus />
                Gasto
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <ChartLine lineChartData={lineChartData} />
      <ChartPie pieChartData={pieChartData} />

      <Card className='overflow-hidden p-2 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4'>
        <CardHeader>
          <CardTitle>Movimentações Financeiras</CardTitle>
          <CardDescription>
            Ultimas transações financeiras realizadas
          </CardDescription>
          <Divider />
        </CardHeader>
        <CardContent className='h-max'>
          {recentTransactions.length === 0 && (
            <p className='text-foreground-secondary text-center'>
              Nemhuma transação recente...
            </p>
          )}
          <ScrollArea orientation='vertical'>
            {recentTransactions.map(trans => (
              <div key={trans.id} className=' p-1 px-2 flex items-center gap-3'>
                {trans.type === 'income' ? (
                  <TrendingUp className='text-success' />
                ) : (
                  <TrendingDown className='text-destructive' />
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

      <Card className='lg:col-start-3 lg:col-end-4 lg:row-start-4 lg:row-end-5 p-2'>
        <CardHeader>
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
  )
}
