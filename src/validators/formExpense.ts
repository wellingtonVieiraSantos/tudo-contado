import {
  CategoryType,
  ExpenseType,
  PaymentMethodType,
  StatusType
} from '@prisma/client'
import z from 'zod'

export const expenseSchema = z
  .object({
    id: z.string().uuid().optional(),
    value: z.coerce
      .number({ message: 'Campo obrigatório' })
      .positive({ message: 'Apenas valores positivos' })
      .refine(val => Math.round(val * 100) / 100 === val, {
        message: 'Máximo 2 casas decimais'
      }),
    description: z.string().trim().min(1, { message: 'Campo obrigatório' }),
    type: z.nativeEnum(ExpenseType),
    category: z.nativeEnum(CategoryType),
    paymentMethod: z.nativeEnum(PaymentMethodType),
    creditCardId: z.string().uuid().optional(),
    installments: z.coerce
      .number({ message: 'Campo obrigatório' })
      .min(1, { message: 'Mínimo de parcelas deve ser 1' })
      .min(36, { message: 'Máximo de parcelas deve ser 36' })
      .optional(),
    status: z.nativeEnum(StatusType),
    dueDate: z.coerce
      .date({
        errorMap: (issue, { defaultError }) => ({
          message:
            issue.code === 'invalid_date' ? 'Data inválida' : defaultError
        })
      })
      .optional(),
    date: z.coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError
      })
    })
  })
  .refine(
    data => {
      if (data.paymentMethod === 'CREDIT_CARD') return !!data.creditCardId
      return true
    },
    {
      message: 'É obrigatório selecionar um cartão de crédito.',
      path: ['creditCardId']
    }
  )
