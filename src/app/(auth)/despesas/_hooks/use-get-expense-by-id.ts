'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { ApiResponse } from '@/types/api-response'
import { useMemo } from 'react'
import { ExpenseProps } from '@/modules/expenses/expenses.types'

const fetchExpense = async (id: string) => {
  const response = await fetch(`/api/expense/${id}`)
  if (!response.ok) {
    throw new Error('Falha ao buscar a despesa')
  }
  return response.json() as Promise<ApiResponse<ExpenseProps>>
}

export const useGetExpenseById = (id: string) => {
  const {
    data: response,
    isLoading,
    error,
    refetch
  } = useSuspenseQuery({
    queryKey: ['expenseById', id],
    queryFn: () => fetchExpense(id)
  })

  const data = useMemo(() => {
    return response?.data
  }, [response?.data])

  return {
    isLoading,
    data,
    error,
    refetch
  }
}
