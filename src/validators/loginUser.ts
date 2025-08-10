import z from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Email inválido' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'O campo senha é obrigatório.' })
})

export type loginUserType = z.infer<typeof loginSchema>
