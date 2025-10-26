'use client'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import {
  ArrowRight,
  ClipboardCheck,
  CreditCard,
  FileText,
  Tags
} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Stepper } from './Stepper'
import Image from 'next/image'

type FormStepZeroProps = {
  onNext: Dispatch<SetStateAction<number>>
  typed: 'ao cadastro' | 'a atualização'
}

export const FormStepZero = ({ onNext, typed }: FormStepZeroProps) => {
  return (
    <div>
      <h1>Bem vindo {typed} de despesas.</h1>
      <p className='text-sm text-foreground-secondary'>
        Aqui você pode cadastrar ou atualizar a despesa seguindo o passo à passo
        abaixo.
      </p>
      <Divider className='mt-2' />
      <div className='flex items-center gap-20 justify-between py-5 lg:py-10'>
        <Image
          src='/manage-money.svg'
          alt='desenho de varias representações financeiras.'
          width={1234}
          height={945}
          className='hidden lg:block size-80 grayscale-50'
        />
        <div className='ml-8 lg:ml-0 relative gap-5 lg:h-80 grid text-balance'>
          <div className='absolute -left-6 top-1/2 -translate-y-1/2 h-[90%] w-[1px] bg-foreground-secondary'>
            <div className='absolute inset-0 -translate-x-1/2 size-3 bg-foreground rounded-full' />
            <div className='absolute inset-1/3 -translate-y-1/3 -translate-x-1/2 size-3 bg-foreground rounded-full' />
            <div className='absolute top-2/3 -translate-y-2/3 -translate-x-1/2 size-3 bg-foreground rounded-full' />
            <div className='absolute bottom-0 -translate-x-1/2 size-3 bg-foreground rounded-full' />
          </div>
          <div className='flex flex-col gap-2 place-content-center'>
            <div className='flex gap-2'>
              <FileText strokeWidth={1.5} size={22} />
              <h2>Geral</h2>
            </div>
            <p className='text-[13px] text-foreground-secondary'>
              Valor, descrição e data.
            </p>
          </div>
          <div className='flex flex-col gap-2 place-content-center'>
            <div className='flex gap-2'>
              <Tags strokeWidth={1.5} size={22} />
              <h2>Categoria</h2>
            </div>
            <p className='text-[13px] text-foreground-secondary'>
              Categoria da despesa.
            </p>
          </div>
          <div className='flex flex-col gap-2 place-content-center'>
            <div className='flex gap-2'>
              <CreditCard strokeWidth={1.5} size={22} />
              <h2>Pagamento</h2>
            </div>
            <p className='text-[13px] text-foreground-secondary'>
              Crédito ou débito e dados do cartão.
            </p>
          </div>
          <div className='flex flex-col gap-2 place-content-center'>
            <div className='flex gap-2'>
              <ClipboardCheck strokeWidth={1.5} size={22} />
              <h2>Resumo</h2>
            </div>
            <p className='text-[13px] text-foreground-secondary'>
              Confirmação dos dados antes de enviar.
            </p>
          </div>
        </div>
      </div>
      <Stepper step={1} />
      <Button
        className='mt-3 justify-self-end'
        type='submit'
        onClick={() => onNext(prev => prev + 1)}
      >
        Começar
        <ArrowRight />
      </Button>
    </div>
  )
}
