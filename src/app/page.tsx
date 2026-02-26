import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/Card'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, LogIn } from 'lucide-react'

export default function Home() {
  return (
    <>
      <nav className='w-full flex justify-between md:justify-around items-center p-3 md:p-4 fixed top-0 z-20 bg-card'>
        <Image
          src={'/logo.png'}
          alt='logo image'
          width={192}
          height={192}
          className='size-10 xl:size-15'
        />
        <ul className='hidden md:flex justify-center gap-8'>
          <li>Home</li>
          <li>Sobre</li>
          <li>FAQ</li>
          <li>Contato</li>
        </ul>
        <Link href={'/login'}>
          <Button className='px-6 md:px-12'>
            Entrar
            <LogIn />
          </Button>
        </Link>
      </nav>

      <section className='h-full flex flex-col xl:flex-row p-4 lg:p-8 bg-card lg:bg-radial from-disabled via-card to-background'>
        <Card className='flex flex-col justify-center items-center flex-auto xl:flex-1 p-3 bg-transparent border-none gap-8'>
          <CardHeader className='text-center text-6xl lg:text-8xl gap-3 lg:gap-8'>
            <CardTitle>
              Tome o{' '}
              <span className='bg-gradient-to-r from-button to-badge text-transparent bg-clip-text'>
                Controle
              </span>{' '}
              de suas finanças
            </CardTitle>
            <CardDescription className='text-lg lg:text-xl leading-relaxed'>
              Monitore seus gastos, controle seus rendimentos e gerencie de
              forma simple e intuitiva o seu dinheiro de qualquer lugar, de
              forma online e totalmente gratuito.
            </CardDescription>
          </CardHeader>
          <CardContent className='w-full flex items-center'>
            <Link href={'/registro'}>
              <Button size='lg' className='lg:px-30 lg:text-xl w-full'>
                Criar Conta
                <ArrowUpRight />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className='hidden lg:flex items-center justify-center flex-1 drop-shadow-xl drop-shadow-foreground-secondary overflow-hidden'>
          <Image
            src={'/devices.png'}
            alt='celular com imagem da rota painel'
            width={2000}
            height={1219}
          />
        </div>
      </section>
    </>
  )
}
