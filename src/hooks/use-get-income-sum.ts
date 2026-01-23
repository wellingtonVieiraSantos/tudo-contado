import { ApiResponse } from '@/types/api-response'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const fetchIncomeSum = async () => {
  const response = await fetch(`api/income/summary`)
  if (!response.ok) {
    throw new Error('Falha ao buscar soma dos ganhos.')
  }
  return response.json() as Promise<
    ApiResponse<{ month: string; total: number }[]>
  >
}

export const useGetIncomeSumByMonth = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['incomesSum'],
    queryFn: fetchIncomeSum
  })

  const incomeSum = useMemo(() => response?.data, [response?.data])

  return { isLoading, incomeSum }
}
