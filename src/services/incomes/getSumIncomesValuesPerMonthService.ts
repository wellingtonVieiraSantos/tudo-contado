import { sumIncomesValuesPerMonth } from '@/dal/incomes'
import { requireUser } from '@/lib/require-user'
import { endOfMonth, startOfMonth } from 'date-fns'

export const getSumIncomesValuesPerMonthService = async () => {
  const { id } = await requireUser()

  const date = new Date('2025-09-10')

  const startDate = startOfMonth(date)
  const endDate = endOfMonth(date)

  const income = await sumIncomesValuesPerMonth(id!, startDate, endDate)

  const incomeSum = {
    sum: income._sum.value ? income._sum.value / 100 : 0
  }

  return incomeSum
}
