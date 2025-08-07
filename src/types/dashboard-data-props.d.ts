import { CateroryType } from '@prisma/client'

export type dashboardDataProps = {
  name: string | null
  image: string | null
  income: {
    id: string
    value: number
    date: Date
    description: string
  }[]
  expense: {
    id: string
    value: number
    category: CateroryType
    date: Date
    paid: boolean
    description: string
  }[]
  productLifetime: {
    id: string
    purschaseDate: Date
    endDate: Date | null
    productVariantId: {
      id: string
      purshaseDate: Date
      endDate: Date
      productVariant: {
        id: string
        product: {
          id: string
          name: string
        }
      }
    }
  }[]
} | null
