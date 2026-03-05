'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import CardsTransactions from './CardsTransactions'
import TableTransactions from './TableTransactions'
import { useGetLastTransactions } from '../../_hooks/use-get-lastTransactions'

export const Transactions = () => {
  const { recentTransactions } = useGetLastTransactions()

  return (
    <>
      <Card className='col-span-3 xl:col-span-2 order-1 lg:order-0'>
        <CardHeader>
          <CardTitle>Movimentações Financeiras</CardTitle>
          <CardDescription>
            Ultimas transações financeiras realizadas
          </CardDescription>
          <Divider />
        </CardHeader>
        <CardContent className=' flex-1'>
          {recentTransactions.length === 0 && (
            <div className='w-full m-auto flex justify-center items-center xl:h-[200px]'>
              <p className='text-foreground-secondary text-center'>
                Nenhuma transação recente...
              </p>
            </div>
          )}
          {recentTransactions.length > 0 && (
            <>
              <TableTransactions recentTransactions={recentTransactions} />
              <CardsTransactions recentTransactions={recentTransactions} />
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}
