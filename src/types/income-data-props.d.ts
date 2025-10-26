import { incomeSchema } from '@/validators/formIncome'
import { z } from 'zod'

/* post */
export type IncomeProps = z.infer<typeof incomeSchema>

/* get */
export type IncomeWithIdProps = IncomeProps & { id: string }
