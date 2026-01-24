import { ApiResponse } from '@/types/api-response'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const fetchExpenseSum = async () => {
  const response = await fetch(`api/expense/summary`)
  if (!response.ok) {
    throw new Error('Falha ao buscar soma dos ganhos.')
  }
  return response.json() as Promise<
    ApiResponse<{ month: string; total: number }[]>
  >
}

export const useGetExpenseSumByMonth = () => {
  const { data: response, isLoading } = useSuspenseQuery({
    queryKey: ['expensesSum'],
    queryFn: fetchExpenseSum
  })

  const expenseSum = useMemo(() => response?.data, [response?.data])

  return { isLoading, expenseSum }
}
