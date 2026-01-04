import { Prisma } from '@prisma/client'
import { CreditCardRepository } from './creditCard.repository'
import { requireUser } from '@/lib/require-user'
import { CreditCardProps } from './creditCard.types'

const creditCardRepository = new CreditCardRepository()

/* GET */
export const getAllCreditCardService = async () => {
  const user = await requireUser()
  const rawCreditCard = await creditCardRepository.getAll(user.id!)

  //normalize value and amount to show in component, get in centavos, return in reais
  const creditCard = rawCreditCard.map(cc => ({
    ...cc,
    creditLimit: cc.creditLimit / 100
  }))
  return creditCard
}

export const getCreditCardByIdService = async (id: string) => {
  await requireUser()
  const rawCreditCard = await creditCardRepository.getById(id)

  if (!rawCreditCard) return

  //normalize value  to show in component, get in centavos, return in reais
  const creditCard = {
    ...rawCreditCard,
    creditLimit: rawCreditCard.creditLimit / 100,
    expense: rawCreditCard.expense.map(exp => ({
      ...exp,
      value: exp.value / 100,
      date: exp.date.toISOString().split('T')[0]
    }))
  }
  return creditCard
}

export const getAllCreditCardDeactivateService = async () => {
  const user = await requireUser()
  const rawCreditCard = await creditCardRepository.getByCreditCardDeactivate(
    user.id!
  )

  //normalize value and amount to show in component, get in centavos, return in reais
  const creditCard = rawCreditCard.map(cc => ({
    ...cc,
    creditLimit: cc.creditLimit / 100,
    deletedAt: cc.deletedAt!.toISOString().split('T')[0]
  }))
  return creditCard
}

/* POST */
export const postCreditCardService = async (rawData: CreditCardProps) => {
  const user = await requireUser()

  const data = {
    ...rawData,
    creditLimit: rawData.creditLimit * 100,
    billingDay: Number(rawData.billingDay)
  }

  const creditCardData: Prisma.CreditCardCreateInput = {
    lastNumber: data.lastNumber,
    creditLimit: data.creditLimit,
    expMonth: data.expMonth,
    expYear: data.expYear,
    billingDay: data.billingDay,
    holder: data.holder,
    cardBrand: data.cardBrand,
    user: {
      connect: { id: user.id }
    }
  }

  const creditCard = await creditCardRepository.create(creditCardData)

  return creditCard
}

/* UPDATE */
export const updateCreditCardByIdService = async (rawData: CreditCardProps) => {
  await requireUser()

  const data = {
    ...rawData,
    creditLimit: rawData.creditLimit * 100,
    billingDay: Number(rawData.billingDay)
  }

  const creditCard = await creditCardRepository.update(data.id!, data)

  return creditCard
}

export const deactivateCreditCardByIdService = async (id: string) => {
  await requireUser()

  return await creditCardRepository.updateDeactivateCreditCard(id)
}

export const restoreCreditCardByIdService = async (id: string) => {
  await requireUser()

  return await creditCardRepository.updateRestoreCreditCard(id)
}

/* DELETE */
export const deleteCreditCardByIdService = async (id: string) => {
  await requireUser()

  return await creditCardRepository.delete(id)
}
