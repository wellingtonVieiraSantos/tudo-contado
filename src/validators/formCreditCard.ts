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
  validity: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError
      })
    })
    .refine(
      val => {
        if (new Date(val) < new Date()) return false
        return true
      },
      { message: 'Data não pode ser anterior a hoje.' }
    ),
  cardBrand: z.nativeEnum(CardBrand)
})
