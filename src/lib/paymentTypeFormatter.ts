import { IncomeType } from '@prisma/client'

export const IncomeTypeRenamed = {
  ACTIVE: 'Renda ativa',
  PASSIVE: 'Renda passiva',
  EXTRA: 'Renda extra',
  CAPITAL_GAIN: 'Ganho de capital'
}

export const incomeTypeFormatter = (type: keyof typeof IncomeType) => {
  return IncomeTypeRenamed[type] ?? type
}
