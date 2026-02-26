'use client'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export default function OAuthButtons() {
  return (
    <>
      <Button
        variant='border'
        className='w-full gap-4'
        onClick={() => signIn('google', { callbackUrl: '/painel' })}
      >
        <Image
          src={'/google.svg'}
          alt='logo google'
          width={48}
          height={48}
          className='size-6 '
        />
        Entrar com Google
      </Button>

      <Button
        variant='border'
        className='w-full gap-4'
        onClick={() => signIn('github', { callbackUrl: '/painel' })}
      >
        <Image
          src={'/github.svg'}
          alt='logo google'
          width={48}
          height={48}
          className='size-6 invert-100'
        />
        Continuar com Github
      </Button>
    </>
  )
}
