'use client'

import { useQuery } from '@tanstack/react-query'
import { expenseType } from '@/types/expense-data-props'
import { ApiResponse } from '@/types/api-response'

const fetchExpense = async (id: string) => {
  const response = await fetch(`/api/expense/${id}`)
  if (!response.ok) {
    throw new Error('Falha ao buscar a despesa')
  }
  return response.json() as Promise<ApiResponse<expenseType>>
}

export const useGetExpenseById = (id: string) => {
  const {
    data: response,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['expenseById', id],
    queryFn: () => fetchExpense(id)
  })

  const data = response?.data

  return {
    isLoading,
    data,
    error,
    refetch
  }
}
