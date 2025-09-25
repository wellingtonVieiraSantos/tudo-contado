import { deleteExpenseById } from '@/dal/expenses'
import { requireUser } from '@/lib/require-user'

export const deleteExpenseByIdService = async (expenseId: string) => {
  await requireUser()

  return await deleteExpenseById(expenseId)
}
