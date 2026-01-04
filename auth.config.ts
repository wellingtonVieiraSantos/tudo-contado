import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { loginSchema } from '@/modules/user/user.login.schema'
import { checkEmailExists } from '@/modules/user/user.repository'

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async credentials => {
        const parsed = loginSchema.safeParse(credentials)

        if (!parsed.success) return null

        const { email, password } = parsed.data

        //verifica se o user existe
        const user = await checkEmailExists(email)

        if (!user) {
          return null
        }

        //verifica se a senha esta correta
        const passwordMatch = await bcrypt.compare(password, user.password!)

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
