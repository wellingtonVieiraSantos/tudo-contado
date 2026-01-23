import { ApiResponse } from '@/types/api-response'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const fetchSumExpensesByCreditCard = async () => {
  const response = await fetch(`api/expense/by-creditcard`)
  if (!response.ok) {
    throw new Error('Falha ao buscar soma dos gastos por cartão de crédito.')
  }
  return response.json() as Promise<
    ApiResponse<
      {
        _sum: number
        creditCardId: string | null
      }[]
    >
  >
}

export const useGetExpensesByCreditCard = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ['sumExpensesByCreditCard'],
    queryFn: fetchSumExpensesByCreditCard
  })

  const sumExpenseByCC = useMemo(() => {
    return response?.data
  }, [response?.data])

  return { sumExpenseByCC, isLoading }
}
