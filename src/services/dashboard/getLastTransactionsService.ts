import { findLastTransactions } from '@/dal/transactions'
import { requireUser } from '@/lib/require-user'

export const getLastTransactionsService = async () => {
  const user = await requireUser()
  const rawExpenses = await findLastTransactions(user.id!)

  //normalize value and amount to show in component, get in centavos, return in reais
  const expenses = rawExpenses.map(expense => ({
    ...expense,
    value: expense.value / 100
  }))
  return expenses
}
