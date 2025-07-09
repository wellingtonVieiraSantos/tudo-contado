import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const today = new Date()

export const months = Array.from({ length: 6 }, (_, i) => {
  const date = new Date(today.getFullYear(), today.getMonth() - (5 - i), 1)
  return format(date, "MMMM 'de' yyyy", { locale: ptBR })
})
