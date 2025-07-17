'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '../../../../auth'

export default async function brandNameGetAction(query: string) {
  const session = await auth()

  try {
    if (!session?.user?.email) {
      return {
        success: false,
        data: null,
        error: { message: 'Usuário não autorizado.' }
      }
    }

    const rawData = await prisma.productVariant.findMany({
      where: {
        product: { name: query }
      },
      select: {
        brand: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    const data = rawData?.map(item => ({
      id: item.brand.id,
      name: item.brand.name
    }))

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
