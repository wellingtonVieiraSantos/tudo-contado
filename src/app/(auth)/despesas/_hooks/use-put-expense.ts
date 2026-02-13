'use client'
import { queryClient } from '@/lib/query-client'
import { ExpenseProps } from '@/modules/expenses/expenses.types'
import { useMutation } from '@tanstack/react-query'
import { useExpenseModalStore } from '@/store/modalPostPutStore'

const fetchExpense = async (data: ExpenseProps) => {
  const res = await fetch('/api/expense/', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao atualizar despesa')
  return res.json()
}

export const usePutExpense = () => {
  const { closeModal } = useExpenseModalStore()

  const { mutate, isPending } = useMutation({
    mutationFn: fetchExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      closeModal()
    }
  })

  const handlePutExpense = async (data: ExpenseProps) => {
    mutate(data)
  }

  return {
    isPending,
    handlePutExpense
  }
}
