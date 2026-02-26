import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import FormLogin from './_components/FormLogin'
import { Divider } from '@/components/ui/Divider'
import OAuthButtons from '@/components/OAuthButtons'

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
          </div>
          <OAuthButtons />
        </CardContent>
      </Card>
    </div>
  )
}
