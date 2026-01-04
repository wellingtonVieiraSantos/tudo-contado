'use client'
import { useGetCreditCardsDeactivate } from '../_hooks/use-get-creditcards-deactivate'
import { UserBarSettings } from '@/components/UserBarSettings'
import CardCreditFrontInfo from '../_components/CardCreditFrontInfo'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { format } from 'date-fns'
import { usePutCreditCard } from '../_hooks/use-put-creditcard'
import Image from 'next/image'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'

export default function CartaoCreditoDesativado() {
  const { data, isLoading } = useGetCreditCardsDeactivate()
  const { handleRestoreCreditCard } = usePutCreditCard()

  /* if (isLoading) return <Loading /> */

  return (
    <div className='h-full flex flex-col p-3 gap-2'>
      <UserBarSettings title='Cartões Desativados' />
      <div className='grid place-content-center gap-4 flex-1 pb-22 lg:pb-0'>
        {data.length === 0 && (
          <Card className='w-full max-w-3xl lg:w-3xl m-auto flex p-3 justify-center items-center'>
            <CardContent className='items-center gap-3'>
              <Image
                src='/no-data.svg'
                alt='imagem de uma tela com no data'
                width={500}
                height={500}
                className='size-75'
              />
              <CardDescription className='text-center'>
                Você não possui nenhum cartão desativado.
              </CardDescription>
              <Link
                href={'/cartao-credito'}
                className='w-full flex justify-center'
              >
                <Button className='w-full lg:w-xl'>
                  <Undo2 />
                  Voltar
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
        {data.map(card => (
          <div key={card.id} className='grid place-content-center gap-4 flex-1'>
            <CardCreditFrontInfo data={card} />
            <Card className='m-auto w-full max-w-max md:flex p-3'>
              <CardHeader>
                <CardTitle>
                  Data de desativação -{' '}
                  <span className='text-destructive'>
                    {format(card.deletedAt!, 'dd / MM / yyyy')}
                  </span>
                </CardTitle>
                <CardDescription>Quer restaurar esse cartão?</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant='border'
                  className='bg-success/40'
                  onClick={() => handleRestoreCreditCard(card.id)}
                >
                  Reativar cartão
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
