import { ApiResponse } from '@/types/api-response'
import { IncomeProps } from '@/types/income-data-props'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMemo, useState } from 'react'

const fetchIncomes = async () => {
  const response = await fetch('api/income')
  if (!response.ok) {
    throw new Error('Falha ao buscar Rendimentos')
  }
  return response.json() as Promise<ApiResponse<IncomeProps[]>>
}

export const useGetIncomes = () => {
  const [filters, setFilters] = useState({
    month: format(new Date(), "MMMM 'de' yyyy", { locale: ptBR })
  })

  const {
    data: response,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['incomes'],
    queryFn: fetchIncomes,
    staleTime: 5 * 60 * 1000
  })

  const months = useMemo(() => {
    const data = response?.data ?? []
    if (!data.length) return []
    return [
      ...new Set(
        data.map(income =>
          format(income.date, "MMMM 'de' yyyy", { locale: ptBR })
        )
      )
    ]
  }, [response?.data])

  const filteredIncomes = useMemo(() => {
    const data = response?.data ?? []
    if (!data.length) return []

    const isMonthActive = filters.month !== 'default'

    return data.filter(income => {
      const matchesMonth =
        !isMonthActive ||
        format(income.date, "MMMM 'de' yyyy", { locale: ptBR }) ===
          filters.month
      return matchesMonth
    })
  }, [filters.month, response?.data])

  const totals = useMemo(() => {
    return filteredIncomes.reduce(
      (acc, income) => acc + Number(income.value),
      0
    )
  }, [filteredIncomes])

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return {
    isLoading,
    filteredIncomes,
    months,
    totals,
    filters,
    updateFilters,
    error,
    refetch
  }
}
