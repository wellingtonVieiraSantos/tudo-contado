'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '../../../../auth'

export default async function productsGetAction() {
  const session = await auth()

  try {
    if (!session?.user?.email) {
      return { success: false, error: { message: 'Usuário não autorizado.' } }
    }

    const rawProducts = await prisma.productPrice.findMany({
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
                name: true
              }
            },
            product: {
              select: {
                id: true,
                name: true,
                category: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return { success: true, data: rawProducts }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Ops, algo inesperado aconteceu.' }
    }
  }
}
