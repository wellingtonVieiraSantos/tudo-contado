'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ApiResponse } from '@/types/api-response'
import {
  CreditCardWithExpensesProps,
  CreditCardWithIdProps
} from '@/modules/creditCard/creditCard.types'
import { useMemo } from 'react'

const fetchCreditCard = async () => {
  const response = await fetch('/api/credit-card')
  if (!response.ok) {
    throw new Error('Falha ao buscar cartões')
  }
  return response.json() as Promise<
    ApiResponse<{
      data: CreditCardWithExpensesProps[]
      meta: {
        total_items: number
        page: number
        limit: number
        totalPages: number
      }
    }>
  >
}

export const useGetCreditCard = () => {
  const query = useSuspenseQuery({
    queryKey: ['creditCard'],
    queryFn: fetchCreditCard
  })

  const creditCard = useMemo(() => {
    return {
      cards: query.data.data.data ?? [],
      meta: query.data?.data.meta
    }
  }, [query.data?.data])

  const lastCreditTransactions = useMemo(() => {
    return creditCard.cards.flatMap(card =>
      card.expense.slice(0, 3).map(expense => ({
        ...expense,
        lastNumber: card.lastNumber
      }))
    )
  }, [creditCard.cards])

  console.log(lastCreditTransactions)

  return {
    ...query,
    creditCard,
    lastCreditTransactions
  }
}
