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
      <Card className='w-full p-2 xl:h-full'>
        <CardHeader>
          <CardTitle>Gastos</CardTitle>
          <CardDescription>
            Acompanhamento de gastos detalhadamente
          </CardDescription>
          <Divider />
        </CardHeader>
        <CardContent>
          {!expenses.meta.total_items && (
            <Card className='max-w-3xl w-full m-auto flex p-3 justify-center items-center xl:mt-10 '>
              <CardContent className='items-center gap-8'>
                <Image
                  src='/empty-wallet.webp'
                  alt='mao colocando moeda no porquinho'
                  width={300}
                  height={390}
                  className='size-50 grayscale-100'
                />
                <CardDescription className='text-center'>
                  Nenhuma despesa registrada. Que tal adicionar a primeira?
                </CardDescription>
                <Button
                  className='w-full max-w-xl'
                  onClick={() => openModal('POST', null)}
                >
                  <BanknoteArrowUp />
                  Cadastre uma nova despesa
                </Button>
              </CardContent>
            </Card>
          )}
          {expenses.meta.total_items && (
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
