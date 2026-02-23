'use client'
import { Button } from '@/components/ui/Button'
import { CardTitle, CardDescription } from '@/components/ui/Card'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { Plus } from 'lucide-react'
import { useCreditCardModalStore } from '@/store/modalPostPutStore'
import { useGetExpensesByCreditCard } from '../../despesas/_hooks/use-get-expense-by-creditCard'
import valueFormatter from '@/lib/valueFormatter'

export const ResumeCardCredit = () => {
  const { sumExpenseByCC } = useGetExpensesByCreditCard()
  const { openModal } = useCreditCardModalStore()

  const usedLimit =
    sumExpenseByCC?.reduce((acc, curr) => acc + curr._sum, 0) ?? 0

  return (
    <Card className='w-full p-2'>
      <CardHeader>
        <CardTitle className=' flex items-center gap-3'>
          Gastos no cartão de crédito
        </CardTitle>
        <CardDescription className='pt-2'>
          Resumo do total de gastos nos cartões no mês
        </CardDescription>
        <Divider />
      </CardHeader>
      <CardContent className='py-3 flex flex-col text-4xl font-montserrat'>
        <p className='text-center tracking-widest'>
          {valueFormatter(usedLimit)}
        </p>
        <Button
          onClick={() => openModal('POST', null)}
          className='bg-white rounded-lg text-background absolute right-2 top-2 xl:right-6 xl:top-4 hover:scale-105 hover:bg-button-foreground font-poppins'
        >
          <Plus />
          <span className='hidden xl:block'>Novo Cartão</span>
        </Button>
      </CardContent>
    </Card>
  )
}
