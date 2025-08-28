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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Send, Wallet } from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'
import { Controller, useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/Checkbox'
import { Label } from '@/components/ui/Label'
import { expenseSchema, expenseType } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePostExpense } from '../_hooks/use-post-expense'

export const ModalPostExpense = ({
  children
}: {
  children: React.ReactNode
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<expenseType>({
    resolver: zodResolver(expenseSchema)
  })

  const { isOpen, setIsOpen, onSubmit, isPending } = usePostExpense()

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Cadastro de Gastos</ModalTitle>
          <ModalDescription className='text-sm text-foreground-secondary'>
            Formulario para cadastro de gastos
          </ModalDescription>
        </ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)} className='grid gap-3'>
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
          <FormField name='description'>
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

          <FormField name='type'>
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
          <FormField name='date'>
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
          <FormField name='category'>
            <FormLabel>Categoria do gasto</FormLabel>
            <Controller
              name='category'
              control={control}
              defaultValue='OTHER'
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='HOUSE'>Moradia</SelectItem>
                    <SelectItem value='FOOD'>Alimentação</SelectItem>
                    <SelectItem value='TRANSPORT'>Transporte</SelectItem>
                    <SelectItem value='EDUCATION'>Educação</SelectItem>
                    <SelectItem value='HEALTH'>Saúde</SelectItem>
                    <SelectItem value='CLOTHING'>Vestuário</SelectItem>
                    <SelectItem value='TECH'>
                      Tecnologia e comunicação
                    </SelectItem>
                    <SelectItem value='PERSONAL_CARE'>
                      Higiene e cuidados pessoais
                    </SelectItem>
                    <SelectItem value='ENTERTAINMENT'>
                      Lazer e entretenimento
                    </SelectItem>
                    <SelectItem value='PETS'>Pets</SelectItem>
                    <SelectItem value='FINANCIAL'>Financeiro</SelectItem>
                    <SelectItem value='OTHER'>Outro</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField name='paid' className='w-fit'>
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
          <FormSubmit
            asChild
            className='w-full lg:w-fit mt-2 lg:justify-self-end'
          >
            <Button disabled={isPending}>
              {isPending ? 'Cadastrando...' : 'Cadastrar nova despesa'}
              <Send />
            </Button>
          </FormSubmit>
        </Form>
      </ModalContent>
    </Modal>
  )
}
