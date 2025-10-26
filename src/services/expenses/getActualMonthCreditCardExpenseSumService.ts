import { findActualMonthCreditCardExpenseSum } from '@/dal/expenses'
import { requireUser } from '@/lib/require-user'
import { endOfMonth, startOfMonth } from 'date-fns'

export const getActualMonthCreditCardExpenseSumService = async () => {
  const { id } = await requireUser()

  const today = new Date()

  const start = startOfMonth(today)
  const end = endOfMonth(today)

  const creditCard = await findActualMonthCreditCardExpenseSum(id!, start, end)

  const normalizedExpense = creditCard.map(exp => ({
    ...exp,
    _sum: exp._sum.value ? exp._sum.value / 100 : 0
  }))

  return normalizedExpense
}
