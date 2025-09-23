'use client'

import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from '@/types/api-response'
import { creditCardType } from '@/types/creditcard-data-props'

const fetchCreditCard = async () => {
  const response = await fetch('/api/credit-card')
  if (!response.ok) {
    throw new Error('Falha ao buscar cartões')
  }
  return response.json() as Promise<ApiResponse<creditCardType[]>>
}

export const useGetCreditCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['creditCard'],
    queryFn: fetchCreditCard,
    staleTime: Infinity
  })

  return {
    isLoading,
    data,
    error
  }
}
