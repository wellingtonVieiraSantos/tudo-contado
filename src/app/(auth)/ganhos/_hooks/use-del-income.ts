'use client'
import { queryClient } from '@/lib/query-client'
import { useMutation } from '@tanstack/react-query'

const fetchIncome = async (id: string) => {
  const res = await fetch(`api/income?id=${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao deletar rendimento')
  return res.json()
}

export const useDelIncome = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: fetchIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
    }
  })

  const handleDeleteIncome = async (id: string) => {
    mutate(id)
  }

  return { handleDeleteIncome, isPending }
}
