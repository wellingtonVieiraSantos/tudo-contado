import { ExpenseProps } from '../expenses/expenses.types'
import { creditCardSchema } from './creditCard.schema'
import { z } from 'zod'

export type CreditCardProps = z.infer<typeof creditCardSchema>

/* put */
export type CreditCardWithIdProps = CreditCardProps & { id: string }

export type CreditCardWithExpensesProps = CreditCardWithIdProps & {
  deletedAt: Date | null
} & { expense: ExpenseProps[] }
