import { ProductCategory } from '@prisma/client'

export type ProductsPriceType = {
  id: string
  date: Date
  value: number
  location: string
  user: {
    name: string | null
  }
  productVariant: {
    brand: {
      id: string
      name: string
    } | null
    product: {
      id: string
      name: string
      category: ProductCategory
    }
  }
}
