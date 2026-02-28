import { CreditCardRepository } from './creditCard.repository'
import { requireUser } from '@/lib/require-user'
import { CreditCardProps } from './creditCard.types'

const creditCardRepository = new CreditCardRepository()

/* GET */
export const getAllCreditCardService = async () => {
  const { id } = await requireUser()
  const rawCreditCard = await creditCardRepository.getAll(id!)

  //normalize value and amount to show in component, get in centavos, return in reais
  const creditCard = rawCreditCard.data.map(cc => ({
    ...cc,
    creditLimit: cc.creditLimit / 100
  }))
  return {
    meta: rawCreditCard.meta,
    data: creditCard
  }
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
  const { id } = await requireUser()

  const data = {
    lastNumber: Number(rawData.lastNumber),
    creditLimit: rawData.creditLimit * 100,
    expMonth: Number(rawData.expMonth),
    expYear: Number(rawData.expYear),
    paymentDay: Number(rawData.paymentDay) ?? 5,
    holder: rawData.holder,
    cardBrand: rawData.cardBrand,

    user: {
      connect: { id: id! }
    }
  }

  const creditCard = await creditCardRepository.create(data)

  return creditCard
}

/* UPDATE */
export const updateCreditCardByIdService = async (rawData: CreditCardProps) => {
  await requireUser()

  const data = {
    id: rawData.id!,
    lastNumber: Number(rawData.lastNumber),
    creditLimit: rawData.creditLimit * 100,
    expMonth: Number(rawData.expMonth),
    expYear: Number(rawData.expYear),
    paymentDay: Number(rawData.paymentDay),
    holder: rawData.holder,
    cardBrand: rawData.cardBrand
  }

  const creditCard = await creditCardRepository.update(data.id, data)

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
