import { createIncome } from '@/dal/incomes'
import { requireUser } from '@/lib/require-user'
import { incomeType } from '@/types/income-data-props'
import { Prisma } from '@prisma/client'

export const postIncomeService = async (rawData: incomeType) => {
  const user = await requireUser()

  const data = {
    ...rawData,
    value: rawData.value * 100
  }

  const incomeData: Prisma.IncomeCreateInput = {
    ...data,
    user: {
      connect: { id: user.id }
    }
  }

  const income = await createIncome(incomeData)

  return income
}
