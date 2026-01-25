'use client'
import { queryClient } from '@/lib/query-client'
import { IncomeProps } from '@/modules/incomes/incomes.types'
import { useMutation } from '@tanstack/react-query'

const fetchIncome = async (data: IncomeProps) => {
  const res = await fetch('api/income', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao atualizar rendimento')
  return res.json()
}

export const usePutIncome = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: fetchIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    }
  })

  const handlePutIncome = async (data: IncomeProps) => {
    mutate(data)
  }

  return { isPending, handlePutIncome }
}
