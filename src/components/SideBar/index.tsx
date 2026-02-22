'use client'
import Link from 'next/link'
import { Button } from '../ui/Button'
import {
  BanknoteArrowUp,
  BanknoteArrowDown,
  HomeIcon,
  CreditCard,
  LogOut
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

const pages = [
  { name: 'Painel', icon: HomeIcon, url: '/painel' },
  { name: 'Renda', icon: BanknoteArrowUp, url: '/ganhos' },
  { name: 'Despesas', icon: BanknoteArrowDown, url: '/despesas' },
  { name: 'Crédito', icon: CreditCard, url: '/cartao-credito' }
  /* { name: 'Promoções', icon: Barcode, url: '/promocoes' } */
]

const SideBar = () => {
  const pathName = usePathname()

  return (
    <>
      {/* desktop */}
      <div
        className={`hidden p-2 bg-card h-full xl:w-60 border-r xl:grid grid-rows-[auto_1fr_auto] fixed left-0`}
      >
        <h1
          className={`w-full text-center pointer-events-none pt-5 flex flex-col gap-3 items-center justify-center`}
        >
          <Image
            src={'/logo.png'}
            alt='logo image'
            width={192}
            height={192}
            className='w-15'
          />
          Tudo Contado
        </h1>
        <div className=' flex flex-col pt-30 gap-3'>
          {pages.map((page, i) => (
            <Link href={page.url} key={i}>
              <Button
                variant='ghost'
                className={`w-full justify-normal xl:pl-8 transition duration-300 ${
                  pathName === page.url && ' bg-button hover:bg-button'
                } `}
              >
                <page.icon />
                {page.name}
              </Button>
            </Link>
          ))}
        </div>
        <Button
          variant='border'
          className='w-full mb-5'
          onClick={() => signOut()}
        >
          <LogOut />
          Sair
        </Button>
      </div>
      {/* mobile */}
      <div className='flex items-center justify-center w-full h-20 z-10 fixed bottom-0 left-0 bg-card xl:hidden border-t'>
        {pages.map((page, i) => (
          <Link href={page.url} className='flex-1' key={i}>
            <div
              className={` flex flex-col items-center gap-1 transition duration-300 ${
                pathName !== page.url && 'text-foreground-secondary  scale-90'
              }`}
            >
              <page.icon strokeWidth={1.2} />
              <span className='text-[12px]'>{page.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export { SideBar }
