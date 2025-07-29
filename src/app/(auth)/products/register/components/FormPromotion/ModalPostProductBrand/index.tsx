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
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from '@/components/ui/Modal'
import { LucideIcon, Plus, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'

type ModalFormProps = {
  label: string
  icon: LucideIcon
  onSubmit: (value: string) => Promise<void>
}

export default function ModalPostProductBrand({
  label,
  icon: Icon,
  onSubmit
}: ModalFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ name: string }>()
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant='border' className='w-full'>
          <Plus />
          Cadastrar {label}
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle className='text-lg'>Novo/a {label}</ModalTitle>
          <ModalDescription className='text-sm text-foreground-secondary'>
            Não encontrou {label} cadastrado ainda, cadastre e continue.
          </ModalDescription>
        </ModalHeader>
        <Form
          className='grid gap-2'
          onSubmit={handleSubmit(async ({ name }) => {
            await onSubmit(name)
            reset()
          })}
        >
          <FormField name={'name'}>
            <FormLabel className='text-sm'>
              Qual o nome do/a {label.toUpperCase()}?
            </FormLabel>
            <FormControl asChild>
              <Input
                {...register('name', { required: 'Campo é obrigatório' })}
                icon={Icon}
                placeholder={`Digite o nome do/a ${label} de forma clara`}
              />
            </FormControl>
            {errors.name && (
              <FormMessage className='text-destructive'>
                {errors.name?.message}
              </FormMessage>
            )}
          </FormField>

          <FormSubmit asChild className='w-full mt-4'>
            <Button>
              Cadastrar {label}
              <Send />
            </Button>
          </FormSubmit>
        </Form>
      </ModalContent>
    </Modal>
  )
}
