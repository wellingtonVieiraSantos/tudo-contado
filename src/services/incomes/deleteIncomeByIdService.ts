import { deleteIncomeById } from '@/dal/incomes'
import { requireUser } from '@/lib/require-user'

export const deleteIncomeByIdService = async (expenseId: string) => {
  await requireUser()

  return await deleteIncomeById(expenseId)
}
