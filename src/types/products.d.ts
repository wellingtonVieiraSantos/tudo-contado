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
    }
    product: {
      id: string
      name: string
      category:
        | 'HOUSE'
        | 'FOOD'
        | 'TRANSPORT'
        | 'EDUCATION'
        | 'HEALTH'
        | 'CLOTHING'
        | 'TECH'
        | 'PERSONAL_CARE'
        | 'ENTERTAINMENT'
        | 'PETS'
        | 'FINANCIAL'
        | 'OTHER'
    }
  }
}
