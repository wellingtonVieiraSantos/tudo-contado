'use client'
import { Card, CardContent } from '@/components/ui/Card'
import { useState } from 'react'
import { ExpenseProps } from '@/types/expense-data-props'
import { expenseSchema } from '@/validators/formExpense'
import { FormStepOne } from '../_components/FormStepOne'
import { FormStepTwo } from '../_components/FormStepTwo'
import { FormStepThree } from '../_components/FormStepThree'
import { FormPostCreditCard } from '../../cartao-credito/_components/FormPostCreditCard'
import { usePostExpense } from '../_hooks/use-post-expense'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'
import { FormStepZero } from '../_components/FormStepZero'
import { FormStepResume } from '../_components/FormStepResume'

export default function Cadastro() {
  const [step, setStep] = useState(1)
  const [formDataCadastro, setFormDataCadastro] = useState<
    Partial<ExpenseProps>
  >({
    value: undefined,
    description: '',
    category: 'OTHER',
    paymentMethod: 'DEBIT',
    creditCardId: undefined,
    installments: undefined,
    date: new Date().toISOString().split('T')[0]
  })

  const { onSubmit, isPending } = usePostExpense()

  const handleNextStep = (data: Partial<ExpenseProps>) => {
    setFormDataCadastro(prev => ({ ...prev, ...data }))
    setStep(prev => prev + 1)
  }

  const handleFinish = () => {
    const result = expenseSchema.safeParse(formDataCadastro)
    if (result.success) {
      onSubmit(result.data)
    } else {
      console.error('Erro de validação final', result.error)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FormStepZero onNext={setStep} typed='ao cadastro' />
      case 2:
        return (
          <FormStepOne
            formData={formDataCadastro}
            onNext={handleNextStep}
            setStep={setStep}
          />
        )
      case 3:
        return (
          <FormStepTwo
            formData={formDataCadastro}
            onNext={handleNextStep}
            setStep={setStep}
          />
        )
      case 4:
        return (
          <FormStepThree
            formData={formDataCadastro}
            onNext={handleNextStep}
            setStep={setStep}
          />
        )
      case 5:
        return (
          <FormStepResume
            formData={formDataCadastro}
            onNext={handleFinish}
            setStep={setStep}
            isPending={isPending}
          />
        )

      case 99:
        return <FormPostCreditCard setStep={setStep} />
      default:
        return null
    }
  }

  return (
    <div className='min-h-full flex flex-col p-3 gap-3 pb-22 lg:pb-3'>
      <div className='h-10 flex items-center gap-6 text-lg'>
        <Link href='/despesas'>
          <Undo2 size={24} />
        </Link>
        <span>Cadastro de despesa</span>
      </div>
      <Card className='w-full m-auto lg:w-3xl'>
        <CardContent className='p-4 w-full'>{renderStep()}</CardContent>
      </Card>
    </div>
  )
}
