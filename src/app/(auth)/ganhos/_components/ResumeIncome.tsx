'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { Plus, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import valueFormatter from '@/lib/valueFormatter'
import { useGetIncomeSumByMonth } from '@/hooks/use-get-income-sum'
import { useIncomeModalStore } from '@/store/modalPostPutStore'

export const ResumeIncome = () => {
  const { incomeSum } = useGetIncomeSumByMonth()
  const { openModal } = useIncomeModalStore()

  const incomeSumActual = incomeSum?.at(-1)?.total ?? null
  return (
    <Card className='w-full p-2'>
      <CardHeader>
        <CardTitle className=' flex items-center gap-3'>
          <TrendingUp className='text-success' size={35} />
          Total de rendimentos
        </CardTitle>
        <CardDescription>Resumo do total de ganhos do mês</CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className='py-3 flex flex-col text-4xl font-montserrat'>
        <p className='text-center tracking-widest'>
          {valueFormatter(incomeSumActual)}
        </p>

        <Button
          className='bg-white rounded-lg text-background absolute right-2 top-2 xl:right-6 xl:top-4 hover:scale-105 hover:bg-button-foreground font-poppins'
          onClick={() => openModal('POST', null)}
        >
          <Plus />
          <span className='hidden sm:block'>Nova Renda</span>
        </Button>
      </CardContent>
    </Card>
  )
}
