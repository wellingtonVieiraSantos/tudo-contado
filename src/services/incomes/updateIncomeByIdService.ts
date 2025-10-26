import { updateIncomeById } from '@/dal/incomes'
import { requireUser } from '@/lib/require-user'
import { IncomeProps } from '@/types/income-data-props'

export const updateIncomeByIdService = async (rawData: IncomeProps) => {
  await requireUser()

  const data = {
    ...rawData,
    value: rawData.value * 100,
    date: new Date(`${rawData.date}T00:00:00.000Z`)
  }

  const income = await updateIncomeById(data.id!, data)

  return income
}
