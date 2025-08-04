import { Textarea } from '@/components/ui/Textarea'
import { Controller, useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
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
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Send, Wallet } from 'lucide-react'
import { incomeSchema, incomeType } from '@/validators/formIncome'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePostIncome } from '../hooks/use-post-income'

export const ModalPostIncome = ({
  children
}: {
  children: React.ReactNode
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<incomeType>({
    resolver: zodResolver(incomeSchema)
  })

  const { isOpen, setIsOpen, onSubmit, isPending } = usePostIncome()

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Cadastro de Ganhos</ModalTitle>
          <ModalDescription className='text-sm text-foreground-secondary'>
            Formulario para cadastro de ganhos
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
                placeholder='Descreva, em poucas palavras, o ganho'
              />
            </FormControl>
            {errors.description && (
              <FormMessage className='text-destructive'>
                {errors.description?.message}
              </FormMessage>
            )}
          </FormField>
          <FormField name='type'>
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
          <FormField name='date'>
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
          <FormSubmit
            asChild
            className='w-full lg:w-fit mt-5 lg:justify-self-end'
          >
            <Button disabled={isPending}>
              {isPending ? 'Cadastrando...' : 'Cadastrar nova renda'}
              <Send />
            </Button>
          </FormSubmit>
        </Form>
      </ModalContent>
    </Modal>
  )
}
