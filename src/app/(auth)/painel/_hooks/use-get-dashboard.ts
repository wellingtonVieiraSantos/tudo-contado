import { CateroryTypeRenamed } from '@/lib/categoryFormatter'
import { months } from '@/lib/dashboardMonths'
import { dataFormatter } from '@/lib/dataFormatter'
import { ApiResponse } from '@/types/api-response'
import { dashboardDataProps } from '@/types/dashboard-data-props'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const fetchDashboard = async () => {
  const response = await fetch('api/dashboard')
  if (!response.ok) {
    throw new Error('Falha ao buscar Rendimentos')
  }
  return response.json() as Promise<ApiResponse<dashboardDataProps>>
}

export const useGetDashboard = () => {
  const {
    data: response,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard
  })

  const recentTransactions = useMemo(() => {
    const incomeArray =
      response?.data?.income.map(i => {
        return {
          id: i.id,
          value: i.value,
          description: i.description,
          date: i.date,
          type: 'income' as const
        }
      }) || []
    const expenseArray =
      response?.data?.expense.map(e => {
        return {
          id: e.id,
          value: e.value,
          category: e.category,
          description: e.description,
          date: e.date,
          dueDate: e.dueDate,
          paymentMethod: e.paymentMethod,
          creditCardId: e.creditCardId,
          installments: e.installments,
          status: e.status,
          type: 'expense' as const
        }
      }) || []
    return [...incomeArray, ...expenseArray]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((_arr, i) => {
        return i < 10
      })
  }, [response?.data])

  const totalIncomeCurrent = useMemo(() => {
    return (
      response?.data?.income
        .filter(e => dataFormatter(e.date) === dataFormatter(new Date()))
        .map(i => i.value)
        .reduce((acc, current) => acc + current, 0) || 0
    )
  }, [response?.data?.income])

  const totalExpenseCurrent = useMemo(() => {
    return (
      response?.data?.expense
        .filter(e => dataFormatter(e.date) === dataFormatter(new Date()))
        .map(i => i.value)
        .reduce((acc, current) => acc + current, 0) || 0
    )
  }, [response?.data?.expense])

  const lineChartData = useMemo(() => {
    return months.map(month => {
      const incomeAmountPerMonth =
        response?.data?.income
          .filter(i => dataFormatter(i.date) === month)
          .reduce((acc, curr) => acc + Number(curr.value), 0) || null

      const expenseAmountPerMonth =
        response?.data?.expense
          .filter(e => dataFormatter(e.date) === month)
          .reduce((acc, curr) => acc + Number(curr.value), 0) || null

      return { incomeAmountPerMonth, expenseAmountPerMonth }
    })
  }, [response?.data])

  const pieChartData = useMemo(() => {
    const expenseAmounthPerCategory = Object.values(
      CateroryTypeRenamed
    ).flatMap((label, i) => {
      const value =
        response?.data?.expense
          .filter(e => label === e.category)
          .reduce((acc, curr) => acc + Number(curr.value), 0) || null
      return value ? [{ id: i, value, label }] : []
    })

    const total = expenseAmounthPerCategory
      .map(e => e.value)
      .reduce((curr, acc) => acc + Number(curr), 0)

    return { expenseAmounthPerCategory, total }
  }, [response?.data?.expense])

  const CreditCardData = useMemo(() => {
    const creditCard = response?.data?.creditCard

    return { creditCard }
  }, [response?.data?.creditCard])

  return {
    response,
    totalExpenseCurrent,
    totalIncomeCurrent,
    lineChartData,
    pieChartData,
    recentTransactions,
    CreditCardData,
    isLoading,
    error,
    refetch
  }
}
