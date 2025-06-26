'use client'

import { format } from 'date-fns'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from '@/components/ui/Modal'
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
import { Send, Wallet } from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'
import { Controller, useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import expensesDeleteAction from './expensesDeleteAction'
import expensesPostAction from './expensesPostAction'
import expensesGetAction from './expensesGetAction'
import formatedCurrency from '@/lib/formatedCurrency'
import { ExpenseType } from '@/types/expense'
import { Checkbox } from '@/components/ui/Checkbox'
import { Label } from '@/components/ui/Label'

export const expenseSchema = z.object({
  value: z.coerce
    .number({ message: 'Campo obrigatório' })
    .positive({ message: 'Apenas valores positivos' })
    .refine(val => Math.round(val * 100) / 100 === val, {
      message: 'Máximo 2 casas decimais'
    }),
  description: z.string().trim().min(1, { message: 'Campo obrigatório' }),
  type: z.enum(['FIXED', 'VARIABLE']),
  paid: z.boolean(),
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError
    })
  })
})

export type expenseType = z.infer<typeof expenseSchema>

export default function Expense() {
  const [formIsOpen, setFormISOpen] = useState(false)
  const [totalExpense, setTotalExpense] = useState(0)
  const [originalExpense, setOriginalExpense] = useState<ExpenseType[] | null>(
    null
  )
  const [expense, setExpense] = useState<ExpenseType[] | null>(null)
  const [selectMonths, setSelectMonths] = useState<string[] | null>(null)

  useEffect(() => {
    const handleExpensesGet = async () => {
      const { data } = await expensesGetAction()
      if (!data) return

      const months = [
        ...new Set(data?.map(expense => format(expense.date, 'MM-yy')))
      ]

      setSelectMonths(months)
      setOriginalExpense(data)

      const actualMonthData = data.filter(
        expense => format(expense.date, 'MM-yy') === format(new Date(), 'MM-yy')
      )
      setExpense(actualMonthData)
      setTotalExpense(
        actualMonthData
          .map(expense => Number(expense.value))
          .reduce((acc, current) => acc + current, 0)
      )
    }
    handleExpensesGet()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<expenseType>({ resolver: zodResolver(expenseSchema) })

  const onSubmit = async (data: expenseType) => {
    await expensesPostAction(data)
    reset()
    setFormISOpen(false)
  }

  const handleDeleteexpense = async (id: string) => {
    await expensesDeleteAction(id)
  }

  const handleMonthFilter = (value: string) => {
    if (value === 'default') {
      setExpense(originalExpense)
      if (!originalExpense) return
      setTotalExpense(
        originalExpense
          .map(expense => Number(expense.value))
          .reduce((acc, current) => acc + current, 0)
      )
      return
    }
    const filteredexpenses = originalExpense?.filter(
      expense => format(expense.date, 'MM-yy') === value
    )
    setExpense(filteredexpenses || [])

    if (!filteredexpenses) {
      setTotalExpense(0)
      return
    }

    setTotalExpense(
      filteredexpenses
        .map(expense => Number(expense.value))
        .reduce((acc, current) => acc + current, 0)
    )
  }

  return (
    <div className='flex flex-col flex-wrap p-2 gap-4'>
      <div className='flex gap-10'>
        <Card className='w-fit px-6 py-2'>
          <CardDescription className='text-foreground-secondary'>
            Total de gastos pagos:
          </CardDescription>
          <CardTitle className='text-4xl'>
            {formatedCurrency(totalExpense)}
          </CardTitle>
        </Card>
        <Card className='w-fit px-6 py-2'>
          <CardDescription className='text-foreground-secondary'>
            Total de gastos não pagos:
          </CardDescription>
          <CardTitle className='text-4xl'>
            {formatedCurrency(totalExpense)}
          </CardTitle>
        </Card>
      </div>
      <div className='max-w-[200px]'>
        <Select
          defaultValue={format(new Date(), 'MM-yy')}
          onValueChange={handleMonthFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder='Filtrar por mês' />
          </SelectTrigger>
          {selectMonths && (
            <SelectContent>
              <SelectItem value='default'>Sem filtro</SelectItem>
              {selectMonths.map(month => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      </div>
      {expense &&
        expense.map((expense, i) => (
          <Card key={i} className='py-1 px-2 h-full w-[300px]'>
            <CardContent className='h-full flex-row justify-between items-center'>
              <div>
                <p className='text-xl font-montserrat'>
                  {formatedCurrency(expense.value)}
                </p>
                <p className='text-sm text-foreground-secondary'>
                  {expense.description}
                </p>
              </div>
              <div className='text-sm flex flex-col gap-2 items-center'>
                <p>{format(expense.date, 'dd-MM-yyyy')}</p>
                <Badge>{expense.type}</Badge>
              </div>
              <Button
                variant='border'
                size='icon'
                className='mb-auto'
                onClick={() => handleDeleteexpense(expense.id)}
              >
                x
              </Button>
            </CardContent>
          </Card>
        ))}
      {!expense && <p>Nenhum ganho...</p>}
      <Modal open={formIsOpen} onOpenChange={setFormISOpen}>
        <ModalTrigger asChild>
          <Button>Cadastrar</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Cadastro de Gastos</ModalTitle>
            <ModalDescription className='text-sm text-foreground-secondary'>
              Formulario para cadastro de gastos
            </ModalDescription>
          </ModalHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField name='value'>
              <FormLabel>Valor</FormLabel>
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
            <FormField name='description' className='mt-2'>
              <FormLabel>Descrição</FormLabel>
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
            <FormField name='type' className='mt-2'>
              <FormLabel>Tipo de gasto</FormLabel>
              <Controller
                name='type'
                control={control}
                defaultValue={'FIXED'}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='FIXED'>Gasto fixo</SelectItem>
                      <SelectItem value='VARIABLE'>Gasto variável</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            <FormField name='date' className='mt-2'>
              <FormLabel>Data da compra</FormLabel>
              <FormControl asChild>
                <input
                  type='date'
                  id='date'
                  {...register('date')}
                  className='text-foreground-secondary border p-1 px-2'
                />
              </FormControl>
              {errors.date && (
                <FormMessage className='text-destructive'>
                  {errors.date?.message}
                </FormMessage>
              )}
            </FormField>
            <FormField name='paid' className='mt-2'>
              <FormLabel>Status do gasto</FormLabel>
              <FormControl asChild>
                <Controller
                  name='paid'
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Label className='flex flex-row items-center gap-4 text-foreground-secondary'>
                      <span>A despesa ja foi paga?</span>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </Label>
                  )}
                />
              </FormControl>
            </FormField>
            <FormSubmit asChild className='mt-5 justify-self-end'>
              <Button>
                Cadastrar
                <Send />
              </Button>
            </FormSubmit>
          </Form>
        </ModalContent>
      </Modal>
    </div>
  )
}
