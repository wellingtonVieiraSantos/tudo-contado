'use client'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
  FormSubmitError
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Lock, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
/* import { Label } from '@/components/ui/Label'
import { Checkbox } from '@/components/ui/Checkbox' */
import { useRegisterUser } from '../_hooks/use-register-user'

export default function FormRegister() {
  const { isPending, onSubmit, handleSubmit, register, errors } =
    useRegisterUser()

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='grid gap-3'>
      <FormField name='name'>
        <FormLabel className='text-[12px]'>Nome</FormLabel>
        <FormControl asChild>
          <Input
            icon={User}
            id='name'
            {...register('name')}
            placeholder='Digite o seu nome'
          />
        </FormControl>
        {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
      </FormField>
      <FormField name='email'>
        <FormLabel className='text-[12px]'>E-mail</FormLabel>
        <FormControl asChild>
          <Input
            icon={Mail}
            id='email'
            {...register('email')}
            placeholder='usuario@exemplo.com'
          />
        </FormControl>
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </FormField>
      <FormField name='password'>
        <FormLabel className='text-[12px]'>Senha</FormLabel>
        <FormControl asChild>
          <Input
            icon={Lock}
            id='password'
            {...register('password')}
            type='password'
            placeholder='**********'
          />
        </FormControl>
        {errors.password && (
          <FormMessage>{errors.password.message}</FormMessage>
        )}
      </FormField>
      <FormField name='confirmPassword'>
        <FormLabel className='text-[12px]'>Confirme senha</FormLabel>
        <FormControl asChild>
          <Input
            icon={Lock}
            id='confirmPassword'
            {...register('confirmPassword')}
            type='password'
            placeholder='**********'
          />
        </FormControl>
        {errors.confirmPassword && (
          <FormMessage>{errors.confirmPassword.message}</FormMessage>
        )}
      </FormField>
      {/* <Label className='text-sm flex-wrap text-foreground-secondary flex-row items-center gap-1'>
        <Checkbox />
        Li e concordo,{' '}
        <Link
          href={'/termos'}
          className='text-foreground hover:underline underline-offset-2'
        >
          termos de uso
        </Link>
      </Label>
      <Label className='text-sm flex-wrap text-foreground-secondary flex-row items-center gap-1'>
        <Checkbox />
        Li e concordo,{' '}
        <Link
          href={'/privacidade'}
          className='text-foreground hover:underline underline-offset-2'
        >
          política de privacidade
        </Link>
      </Label> */}
      {errors.root && <FormSubmitError>{errors.root.message}</FormSubmitError>}
      <FormSubmit asChild>
        <Button
          className='w-full rounded-full lg:rounded'
          disabled={isPending}
          variant={`${isPending ? 'loading' : 'default'}`}
        >
          {isPending ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </FormSubmit>
      <p className=' text-sm text-center pt-2 text-foreground-secondary'>
        Já tem uma conta?{' '}
        <strong className='cursor-pointer'>
          <Link href={'/login'} className='text-foreground'>
            Faça login
          </Link>
        </strong>
      </p>
    </Form>
  )
}
