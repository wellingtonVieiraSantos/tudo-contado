import { findExpenseById, findExpenses } from '@/dal/expenses'
import { requireUser } from '@/lib/require-user'

export const getExpenseByIdService = async (expenseId: string) => {
  await requireUser()
  const rawExpenses = await findExpenseById(expenseId)

  if (!rawExpenses) return

  //normalize value  to show in component, get in centavos, return in reais
  const expenses = {
    ...rawExpenses,
    value: rawExpenses.value / 100,
    payments: rawExpenses.payments.map(pay => ({
      ...pay,
      amount: pay.amount / 100
    }))
  }
  return expenses
}
