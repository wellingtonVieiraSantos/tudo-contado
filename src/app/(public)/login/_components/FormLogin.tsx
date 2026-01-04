'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
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
import { Button } from '@/components/ui/Button'
import { Lock, User } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { loginSchema, loginUserType } from '@/modules/user/user.login.schema'

export default function FormLogin() {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<loginUserType>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (formData: loginUserType) => {
    setIsPending(true)
    try {
      const res = await signIn('credentials', {
        ...formData,
        redirect: false
      })
      console.log(res)

      setIsPending(false)
      if (res?.error) {
        setError('root', { message: 'E-mail e/ou senha incorretos' })
        return
      } else router.push('/painel')
    } catch {
      setError('root', { message: 'Erro inesperado. Tente novamente.' })
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='grid gap-3'>
      <FormField name='email' className='gap-2'>
        <FormLabel className='text-[12px]'>E-mail</FormLabel>
        <FormControl asChild>
          <Input
            icon={User}
            id='email'
            type='email'
            {...register('email')}
            placeholder='usuario@example.com'
          />
        </FormControl>
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </FormField>
      <FormField name='password' className='gap-2'>
        <FormLabel className='text-[12px]'>Senha</FormLabel>
        <FormControl asChild>
          <Input
            icon={Lock}
            id='password'
            type='password'
            {...register('password')}
            placeholder='**************'
            autoComplete='off'
          />
        </FormControl>
        {errors.password && (
          <FormMessage>{errors.password.message}</FormMessage>
        )}
      </FormField>
      <span className='w-fit justify-self-end cursor-pointer text-sm hover:underline'>
        Esqueceu a senha?
      </span>
      {errors.root && <FormSubmitError>{errors.root.message}</FormSubmitError>}
      <FormSubmit asChild>
        <Button
          variant={`${isPending ? 'loading' : 'default'}`}
          disabled={isPending}
          className='w-full rounded-full lg:rounded'
        >
          {isPending ? 'Conectando...' : 'Entrar'}
        </Button>
      </FormSubmit>
      <p className=' text-sm text-center pt-2 text-foreground-secondary'>
        Não tem uma conta ainda?{' '}
        <strong className='cursor-pointer'>
          <Link href={'/registro'} className='text-foreground'>
            Registre-se
          </Link>
        </strong>
      </p>
    </Form>
  )
}
