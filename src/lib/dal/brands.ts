import { prisma } from '@/lib/prisma'
import normalizeStr from '@/lib/normalizeStr'
import { requireUser } from './user/require-user'

export const getBrandsWhereContainsText = async (name: string) => {
  await requireUser()
  const normalizedStr = normalizeStr(name)

  return await prisma.brand.findMany({
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

export const getNoBrand = async () => {
  await requireUser()
  return await prisma.brand.upsert({
    where: { id: 'no-brand' },
    update: {},
    create: {
      id: 'no-brand',
      name: 'Sem Marca',
      normalized_name: 'sem marca'
    }
  })
}

export const getBrandByName = async (name: string | null) => {
  await requireUser()
  if (!name) return await getNoBrand()

  const brand = await prisma.brand.findFirst({
    where: { normalized_name: normalizeStr(name) }
  })

  return brand || (await getNoBrand())
}

export const postBrand = async (name: string) => {
  await requireUser()
  const normalized_name = normalizeStr(name)

  return await prisma.brand.create({
    data: {
      name,
      normalized_name
    }
  })
}

export const deleteBrandById = async (id: string) => {
  await requireUser()
  return await prisma.brand.delete({ where: { id } })
}
