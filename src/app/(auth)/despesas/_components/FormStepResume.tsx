'use client'
import { Button } from '@/components/ui/Button'
import { Form, FormSubmit } from '@/components/ui/Form'
import { expenseType } from '@/types/expense-data-props'
import { expenseSchema } from '@/validators/formExpense'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Stepper } from './Stepper'
import valueFormatter from '@/lib/valueFormatter'
import { categoryFormatter } from '@/lib/categoryFormatter'
import { paymentStatusFormatter } from '@/lib/paymentStatusFormatter'
import { paymentMethodFormatter } from '@/lib/paymentMethodFormatter'
import { format, parse } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useGetCreditcardById } from '../../cartao-credito/_hooks/use-get-creditcard-by-id'

type FormStepThreeProps = {
  formData: Partial<expenseType>
  onNext: () => void
  setStep: React.Dispatch<React.SetStateAction<number>>
  isPending: boolean
}

export const FormStepResume = ({
  formData,
  onNext,
  setStep,
  isPending
}: FormStepThreeProps) => {
  const { data } = useGetCreditcardById(formData.creditCardId)

  return (
    <div>
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
        <CardDescription>
          Confira os dados e caso estejam corretos, confirme o cadastro.
        </CardDescription>
      </CardHeader>
      <div className='flex flex-col gap-2 lg:px-4'>
        <div className='border rounded py-2 px-3 '>
          <span className='block text-sm text-foreground-secondary'>
            Status de pagamento
          </span>
          <Badge variant='success' className='mt-1'>
            {paymentStatusFormatter(formData.status!)}
          </Badge>
        </div>
        <div className='relative border rounded py-2 px-3 gap-2 grid'>
          <p className='text-xl mt-1'>
            <span className='block text-sm text-foreground-secondary'>
              Valor
            </span>
            {valueFormatter(formData.value!)}
          </p>
          <p>
            <span className='block text-sm text-foreground-secondary'>
              Descrição
            </span>
            {formData.description}
          </p>
          <Badge
            variant='info'
            className='text-right absolute bottom-1/2 translate-y-1/2 right-4'
          >
            {categoryFormatter(formData.category!)}
          </Badge>
        </div>
        <div className=' border rounded py-2 px-3 gap-2 grid'>
          <p className='mt-1'>
            <span className='block text-sm text-foreground-secondary'>
              Metodo de pagamento
            </span>
            {paymentMethodFormatter(formData.paymentMethod!)}
          </p>
          {data && (
            <p className='font-mono'>
              <span className='font-poppins block text-sm text-foreground-secondary'>
                Cartão utilizado
              </span>
              **** **** **** **** {data.lastNumber}
            </p>
          )}
          {formData.installments && (
            <p>
              <span className='block text-sm text-foreground-secondary'>
                Parcelado em
              </span>
              {formData.installments}x
            </p>
          )}
        </div>
        <div className='border rounded py-2 px-3 gap-2 grid'>
          <p className='mt-1'>
            <span className='block text-sm text-foreground-secondary'>
              Data de compra:
            </span>
            {format(
              parse(formData.expenseDate!, 'yyyy-MM-dd', new Date()),
              "dd 'de' MMMM 'de' yyyy",
              { locale: ptBR }
            )}
          </p>
          <p className='mt-1'>
            <span className='block text-sm text-foreground-secondary'>
              Data de Pagamento:
            </span>
            {format(
              parse(formData.expenseDate!, 'yyyy-MM-dd', new Date()),
              "dd 'de' MMMM 'de' yyyy",
              { locale: ptBR }
            )}
          </p>
        </div>
      </div>
      <Stepper step={5} />
      <div className='flex gap-3 justify-between mt-3'>
        <Button variant='border' type='button' onClick={() => setStep(4)}>
          <ArrowLeft />
          Anterior
        </Button>
        <Button
          type='submit'
          disabled={isPending}
          variant={isPending ? 'loading' : 'default'}
          onClick={onNext}
        >
          {isPending ? 'Cadastrando...' : 'Cadastrar'}
          <Send />
        </Button>
      </div>
    </div>
  )
}
