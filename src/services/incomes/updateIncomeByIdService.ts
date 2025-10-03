import { updateIncomeById } from '@/dal/incomes'
import { requireUser } from '@/lib/require-user'
import { incomeType } from '@/types/income-data-props'

export const updateIncomeByIdService = async (rawData: incomeType) => {
  await requireUser()

  const data = {
    ...rawData,
    value: rawData.value * 100
  }

  const income = await updateIncomeById(data.id!, data)

  return income
}
