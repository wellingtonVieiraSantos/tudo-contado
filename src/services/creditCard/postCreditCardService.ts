import { createCreditCard } from '@/dal/creditCard'
import { requireUser } from '@/lib/require-user'
import { CreditCardProps } from '@/types/creditcard-data-props'
import { Prisma } from '@prisma/client'

export const postCreditCardService = async (rawData: CreditCardProps) => {
  const user = await requireUser()

  const data = {
    ...rawData,
    creditLimit: rawData.creditLimit * 100
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

  const creditCard = await createCreditCard(creditCardData)

  return creditCard
}
