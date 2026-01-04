import { CardBrand } from '@prisma/client'
import z from 'zod'

export const creditCardSchema = z.object({
  id: z.string().optional(),
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
    .regex(/^(0?[1-9]|1[0-2])$/, { message: 'Mês deve ser de 01 à 12' }),
  expYear: z
    .string({ message: 'Campo obrigatório' })
    .regex(/^\d{4}$/, { message: 'Ano deve ter 4 números' })
    .refine(year => +year >= new Date().getFullYear(), {
      message: 'Data inválida, ano de validade não pode ser inferior ao atual.'
    }),
  billingDay: z
    .string({ message: 'Campo obrigatório' })
    .regex(/^(0?[1-9]|[12][0-9]|3[01])$/, {
      message: 'Dia de vencimento deve ser de 1 à 31'
    }),
  cardBrand: z.nativeEnum(CardBrand)
})
