'use client'
import { queryClient } from '@/lib/query-client'
import { useMutation } from '@tanstack/react-query'

const fetchCreditCard = async (id: string) => {
  const res = await fetch(`/api/credit-card/${id}/deactivate`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao desativar cartão de crédito')
  return res.json()
}

export const useDeactivateCreditCard = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: fetchCreditCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditCard'] })
    }
  })

  const handleDeactivateCreditCard = async (id: string) => {
    mutate(id)
  }

  return { handleDeactivateCreditCard, isPending }
}
