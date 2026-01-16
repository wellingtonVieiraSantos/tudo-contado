'use client'

import { ListExpensesQueryDTO } from '@/modules/expenses/expenses.types'
import {
  IncomeProps,
  ListIncomeQueryDTO
} from '@/modules/incomes/incomes.types'
import { ApiResponse } from '@/types/api-response'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const fetchIncomes = async (filters: ListIncomeQueryDTO) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, String(value))
  })

  const response = await fetch(`api/income?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Falha ao buscar Rendimentos')
  }
  return response.json() as Promise<
    ApiResponse<{
      incomes: IncomeProps[]
      meta: {
        total_items: number
        page: number
        limit: number
        totalPages: number
      }
    }>
  >
}

export const useGetIncomes = (filters: ListExpensesQueryDTO) => {
  const {
    data: response,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['incomes', filters],
    queryFn: () => fetchIncomes(filters),
    staleTime: 5 * 60 * 1000
  })

  const incomes = useMemo(() => {
    const totalPages = response?.data.meta.totalPages ?? 1

    if (response?.success && response.data.meta.total_items > 0)
      return {
        data: response.data.incomes,
        meta: { ...response?.data.meta, totalPages }
      }

    return { data: [], meta: { ...response?.data.meta, totalPages } }
  }, [response])

  return {
    isLoading,
    incomes,
    error,
    refetch
  }
}
