import { queryClient } from '@/lib/query-client'
import { expenseType } from '@/types/expense-data-props'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const fetchExpense = async (id: string) => {
  const res = await fetch(`api/expense?id=${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao deletar despesa')
  return res.json()
}

export const useDelExpense = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<null | expenseType>(
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

  const openDeleteModal = (expense: expenseType) => {
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
