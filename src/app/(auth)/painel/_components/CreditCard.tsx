'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { useGetCreditCard } from '../../cartao-credito/_hooks/use-get-creditcards'
import valueFormatter from '@/lib/valueFormatter'
import {
  Carousel,
  CarouselContent,
  CarouselControlLeft,
  CarouselControlRight,
  CarouselItem
} from '@/components/ui/Carousel'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { CreditCard } from 'lucide-react'
import Image from 'next/image'
import { useGetExpensesByCreditCard } from '../../despesas/_hooks/use-get-expense-by-creditCard'

export const cardBrand = [
  { title: 'VISA', url: '/visa.png' },
  { title: 'MASTERCARD', url: '/mastercard.png' },
  { title: 'ELO', url: '/elo.png' },
  { title: 'HIPERCARD', url: '/hipercard.png' },
  { title: 'AMEX', url: '/amex.png' }
]

export default function CreditCardDashboard() {
  const { creditCard: CC } = useGetCreditCard()
  const { sumExpenseByCC } = useGetExpensesByCreditCard()

  const creditCard = CC?.map(card => {
    const matched = sumExpenseByCC?.find(res => res.creditCardId === card.id)
    return {
      ...card,
      spending: matched?._sum ?? 0
    }
  })

  return (
    <Card className='relative p-2 row-start-5 col-start-3 row-span-2'>
      <CardHeader>
        <CardTitle>Cartões de crédito</CardTitle>
        <CardDescription>Acompanhamento das faturas</CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className='items-center justify-center'>
        {creditCard?.length === 0 ? (
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
              {creditCard?.map((card, i) => (
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
                      className='w-8 absolute top-3 left-5'
                    />
                    <Image
                      src={
                        cardBrand.find(b => b.title === card?.cardBrand)?.url ??
                        ''
                      }
                      alt='bandeira do cartão de crédito'
                      width={512}
                      height={512}
                      className='w-12 absolute top-2 right-5'
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
                      value={(card.spending / card.creditLimit) * 100}
                    />
                    <div className='flex justify-between items-center pt-1'>
                      <div className='flex flex-col text-sm'>
                        <span className='text-foreground-secondary'>
                          Utilizado
                        </span>
                        <span className='text-base'>
                          {valueFormatter(card.spending)}
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
  )
}
