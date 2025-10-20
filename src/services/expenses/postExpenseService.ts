import { createExpense } from '@/dal/expenses'
import { createPayment } from '@/dal/payment'
import { requireUser } from '@/lib/require-user'
import { expenseType } from '@/types/expense-data-props'
import { Prisma } from '@prisma/client'

export const postExpenseService = async (rawData: expenseType) => {
  const user = await requireUser()

  const data = {
    ...rawData,
    value: rawData.value * 100,
    expenseDate: new Date(`${rawData.expenseDate}T00:00:00.000Z`),
    dueDate: rawData.dueDate
      ? new Date(`${rawData.dueDate}T00:00:00.000Z`)
      : undefined,
    paidAt: rawData.paidAt
      ? new Date(`${rawData.paidAt}T00:00:00.000Z`)
      : undefined
  }

  const expenseData: Prisma.ExpenseCreateInput = {
    value: data.value,
    expenseDate: data.expenseDate,
    dueDate: data.dueDate,
    description: data.description,
    category: data.category,
    status: data.status,
    user: {
      connect: { id: user.id }
    }
  }

  const expense = await createExpense(expenseData)

  if (data.status === 'PAID') {
    const paymentData: Prisma.PaymentCreateInput = {
      paidAt: data.expenseDate,
      amount: data.value,
      method: data.paymentMethod,
      installments: data.installments,
      expense: {
        connect: { id: expense.id }
      },
      ...(data.paymentMethod === 'CREDIT_CARD' && data.creditCardId
        ? { creditCard: { connect: { id: data.creditCardId } } }
        : {})
    }

    await createPayment(paymentData)
  }
  return expense
}
