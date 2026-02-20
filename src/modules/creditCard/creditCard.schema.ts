import { CardBrand } from '@prisma/client'
import z from 'zod'

export const creditCardSchema = z
  .object({
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
      .number({ required_error: 'Mês é obrigatório' })
      .min(1, 'Mês deve ser entre 1 e 12')
      .max(12, 'Mês deve ser entre 1 e 12'),
    expYear: z
      .number({ required_error: 'Ano é obrigatório' })
      .min(new Date().getFullYear(), `Cartão expirado.`),
    paymentDay: z
      .string({ message: 'Campo obrigatório' })
      .regex(/^(0?[1-9]|[12][0-9]|3[01])$/, {
        message: 'Dia de vencimento deve ser de 1 à 31'
      })
      .optional(),
    cardBrand: z.nativeEnum(CardBrand)
  })
  .refine(
    data => {
      const now = new Date()
      const currentMonth = now.getMonth() + 1
      const currentYear = now.getFullYear()

      if (data.expYear < currentYear) return false
      if (data.expYear === currentYear && data.expMonth < currentMonth)
        return false

      return true
    },
    {
      message: 'Cartão expirado',
      path: ['expMonth']
    }
  )
