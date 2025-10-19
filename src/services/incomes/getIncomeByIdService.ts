import { findIncomeById } from '@/dal/incomes'
import { requireUser } from '@/lib/require-user'

export const getIncomeByIdService = async (incomeId: string) => {
  await requireUser()
  const rawIncome = await findIncomeById(incomeId)

  if (!rawIncome) return

  //normalize value  to show in component, get in centavos, return in reais
  const income = {
    ...rawIncome,
    value: rawIncome.value / 100,
    date: rawIncome.date.toISOString().split('T')[0]
  }
  return income
}
