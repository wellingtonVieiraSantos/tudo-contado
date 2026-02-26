import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import FormRegister from './_components/FormRegister'
import { Divider } from '@/components/ui/Divider'
import OAuthButtons from '@/components/OAuthButtons'

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
            <OAuthButtons />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
