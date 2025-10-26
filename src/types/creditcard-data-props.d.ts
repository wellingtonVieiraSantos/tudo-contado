import { creditCardSchema } from '@/validators/formCreditCard'
import { z } from 'zod'

export type CreditCardProps = z.infer<typeof creditCardSchema>

/* put */
export type CreditCardWithIdProps = CreditCardProps & { id: string }
