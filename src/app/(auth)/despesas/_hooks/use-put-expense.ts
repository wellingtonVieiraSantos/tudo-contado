import { queryClient } from '@/lib/query-client'
import { ApiResponse } from '@/types/api-response'
import { ExpenseProps } from '@/types/expense-data-props'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const fetchExpense = async (data: ExpenseProps) => {
  const res = await fetch('/api/expense/', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao atualizar despesa')
  return res.json() as Promise<ApiResponse<ExpenseProps>>
}

export const usePutExpense = () => {
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: fetchExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      router.replace('/despesas')
    }
  })

  const handleUpdateExpense = async (data: ExpenseProps) => {
    mutate(data)
  }

  return {
    isPending,
    handleUpdateExpense
  }
}
