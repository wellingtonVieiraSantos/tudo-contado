import z from 'zod'

export const productsSchema = z.object({
  name: z.string().trim().min(1, { message: 'Campo obrigatório.' }),
  brand: z.string().trim().nullable(),
  location: z.string().trim().min(1, { message: 'Campo obrigatório.' }),
  value: z.coerce
    .number({ message: 'Campo obrigatório' })
    .positive({ message: 'Apenas valores positivos' })
    .refine(val => Math.round(val * 100) / 100 === val, {
      message: 'Máximo 2 casas decimais'
    }),
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError
    })
  })
})

export type productsPostType = z.infer<typeof productsSchema>
