import { prisma } from '@/lib/prisma'
import normalizeStr from '@/lib/normalizeStr'
import { ProductCategory } from '@prisma/client'
import { requireUser } from './user/require-user'

export const getProductsWhereContainsText = async (name: string) => {
  await requireUser()
  const normalizedStr = normalizeStr(name)

  return await prisma.product.findMany({
    where: {
      normalized_name: {
        contains: normalizedStr
      }
    },
    select: {
      id: true,
      name: true
    },
    take: 10
  })
}

export const getProductByName = async (name: string) => {
  await requireUser()
  return await prisma.product.findFirst({
    where: { normalized_name: normalizeStr(name) }
  })
}

export const postProduct = async (name: string, category: ProductCategory) => {
  await requireUser()
  const normalized_name = normalizeStr(name)

  return await prisma.product.create({
    data: {
      name,
      category,
      normalized_name
    }
  })
}
export const deleteProductById = async (id: string) => {
  await requireUser()
  return await prisma.product.delete({ where: { id } })
}
