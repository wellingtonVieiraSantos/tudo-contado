import z from 'zod'

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
    email: z.string().trim().email({ message: 'Email inválido' }),
    password: z
      .string()
      .trim()
      .min(5, { message: 'A senha deve ter mais de 4 caracteres' }),
    confirmPassword: z.string().trim().min(1, { message: 'Campo obrigatório' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword']
  })

export type registerUserType = z.infer<typeof registerSchema>
