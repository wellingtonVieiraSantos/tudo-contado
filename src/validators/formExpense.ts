import { CateroryType } from '@prisma/client'
import z from 'zod'

export const expenseSchema = z.object({
  value: z.coerce
    .number({ message: 'Campo obrigatório' })
    .positive({ message: 'Apenas valores positivos' })
    .refine(val => Math.round(val * 100) / 100 === val, {
      message: 'Máximo 2 casas decimais'
    }),
  description: z.string().trim().min(1, { message: 'Campo obrigatório' }),
  type: z.enum(['FIXED', 'VARIABLE']),
  category: z.nativeEnum(CateroryType),
  paid: z.boolean(),
  dateString: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), { message: 'Data inválida' })
})
