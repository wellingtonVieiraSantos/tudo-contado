import { creditCardSchema } from '@/validators/formCreditCard'
import { z } from 'zod'

export type creditCardType = z.infer<typeof creditCardSchema>
