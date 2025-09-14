'use client'
import { queryClient } from '@/lib/query-client'
import { creditCardType } from '@/types/creditcard-data-props'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

const fetchCreditCard = async (data: creditCardType) => {
  const res = await fetch('api/credit-card', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })

  if (!res.ok) {
    const errBody = await res.json()
    throw new Error(errBody.message || 'Ocorreu um erro ao cadastrar o cartão')
  }
  return res.json()
}

export const usePostCreditCard = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: fetchCreditCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditCard'] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })

  const onSubmit = async (data: creditCardType) => {
    mutate(data)
    setIsOpen(false)
  }

  return { isOpen, setIsOpen, onSubmit, isPending }
}
