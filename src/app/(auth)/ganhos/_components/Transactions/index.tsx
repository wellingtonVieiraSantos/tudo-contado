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
import { ModalDelete } from '@/components/ModalDelete'
import { useSearchParams } from 'next/navigation'
import { useExpenseModalStore } from '@/store/modalPostPutStore'
import { useGetIncomes } from '../../_hooks/use-get-incomes'
import { useDelIncome } from '../../_hooks/use-del-income'
import { ListIncomeQuery } from '@/modules/incomes/incomes.types'

export const Transactions = () => {
  const searchParams = useSearchParams()

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    month: Number(searchParams.get('month')) || undefined,
    year: Number(searchParams.get('year')) || undefined,
    type: (searchParams.get('type') as ListIncomeQuery['type']) || undefined
  }

  const { incomes } = useGetIncomes(filters)
  const { openModal } = useExpenseModalStore()
  const { handleDeleteIncome } = useDelIncome()

  return (
    <>
      <Card className='w-full xl:h-full'>
        <CardHeader>
          <CardTitle>Ganhos</CardTitle>
          <CardDescription>
            Acompanhamento de ganhos detalhadamente
          </CardDescription>
          <Divider />
        </CardHeader>
        <CardContent className=' flex-1'>
          {!incomes.meta.total_items && (
            <div className='h-full flex flex-col items-center justify-center gap-3 p-1'>
              <Image
                src='/empty-wallet.webp'
                alt='mao colocando moeda no porquinho'
                width={300}
                height={390}
                className='size-40 lg:size-50 grayscale-100'
              />
              <p className='text-center text-sm text-foreground-secondary'>
                Nenhuma receita ainda. Vamos registrar sua primeira entrada?
              </p>
              <Button
                className='w-full max-w-lg'
                onClick={() => openModal('POST', null)}
              >
                <BanknoteArrowUp />
                Cadastre um novo ganho
              </Button>
            </div>
          )}
          {incomes.meta.total_items > 0 && (
            <>
              <TableTransactions incomes={incomes} />
              <CardsTransactions incomes={incomes} />
            </>
          )}
        </CardContent>
      </Card>
      <ModalDelete text='Despesa' handleDelete={handleDeleteIncome} />
    </>
  )
}
