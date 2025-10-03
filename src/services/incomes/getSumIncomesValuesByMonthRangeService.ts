import { findIncomesByMonthRange } from '@/dal/incomes'
import { requireUser } from '@/lib/require-user'

export const getSumIncomesValuesByMonthRangeService = async () => {
  const { id } = await requireUser()

  const incomes = await findIncomesByMonthRange(id!)

  const normalizedIncome = incomes.map(inc => ({
    ...inc,
    total: inc.total ? inc.total / 100 : 0
  }))

  return normalizedIncome
}
