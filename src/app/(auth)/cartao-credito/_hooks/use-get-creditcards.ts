'use client'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from '@/types/api-response'
import { CreditCardProps } from '@/modules/creditCard/creditCard.types'
import { useMemo } from 'react'

const fetchCreditCard = async () => {
  const response = await fetch('/api/credit-card')
  if (!response.ok) {
    throw new Error('Falha ao buscar cartões')
  }
  return response.json() as Promise<ApiResponse<CreditCardProps[]>>
}

export const useGetCreditCard = () => {
  const {
    data: response,
    isLoading,
    error
  } = useQuery({
    queryKey: ['creditCard'],
    queryFn: fetchCreditCard,
    staleTime: Infinity
  })

  const creditCard = useMemo(() => {
    return response?.data
  }, [response?.data])

  return {
    isLoading,
    creditCard,
    error
  }
}
