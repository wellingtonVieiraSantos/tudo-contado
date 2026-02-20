import { ApiResponse } from '@/types/api-response'
import { CategoryType } from '@prisma/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const fetchSumExpensesByCategory = async () => {
  const response = await fetch(`api/expense/by-category`)
  if (!response.ok) {
    throw new Error('Falha ao buscar soma dos gastos por categoria.')
  }
  return response.json() as Promise<
    ApiResponse<
      {
        _sum: number
        category: CategoryType
      }[]
    >
  >
}

export const useGetSumByCategory = () => {
  const { data: response, isLoading } = useSuspenseQuery({
    queryKey: ['expensesCategory'],
    queryFn: fetchSumExpensesByCategory
  })

  const pieChartData = useMemo(() => response?.data, [response?.data])

  return { pieChartData, isLoading }
}
