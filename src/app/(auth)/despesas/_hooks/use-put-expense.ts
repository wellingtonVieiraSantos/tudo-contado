import { queryClient } from '@/lib/query-client'
import { dataExpenseUpdateProps, expenseType } from '@/types/expense-data-props'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const fetchExpense = async (data: dataExpenseUpdateProps) => {
  const res = await fetch('api/expense', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao atualizar despesa')
  return res.json()
}

export const usePutExpense = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] =
    useState<null | dataExpenseUpdateProps>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: fetchExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    }
  })

  const handleUpdateExpense = async (data: expenseType) => {
    if (!selectedExpense) return
    const id = selectedExpense.id
    const dataUpdate = { ...data, id }
    mutate(dataUpdate)
    setIsOpen(false)
  }

  const openUpdateModal = (expense: dataExpenseUpdateProps) => {
    setSelectedExpense(expense)
    setIsOpen(true)
  }

  return {
    isOpen,
    setIsOpen,
    isPending,
    handleUpdateExpense,
    openUpdateModal,
    selectedExpense
  }
}
