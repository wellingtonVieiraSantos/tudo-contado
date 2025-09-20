'use client'
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger
} from '@/components/ui/Modal'
import { expenseSchema } from '@/validators/formExpense'
import { expenseType } from '@/types/expense-data-props'
import { useEffect, useState } from 'react'
import { Divider } from '@/components/ui/Divider'
import { Stepper } from './Stepper'
import { FormStepOne } from './FormStepOne'
import { FormStepTwo } from './FormStepTwo'
import { FormStepThree } from './FormStepThree'
import { FormStepFour } from './FormStepFour'
import { FormPostCreditCard } from './FormPostCreditCard'

type ModalExpenseProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: expenseType) => Promise<void>
  isPending: boolean
  children?: React.ReactNode
  selectedExpenseUpdate?: expenseType
}

export const ModalExpense = ({
  isOpen,
  setIsOpen,
  onSubmit,
  isPending,
  selectedExpenseUpdate,
  children
}: ModalExpenseProps) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<expenseType>>({
    value: undefined,
    description: '',
    type: 'VARIABLE',
    category: 'OTHER',
    paymentMethod: 'PIX',
    creditCardId: undefined,
    installments: undefined,
    date: new Date(),
    dueDate: new Date(),
    status: 'PAID'
  })

  useEffect(() => {
    if (selectedExpenseUpdate) {
      const cleaned = {
        ...selectedExpenseUpdate,
        installments: selectedExpenseUpdate.installments ?? undefined,
        date: selectedExpenseUpdate.date,

        dueDate: selectedExpenseUpdate.dueDate || new Date()
      }
      setFormData(cleaned)
    }
  }, [selectedExpenseUpdate])

  const handleNextStep = (data: Partial<expenseType>) => {
    setFormData(prev => ({ ...prev, ...data }))
    setStep(prev => prev + 1)
  }

  const handleFinish = (data: Partial<expenseType>) => {
    const result = expenseSchema.safeParse({ ...formData, ...data })
    if (result.success) {
      onSubmit(result.data)
    } else {
      console.error('Erro de validação final', result.error)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FormStepOne formData={formData} onNext={handleNextStep} />
      case 2:
        return (
          <FormStepTwo
            formData={formData}
            onNext={handleNextStep}
            setStep={setStep}
          />
        )
      case 3:
        return (
          <FormStepThree
            formData={formData}
            onNext={handleNextStep}
            setStep={setStep}
          />
        )
      case 4:
        return (
          <FormStepFour
            isPending={isPending}
            formData={formData}
            onNext={handleFinish}
            setStep={setStep}
          />
        )
      case 99:
        return <FormPostCreditCard setStep={setStep} />
      default:
        return null
    }
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={open => {
        if (!open) setStep(1)
        setIsOpen(open)
      }}
    >
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent className='max-h-[50vh] overflow-y-auto'>
        <ModalHeader>
          <ModalTitle>Despesas</ModalTitle>
          <ModalDescription className='text-sm text-foreground-secondary'>
            Cadastre ou atualize seus gastos da forma que desejar.
          </ModalDescription>
        </ModalHeader>
        <Stepper step={step === 99 ? 2 : step} />
        <Divider className='bg-gradient-to-r via-foreground-secondary' />
        {renderStep()}
      </ModalContent>
    </Modal>
  )
}
