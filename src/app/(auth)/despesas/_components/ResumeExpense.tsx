'use client'
import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { useGetExpenseSumByMonth } from '@/hooks/use-get-expense-sum'
import valueFormatter from '@/lib/valueFormatter'
import { Plus, TrendingDown } from 'lucide-react'
import { useExpenseModalStore } from '@/store/modalPostPutStore'
export const ResumeExpense = () => {
  const { expenseSum } = useGetExpenseSumByMonth()
  const { openModal } = useExpenseModalStore()

  const expenseSumActual = expenseSum?.at(-1)?.total ?? null
  return (
    <Card className='w-full p-2'>
      <CardHeader>
        <CardTitle className=' flex items-center gap-3'>
          <TrendingDown className='text-destructive' size={35} />
          Total de Despesas
        </CardTitle>
        <CardDescription>Resumo do total de despesas mensal</CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className='py-3 flex flex-col text-4xl font-montserrat'>
        <p className='text-center tracking-widest'>
          {valueFormatter(expenseSumActual)}
        </p>
        <Button
          onClick={() => openModal('POST', null)}
          className='bg-white rounded-lg text-background absolute right-2 top-2 xl:right-6 xl:top-4 hover:scale-105 hover:bg-button-foreground font-poppins'
        >
          <Plus />
          <span className='hidden xl:block'>Nova Despesa</span>
        </Button>
      </CardContent>
    </Card>
  )
}
