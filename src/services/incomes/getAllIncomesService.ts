import { findIncomes } from '@/dal/incomes'
import { requireUser } from '@/lib/require-user'

export const getAllIncomesService = async () => {
  const user = await requireUser()
  const rawIncomes = await findIncomes(user.id!)

  //normalize value and amount to show in component, get in centavos, return in reais
  const incomes = rawIncomes.map(income => ({
    ...income,
    value: income.value / 100
  }))
  return incomes
}
