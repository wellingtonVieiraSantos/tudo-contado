import { prisma } from '@/lib/prisma'
import { requireUser } from '../lib/require-user'
import { creditCardType } from '@/types/creditcard-data-props'
import { Prisma } from '@prisma/client'

export const getCreditCard = async () => {
  const user = await requireUser()

  return await prisma.creditCard.findMany({
    where: {
      user: { id: user.id }
    },
    select: {
      id: true,
      lastNumber: true,
      holder: true,
      expMonth: true,
      expYear: true,
      cardBrand: true
    },
    orderBy: {
      expYear: 'desc'
    }
  })
}

export const getCreditCardById = async (id: string) => {
  await requireUser()

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
          date: true,
          description: true,
          installments: true,
          value: true
        },
        orderBy: {
          date: 'desc'
        }
      }
    }
  })
}

export const postCreditCard = async (data: creditCardType) => {
  const user = await requireUser()

  return await prisma.creditCard.create({
    data: {
      lastNumber: data.lastNumber,
      creditLimit: data.creditLimit,
      holder: data.holder,
      expMonth: data.expMonth,
      expYear: data.expYear,
      billingDay: data.billingDay,
      cardBrand: data.cardBrand,
      user: { connect: { id: user.id } }
    }
  })
}

export const updateCreditCardById = async (
  id: string,
  data: Prisma.CreditCardUpdateInput
) => {
  await requireUser()
  return await prisma.creditCard.update({
    where: { id },
    data
  })
}

export const deleteCreditCardById = async (id: string) => {
  await requireUser()
  return await prisma.creditCard.delete({ where: { id } })
}
