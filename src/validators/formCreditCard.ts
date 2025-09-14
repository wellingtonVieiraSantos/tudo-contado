import { CardBrand } from '@prisma/client'
import z from 'zod'

export const creditCardSchema = z.object({
  id: z.string().uuid().optional(),
  lastNumber: z
    .string({ message: 'Campo obrigatório' })
    .regex(/^\d{4}$/, { message: 'Deve ter 4 números' }),
  creditLimit: z.coerce
    .number({ message: 'Campo obrigatório' })
    .positive({ message: 'Apenas valores positivos' })
    .refine(val => Math.round(val * 100) / 100 === val, {
      message: 'Máximo 2 casas decimais'
    }),
  holder: z.string().trim().min(1, { message: 'Campo obrigatório' }),
  expMonth: z
    .string({ message: 'Campo obrigatório' })
    .regex(/^(0[1-9]|1[0-2])$/, { message: 'Mês deve ser de 01 à 12' }),
  expYear: z
    .string({ message: 'Campo obrigatório' })
    .regex(/^\d{2}$/, { message: 'Ano deve ter 2 números' }),
  cardBrand: z.nativeEnum(CardBrand)
})
