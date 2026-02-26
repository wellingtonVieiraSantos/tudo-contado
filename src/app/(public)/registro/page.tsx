import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import FormRegister from './_components/FormRegister'
import { Divider } from '@/components/ui/Divider'
import { Button } from '@/components/ui/Button'
import { Form } from '@/components/ui/Form'
import Image from 'next/image'
import { signIn } from '../../../../auth'

export default function RegisterUser() {
  return (
    <div className='size-full flex flex-col justify-center p-3'>
      <Card className='w-full max-w-lg m-auto lg:p-8 py-3'>
        <CardHeader>
          <CardTitle className='text-xl text-center'>
            Bem-vindo ao Tudo Contado
          </CardTitle>
          <CardDescription className='text-center lg:text-left'>
            Preencha os campos abaixo para ter acesso ao app
          </CardDescription>
          <Divider className='mt-2 bg-gradient-to-r from-transparent via-foreground-secondary to-transparent' />
        </CardHeader>
        <CardContent>
          <FormRegister />
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
