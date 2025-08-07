import { prisma } from '@/lib/prisma'
import { requireUser } from './require-user'

export const getDataFromUserId = async () => {
  const user = await requireUser()

  return await prisma.user.findFirst({
    where: { id: user.id },
    select: {
      name: true,
      image: true,
      expense: {
        select: {
          id: true,
          value: true,
          category: true,
          date: true,
          paid: true,
          description: true
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
      },
      productLifetime: {
        select: {
          id: true,
          purchaseDate: true,
          endDate: true,
          productVariant: {
            select: {
              id: true,
              product: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      }
    }
  })
}
