import { deleteCreditCardById } from '@/dal/creditCard'
import { requireUser } from '@/lib/require-user'

export const deleteCreditCardByIdService = async (id: string) => {
  await requireUser()

  return await deleteCreditCardById(id)
}
