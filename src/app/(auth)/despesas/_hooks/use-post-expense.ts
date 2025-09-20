import { queryClient } from '@/lib/query-client'
import { expenseType } from '@/types/expense-data-props'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const fetchExpense = async (data: expenseType) => {
  const res = await fetch('/api/expense', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao cadastrar despesa')
  return res.json()
}

export const usePostExpense = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: fetchExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    }
  })

  const onSubmit = async (data: expenseType) => {
    mutate(data)
  }

  return { onSubmit, isPending }
}
