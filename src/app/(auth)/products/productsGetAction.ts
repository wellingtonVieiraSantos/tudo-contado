'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '../../../../auth'

export default async function productsGetAction() {
  const session = await auth()

  try {
    if (!session?.user?.email) {
      return { success: false, error: { message: 'Usuário não autorizado.' } }
    }

    const rawProducts = await prisma.product.findMany({
      where: {
        user: { email: session.user.email }
      },
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        rating: true,
        brand: true,
        review: true,
        purchaseDate: true,
        endDate: true,
        quantity: true,
        unit: true
      },
      orderBy: {
        purchaseDate: 'desc'
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
