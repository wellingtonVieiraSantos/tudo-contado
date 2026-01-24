import { ApiResponse } from '@/types/api-response'
import { CategoryType, IncomeType, PaymentMethodType } from '@prisma/client'
import { useSuspenseQuery } from '@tanstack/react-query'
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
  const { data: response } = useSuspenseQuery({
    queryKey: ['lastTransactions'],
    queryFn: fetchLastTransactions
  })

  const recentTransactions = useMemo(() => {
    return response?.data
  }, [response?.data])

  return {
    recentTransactions
  }
}
