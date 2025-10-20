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
    expenseDate: rawExpenses.expenseDate.toISOString().split('T')[0],
    dueDate:
      rawExpenses.dueDate && rawExpenses.dueDate.toISOString().split('T')[0],
    payments: rawExpenses.payments.map(pay => ({
      ...pay,
      amount: pay.amount / 100,
      paidAt: pay.paidAt.toISOString().split('T')[0]
    }))
  }
  return expenses
}
