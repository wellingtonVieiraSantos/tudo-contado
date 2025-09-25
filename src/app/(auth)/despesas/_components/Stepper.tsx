const stepStage = ['Geral', 'Pagamento', 'Datas', 'Status']

export const Stepper = ({ step }: { step: number }) => {
  return (
    <div className='w-full h-5 flex items-center my-3 space-x-1'>
      <div className='relative flex-1 h-[3px] bg-foreground-secondary '>
        <div className='absolute size-[3px] bg-card left-1/4 z-10' />
        <div className='absolute size-[3px] bg-card left-2/4 z-10' />
        <div className='absolute size-[3px] bg-card left-3/4 z-10' />
        <div
          className={`w-full absolute inset-0 h-[3px] bg-foreground`}
          style={{ width: `${(step - 1) * 25 + 10}%` }}
        />
      </div>
    </div>
  )
}
