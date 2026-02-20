'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ApiResponse } from '@/types/api-response'
import { CreditCardProps } from '@/modules/creditCard/creditCard.types'
import { useMemo } from 'react'

const fetchCreditcard = async (id: string) => {
  const response = await fetch(`/api/credit-card/${id}`)
  if (!response.ok) {
    throw new Error('Falha ao buscar o cartão de crédito')
  }
  return response.json() as Promise<ApiResponse<CreditCardProps>>
}

export const useGetCreditcardById = (id: string) => {
  const {
    data: response,
    isLoading,
    error
  } = useSuspenseQuery({
    queryKey: ['creditCardById', id],
    queryFn: () => fetchCreditcard(id)
  })

  const data = useMemo(() => {
    return response?.data
  }, [response?.data])

  return {
    isLoading,
    data,
    error
  }
}
