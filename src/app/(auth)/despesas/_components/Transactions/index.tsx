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
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { BanknoteArrowUp } from 'lucide-react'
import { useGetExpenses } from '../../_hooks/use-get-expenses'
import { ModalDelete } from '@/components/ModalDelete'
import { useSearchParams } from 'next/navigation'
import { ListExpensesQuery } from '@/modules/expenses/expenses.types'
import { useDelExpense } from '../../_hooks/use-del-expense'
import { useExpenseModalStore } from '@/store/modalPostPutStore'

export const Transactions = () => {
  const searchParams = useSearchParams()

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    month: Number(searchParams.get('month')) || undefined,
    year: Number(searchParams.get('year')) || undefined,
    method:
      (searchParams.get('method') as ListExpensesQuery['method']) || undefined,
    category:
      (searchParams.get('category') as ListExpensesQuery['category']) ||
      undefined
  }

  const { expenses } = useGetExpenses(filters)
  const { openModal } = useExpenseModalStore()
  const { handleDeleteExpense } = useDelExpense()

  return (
    <>
      <Card className='w-full xl:h-full'>
        <CardHeader>
          <CardTitle>Gastos</CardTitle>
          <CardDescription>
            Acompanhamento de gastos detalhadamente
          </CardDescription>
          <Divider />
        </CardHeader>
        <CardContent className=' flex-1'>
          {!expenses.meta.total_items && (
            <div className='h-full flex flex-col items-center justify-center gap-3 p-1'>
              <Image
                src='/empty-wallet.webp'
                alt='mao colocando moeda no porquinho'
                width={300}
                height={390}
                className='size-40 lg:size-50 grayscale-100'
              />
              <p className='text-center text-sm text-foreground-secondary'>
                Nenhuma despesa registrada. Que tal adicionar a primeira?
              </p>
              <Button
                className='w-full max-w-lg'
                onClick={() => openModal('POST', null)}
              >
                <BanknoteArrowUp />
                Cadastre uma nova despesa
              </Button>
            </div>
          )}
          {expenses.meta.total_items > 0 && (
            <>
              <TableTransactions expenses={expenses} />
              <CardsTransactions expenses={expenses} />
            </>
          )}
        </CardContent>
      </Card>
      <ModalDelete text='Despesa' handleDelete={handleDeleteExpense} />
    </>
  )
}
