'use client'
import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session) router.push('/painel')
  }, [session, router])

  return (
    <div className=' h-screen w-full overflow-hidden bg-radial to-background from-border'>
      <div className='w-full flex justify-between items-center p-2 md:p-4'>
        <Image
          src={'/logo.png'}
          alt='logo image'
          width={192}
          height={192}
          className='w-10 md:w-12'
        />
        <ul className='hidden flex-1 md:flex justify-center gap-8'>
          <li>Home</li>
          <li>Sobre</li>
          <li>FAQ</li>
          <li>Contato</li>
        </ul>
        <Link href={'/login'}>
          <Button className='lg:px-5 lg:rounded-full'>Entrar</Button>
        </Link>
      </div>
      <div className='flex flex-col lg:flex-row h-full'>
        <Card className='flex-1 border-none text-center lg:text-left bg-transparent size-full p-3 lg:p-8 grid md:place-content-center md:gap-12'>
          <CardHeader className='gap-3 md:gap-12'>
            <CardTitle className='text-4xl md:text-8xl tracking-wide lg:-mt-20'>
              Tome o{' '}
              <span className='bg-gradient-to-r from-button to-badge text-transparent bg-clip-text'>
                Controle
              </span>{' '}
              de suas finanças
            </CardTitle>
            <CardDescription className='text-base md:text-2xl'>
              Monitore seus gastos, controle seus rendimentos e gerencie de
              forma simple e intuitiva o seu dinheiro com esse aplicativo web
              totalmente gratuito.
            </CardDescription>
          </CardHeader>
          <CardContent className='w-full flex'>
            <Link href={'/registro'}>
              <Button
                size='lg'
                className='h-10 lg:h-13 lg:px-30 lg:rounded-full text-xl w-full lg:w-auto'
              >
                Começar
                <ArrowUpRight />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <div className='h-full relative flex items-center flex-1'>
          <Image
            src={'/mobile-painel.png'}
            alt='celular com imagem da rota painel'
            width={1152}
            height={896}
            className='hidden lg:flex size-200 object-cover z-10 xl:translate-x-55 drop-shadow-lg drop-shadow-foreground-secondary'
          />
          <Image
            src={'/mobile-ganhos.png'}
            alt='celular com imagem da rota ganhos'
            width={669}
            height={1280}
            className='w-full lg:hidden xl:flex size-180 object-contain absolute lg:-left-35 -top-12 md:top-20 drop-shadow-lg drop-shadow-foreground-secondary '
          />
        </div>
      </div>
    </div>
  )
}
