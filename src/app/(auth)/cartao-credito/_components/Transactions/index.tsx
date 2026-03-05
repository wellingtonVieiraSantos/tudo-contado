'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { useGetCreditCard } from '../../_hooks/use-get-creditcards'
import CardsTransactions from './CardsTransactions'
import TableTransactions from './TableTransactions'

export const Transactions = () => {
  const { creditCard } = useGetCreditCard()

  return (
    <Card className='w-full xl:h-full'>
      <CardHeader>
        <CardTitle>Transações no crédito</CardTitle>
        <CardDescription>
          Ultimas transações financeiras realizadas no crédito
        </CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className=' flex-1'>
        {!creditCard.meta.total_items && (
          <div className='w-full m-auto flex justify-center items-center xl:h-[200px]'>
            <p className='text-foreground-secondary text-center'>
              Nenhuma transação recente...
            </p>
          </div>
        )}
        {creditCard.meta.total_items > 0 && (
          <>
            <TableTransactions />
            <CardsTransactions />
          </>
        )}
      </CardContent>
    </Card>
  )
}
