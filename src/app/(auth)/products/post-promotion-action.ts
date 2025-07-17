'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '../../../../auth'
import { productsPostType } from './page'

export default async function promotionPostAction(data: productsPostType) {
  const session = await auth()

  try {
    //normalize value for db, get in reais, return in centavos
    const { brand, value: rawValue, date, location } = data
    const value = rawValue * 100

    if (!session?.user?.email) {
      return { success: false, error: { message: 'Usuário não autorizado.' } }
    }
    await prisma.productPrice.create({
      data: {
        value,
        date,
        location,
        user: {
          connect: { email: session.user.email }
        },
        productVariant: {
          connect: { id: brand }
        }
      }
    })
    return { success: true }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Ops, algo inesperado aconteceu.' }
    }
  }
}
