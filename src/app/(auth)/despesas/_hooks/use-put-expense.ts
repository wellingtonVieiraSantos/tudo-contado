import { queryClient } from '@/lib/query-client'
import { expenseType } from '@/types/expense-data-props'
import { useMutation } from '@tanstack/react-query'

const fetchExpense = async (data: expenseType) => {
  const res = await fetch('/api/expense/', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao atualizar despesa')
  return res.json()
}

export const usePutExpense = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: fetchExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    }
  })

  const handleUpdateExpense = async (data: expenseType) => {
    mutate(data)
  }

  return {
    isPending,
    handleUpdateExpense
  }
}
