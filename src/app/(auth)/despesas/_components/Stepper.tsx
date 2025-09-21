import { Check } from 'lucide-react'

const stepStage = ['Geral', 'Pagamento', 'Datas', 'Status']

export const Stepper = ({ step }: { step: number }) => {
  return (
    <div className=' flex justify-center text-sm text-foreground-secondary'>
      {stepStage.map((stage, index) => (
        <div
          key={stage}
          className='relative flex flex-col items-center justify-center flex-1 gap-2'
        >
          {index !== stepStage.length - 1 && (
            <div
              className={`absolute top-2 left-1/2 w-full h-[2px] ${
                step > index + 1 ? 'bg-button' : 'bg-foreground-secondary'
              } `}
            />
          )}
          <div
            className={`size-5 flex items-center justify-center ${
              step > index + 1
                ? 'bg-button ring-2 ring-button'
                : step === index + 1
                ? 'bg-foreground ring-2 border-3 ring-info'
                : 'bg-foreground-secondary ring-6 ring-card'
            } rounded-full z-10`}
          >
            <Check
              strokeWidth={3}
              className={`text-foreground size-4 ${
                step <= index + 1 && 'hidden'
              }`}
            />
          </div>
          <span className='text-[11px]'>{'Etapa ' + (index + 1)}</span>
          <span
            className={`font-montserrat ${
              step === index + 1 && 'text-foreground'
            }`}
          >
            {stage}
          </span>
          <span className='text-[11px]'>
            {step > index + 1
              ? 'Completo'
              : index + 1 === step
              ? 'Em progr...'
              : 'Pendente'}
          </span>
        </div>
      ))}
    </div>
  )
}
