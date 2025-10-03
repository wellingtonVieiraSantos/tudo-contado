import { ApiResponse } from '@/types/api-response'
import { creditCardType } from '@/types/creditcard-data-props'
import { CategoryType, StatusType } from '@prisma/client'
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

const fetchCreditCard = async () => {
  const response = await fetch('/api/credit-card')
  if (!response.ok) {
    throw new Error('Falha ao buscar cartões')
  }
  return response.json() as Promise<ApiResponse<creditCardType[]>>
}
const fetchLastTransactions = async () => {
  const response = await fetch('/api/transactions')
  if (!response.ok) {
    throw new Error('Falha ao buscar transações')
  }
  return response.json() as Promise<
    ApiResponse<
      {
        id: string
        value: number
        description: string
        date: Date
        category: CategoryType
        status: StatusType
        type: 'income' | 'expense'
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

  const { data: responseCard } = useQuery({
    queryKey: ['creditCard'],
    queryFn: fetchCreditCard
  })

  const { data: responseTransactions } = useQuery({
    queryKey: ['lastTransactions'],
    queryFn: fetchLastTransactions
  })

  const sumExpenseActualMonth = useMemo(
    () => responseExpense?.data?.at(-1)?.total ?? 0,
    [responseExpense?.data]
  )

  const sumIncomeActualMonth = useMemo(
    () => responseIncome?.data?.at(-1)?.total ?? 0,
    [responseIncome?.data]
  )

  const lineChartData = useMemo(() => {
    const expenseAmountPerMonth = responseExpense?.data.map(exp => exp.total)
    const incomeAmountPerMonth = responseIncome?.data.map(inc => inc.total)

    return { incomeAmountPerMonth, expenseAmountPerMonth }
  }, [responseExpense?.data, responseIncome?.data])

  const pieChartData = useMemo(() => {
    return responseExpensebyCategory?.data
  }, [responseExpensebyCategory?.data])

  const CreditCardData = useMemo(() => {
    return responseCard?.data.map(card => {
      return {
        ...card,
        creditLimit: card.creditLimit / 100,
        amount: card.payment.reduce(
          (acc, current) => acc + current.amount,
          0
        ) as number
      }
    })
  }, [responseCard?.data])

  const recentTransactions = useMemo(() => {
    return responseTransactions?.data
  }, [responseTransactions?.data])

  return {
    sumExpenseActualMonth,
    sumIncomeActualMonth,
    isLoading,
    lineChartData,
    pieChartData,
    CreditCardData,
    recentTransactions
  }
}
