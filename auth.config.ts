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
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image || ''
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = (token.image as string) || null
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  }
} satisfies NextAuthConfig
