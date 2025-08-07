import { CateroryType } from '@prisma/client'

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
  OTHER: 'Outros'
}

export const categoryFormatter = (category: keyof typeof CateroryType) => {
  return CateroryTypeRenamed[category] ?? category
}
