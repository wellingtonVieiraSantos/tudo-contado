import { creditCardSchema } from '@/validators/formCreditCard'
import { z } from 'zod'

export type creditCardType = z.infer<typeof creditCardSchema>
export type creditCardTypeDashboard = z.infer<typeof creditCardSchema> & {
  payment: { amount: number }[]
}
