import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const findPaymentByExpenseId = (paymentId: string) => {
  return prisma.payment.findUnique({
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

export const createPayment = (data: Prisma.PaymentCreateInput) => {
  return prisma.payment.create({ data })
}

export const updatePaymentById = (
  paymentId: string,
  data: Prisma.PaymentUpdateInput
) => {
  return prisma.payment.update({
    where: { id: paymentId },
    data
  })
}
