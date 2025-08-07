import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const dataFormatter = (rawDate: Date) => {
  return format(rawDate, "MMMM 'de' yyyy", { locale: ptBR })
}
