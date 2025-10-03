import { findExpensesByMonthRange } from '@/dal/expenses'
import { requireUser } from '@/lib/require-user'
import { subMonths } from 'date-fns'

export const getSumExpensesValuesByMonthRangeService = async (
  qtdMonth: number
) => {
  const { id } = await requireUser()

  const monthRange = subMonths(new Date(), qtdMonth)

  const expense = await findExpensesByMonthRange(id!, monthRange)

  const normalizedExpense = expense.map(exp => ({
    ...exp,
    total: exp.total ? exp.total / 100 : 0
  }))

  return normalizedExpense
}
