import { CreditCardWithIdProps } from '@/modules/creditCard/creditCard.types'
import { ApiResponse } from '@/types/api-response'
import { CategoryType, IncomeType, PaymentMethodType } from '@prisma/client'
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

const fetchCreditCard = async () => {
  const response = await fetch('/api/credit-card')
  if (!response.ok) {
    throw new Error('Falha ao buscar cartões')
  }
  return response.json() as Promise<ApiResponse<CreditCardWithIdProps[]>>
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
        date: string
        type: IncomeType
        category: CategoryType
        method: PaymentMethodType
        transationKind: 'income' | 'expense'
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

  const { data: responseExpensebyCreditCard } = useQuery({
    queryKey: ['sumExpensesByCreditCard'],
    queryFn: fetchSumExpensesByCreditCard
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
      const matched = responseExpensebyCreditCard?.data.find(
        res => res.creditCardId === card.id
      )
      return {
        ...card,
        spending: matched?._sum ?? 0
      }
    })
  }, [responseCard?.data, responseExpensebyCreditCard?.data])

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
