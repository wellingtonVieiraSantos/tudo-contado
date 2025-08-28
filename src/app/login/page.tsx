import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { signIn } from '../../../auth'
import FormLogin from './_components/FormLogin'
import Form from 'next/form'
import { Divider } from '@/components/ui/Divider'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export default async function Login() {
  return (
    <div className='size-full flex flex-col justify-center p-3'>
      <Card className='w-full max-w-lg m-auto lg:p-8 py-3'>
        <CardHeader>
          <CardTitle className='text-xl text-center'>
            Bem-vindo de volta
          </CardTitle>
          <CardDescription className=' text-center lg:text-left'>
            Digite seu e-mail e senha abaixo e faça o login.
          </CardDescription>
          <Divider className='mt-2 bg-gradient-to-r from-transparent via-foreground-secondary to-transparent' />
        </CardHeader>
        <CardContent>
          <FormLogin />
          <div className='pt-2 grid gap-3'>
            <div className='flex items-center gap-2 text-sm text-foreground-secondary text-center'>
              <Divider className='flex-1 bg-gradient-to-r from-transparent to-foreground-secondary' />{' '}
              <span>ou</span>{' '}
              <Divider className='flex-1 bg-gradient-to-l from-transparent to-foreground-secondary' />
            </div>
            <Form
              action={async () => {
                'use server'
                await signIn('google', { redirectTo: '/painel' })
              }}
              className='flex-1'
            >
              <Button type='submit' variant='border' className='w-full gap-4'>
                <Image
                  src={'/google.svg'}
                  alt='logo google'
                  width={48}
                  height={48}
                  className='size-6 '
                />
                Entrar com Google
              </Button>
            </Form>
            <Form
              action={async () => {
                'use server'
                await signIn('github', { redirectTo: '/painel' })
              }}
              className='flex-1'
            >
              <Button type='submit' variant='border' className='w-full gap-4'>
                <Image
                  src={'/github.svg'}
                  alt='logo google'
                  width={48}
                  height={48}
                  className='size-6 invert-100'
                />
                Continuar com Github
              </Button>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
