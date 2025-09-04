import { incomeSchema } from '@/validators/formIncome'
import { z } from 'zod'

/* post */
export type incomeType = z.infer<typeof incomeSchema>

/* get */
export type IncomeDataProps = incomeType & { id: string; date: Date }

/* put */
export type dataUpdateProps = Omit<IncomeDataProps, 'date'>
