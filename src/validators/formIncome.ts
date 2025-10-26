import { IncomeType } from '@prisma/client'
import { isValid, parseISO } from 'date-fns'
import z from 'zod'

export const incomeSchema = z.object({
  id: z.string().optional(),
  value: z.coerce
    .number({ message: 'Campo obrigatório' })
    .positive({ message: 'Apenas valores positivos' })
    .refine(val => Math.round(val * 100) / 100 === val, {
      message: 'Máximo 2 casas decimais'
    }),
  description: z.string().trim().min(1, { message: 'Campo obrigatório' }),
  type: z.nativeEnum(IncomeType),
  date: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, 'Formato inválido')
    .refine(value => isValid(parseISO(value)), 'Data inválida')
})
