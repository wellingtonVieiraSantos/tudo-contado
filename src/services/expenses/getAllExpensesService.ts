import { findExpenses } from '@/dal/expenses'
import { requireUser } from '@/lib/require-user'

export const getAllExpensesService = async () => {
  const user = await requireUser()
  const rawExpenses = await findExpenses(user.id!)

  //normalize value and amount to show in component, get in centavos, return in reais
  const expenses = rawExpenses.map(expense => ({
    ...expense,
    value: expense.value / 100,
    expenseDate: expense.expenseDate.toISOString().split('T')[0],
    dueDate: expense.dueDate && expense.dueDate.toISOString().split('T')[0],
    payments: expense.payments.map(pay => ({
      ...pay,
      amount: pay.amount / 100,
      paidAt: pay.paidAt.toISOString().split('T')[0]
    }))
  }))
  return expenses
}
