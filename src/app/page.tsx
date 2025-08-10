'use client'
import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { LogIn, UserPlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session) router.push('/painel')
  }, [session, router])

  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <Card className='bg-background border-none size-full max-w-2xl lg:max-h-1/2 p-8 text-center grid place-items-center'>
        <CardHeader className='gap-8'>
          <CardTitle className='text-4xl lg:text-5xl'>Tudo Contado</CardTitle>
          <CardDescription className='lg:text-lg'>
            Seja bem vindo ao app de controle financeiro tudo contado
          </CardDescription>
        </CardHeader>
        <CardContent className='lg:flex-row w-full gap-4'>
          <Link href={'/login'} className='flex-1'>
            <Button className='w-full text-base'>
              <LogIn />
              Fazer login
            </Button>
          </Link>
          <Link href={'/registro'} className='flex-1'>
            <Button className='w-full text-base' variant='border'>
              <UserPlus />
              Criar uma conta
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
