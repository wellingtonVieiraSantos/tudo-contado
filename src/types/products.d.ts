export type ProductsType = {
  id: string
  name: string
  price: number
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
  rating:
    | 'ONE_STAR'
    | 'TWO_STAR'
    | 'THREE_STAR'
    | 'FOUR_STAR'
    | 'FIVE_STAR'
    | null
  brand: string | null
  review: string | null
  purchaseDate: Date
  endDate: Date | null
  quantity: number
  unit: 'UNIT' | 'G' | 'ML' | 'MM'
}
