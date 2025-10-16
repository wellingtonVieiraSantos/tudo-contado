import { findCreditCard } from '@/dal/creditCard'
import { requireUser } from '@/lib/require-user'

export const getAllCreditCardService = async () => {
  const user = await requireUser()
  const rawCreditCard = await findCreditCard(user.id!)

  //normalize value and amount to show in component, get in centavos, return in reais
  const creditCard = rawCreditCard.map(cc => ({
    ...cc,
    creditLimit: cc.creditLimit / 100,
    payments: cc.payment.map(pay => ({
      ...pay,
      amount: pay.amount / 100
    }))
  }))
  return creditCard
}
