/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z
  .object({
    name: z.string().min(3, { message: 'O nome é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(5, { message: 'A senha deve ter pelo menos 5 caracteres' }),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword']
  })

export default async function registerUserAction(
  _prevState: any,
  formData: FormData
) {
  const data = {
    name: formData.get('name') || '',
    email: formData.get('email') || '',
    password: formData.get('password') || '',
    confirmPassword: formData.get('confirmPassword') || ''
  }

  //valida os dados com zod
  const parsed = registerSchema.safeParse(data)

  if (!parsed.success)
    return { success: false, error: { formError: parsed.error.flatten() } }

  const { name, email, password } = parsed.data

  //criptografa o password

  try {
    const emailExists = await prisma.user.findFirst({ where: { email } })
    if (emailExists)
      return { success: false, error: { email: ['Email já está em uso.'] } }

    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    return { success: true }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { success: false, error: { message: 'Ops, ocorreu algum erro.' } }
  }
}
