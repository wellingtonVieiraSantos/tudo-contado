'use client'
import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { expenseFormStepOne, expenseType } from '@/types/expense-data-props'
import { step1Schema } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryType } from '@prisma/client'
import { ArrowRight, Wallet } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

type FormStepOneProps = {
  formData: Partial<expenseType>
  onNext: (data: expenseFormStepOne) => void
}

export const FormStepOne = ({ formData, onNext }: FormStepOneProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<expenseFormStepOne>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData
  })

  useEffect(() => {
    reset(formData)
  }, [formData, reset])

  const category = Object.keys(CategoryType) as CategoryType[]

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <FormField name='kind'>
        <FormLabel>Tipo *</FormLabel>
        <Controller
          name='kind'
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='IMMEDIATE'>Gasto imediato</SelectItem>
                <SelectItem value='SCHEDULED'>Gasto futuro</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </FormField>
      <FormField name='value'>
        <FormLabel>Valor *</FormLabel>
        <FormControl asChild>
          <Input
            icon={Wallet}
            id='value'
            {...register('value')}
            type='number'
            step='0.01'
            placeholder='R$ 0000,00'
          />
        </FormControl>
        {errors.value && (
          <FormMessage className='text-destructive'>
            {errors.value?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='description'>
        <FormLabel>Descrição *</FormLabel>
        <FormControl asChild>
          <Textarea
            id='description'
            {...register('description')}
            placeholder='Descreva, em poucas palavras, o gasto'
          />
        </FormControl>
        {errors.description && (
          <FormMessage className='text-destructive'>
            {errors.description?.message}
          </FormMessage>
        )}
      </FormField>
      <FormField name='category'>
        <FormLabel>Categoria *</FormLabel>
        <Controller
          name='category'
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {category.map(value => (
                  <SelectItem value={value} key={value}>
                    {categoryFormatter(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>
      <FormSubmit asChild>
        <Button className='mt-3 justify-self-end px-8' type='submit'>
          Proximo
          <ArrowRight />
        </Button>
      </FormSubmit>
    </Form>
  )
}
