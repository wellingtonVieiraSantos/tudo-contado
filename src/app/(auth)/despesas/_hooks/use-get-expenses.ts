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
  const query = useSuspenseQuery({
    queryKey: ['expenses', filters],
    queryFn: () => fetchExpenses(filters)
  })

  const expenses = useMemo(() => {
    const totalPages = query.data?.data.meta.totalPages ?? 1

    if (query.data?.success && query.data.data.meta.total_items > 0)
      return {
        data: query.data.data.expenses,
        meta: { ...query.data?.data.meta, totalPages }
      }

    return { data: [], meta: { ...query.data?.data.meta, totalPages } }
  }, [query.data?.data])

  return {
    ...query,
    expenses
  }
}
