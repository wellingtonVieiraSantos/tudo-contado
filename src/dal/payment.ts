import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const findPaymentByExpenseId = async (paymentId: string) => {
  return await prisma.payment.findUnique({
    where: { id: paymentId },
    select: {
      id: true,
      amount: true,
      method: true,
      installments: true,
      paidAt: true,
      creditCard: {
        select: {
          id: true,
          lastNumber: true
        }
      }
    }
  })
}

export const createPayment = async (data: Prisma.PaymentCreateInput) => {
  return await prisma.payment.create({ data })
}

export const updatePaymentById = async (
  paymentId: string,
  data: Prisma.PaymentUpdateInput
) => {
  return await prisma.payment.update({
    where: { id: paymentId },
    data
  })
}
