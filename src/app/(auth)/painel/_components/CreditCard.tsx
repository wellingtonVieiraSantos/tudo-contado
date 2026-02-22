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
import Link from 'next/link'

export const cardBrand = [
  { title: 'VISA', url: '/visa.svg' },
  { title: 'MASTERCARD', url: '/mastercard.svg' },
  { title: 'ELO', url: '/elo.svg' },
  { title: 'HIPERCARD', url: '/hipercard.svg' },
  { title: 'AMEX', url: '/amex.svg' },
  { title: 'OTHER', url: '/other.svg' }
]

export default function CreditCardDashboard() {
  const { creditCard: CC } = useGetCreditCard()
  const { sumExpenseByCC } = useGetExpensesByCreditCard()

  if (!CC) return

  const creditCard = CC.cards.map(card => {
    const spending =
      sumExpenseByCC.find(expense => expense.creditCardId === card.id)?._sum ||
      0
    return {
      ...card,
      spending
    }
  })

  return (
    <Card className='relative p-2 xl:row-start-5 xl:col-start-3 xl:row-span-2'>
      <CardHeader>
        <CardTitle>Cartões de crédito</CardTitle>
        <CardDescription>Acompanhamento das faturas</CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className='items-center justify-center'>
        {!CC?.meta.total_items ? (
          <div className='flex flex-col gap-13 items-center text-center  pt-8'>
            <p className='text-foreground-secondary'>
              Nenhum cartão de crédito cadastrado...
            </p>
            <Link href='/cartao-credito'>
              <Button type='button'>
                <CreditCard />
                Cadastrar novo cartão
              </Button>
            </Link>
          </div>
        ) : (
          <Carousel>
            <CarouselContent>
              {creditCard.map((card, i) => (
                <CarouselItem
                  key={card.id}
                  className='flex flex-col items-center gap-3 cursor-pointer'
                >
                  <div
                    className={`relative m-auto w-full max-w-max h-45 aspect-video rounded-xl bg-radial from-sky-800 border border-disabled`}
                  >
                    <Image
                      src={'/chip.png'}
                      alt='chip cartão de crédito'
                      width={512}
                      height={512}
                      className='w-10 absolute top-9 left-8'
                    />
                    <Image
                      src={
                        cardBrand.find(b => b.title === card?.cardBrand)?.url ??
                        cardBrand.find(b => b.title === 'OTHER')!.url
                      }
                      alt='bandeira do cartão de crédito'
                      width={512}
                      height={512}
                      className='w-16 absolute top-3 right-5'
                    />
                    <div className='text-xl lg:text-base xl:text-xl absolute bottom-16 left-9 font-mono tracking-wider'>
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
