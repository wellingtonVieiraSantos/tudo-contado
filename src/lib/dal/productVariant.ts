import { prisma } from '@/lib/prisma'
import { requireUser } from './user/require-user'

export const upsertProductVariant = async (
  productId: string,
  brandId: string,
  brandOrigin: boolean
) => {
  await requireUser()
  return await prisma.productVariant.upsert({
    where: {
      productId_brandId: {
        productId,
        brandId
      }
    },
    update: {},
    create: {
      productId,
      brandId,
      brandOrigin: brandOrigin ? 'BRANDED' : 'UNBRANDED'
    }
  })
}

export const deleteProductVariantById = async (id: string) => {
  await requireUser()
  return await prisma.productVariant.delete({ where: { id } })
}
