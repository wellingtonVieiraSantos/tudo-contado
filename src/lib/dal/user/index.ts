import { prisma } from '@/lib/prisma'
import { requireUser } from './require-user'

export const getDataFromUserId = async () => {
  const user = await requireUser()

  return await prisma.user.findMany({
    where: { id: user.id },
    select: {
      name: true,
      image: true,
      expense: true,
      income: true,
      productLifetime: true
    }
  })
}
