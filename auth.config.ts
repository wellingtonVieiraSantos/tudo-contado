import { prisma } from '@/lib/prisma'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import z from 'zod'
import bcrypt from 'bcryptjs'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5)
})

export default {
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async credentials => {
        const parsed = credentialsSchema.safeParse(credentials)

        if (!parsed.success) return null

        const { email, password } = parsed.data

        //verifica se o user existe
        const user = await prisma.user.findFirst({
          where: { email }
        })

        if (!user) {
          return null
        }

        //verifica se a senha esta correta
        const passwordMatch = bcrypt.compareSync(password, user.password!)

        if (passwordMatch) {
          return user
        }
        return null
      }
    })
  ]
} satisfies NextAuthConfig
