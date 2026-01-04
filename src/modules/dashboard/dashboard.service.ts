import { DashboardRepository } from './dashboard.transactions.repository'
import { requireUser } from '@/lib/require-user'

const dashboardRepository = new DashboardRepository()

export const getLastTransactionsService = async () => {
  const user = await requireUser()
  const rawTransactions = await dashboardRepository.getTransactions(user.id!)

  //normalize value and amount to show in component, get in centavos, return in reais
  const expenses = rawTransactions.map(transaction => ({
    ...transaction,
    value: transaction.value / 100,
    date: transaction.date.toISOString().split('T')[0]
  }))
  return expenses
}
