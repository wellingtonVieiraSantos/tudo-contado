import { updateCreditCardById } from '@/dal/creditCard'
import { requireUser } from '@/lib/require-user'
import { creditCardType } from '@/types/creditcard-data-props'

export const updateCreditCardByIdService = async (rawData: creditCardType) => {
  await requireUser()

  const data = {
    ...rawData,
    creditLimit: rawData.creditLimit * 100
  }

  const creditCard = await updateCreditCardById(data.id!, data)

  return creditCard
}
