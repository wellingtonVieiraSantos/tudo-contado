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
    expense: rawCreditCard.expense.map(exp => ({
      ...exp,
      value: exp.value / 100,
      date: exp.date.toISOString().split('T')[0]
    }))
  }
  return creditCard
}
