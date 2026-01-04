'use client'
import { Button } from '@/components/ui/Button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToogleGroup'
import { categories } from './FormStepTwo'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { Filter } from '@/components/Filter'
import { Form, FormField, FormLabel, FormSubmit } from '@/components/ui/Form'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { maskMonthYear } from '@/lib/maskMonthYear'
import { zodResolver } from '@hookform/resolvers/zod'
import { listExpensesSchema } from '@/modules/expenses/expenses.schema'
import { ListExpensesQuery } from '@/modules/expenses/expenses.types'
import { useState } from 'react'
import { useExpenseQuery } from '../_hooks/use-query-expense'

export const FilterExpenses = ({
  filters
}: {
  filters: {
    page: number
    month: number | undefined
    year: number | undefined
    method: 'CREDIT' | 'DEBIT' | undefined
    category:
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
  }
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(listExpensesSchema),
    defaultValues: {
      method: filters.method || undefined,
      category: filters.category || undefined,
      month: filters.month
    }
  })

  const { setFilters } = useExpenseQuery()

  const onSubmit = (values: ListExpensesQuery) => {
    setFilters(values)
    setIsOpen(false)
  }

  return (
    <Filter open={isOpen} onOpenChange={setIsOpen}>
      <Form
        onSubmit={handleSubmit(onSubmit, errors =>
          console.log('ERROS DE VALIDAÇÃO:', errors)
        )}
      >
        <FormField name='method'>
          <h2>Metodo de pagamento</h2>
          <Controller
            name='method'
            control={control}
            render={({ field }) => (
              <ToggleGroup
                type='single'
                className='w-fit'
                value={field.value}
                onValueChange={field.onChange}
              >
                <ToggleGroupItem value='DEBIT'>Débito</ToggleGroupItem>
                <ToggleGroupItem value='CREDIT'>Crédito</ToggleGroupItem>
              </ToggleGroup>
            )}
          />
        </FormField>
        <FormField name='category'>
          <h2>Categoria</h2>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <ToggleGroup
                type='single'
                className='w-fit flex flex-wrap'
                value={field.value}
                onValueChange={field.onChange}
              >
                {categories.map(category => (
                  <ToggleGroupItem
                    key={category.type}
                    value={category.type}
                    className='text-sm flex'
                  >
                    <category.icon strokeWidth={1.3} className='size-5' />
                    {categoryFormatter(category.type)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          />
        </FormField>
        {/* <FormField name='month'>
          <FormLabel>Mês</FormLabel>
          <Controller
            name='month'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='MM/AAAA'
                className='border p-1 w-fit'
                onChange={e => field.onChange(maskMonthYear(e.target.value))}
              />
            )}
          />
        </FormField> */}
        <div className='flex justify-between pt-3'>
          <Button
            type='button'
            onClick={() => {
              setFilters({ method: undefined, category: undefined })
              setIsOpen(false)
              reset({ method: '', category: '' })
            }}
            variant='ghost'
            className='text-destructive/80'
          >
            Limpar todos os filtros
          </Button>
          <div className='flex gap-4'>
            <Button onClick={() => setIsOpen(false)} variant='border'>
              Cancelar
            </Button>
            <Button type='submit'>Aplicar filtros</Button>
          </div>
        </div>
      </Form>
    </Filter>
  )
}
