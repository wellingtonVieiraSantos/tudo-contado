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
import { Textarea } from '@/components/ui/Textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToogleGroup'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { expenseFormStepOne, expenseType } from '@/types/expense-data-props'
import { step1Schema } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import { CategoryType } from '@prisma/client'
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  Bus,
  Cpu,
  Cross,
  Drama,
  Ellipsis,
  GraduationCap,
  Heart,
  House,
  PawPrint,
  Refrigerator,
  Shirt,
  Wallet
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Stepper } from './Stepper'
import { Divider } from '@/components/ui/Divider'

type FormStepOneProps = {
  formData: Partial<expenseType>
  onNext: (data: expenseFormStepOne) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const categoryICon = [
  House,
  Refrigerator,
  Bus,
  GraduationCap,
  Cross,
  Shirt,
  Cpu,
  Heart,
  Drama,
  PawPrint,
  BadgeDollarSign,
  Ellipsis
]

export const categories = Object.keys(CategoryType).map((key, i) => ({
  type: key as CategoryType,
  icon: categoryICon[i]
}))

export const FormStepOne = ({
  formData,
  onNext,
  setStep
}: FormStepOneProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<expenseFormStepOne>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData
  })

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <h2 className='py-3 text-center font-poppins'>Informações básicas</h2>
      <Divider />
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
            <ToggleGroup
              type='single'
              onValueChange={field.onChange}
              value={field.value}
              className='grid-cols-2 sm:grid-cols-4'
            >
              {categories.map(category => (
                <ToggleGroupItem
                  key={category.type}
                  value={category.type}
                  className='text-sm flex-col'
                >
                  <category.icon strokeWidth={1.3} className='size-5' />
                  {categoryFormatter(category.type)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
        />
      </FormField>
      <Stepper step={2} />
      <div className='flex gap-3 justify-between mt-3'>
        <Button variant='border' type='button' onClick={() => setStep(1)}>
          <ArrowLeft />
          Anterior
        </Button>
        <FormSubmit asChild type='submit'>
          <Button>
            Proximo
            <ArrowRight />
          </Button>
        </FormSubmit>
      </div>
    </Form>
  )
}
