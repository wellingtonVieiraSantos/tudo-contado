export type ExpenseType = {
  id: string
  type: string
  value: number
  date: Date
  description: string
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
  paid: boolean
}
