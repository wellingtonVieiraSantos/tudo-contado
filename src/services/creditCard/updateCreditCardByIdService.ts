import { updateCreditCardById } from '@/dal/creditCard'
import { requireUser } from '@/lib/require-user'
import { CreditCardProps } from '@/types/creditcard-data-props'

export const updateCreditCardByIdService = async (rawData: CreditCardProps) => {
  await requireUser()

  const data = {
    ...rawData,
    creditLimit: rawData.creditLimit * 100
  }

  const creditCard = await updateCreditCardById(data.id!, data)

  return creditCard
}
