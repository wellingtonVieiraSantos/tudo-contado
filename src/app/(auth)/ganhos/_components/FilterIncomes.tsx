'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { useDebounce } from '@/hooks/useDebouce'
import { filterIncomeSchema } from '@/modules/incomes/incomes.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { IncomeType } from '@prisma/client'
import { Controller, useForm } from 'react-hook-form'
import { useIncomeQuery } from '../_hooks/use-query-income'
import { useEffect } from 'react'
import { Form, FormField } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
  Hammer,
  BriefcaseBusiness,
  Percent,
  Search,
  TrendingUp
} from 'lucide-react'
import { maskMonthYear } from '@/lib/maskMonthYear'
import { incomeTypeFormatter } from '@/lib/incomeTypeFormatter'
import { useSearchParams } from 'next/navigation'
import { ListIncomeQuery } from '@/modules/incomes/incomes.types'

const typeICon = [BriefcaseBusiness, Percent, Hammer, TrendingUp]

export const categories = Object.keys(IncomeType).map((key, i) => ({
  type: key as IncomeType,
  icon: typeICon[i]
}))

export const FilterIncomes = () => {
  const searchParams = useSearchParams()

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    month: Number(searchParams.get('month')) || undefined,
    year: Number(searchParams.get('year')) || undefined,
    type: (searchParams.get('type') as ListIncomeQuery['type']) || undefined
  }
  const normalizeType = (
    value:
      | ''
      | 'ALL'
      | 'ACTIVE'
      | 'PASSIVE'
      | 'EXTRA'
      | 'CAPITAL_GAIN'
      | undefined
  ): IncomeType | undefined => {
    if (!value || value === 'ALL') return undefined
    return value
  }

  const { control, watch } = useForm({
    resolver: zodResolver(filterIncomeSchema),
    defaultValues: {
      type: filters.type || undefined,
      date:
        filters.month && filters.year
          ? filters.month?.toString() + '/' + filters.year?.toString()
          : undefined
    }
  })

  const { type, date } = watch()

  const debouncedDate = useDebounce(date, 400)

  const { setFilters } = useIncomeQuery()

  useEffect(() => {
    if (debouncedDate && debouncedDate.length < 5) return
    const [month, year] = debouncedDate?.split('/') || []

    setFilters({
      type: normalizeType(type),
      month: month ? Number(month) : undefined,
      year: year ? Number(year) : undefined,
      page: 1
    })
  }, [type, debouncedDate, setFilters])

  return (
    <div className='w-full flex items-center justify-between pl-2 pr-5 py-2 bg-card rounded-lg border'>
      <h1>Filtros</h1>
      <Form className='flex gap-6'>
        <FormField name='type'>
          <Controller
            name='type'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Tipo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ALL' className='text-foreground-secondary'>
                    Sem filtro
                  </SelectItem>
                  <SelectSeparator />
                  {categories.map(categorie => (
                    <SelectItem
                      key={categorie.type}
                      value={categorie.type}
                      className=''
                    >
                      {incomeTypeFormatter(categorie.type)}
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
