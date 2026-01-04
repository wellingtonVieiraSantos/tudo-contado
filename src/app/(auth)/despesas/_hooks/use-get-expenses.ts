'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse } from '@/types/api-response'
import {
  ExpenseProps,
  ListExpensesQuery
} from '@/modules/expenses/expenses.types'

const fetchExpenses = async (filters: ListExpensesQuery) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, String(value))
  })

  const response = await fetch(`/api/expense?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Falha ao buscar despesas')
  }

  return response.json() as Promise<
    ApiResponse<{ expenses: ExpenseProps[]; qtd: number }>
  >
}

export const useGetExpenses = (filters: ListExpensesQuery) => {
  const {
    data: response,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['expenses', filters],
    queryFn: () => fetchExpenses(filters),
    staleTime: 5 * 60 * 1000
  })

  const expenses = useMemo(() => {
    const qtd = response?.data.qtd || 0

    if (response?.success && qtd > 0)
      return { data: response.data.expenses, qtd }

    return { data: [], qtd }
  }, [response])

  return {
    isLoading,
    expenses,
    error,
    refetch
  }
}
