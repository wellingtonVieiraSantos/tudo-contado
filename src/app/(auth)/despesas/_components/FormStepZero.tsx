'use client'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import { Form, FormField, FormLabel, FormSubmit } from '@/components/ui/Form'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToogleGroup'
import { expenseFormStepZero, expenseType } from '@/types/expense-data-props'
import { step0Schema } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Hourglass, Zap } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Stepper } from './Stepper'

type FormStepZeroProps = {
  formData: Partial<expenseType>
  onNext: (data: expenseFormStepZero) => void
}

export const FormStepZero = ({ formData, onNext }: FormStepZeroProps) => {
  const { handleSubmit, control, reset } = useForm<expenseFormStepZero>({
    resolver: zodResolver(step0Schema),
    defaultValues: formData
  })

  useEffect(() => {
    reset(formData)
  }, [formData, reset])

  return (
    <Form onSubmit={handleSubmit(onNext)}>
      <FormField name='status' className='items-center'>
        <FormLabel className='flex flex-col text-center gap-3'>
          <p>Tipo de despesa</p>
          <span className='text-sm text-foreground-secondary text-balance'>
            Todos os passos do formulário à seguir será baseado no tipo de
            despesa selecionado.
          </span>
        </FormLabel>
        <Divider />
        <Controller
          name='status'
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type='single'
              onValueChange={field.onChange}
              value={field.value}
              className='py-10'
            >
              <ToggleGroupItem value='PAID'>
                <p className='flex items-center gap-2'>
                  <Zap strokeWidth={1.5} size={20} />
                  Imediata
                </p>
                <span className='text-sm text-foreground-secondary text-balance'>
                  Para gastos já pagos imediatamente, como uma compra de um
                  lanche, uma ida ao mercado e etc.
                </span>
              </ToggleGroupItem>
              <ToggleGroupItem value='PENDING'>
                <p className='flex items-center gap-2'>
                  <Hourglass strokeWidth={1.5} size={20} />
                  Prevista
                </p>
                <span className='text-sm text-foreground-secondary text-balance'>
                  Para gastos à pagar de forma futura, como uma conta de luz,
                  boletos ou compras no crédito.
                </span>
              </ToggleGroupItem>
            </ToggleGroup>
          )}
        />
      </FormField>
      <Stepper step={1} />
      <FormSubmit asChild>
        <Button className='mt-3 justify-self-end' type='submit'>
          Proximo
          <ArrowRight />
        </Button>
      </FormSubmit>
    </Form>
  )
}
