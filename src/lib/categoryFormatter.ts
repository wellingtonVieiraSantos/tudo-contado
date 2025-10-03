import { CategoryType } from '@prisma/client'

export const CateroryTypeRenamed = {
  HOUSE: 'Moradia',
  FOOD: 'Alimentação',
  TRANSPORT: 'Transporte',
  EDUCATION: 'Educação',
  HEALTH: 'Saúde',
  CLOTHING: 'Vestuário',
  TECH: 'Tecnologia',
  PERSONAL_CARE: 'Cuidados pessoais',
  ENTERTAINMENT: 'Lazer',
  PETS: 'Pets',
  FINANCIAL: 'Financeiro',
  OTHER: 'Outro'
}

export const categoryFormatter = (category: keyof typeof CategoryType) => {
  return CateroryTypeRenamed[category] ?? category
}
