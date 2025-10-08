'use client'

import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from '@/types/api-response'
import { creditCardType } from '@/types/creditcard-data-props'

const fetchCreditcard = async (id: string) => {
  const response = await fetch(`/api/credit-card/${id}`)
  if (!response.ok) {
    throw new Error('Falha ao buscar o cartão de crédito')
  }
  return response.json() as Promise<ApiResponse<creditCardType>>
}

export const useGetCreditcardById = (id?: string) => {
  const {
    data: response,
    isLoading,
    error
  } = useQuery({
    queryKey: ['expenseById', id],
    queryFn: () => fetchCreditcard(id as string),
    enabled: !!id
  })

  const data = response?.data

  return {
    isLoading,
    data,
    error
  }
}
