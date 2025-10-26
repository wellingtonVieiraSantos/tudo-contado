'use client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ExpenseProps } from '@/types/expense-data-props'
import { ApiResponse } from '@/types/api-response'
import { paymentMethodFormatter } from '@/lib/paymentMethodFormatter'

const fetchExpenses = async () => {
  const response = await fetch('/api/expense')
  if (!response.ok) {
    throw new Error('Falha ao buscar despesas')
  }
  return response.json() as Promise<ApiResponse<ExpenseProps[]>>
}

export const useGetExpenses = () => {
  const [filters, setFilters] = useState<{
    month: string
    method: 'all' | 'Crédito' | 'Débito'
  }>({
    month: format(new Date(), "MMMM 'de' yyyy", { locale: ptBR }),
    method: 'all'
  })

  const {
    data: response,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses,
    staleTime: 5 * 60 * 1000
  })

  const months = useMemo(() => {
    const data = response?.data ?? []
    if (!data.length) return []
    return [
      ...new Set(
        data.map(expense =>
          format(expense.date, "MMMM 'de' yyyy", { locale: ptBR })
        )
      )
    ]
  }, [response?.data])

  const filteredExpenses = useMemo(() => {
    const data = response?.data ?? []
    if (!data.length) return []

    const isMonthActive = filters.month !== 'default'
    const isStatusActive = filters.method !== 'all'

    return data.filter(expense => {
      const matchesMonth =
        !isMonthActive ||
        format(expense.date, "MMMM 'de' yyyy", { locale: ptBR }) ===
          filters.month

      const matchesMethod =
        !isStatusActive ||
        paymentMethodFormatter(expense.paymentMethod) === filters.method

      return matchesMonth && matchesMethod
    })
  }, [response?.data, filters])

  const totals = useMemo(() => {
    const total = filteredExpenses.reduce(
      (acc, expense) => acc + Number(expense.value),
      0
    )
    const credit = filteredExpenses
      .filter(expense => expense.paymentMethod === 'CREDIT')
      .reduce((acc, expense) => acc + Number(expense.value), 0)

    const debit = filteredExpenses
      .filter(expense => expense.paymentMethod === 'DEBIT')
      .reduce((acc, expense) => acc + Number(expense.value), 0)

    return { total, credit, debit }
  }, [filteredExpenses])

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return {
    isLoading,
    filteredExpenses,
    months,
    totals,
    filters,
    updateFilters,
    error,
    refetch
  }
}
