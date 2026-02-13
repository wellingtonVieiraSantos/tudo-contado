'use client'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { Form, FormField } from '@/components/ui/Form'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { maskMonthYear } from '@/lib/maskMonthYear'
import { zodResolver } from '@hookform/resolvers/zod'
import { filterExpensesSchema } from '@/modules/expenses/expenses.schema'
import { useEffect } from 'react'
import { useExpenseQuery } from '../_hooks/use-query-expense'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { useDebounce } from '@/hooks/useDebouce'
import { Search } from 'lucide-react'
import { CategoryType } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { ListExpensesQuery } from '@/modules/expenses/expenses.types'
import { categories } from './ModalExpense'

export const FilterExpenses = () => {
  const searchParams = useSearchParams()

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    month: Number(searchParams.get('month')) || undefined,
    year: Number(searchParams.get('year')) || undefined,
    method:
      (searchParams.get('method') as ListExpensesQuery['method']) || undefined,
    category:
      (searchParams.get('category') as ListExpensesQuery['category']) ||
      undefined
  }
  const normalizeMethod = (
    value: '' | 'ALL' | 'CREDIT' | 'DEBIT' | undefined
  ): 'CREDIT' | 'DEBIT' | undefined => {
    if (!value || value === 'ALL') return undefined
    return value
  }
  const normalizeCategory = (
    value:
      | ''
      | 'ALL'
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
      | undefined
  ): CategoryType | undefined => {
    if (!value || value === 'ALL') return undefined
    return value
  }

  const { control, watch } = useForm({
    resolver: zodResolver(filterExpensesSchema),
    defaultValues: {
      method: filters.method || undefined,
      category: filters.category || undefined,
      date:
        filters.month && filters.year
          ? filters.month?.toString() + '/' + filters.year?.toString()
          : undefined
    }
  })

  const { method, category, date } = watch()

  const debouncedDate = useDebounce(date, 400)

  const { setFilters } = useExpenseQuery()

  useEffect(() => {
    if (debouncedDate && debouncedDate.length < 5) return
    const [month, year] = debouncedDate?.split('/') || []

    setFilters({
      method: normalizeMethod(method),
      category: normalizeCategory(category),
      month: month ? Number(month) : undefined,
      year: year ? Number(year) : undefined,
      page: 1
    })
  }, [method, category, debouncedDate])

  return (
    <div className='w-full flex items-center justify-between pl-2 pr-5 py-2 bg-card rounded-lg border'>
      <h1>Filtros</h1>
      <Form className='flex gap-6'>
        <FormField name='method'>
          <Controller
            name='method'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Pagamento' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ALL' className='text-foreground-secondary'>
                    Sem filtro
                  </SelectItem>
                  <SelectSeparator />
                  <SelectItem value='DEBIT'>Débito</SelectItem>
                  <SelectItem value='CREDIT'>Crédito</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
        <FormField name='category'>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Categoria' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ALL' className='text-foreground-secondary'>
                    Sem filtro
                  </SelectItem>
                  <SelectSeparator />
                  {categories.map(category => (
                    <SelectItem
                      key={category.type}
                      value={category.type}
                      className=''
                    >
                      {categoryFormatter(category.type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>
        <FormField name='date' className='flex-row items-center'>
          <Controller
            name='date'
            control={control}
            render={({ field }) => (
              <Input
                icon={Search}
                {...field}
                placeholder='Busque mês ex: MM/AA'
                className='border'
                onChange={e => field.onChange(maskMonthYear(e.target.value))}
              />
            )}
          />
        </FormField>
      </Form>
    </div>
  )
}
