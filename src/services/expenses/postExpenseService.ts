import { createExpense } from '@/dal/expenses'
import { requireUser } from '@/lib/require-user'
import { ExpenseProps } from '@/types/expense-data-props'
import { Prisma } from '@prisma/client'

export const postExpenseService = async (rawData: ExpenseProps) => {
  const user = await requireUser()

  const data = {
    ...rawData,
    value: rawData.value * 100,
    expenseDate: new Date(`${rawData.date}T00:00:00.000Z`)
  }

  const expenseData: Prisma.ExpenseCreateInput = {
    value: data.value,
    date: data.expenseDate,
    description: data.description,
    category: data.category,
    method: data.paymentMethod,
    installments: data.installments,
    user: {
      connect: { id: user.id }
    },
    ...(data.paymentMethod === 'CREDIT' && data.creditCardId
      ? { creditCard: { connect: { id: data.creditCardId } } }
      : {})
  }

  const expense = await createExpense(expenseData)

  return expense
}
