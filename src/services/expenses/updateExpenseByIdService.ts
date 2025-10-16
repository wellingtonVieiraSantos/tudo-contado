import { updateExpenseById } from '@/dal/expenses'
import {
  createPayment,
  findPaymentByExpenseId,
  updatePaymentById
} from '@/dal/payment'
import { requireUser } from '@/lib/require-user'
import { expenseType } from '@/types/expense-data-props'

export const updateExpenseByIdService = async (rawData: expenseType) => {
  await requireUser()

  const data = {
    ...rawData,
    value: rawData.value * 100
  }

  const expense = await updateExpenseById(data.id!, data)

  if (data.status === 'PAID') {
    const existingPayment = await findPaymentByExpenseId(expense.id)

    return existingPayment
      ? await updatePaymentById(existingPayment.id, {
          amount: (data.amount ?? data.value) * 100,
          method: data.paymentMethod,
          paidAt: data.paidAt,
          installments: data.installments,
          ...(data.paymentMethod === 'CREDIT_CARD' && data.creditCardId
            ? { creditCard: { connect: { id: data.creditCardId } } }
            : {})
        })
      : await createPayment({
          expense: { connect: { id: expense.id } },
          amount: (data.amount ?? data.value) * 100,
          method: data.paymentMethod,
          paidAt: data.paidAt,
          installments: data.installments,
          ...(data.paymentMethod === 'CREDIT_CARD' && data.creditCardId
            ? { creditCard: { connect: { id: data.creditCardId } } }
            : {})
        })
  }

  return expense
}
