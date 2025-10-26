import { updateExpenseById } from '@/dal/expenses'
import { requireUser } from '@/lib/require-user'
import { ExpenseProps } from '@/types/expense-data-props'

export const updateExpenseByIdService = async (rawData: ExpenseProps) => {
  await requireUser()

  const data = {
    ...rawData,
    value: rawData.value * 100,
    expenseDate: new Date(`${rawData.date}T00:00:00.000Z`)
  }

  const expense = await updateExpenseById(data.id!, data)

  return expense
}
