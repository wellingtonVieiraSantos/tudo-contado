import { findCreditCardById } from '@/dal/creditCard'
import { requireUser } from '@/lib/require-user'

export const getCreditCardByIdService = async (id: string) => {
  await requireUser()
  const rawCreditCard = await findCreditCardById(id)

  if (!rawCreditCard) return

  //normalize value  to show in component, get in centavos, return in reais
  const creditCard = {
    ...rawCreditCard,
    creditLimit: rawCreditCard.creditLimit / 100,
    payments: rawCreditCard.payment.map(pay => ({
      ...pay,
      amount: pay.amount / 100
    }))
  }
  return creditCard
}
