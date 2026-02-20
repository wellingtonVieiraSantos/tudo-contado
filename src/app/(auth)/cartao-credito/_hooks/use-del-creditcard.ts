'use client'
import { queryClient } from '@/lib/query-client'
import { useMutation } from '@tanstack/react-query'

const fetchCreditCard = async (id: string) => {
  const res = await fetch(`/api/credit-card`, {
    method: 'DELETE',
    body: JSON.stringify(id),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao deletar despesa')
  return res.json()
}

export const useDelCreditCard = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: fetchCreditCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditCard'] })
    }
  })

  const handleDeleteCreditCard = async (id: string) => {
    mutate(id)
  }

  return { handleDeleteCreditCard, isPending }
}
