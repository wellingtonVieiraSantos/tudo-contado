import { CategoryType, PaymentMethodType } from '@prisma/client'
import { isValid, parseISO } from 'date-fns'
import z from 'zod'

export const expenseSchemaInitial = z.object({
  id: z.string().optional(),
  value: z.coerce
    .number({ message: 'Campo obrigatório' })
    .positive({ message: 'Apenas valores positivos' })
    .refine(val => Math.round(val * 100) / 100 === val, {
      message: 'Máximo 2 casas decimais'
    }),
  description: z.string().trim().min(1, { message: 'Campo obrigatório' }),
  category: z.nativeEnum(CategoryType),
  date: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, 'Formato inválido')
    .refine(value => isValid(parseISO(value)), 'Data inválida'),
  method: z.nativeEnum(PaymentMethodType),
  creditCardId: z
    .string({
      message: 'Para pagamento com crédito é necessário vincular um cartão.'
    })
    .optional(),
  installments: z.coerce
    .number({ message: 'O valor deve ser um número' })
    .min(1, { message: 'Parcelas devem ser entre 1 e 36' })
    .max(36)
    .optional()
})

export const expenseSchema = expenseSchemaInitial.refine(
  data => {
    if (data.method === 'CREDIT') return !!data.creditCardId
    return true
  },
  {
    message: 'É obrigatório selecionar um cartão de crédito.',
    path: ['creditCardId']
  }
)

export const step1Schema = expenseSchemaInitial.pick({
  value: true,
  description: true,
  date: true
})

export const step2Schema = expenseSchemaInitial.pick({
  category: true
})

export const step3Schema = expenseSchemaInitial
  .pick({
    method: true,
    creditCardId: true,
    installments: true
  })
  .refine(
    data => {
      if (data.method === 'CREDIT') return !!data.creditCardId
      return true
    },
    {
      message: 'É obrigatório selecionar um cartão de crédito.',
      path: ['creditCardId']
    }
  )

export const listExpensesSchema = z.object({
  date: z.string().optional(),
  method: z
    .nativeEnum(PaymentMethodType)
    .optional()
    .or(z.literal(''))
    .transform(val => (val === '' ? undefined : val)),
  category: z
    .nativeEnum(CategoryType)
    .optional()
    .or(z.literal(''))
    .transform(val => (val === '' ? undefined : val))
})
