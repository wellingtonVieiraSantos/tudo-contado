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
  CreditCard
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
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from '@/components/ui/Modal'
import Stepper from '@mui/material/Stepper'
import { FormPostCreditCard } from '../despesas/_components/FormPostCreditCard'

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
    lineChartData,
    pieChartData,
    totalExpenseCurrent,
    totalIncomeCurrent,
    recentTransactions,
    CreditCardData
  } = useGetDashboard()

  if (isLoading) return <Loading />

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
          <div className='absolute -top-7 right-1'>
            {totalIncomeCurrent - totalExpenseCurrent > 0 ? (
              <Trophy strokeWidth={1.2} className='size-7 lg:text-warning' />
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
          <div className='flex md:justify-center lg:justify-start xl:justify-center gap-2 flex-wrap lg:gap-2'>
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

      <Card className='lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 p-2'>
        <CardHeader>
          <CardTitle>Cartões</CardTitle>
          <CardDescription>
            Acompanhamento das faturas dos seus cartões de crédito
          </CardDescription>
          <Divider />
        </CardHeader>
        <CardContent className=' items-center justify-center'>
          {CreditCardData.creditCard?.length !== 0 ? (
            <div className='flex flex-col gap-13 items-center'>
              <p className='text-foreground-secondary'>
                Nenhum cartão de crédito cadastrado...
              </p>
              <Modal /* open={isOpen} onOpenChange={open => setIsOpen(open)} */>
                <ModalTrigger asChild>
                  <Button type='button'>
                    <CreditCard />
                    Cadastrar novo cartão
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Cartão de crédito</ModalTitle>
                    <ModalDescription className='text-sm text-foreground-secondary'>
                      Cadastre ou atualize seus cartões de crédito.
                    </ModalDescription>
                  </ModalHeader>
                  <Divider className='bg-gradient-to-r via-foreground-secondary' />
                  {/* <FormPostCreditCard /> */}
                </ModalContent>
              </Modal>
            </div>
          ) : (
            <Carousel>
              <CarouselContent>
                {CreditCardData.creditCard?.map((card, i) => (
                  <CarouselItem
                    key={card.id}
                    className='flex flex-col items-center pb-1 gap-3'
                  >
                    <div
                      className={`relative w-full max-w-75 h-45 rounded-xl bg-radial
                        from-sky-800 border border-foreground-secondary`}
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
                          cardBrand.find(b => b.title === card.cardBrand)
                            ?.url ?? ''
                        }
                        alt='bandeira do cartão de crédito'
                        width={512}
                        height={512}
                        className='w-16 absolute top-0 right-5'
                      />
                      <div className='text-xl lg:text-base xl:text-xl absolute bottom-18 left-9 font-mono tracking-wider'>
                        **** **** **** {card.lastNumber}
                      </div>
                      <div className='absolute bottom-3 left-7 flex flex-col'>
                        <span className='opacity-70 text-[12px]'>Titular</span>
                        <span>{card.holder}</span>
                      </div>
                      <div className='absolute bottom-3 right-7 flex flex-col'>
                        <span className='opacity-70 text-[12px]'>Expira</span>
                        <span>
                          {card.expMonth} / {card.expYear}
                        </span>
                      </div>
                    </div>
                    <div className='w-full max-w-75'>
                      <ProgressBar
                        value={
                          ((CreditCardData.cardExpense?.find(
                            (_ce, index) => i === index
                          ) || 0) /
                            card.creditLimit) *
                          100
                        }
                      />
                      <div className='flex justify-between items-center'>
                        <span className='text-xl lg:text-lg xl:text-xl font-montserrat'>
                          {valueFormatter(
                            CreditCardData.cardExpense?.find(
                              (_ce, index) => i === index
                            ) as number
                          )}
                        </span>
                        <span className='lg:text-sm text-foreground-secondary'>
                          Limite: {valueFormatter(card.creditLimit)}
                        </span>
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

      <Card className='overflow-hidden p-2 lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-5'>
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
              Nenhuma transação recente...
            </p>
          )}
          <ScrollArea orientation='vertical' className='lg:h-100'>
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
                  {trans.type === 'expense' && <p>{trans.paymentMethod}</p>}
                  {trans.type === 'expense' && <p>{trans.status}</p>}
                </div>
              </div>
            ))}
            <Scrollbar orientation='vertical' />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
