'use client'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from '@/types/api-response'
import { CreditCardDeactivateProps } from '@/types/creditcard-data-props'
import { useMemo } from 'react'

const fetchCreditCard = async () => {
  const response = await fetch('/api/credit-card/deactivates')
  if (!response.ok) {
    throw new Error('Falha ao buscar cartões desativados')
  }
  return response.json() as Promise<ApiResponse<CreditCardDeactivateProps[]>>
}

export const useGetCreditCardsDeactivate = () => {
  const {
    data: response,
    isLoading,
    error
  } = useQuery({
    queryKey: ['creditCardDeactivate'],
    queryFn: fetchCreditCard,
    staleTime: Infinity
  })

  const data = useMemo(() => {
    return response?.data ?? []
  }, [response?.data])

  return {
    isLoading,
    data,
    error
  }
}
