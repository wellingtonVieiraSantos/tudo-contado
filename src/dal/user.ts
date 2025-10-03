import { prisma } from '@/lib/prisma'

export const checkEmailExists = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email }
  })
}

export const registerNewUser = async (
  name: string,
  email: string,
  password: string
) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  })
}
