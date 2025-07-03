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
import { ptBR } from 'date-fns/locale'
import { ProgressBar } from '@/components/ui/ProgressBar'

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
  const [originalExpense, setOriginalExpense] = useState<ExpenseType[] | null>(
    null
  )
  const [expense, setExpense] = useState<ExpenseType[] | null>(null)
  const [expenseAmount, setExpenseAmount] = useState(0)
  const [notPaidExpenseAmount, setNotPaidExpenseAmount] = useState(0)
  const [selectMonths, setSelectMonths] = useState<string[] | null>(null)
  const [filters, setFilters] = useState<{
    mouth: string
    paid: string | boolean
  }>({
    mouth: format(new Date(), "MMMM 'de' yyyy", { locale: ptBR }),
    paid: 'default'
  })

  useEffect(() => {
    const handleExpensesGet = async () => {
      const { data } = await expensesGetAction()
      if (!data) return

      const months = [
        ...new Set(
          data?.map(expense =>
            format(expense.date, "MMMM 'de' yyyy", { locale: ptBR })
          )
        )
      ]

      setSelectMonths(months)
      setOriginalExpense(data)

      const actualMonthData = data.filter(
        expense =>
          format(expense.date, "MMMM 'de' yyyy", { locale: ptBR }) ===
          format(new Date(), "MMMM 'de' yyyy", { locale: ptBR })
      )

      setExpense(actualMonthData)

      setExpenseAmount(
        actualMonthData
          .map(expense => Number(expense.value))
          .reduce((acc, current) => acc + current, 0)
      )

      setNotPaidExpenseAmount(
        actualMonthData
          .filter(expense => !expense.paid)
          .map(expense => Number(expense.value))
          .reduce((acc, current) => acc + current, 0)
      )
    }
    handleExpensesGet()
  }, [])

  useEffect(() => {
    if (!originalExpense) return

    const isMouthActive = filters.mouth !== 'default'
    const isPaidActive = filters.paid !== 'default'

    const mouthFiltered = originalExpense.filter(expense => {
      if (
        isMouthActive &&
        format(expense.date, "MMMM 'de' yyyy", { locale: ptBR }) !==
          filters.mouth
      )
        return false

      return true
    })

    const fullFiltered = isPaidActive
      ? mouthFiltered.filter(expense => expense.paid === filters.paid)
      : mouthFiltered

    setExpense(fullFiltered)

    const total = mouthFiltered.reduce(
      (acc, current) => acc + Number(current.value),
      0
    )
    const notPaidTotal = mouthFiltered
      .filter(expense => !expense.paid)
      .reduce((acc, current) => acc + Number(current.value), 0)

    setExpenseAmount(total)
    setNotPaidExpenseAmount(notPaidTotal)
  }, [filters.mouth, filters.paid, originalExpense])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<expenseType>({ resolver: zodResolver(expenseSchema) })

  const onSubmit = async (data: expenseType) => {
    try {
      await expensesPostAction(data)
      reset()
      setFormISOpen(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeleteexpense = async (id: string) => {
    await expensesDeleteAction(id)
  }

  const handleMonthFilter = (value: string) => {
    setFilters(prev => ({ ...prev, mouth: value }))
  }

  const handleStatusFilter = (value: string) => {
    const option =
      value === 'paid' ? true : value === 'notPaid' ? false : 'default'
    setFilters(prev => ({ ...prev, paid: option }))
  }

  return (
    <div className='flex flex-col flex-wrap p-2 gap-4'>
      <div className='flex gap-10'>
        <Card className='w-fit px-6 py-2'>
          <CardDescription className='text-foreground-secondary'>
            Total de gastos:
          </CardDescription>
          <CardTitle className='text-xl tracking-wide'>
            {formatedCurrency(expenseAmount)}
          </CardTitle>
          <ProgressBar
            max={expenseAmount || 100}
            value={expenseAmount - notPaidExpenseAmount}
          />
          <div className='text-3xl flex gap-2 items-center'>
            <p className='text-sm text-foreground-secondary'>Contas à pagar:</p>
            <span className=' font-montserrat tracking-wide'>
              {formatedCurrency(notPaidExpenseAmount)}
            </span>
          </div>
        </Card>
      </div>
      <div className='max-w-[400px] flex gap-1'>
        <div>
          <Select
            defaultValue={format(new Date(), "MMMM 'de' yyyy", {
              locale: ptBR
            })}
            onValueChange={handleMonthFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder='Filtrar por mês' />
            </SelectTrigger>
            {selectMonths && (
              <SelectContent>
                <SelectItem value='default'>Todos os Gastos</SelectItem>
                {selectMonths.map(month => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            )}
          </Select>
        </div>
        <div>
          <Select onValueChange={handleStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder='Filtrar por status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='default'>sem filtro</SelectItem>
              <SelectItem value='paid'>pago</SelectItem>
              <SelectItem value='notPaid'>não pago</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {expense &&
        expense.map((expense, i) => (
          <Card key={i} className='py-1 px-2 h-full w-[300px]'>
            <CardContent className='h-full flex-row justify-between items-center'>
              <div>
                <p className='text-xl font-montserrat tracking-wide'>
                  {formatedCurrency(expense.value)}
                </p>
                <p className='text-sm text-foreground-secondary'>
                  {expense.description}
                </p>
              </div>
              <div className='text-sm flex flex-col gap-2 items-center'>
                <p>{format(expense.date, 'dd-MM-yyyy')}</p>
                <Badge>{expense.type}</Badge>
                <Badge variant={expense.paid ? 'success' : 'error'}>
                  {expense.paid ? 'Pago' : 'A Pagar'}
                </Badge>
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
