import { findLastTransactions } from '@/dal/transactions'
import { requireUser } from '@/lib/require-user'

export const getLastTransactionsService = async () => {
  const user = await requireUser()
  const rawTransactions = await findLastTransactions(user.id!)

  //normalize value and amount to show in component, get in centavos, return in reais
  const expenses = rawTransactions.map(transaction => ({
    ...transaction,
    value: transaction.value / 100,
    date: transaction.date.toISOString().split('T')[0]
  }))
  return expenses
}
