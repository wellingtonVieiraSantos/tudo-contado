'use client'
import { queryClient } from '@/lib/query-client'
import {
  CreditCardProps,
  CreditCardWithIdProps
} from '@/modules/creditCard/creditCard.types'
import { ApiResponse } from '@/types/api-response'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const fetchCreditCard = async (data: CreditCardProps) => {
  const res = await fetch('/api/credit-card', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!res.ok) {
    const errBody = await res.json()
    throw new Error(errBody.message || 'Ocorreu um erro ao cadastrar o cartão')
  }
  return res.json() as Promise<ApiResponse<CreditCardWithIdProps>>
}

export const usePostCreditCard = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: fetchCreditCard,
    onSuccess: res => {
      toast.success(res.message)
      queryClient.invalidateQueries({ queryKey: ['creditCard'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })

  const onSubmit = async (data: CreditCardProps) => {
    mutate(data)
  }

  return { onSubmit, isPending }
}
