'use client'
import { queryClient } from '@/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { useExpenseModalStore } from '@/store/modalPostPutStore'
import { CreditCardProps } from '@/modules/creditCard/creditCard.types'

const fetchCreditCard = async (data: CreditCardProps) => {
  const res = await fetch('/api/credit-card', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Falha ao atualizar cartão de crédito')
  return res.json()
}

export const usePutCreditCard = () => {
  const { closeModal } = useExpenseModalStore()

  const { mutate, isPending } = useMutation({
    mutationFn: fetchCreditCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditCard'] })
      closeModal()
    }
  })

  const handlePutCreditCard = async (data: CreditCardProps) => {
    mutate(data)
  }

  return {
    isPending,
    handlePutCreditCard
  }
}
