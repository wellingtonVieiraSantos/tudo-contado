'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '../../../../auth'

export default async function productsNameGetAction(query: string) {
  const session = await auth()

  try {
    if (!session?.user?.email) {
      return {
        success: false,
        data: null,
        error: { message: 'Usuário não autorizado.' }
      }
    }

    const data = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        name: true
      },
      take: 10
    })
    return { success: true, data: data }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      data: null,
      error: { message: 'Ops, algo inesperado aconteceu.' }
    }
  }
}
