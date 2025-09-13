import { prisma } from '@/lib/prisma'
import { requireUser } from './user/require-user'
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
      creditLimit: true,
      holder: true,
      validity: true,
      cardBrand: true
    },
    orderBy: {
      validity: 'desc'
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
      validity: data.validity,
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
