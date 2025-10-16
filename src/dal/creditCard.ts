import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const findCreditCard = async (userId: string) => {
  return await prisma.creditCard.findMany({
    where: {
      user: { id: userId }
    },
    select: {
      id: true,
      lastNumber: true,
      holder: true,
      expMonth: true,
      expYear: true,
      cardBrand: true,
      creditLimit: true,
      payment: {
        select: {
          id: true,
          amount: true,
          paidAt: true
        }
      }
    },
    orderBy: {
      expYear: 'desc'
    }
  })
}

export const findCreditCardById = async (id: string) => {
  return await prisma.creditCard.findUnique({
    where: { id },
    select: {
      id: true,
      lastNumber: true,
      creditLimit: true,
      holder: true,
      expMonth: true,
      expYear: true,
      billingDay: true,
      cardBrand: true,
      payment: {
        select: {
          id: true,
          paidAt: true,
          amount: true
        },
        orderBy: {
          paidAt: 'desc'
        }
      }
    }
  })
}

export const createCreditCard = async (data: Prisma.CreditCardCreateInput) => {
  return await prisma.creditCard.create({ data })
}

export const updateCreditCardById = async (
  id: string,
  data: Prisma.CreditCardUpdateInput
) => {
  return await prisma.creditCard.update({
    where: { id },
    data
  })
}

export const deleteCreditCardById = async (id: string) => {
  return await prisma.creditCard.delete({ where: { id } })
}
