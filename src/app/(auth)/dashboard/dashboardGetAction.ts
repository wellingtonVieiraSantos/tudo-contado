'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '../../../../auth'

export default async function dashboardGetAction() {
  const session = await auth()
  try {
    if (!session?.user?.email) {
      return { success: false, error: { message: 'Usuário não autorizado' } }
    }

    const dashboardInfo = await prisma.user.findMany({
      where: { email: session.user.email },
      select: {
        expense: { select: { value: true, date: true } },
        income: { select: { value: true, date: true } }
      }
    })

    return { success: true, data: dashboardInfo }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      error: { message: 'Ops, algo inesperado aconteceu.' }
    }
  }
}
