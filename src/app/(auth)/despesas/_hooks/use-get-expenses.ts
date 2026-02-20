'use client'

import { useMemo } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ApiResponse } from '@/types/api-response'
import {
  ExpenseWithIdProps,
  ListExpensesQueryDTO
} from '@/modules/expenses/expenses.types'

const fetchExpenses = async (filters: ListExpensesQueryDTO) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, String(value))
  })

  const response = await fetch(`/api/expense?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Falha ao buscar despesas')
  }

  return response.json() as Promise<
    ApiResponse<{
      expenses: ExpenseWithIdProps[]
      meta: {
        total_items: number
        page: number
        limit: number
        totalPages: number
      }
    }>
  >
}

export const useGetExpenses = (filters: ListExpensesQueryDTO) => {
  const {
    data: response,
    isLoading,
    error,
    refetch
  } = useSuspenseQuery({
    queryKey: ['expenses', filters],
    queryFn: () => fetchExpenses(filters)
  })

  const expenses = useMemo(() => {
    const totalPages = response?.data.meta.totalPages ?? 1

    if (response?.success && response.data.meta.total_items > 0)
      return {
        data: response.data.expenses,
        meta: { ...response?.data.meta, totalPages }
      }

    return { data: [], meta: { ...response?.data.meta, totalPages } }
  }, [response])

  return {
    isLoading,
    expenses,
    error,
    refetch
  }
}
