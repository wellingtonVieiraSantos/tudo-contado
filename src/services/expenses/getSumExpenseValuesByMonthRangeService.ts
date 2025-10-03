import { findExpensesByMonthRange } from '@/dal/expenses'
import { requireUser } from '@/lib/require-user'

export const getSumExpensesValuesByMonthRangeService = async () => {
  const { id } = await requireUser()

  const expense = await findExpensesByMonthRange(id!)

  const normalizedExpense = expense.map(exp => ({
    ...exp,
    total: exp.total ? exp.total / 100 : 0
  }))

  return normalizedExpense
}
