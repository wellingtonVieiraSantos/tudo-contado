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
      creditLimit: true
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
      expense: {
        select: {
          id: true,
          value: true,
          date: true,
          installments: true,
          category: true,
          description: true
        },
        orderBy: {
          date: 'desc'
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
