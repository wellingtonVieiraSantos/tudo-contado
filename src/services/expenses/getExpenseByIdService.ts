import { findExpenseById } from '@/dal/expenses'
import { requireUser } from '@/lib/require-user'

export const getExpenseByIdService = async (expenseId: string) => {
  await requireUser()
  const rawExpenses = await findExpenseById(expenseId)

  if (!rawExpenses) return

  //normalize value  to show in component, get in centavos, return in reais
  const expenses = {
    ...rawExpenses,
    value: rawExpenses.value / 100,
    date: rawExpenses.date.toISOString().split('T')[0]
  }
  return expenses
}
