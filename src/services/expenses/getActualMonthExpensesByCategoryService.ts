import { findActualMonthExpensesByCategory } from '@/dal/expenses'
import { requireUser } from '@/lib/require-user'
import { endOfMonth, startOfMonth } from 'date-fns'

export const getActualMonthExpensesByCategoryService = async () => {
  const { id } = await requireUser()

  const today = new Date()

  const start = startOfMonth(today)
  const end = endOfMonth(today)

  const expense = await findActualMonthExpensesByCategory(id!, start, end)

  const normalizedExpense = expense.map(exp => ({
    ...exp,
    _sum: exp._sum.value ? exp._sum.value / 100 : 0
  }))

  return normalizedExpense
}
