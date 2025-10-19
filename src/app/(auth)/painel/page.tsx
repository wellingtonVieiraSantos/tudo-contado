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
  Plus,
  CreditCard,
  Check,
  Ban,
  TriangleAlert,
  BanknoteArrowUp
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
import Loading from './loading'
import Image from 'next/image'
import { ProgressBar } from '@/components/ui/ProgressBar'
import {
  Carousel,
  CarouselContent,
  CarouselControlLeft,
  CarouselControlRight,
  CarouselItem
} from '@/components/ui/Carousel'

import { Badge } from '@/components/ui/Badge'
import { paymentStatusFormatter } from '@/lib/paymentStatusFormatter'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { categories } from '../despesas/_components/FormStepOne'

const cardBrand = [
  { title: 'VISA', url: '/visa.png' },
  { title: 'MASTERCARD', url: '/mastercard.png' },
  { title: 'ELO', url: '/elo.png' },
  { title: 'HIPERCARD', url: '/hipercard.png' },
  { title: 'AMEX', url: '/amex.png' }
]

export default function Dashboard() {
  const {
    isLoading,
    sumExpenseActualMonth,
    sumIncomeActualMonth,
    lineChartData,
    pieChartData,
    CreditCardData,
    recentTransactions
  } = useGetDashboard()

  if (isLoading) return <Loading />

  return (
    <div className='w-full lg:h-screen grid grid-cols-1 lg:grid-rows-[auto_auto_auto] lg:grid-cols-2 xl:grid-cols-3 gap-3 p-3 pb-24 lg:pb-0'>
      <UserBarSettings title='Dashboard' />
      <Card className='h-full lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 p-2 lg:bg-none lg:bg-card bg-gradient-to-br from-button to-badge'>
        <CardHeader>
          <CardTitle className='flex gap-3'>
            <Sigma size={18} />
            Balança Financeira
          </CardTitle>
          <CardDescription className='hidden lg:flex'>
            Visão geral do mês
          </CardDescription>
          <Divider className='hidden lg:flex' />
        </CardHeader>
        <CardContent className='flex flex-col md:items-center gap-6 justify-center lg:-mt-10 lg:h-full'>
          <div className='absolute top-2 right-1'>
            {sumIncomeActualMonth - sumExpenseActualMonth > 0 ? (
              <Trophy strokeWidth={1.2} className='size-7 lg:text-warning' />
            ) : (
              <AlertTriangle
                strokeWidth={1.2}
                className='size-7 lg:text-destructive'
              />
            )}
          </div>
          <h2
            className={`text-3xl tracking-wide text-center ${
              sumIncomeActualMonth - sumExpenseActualMonth < 0
                ? 'lg:text-destructive'
                : 'lg:text-success'
            }`}
          >
            {valueFormatter(sumIncomeActualMonth - sumExpenseActualMonth)}
          </h2>
          <div className='flex justify-center gap-2 flex-wrap lg:gap-6'>
            <div className='tracking-wide flex items-center gap-3'>
              <TrendingUp className='text-success size-6' />
              <p className='font-montserrat flex flex-col text-sm'>
                <span className='text-[12px] font-poppins'>Rendimentos:</span>{' '}
                {valueFormatter(sumIncomeActualMonth)}
              </p>
            </div>
            <div className=' tracking-wide flex items-center gap-3'>
              <TrendingDown className='text-destructive size-6' />
              <p className='font-montserrat flex flex-col text-sm'>
                <span className='text-[12px] font-poppins'>Despesas: </span>
                {valueFormatter(sumExpenseActualMonth)}
              </p>
            </div>
          </div>
          <div className='w-full flex flex-col lg:flex-row items-center gap-2'>
            <Link href={'/ganhos'} className='flex-1 w-full'>
              <Button variant='border' className='w-full bg-card'>
                <Plus />
                Renda
              </Button>
            </Link>
            <Link href={'/despesas'} className='flex-1 w-full'>
              <Button variant='border' className='w-full bg-card'>
                <Plus />
                Despesa
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className='relative lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 xl:col-start-3 p-2'>
        <CardHeader>
          <CardTitle>Cartões de crédito</CardTitle>
          <CardDescription>Acompanhamento das faturas</CardDescription>
          <Divider />
        </CardHeader>
        <CardContent className='items-center justify-center'>
          {CreditCardData?.length === 0 ? (
            <div className='flex flex-col gap-13 items-center text-center'>
              <p className='text-foreground-secondary'>
                Nenhum cartão de crédito cadastrado...
              </p>
              <Button type='button'>
                <CreditCard />
                Cadastrar novo cartão
              </Button>
            </div>
          ) : (
            <Carousel>
              <CarouselContent>
                {CreditCardData?.map((card, i) => (
                  <CarouselItem
                    key={card.id}
                    className='flex flex-col items-center gap-3 cursor-pointer'
                  >
                    <div
                      className={`relative m-auto w-full max-w-max h-45 aspect-video rounded-xl bg-radial
                          from-sky-800 border border-disabled`}
                    >
                      <Image
                        src={'/chip.png'}
                        alt='chip cartão de crédito'
                        width={512}
                        height={512}
                        className='w-10 absolute top-3 left-5'
                      />
                      <Image
                        src={
                          cardBrand.find(b => b.title === card?.cardBrand)
                            ?.url ?? ''
                        }
                        alt='bandeira do cartão de crédito'
                        width={512}
                        height={512}
                        className='w-16 absolute top-0 right-5'
                      />
                      <div className='text-xl lg:text-base xl:text-xl absolute bottom-18 left-9 font-mono tracking-wider'>
                        **** **** **** {card?.lastNumber}
                      </div>
                      <div className='absolute bottom-3 left-7 flex flex-col'>
                        <span className='opacity-70 text-[12px]'>Titular</span>
                        <span>{card?.holder.toUpperCase()}</span>
                      </div>
                      <div className='absolute bottom-3 right-7 flex flex-col'>
                        <span className='opacity-70 text-[12px]'>Expira</span>
                        <span>
                          {card?.expMonth} / {card?.expYear}
                        </span>
                      </div>
                    </div>
                    <div className='w-full max-w-75'>
                      <ProgressBar
                        value={(card.amount / card.creditLimit) * 100}
                      />
                      <div className='flex justify-between items-center pt-1'>
                        <div className='flex flex-col text-sm'>
                          <span className='text-foreground-secondary'>
                            Utilizado
                          </span>
                          <span className='text-base'>
                            {valueFormatter(card.amount)}
                          </span>
                        </div>
                        <div className='flex flex-col text-sm'>
                          <span className='text-foreground-secondary text-right'>
                            Limite
                          </span>
                          <span className='text-base'>
                            {valueFormatter(card.creditLimit)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselControlLeft />
              <CarouselControlRight />
            </Carousel>
          )}
        </CardContent>
      </Card>

      <ChartLine lineChartData={lineChartData} />

      <ChartPie pieChartData={pieChartData} />

      <Card className='overflow-hidden p-2 lg:col-start-2 lg:col-end-3 lg:row-start-4 lg:row-end-5 xl:col-start-3 xl:row-start-3 '>
        <CardHeader>
          <CardTitle>Movimentações Financeiras</CardTitle>
          <CardDescription>
            Ultimas transações financeiras realizadas
          </CardDescription>
          <Divider />
        </CardHeader>
        <CardContent className='h-max'>
          {!recentTransactions && (
            <p className='text-foreground-secondary text-center'>
              Nenhuma transação recente...
            </p>
          )}
          <ScrollArea orientation='vertical' className='lg:h-100'>
            <div className='grid gap-3'>
              {recentTransactions?.map(trans => (
                <div
                  key={trans.id}
                  className='grid grid-cols-[2fr_1fr] sm:p-2 gap-3'
                >
                  <div className='flex gap-2'>
                    <div className='size-15 shrink-0 grid place-items-center rounded-xl bg-hover'>
                      {trans.type === 'income' ? (
                        <BanknoteArrowUp className='text-success' size={30} />
                      ) : (
                        (() => {
                          const category = categories.find(
                            c => c.type === trans.category
                          )
                          const Icon = category?.icon
                          return Icon ? (
                            <Icon className='text-destructive/80' size={30} />
                          ) : null
                        })()
                      )}
                    </div>
                    <div className='grid gap-2'>
                      <h3 className='font-poppins line-clamp-1'>
                        {trans.description}
                      </h3>
                      <p className='text-[12px] text-foreground-secondary'>
                        {format(
                          parse(trans.date, 'yyyy-MM-dd', new Date()),
                          "dd 'de' MMMM 'de' yyyy",
                          { locale: ptBR }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='text-right flex flex-col items-end justify-center gap-2 sm:pr-4'>
                    {trans.type === 'expense' && (
                      <Badge
                        variant={
                          trans.status === 'PAID'
                            ? 'success'
                            : trans.status === 'PENDING'
                            ? 'warning'
                            : 'error'
                        }
                        className='gap-1 text-[10px] px-1 h-5'
                      >
                        {trans.status === 'PAID' ? (
                          <Check size={15} strokeWidth={1.4} />
                        ) : trans.status === 'PENDING' ? (
                          <TriangleAlert size={15} strokeWidth={1.4} />
                        ) : (
                          <Ban size={15} strokeWidth={1.4} />
                        )}
                        {paymentStatusFormatter(trans.status)}
                      </Badge>
                    )}
                    <p className='font-montserrat text-sm sm:text-lg line-clamp-1'>
                      {valueFormatter(trans.value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Scrollbar orientation='vertical' />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
