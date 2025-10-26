import { queryClient } from '@/lib/query-client'
import { ApiResponse } from '@/types/api-response'
import { ExpenseProps } from '@/types/expense-data-props'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const fetchExpense = async (id: string) => {
  const res = await fetch(`/api/expense?id=${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao deletar despesa')
  return res.json() as Promise<ApiResponse<ExpenseProps>>
}

export const useDelExpense = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<null | ExpenseProps>(
    null
  )

  const { mutate, isPending } = useMutation({
    mutationFn: fetchExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    }
  })

  const handleDeleteExpense = async (id: string) => {
    mutate(id)
    setIsOpen(false)
  }

  const openDeleteModal = (expense: ExpenseProps) => {
    setSelectedExpense(expense)
    setIsOpen(true)
  }

  return {
    isOpen,
    setIsOpen,
    handleDeleteExpense,
    isPending,
    openDeleteModal,
    selectedExpense
  }
}
