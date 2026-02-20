'use client'
import { queryClient } from '@/lib/query-client'
import { useMutation } from '@tanstack/react-query'

const fetchExpense = async (id: string) => {
  const res = await fetch(`/api/expense`, {
    method: 'DELETE',
    body: JSON.stringify(id),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao deletar despesa')
  return res.json()
}

export const useDelExpense = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: fetchExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    }
  })

  const handleDeleteExpense = async (id: string) => {
    mutate(id)
  }

  return { handleDeleteExpense, isPending }
}
