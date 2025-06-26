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
import incomesDeleteAction from './incomesDeleteAction'
import incomesPostAction from './incomesPostAction'
import incomesGetAction from './incomesGetAction'
import { IncomeType } from '@/types/income'
import formatedCurrency from '@/lib/formatedCurrency'

export const incomeSchema = z.object({
  value: z.coerce
    .number({ message: 'Campo obrigatório' })
    .positive({ message: 'Apenas valores positivos' })
    .refine(val => Math.round(val * 100) / 100 === val, {
      message: 'Máximo 2 casas decimais'
    }),
  description: z.string().trim().min(1, { message: 'Campo obrigatório' }),
  type: z.enum(['FIXED', 'VARIABLE']),
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === 'invalid_date' ? 'Data inválida' : defaultError
    })
  })
})

export type incomeType = z.infer<typeof incomeSchema>

export default function Income() {
  const [formIsOpen, setFormISOpen] = useState(false)
  const [totalIncome, setTotalIncome] = useState(0)
  const [originalIncomes, setOriginalIncomes] = useState<IncomeType[] | null>(
    null
  )
  const [incomes, setIncomes] = useState<IncomeType[] | null>(null)
  const [selectMonths, setSelectMonths] = useState<string[] | null>(null)

  useEffect(() => {
    const handleIncomesGet = async () => {
      const { data } = await incomesGetAction()
      if (!data) return

      const months = [
        ...new Set(data?.map(income => format(income.date, 'MM-yy')))
      ]

      setSelectMonths(months)
      setOriginalIncomes(data)

      const actualMonthData = data.filter(
        income => format(income.date, 'MM-yy') === format(new Date(), 'MM-yy')
      )
      setIncomes(actualMonthData)
      setTotalIncome(
        actualMonthData
          .map(income => Number(income.value))
          .reduce((acc, current) => acc + current, 0)
      )
    }
    handleIncomesGet()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<incomeType>({ resolver: zodResolver(incomeSchema) })

  const onSubmit = async (data: incomeType) => {
    await incomesPostAction(data)
    reset()
    setFormISOpen(false)
  }

  const handleDeleteIncome = async (id: string) => {
    await incomesDeleteAction(id)
  }

  const handleMonthFilter = (value: string) => {
    if (value === 'default') {
      setIncomes(originalIncomes)
      if (!originalIncomes) return
      setTotalIncome(
        originalIncomes
          .map(income => Number(income.value))
          .reduce((acc, current) => acc + current, 0)
      )
      return
    }
    const filteredIncomes = originalIncomes?.filter(
      income => format(income.date, 'MM-yy') === value
    )
    setIncomes(filteredIncomes || [])

    if (!filteredIncomes) {
      setTotalIncome(0)
      return
    }

    setTotalIncome(
      filteredIncomes
        .map(income => Number(income.value))
        .reduce((acc, current) => acc + current, 0)
    )
  }

  return (
    <div className='flex flex-col flex-wrap p-2 gap-4'>
      <Card className='w-fit px-6 py-2'>
        <CardDescription className='text-foreground-secondary'>
          Total de ganhos:
        </CardDescription>
        <CardTitle className='text-4xl'>
          {formatedCurrency(totalIncome)}
        </CardTitle>
      </Card>
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
      {incomes &&
        incomes.map((income, i) => (
          <Card key={i} className='py-1 px-2 h-full w-[300px]'>
            <CardContent className='h-full flex-row justify-between items-center'>
              <div>
                <p className='text-xl font-montserrat'>
                  {formatedCurrency(income.value)}
                </p>
                <p className='text-sm text-foreground-secondary'>
                  {income.description}
                </p>
              </div>
              <div className='text-sm flex flex-col gap-2 items-center'>
                <p>{format(income.date, 'dd-MM-yyyy')}</p>
                <Badge>{income.type}</Badge>
              </div>
              <Button
                variant='border'
                size='icon'
                className='mb-auto'
                onClick={() => handleDeleteIncome(income.id)}
              >
                x
              </Button>
            </CardContent>
          </Card>
        ))}
      {!incomes && <p>Nenhum ganho...</p>}
      <Modal open={formIsOpen} onOpenChange={setFormISOpen}>
        <ModalTrigger asChild>
          <Button>Cadastrar</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Cadastro de Ganhos</ModalTitle>
            <ModalDescription className='text-sm text-foreground-secondary'>
              Formulario para cadastro de ganhos
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
                  placeholder='Descreva, em poucas palavras, o ganho'
                />
              </FormControl>
              {errors.description && (
                <FormMessage className='text-destructive'>
                  {errors.description?.message}
                </FormMessage>
              )}
            </FormField>
            <FormField name='type' className='mt-2'>
              <FormLabel>Tipo de ganho</FormLabel>
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
                      <SelectItem value='FIXED'>Ganho fixo</SelectItem>
                      <SelectItem value='VARIABLE'>Ganho variável</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            <FormField name='date' className='mt-2'>
              <FormLabel>Data de obtenção</FormLabel>
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
