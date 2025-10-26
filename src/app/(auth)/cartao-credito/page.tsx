'use client'
import { UserBarSettings } from '@/components/UserBarSettings'
import { useGetCreditCard } from './_hooks/use-get-creditcards'
import Image from 'next/image'
import { ProgressBar } from '@/components/ui/ProgressBar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'

const cardBrand = [
  { title: 'VISA', url: '/visa.png' },
  { title: 'MASTERCARD', url: '/mastercard.png' },
  { title: 'ELO', url: '/elo.png' },
  { title: 'HIPERCARD', url: '/hipercard.png' },
  { title: 'AMEX', url: '/amex.png' }
]

export default function CartaoCredito() {
  const { data } = useGetCreditCard()

  const card = data?.data[0]
  return (
    <div className='flex flex-col flex-wrap p-3 gap-3 pb-22 lg:pb-0'>
      <UserBarSettings title='Cartão de Crédito' />
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
          src={cardBrand.find(b => b.title === card?.cardBrand)?.url ?? ''}
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
      {/* <div className='w-full max-w-75'>
        <ProgressBar
          value={
            ((CreditCardData.cardExpense?.find((_ce, index) => i === index) ||
              0) /
              card.creditLimit) *
            100
          }
        />
        <div className='flex justify-between items-center'>
          <div className='flex flex-col text-sm'>
            <span className='text-foreground-secondary'>Utilizado</span>
            <span className='text-base'>
              {valueFormatter(
                CreditCardData.cardExpense?.find(
                  (_ce, index) => i === index
                ) as number
              )}
            </span>
          </div>
          <div className='flex flex-col text-sm'>
            <span className='text-foreground-secondary text-right'>Limite</span>
            <span className='text-base'>
              {valueFormatter(card.creditLimit)}
            </span>
          </div>
        </div>
      </div> */}
      <Card>
        <CardHeader className='gap-2'>
          <CardTitle>Próxima fatura</CardTitle>
          <CardDescription className='text-lg'>R$ 240,00</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className='gap-2'>
          <CardTitle>Fatura fechada</CardTitle>
          <CardDescription className={`text-lg ${true && 'text-destructive'}`}>
            R$ 240,00
          </CardDescription>
        </CardHeader>
        <CardContent className='px-3 pt-0 flex-row items-center text-sm'>
          <p className='text-sm'>Vencimento:</p>
          <span className='text-base'> 18/10</span>
        </CardContent>
      </Card>
      <Card className='text-destructive'>
        <CardHeader className='gap-2'>
          <CardTitle>Fatura atrasada</CardTitle>
          <CardDescription className='text-lg text-destructive'>
            R$ 240,00
          </CardDescription>
        </CardHeader>
        <CardContent className='px-3 pt-0 flex-row items-center text-sm'>
          <p className='text-sm'>Vencida em</p>
          <span className='text-base'> 18/10</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Limite</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar
            className='h-8 rounded-lg'
            rounded='rounded-lg'
            value={20}
          />
          <div className='flex justify-between items-center'>
            <div className='flex flex-col text-sm'>
              <span className='text-foreground-secondary'>Utilizado</span>
              <span className='text-base'>R$ 240,00</span>
            </div>
            <div className='flex flex-col text-sm'>
              <span className='text-foreground-secondary text-right'>
                Disponível
              </span>
              <span className='text-base'>R$960,00</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ultimas transações</CardTitle>
          <CardDescription>
            Resumo das ultimas compras feitas com o cartão
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>Compra 1 - valor R$ 30,00</p>
          <p>Compra 2 - valor R$ 50,00</p>
          <p>Compra 3 - valor R$ 100,00</p>
          <p>Compra 4 - valor R$ 60,00</p>
        </CardContent>
      </Card>
    </div>
  )
}
