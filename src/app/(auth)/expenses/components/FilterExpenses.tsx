import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { ExpenseDataProps } from '@/types/expense-data-props'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type FilterExpensesProps = {
  months: string[]
  filteredExpenses: ExpenseDataProps[]
  filters: {
    month: string
    paid: string | boolean
  }

  updateFilters: (
    newFilters: Partial<{
      month: string
      paid: string | boolean
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

  const handleStatusFilter = (value: string) => {
    const option =
      value === 'paid' ? true : value === 'notPaid' ? false : 'default'
    const newFilter = { ...filters, paid: option }
    updateFilters(newFilter)
  }
  return (
    <div className='w-full bg-card flex items-center gap-2 p-2 border rounded-xl'>
      <p className='text-foreground-secondary'>Filtrar por:</p>
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
              <SelectItem value='default'>Todos os Gastos</SelectItem>
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
            <SelectValue placeholder='pagamento' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='default'>sem filtro</SelectItem>
            <SelectItem value='paid'>pago</SelectItem>
            <SelectItem value='notPaid'>não pago</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
