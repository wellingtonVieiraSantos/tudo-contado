import { ApiResponse } from '@/types/api-response'
import { CategoryType, IncomeType, PaymentMethodType } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const fetchLastTransactions = async () => {
  const response = await fetch('/api/transactions')
  if (!response.ok) {
    throw new Error('Falha ao buscar transações')
  }
  return response.json() as Promise<
    ApiResponse<
      {
        id: string
        value: number
        description: string
        date: string
        type: IncomeType
        category: CategoryType
        method: PaymentMethodType
        transationKind: 'income' | 'expense'
      }[]
    >
  >
}

export const useGetLastTransactions = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['lastTransactions'],
    queryFn: fetchLastTransactions
  })

  /*   const CreditCardData = useMemo(() => {
    return responseCard?.data.map(card => {
      const matched = responseExpensebyCreditCard?.data.find(
        res => res.creditCardId === card.id
      )
      return {
        ...card,
        spending: matched?._sum ?? 0
      }
    })
  }, [responseCard?.data, responseExpensebyCreditCard?.data]) */

  const recentTransactions = useMemo(() => {
    return response?.data
  }, [response?.data])

  return {
    isLoading,
    recentTransactions
  }
}
