import { prisma } from '@/lib/prisma'
import { requireUser } from '../lib/require-user'

export const getDataFromUserId = async () => {
  const user = await requireUser()

  return await prisma.user.findFirst({
    where: { id: user.id },
    select: {
      name: true,
      image: true,
      creditCard: {
        select: {
          id: true,
          cardBrand: true,
          lastNumber: true,
          holder: true,
          expMonth: true,
          expYear: true,
          billingDay: true,
          creditLimit: true,
          expense: {
            select: {
              value: true,
              status: true,
              date: true
            }
          }
        }
      },
      expense: {
        select: {
          id: true,
          value: true,
          category: true,
          paymentMethod: true,
          date: true,
          description: true,
          dueDate: true,
          installments: true,
          status: true
        },
        orderBy: {
          date: 'desc'
        }
      },
      income: {
        select: {
          id: true,
          value: true,
          date: true,
          description: true
        },
        orderBy: {
          date: 'desc'
        }
      }
    }
  })
}

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
