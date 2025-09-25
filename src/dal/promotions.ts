import { prisma } from '@/lib/prisma'
import { requireUser } from '../lib/require-user'

export const getPromotions = async () => {
  await requireUser()
  return await prisma.productPrice.findMany({
    select: {
      id: true,
      date: true,
      location: true,
      value: true,
      user: {
        select: {
          name: true
        }
      },
      productVariant: {
        select: {
          brand: {
            select: {
              id: true,
              name: true,
              normalized_name: true
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              category: true,
              normalized_name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const postPromotion = async (
  value: number,
  date: Date,
  location: string,
  productVariantId: string
) => {
  const user = await requireUser()

  return await prisma.productPrice.create({
    data: {
      value,
      date,
      location,
      user: {
        connect: { id: user.id }
      },
      productVariant: {
        connect: { id: productVariantId }
      }
    }
  })
}

export const deletePromotionById = async (id: string) => {
  await requireUser()
  return await prisma.productPrice.delete({ where: { id } })
}
