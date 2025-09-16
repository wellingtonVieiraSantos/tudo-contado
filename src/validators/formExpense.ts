import {
  CategoryType,
  ExpenseType,
  PaymentMethodType,
  StatusType
} from '@prisma/client'
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
  type: z.nativeEnum(ExpenseType),
  category: z.nativeEnum(CategoryType),
  paymentMethod: z.nativeEnum(PaymentMethodType),
  creditCardId: z
    .string({
      message: 'Para pagamento com crédito é necessário vincular um cartão.'
    })
    .optional(),
  installments: z.coerce
    .number({ message: 'O valor deve ser um número' })
    .min(1, { message: 'Parcelas devem ser entre 1 e 36' })
    .max(36)
    .optional(),
  dueDate: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError
      })
    })
    .optional(),
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError
    })
  }),
  status: z.nativeEnum(StatusType)
})

export const expenseSchema = expenseSchemaInitial.refine(
  data => {
    if (data.paymentMethod === 'CREDIT_CARD') return !!data.creditCardId
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
  type: true,
  category: true
})

export const step2Schema = expenseSchemaInitial
  .pick({
    paymentMethod: true,
    creditCardId: true,
    installments: true
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

export const step3Schema = expenseSchemaInitial
  .pick({
    date: true,
    dueDate: true
  })
  .refine(
    data => {
      if (data.dueDate && data.dueDate < data.date) return false
      return true
    },
    {
      message: 'A data de vencimento não pode ser anterior a compra',
      path: ['dueDate']
    }
  )

export const step4Schema = expenseSchemaInitial.pick({
  status: true
})
