import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { IncomeDataProps } from '@/types/income-data-props'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type FilterIncomesProps = {
  months: string[]
  filters: {
    month: string
  }
  filteredIncomes: IncomeDataProps[]
  updateFilters: (
    newFilters: Partial<{
      month: string
    }>
  ) => void
}

export const FilterIncomes = ({
  months,
  filters,
  filteredIncomes,
  updateFilters
}: FilterIncomesProps) => {
  const handleMonthFilter = (value: string) => {
    const newFilter = { ...filters, month: value }
    updateFilters(newFilter)
  }

  return (
    <div className='w-full bg-card flex items-center gap-2 p-2 border rounded-xl'>
      <p className='text-foreground-secondary'>Filtrar por:</p>
      <div className='w-fit'>
        <Select
          defaultValue={
            !filteredIncomes
              ? format(new Date(), "MMMM 'de' yyyy", {
                  locale: ptBR
                })
              : ''
          }
          onValueChange={handleMonthFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder='mês' />
          </SelectTrigger>
          {months && (
            <SelectContent>
              <SelectItem value='default'>Todos os Ganhos</SelectItem>
              {months.map(month => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      </div>
    </div>
  )
}
