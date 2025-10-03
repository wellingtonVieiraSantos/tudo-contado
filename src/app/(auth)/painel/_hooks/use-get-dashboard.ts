import { CateroryTypeRenamed } from '@/lib/categoryFormatter'
import { ApiResponse } from '@/types/api-response'
import { CategoryType } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const fetchSumExpenses = async () => {
  const response = await fetch(`api/expense/summary`)
  if (!response.ok) {
    throw new Error('Falha ao buscar soma dos gastos.')
  }
  return response.json() as Promise<
    ApiResponse<{ month: Date; total: number }[]>
  >
}

const fetchSumIncomes = async () => {
  const response = await fetch(`api/income/summary`)
  if (!response.ok) {
    throw new Error('Falha ao buscar soma dos ganhos.')
  }
  return response.json() as Promise<
    ApiResponse<{ month: Date; total: number }[]>
  >
}

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

export const useGetDashboard = () => {
  const { data: responseExpense, isLoading } = useQuery({
    queryKey: ['sumExpensesByMonth'],
    queryFn: fetchSumExpenses
  })

  const { data: responseExpensebyCategory } = useQuery({
    queryKey: ['sumExpensesByCategory'],
    queryFn: fetchSumExpensesByCategory
  })

  const { data: responseIncome } = useQuery({
    queryKey: ['sumIncomeByMonth'],
    queryFn: fetchSumIncomes
  })

  const sumExpenseActualMonth = useMemo(() => {
    return responseExpense!.data[responseExpense!.data.length - 1].total
  }, [responseExpense?.data[1]?.total])

  const sumIncomeActualMonth = useMemo(() => {
    return responseIncome!.data[responseIncome!.data.length - 1].total
  }, [responseIncome?.data[1]?.total])

  const lineChartData = useMemo(() => {
    const expenseAmountPerMonth = responseExpense!.data.map(exp => exp.total)
    const incomeAmountPerMonth = responseIncome!.data.map(inc => inc.total)

    return { incomeAmountPerMonth, expenseAmountPerMonth }
  }, [responseExpense?.data, responseIncome?.data])

  const pieChartData = useMemo(() => {
    return responseExpensebyCategory!.data
  }, [responseExpensebyCategory?.data])

  return {
    sumExpenseActualMonth,
    sumIncomeActualMonth,
    isLoading,
    lineChartData,
    pieChartData
  }

  /* const recentTransactions = useMemo(() => {
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
  } */
}
