'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '../../../../auth'

export default async function incomesDeleteAction(id: string) {
  const session = await auth()

  try {
    if (!session?.user?.email) {
      return { success: false, error: { message: 'Usuário não autorizado.' } }
    }
    await prisma.income.delete({
      where: { id },
      select: {
        id: true,
        value: true,
        description: true,
        date: true,
        type: true
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
