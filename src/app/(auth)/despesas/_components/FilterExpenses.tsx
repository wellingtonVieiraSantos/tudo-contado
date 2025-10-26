import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { ExpenseProps } from '@/types/expense-data-props'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type FilterExpensesProps = {
  months: string[]
  filteredExpenses: ExpenseProps[]
  filters: {
    month: string
    method: 'all' | 'Crédito' | 'Débito'
  }

  updateFilters: (
    newFilters: Partial<{
      month: string
      method: 'all' | 'Crédito' | 'Débito'
    }>
  ) => void
}

export const FilterExpenses = ({
  months,
  filteredExpenses,
  filters,
  updateFilters
}: FilterExpensesProps) => {
  const handleMonthFilter = (value: string) => {
    const newFilter = { ...filters, month: value }
    updateFilters(newFilter)
  }

  const handleStatusFilter = (value: 'all' | 'Crédito' | 'Débito') => {
    const newFilter = { ...filters, status: value }
    updateFilters(newFilter)
  }
  return (
    <div className='w-full bg-card flex flex-col lg:flex-row lg:items-center gap-2 p-2 border rounded-xl'>
      <p className='text-left text-foreground-secondary'>Filtrar por:</p>
      <div className='flex gap-2 w-fit'>
        <Select
          defaultValue={
            !filteredExpenses
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
              <SelectItem value='default'>Sem filtro</SelectItem>
              {months.map(month => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
        <Select onValueChange={handleStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder='Pagamento' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Sem filtro</SelectItem>
            <SelectItem value='CREDIT'>Crédito</SelectItem>
            <SelectItem value='DEBIT'>Débito</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
