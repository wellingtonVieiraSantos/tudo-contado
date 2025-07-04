import type { Metadata } from 'next'
import { Poppins, Montserrat } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'
import { SessionProvider } from 'next-auth/react'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '700']
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['700']
})

export const metadata: Metadata = {
  title: {
    default: 'Controle Financeiro Doméstico',
    template: '%s | Tudo Contado'
  },
  description:
    'Sistema de controle financeiro doméstico, para fins de automação de monitoramento de gastos/ganhos e dispensa.'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='pt-BR'
      suppressHydrationWarning
      className='scroll-smooth scrollbar-custom'
    >
      <body
        className={`w-full min-h-dvh grid grid-flow-col ${montserrat.variable} ${poppins.variable}`}
      >
        <SessionProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  )
}
