import { z } from 'zod'
import { incomeSchema } from './incomes.schema'

/* post */
export type IncomeProps = z.infer<typeof incomeSchema>

/* get */
export type IncomeWithIdProps = IncomeProps & { id: string }
