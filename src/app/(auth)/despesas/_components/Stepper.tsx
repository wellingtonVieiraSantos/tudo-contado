export const Stepper = ({ step }: { step: number }) => {
  return (
    <div className='w-full h-5 flex items-center my-3 space-x-1'>
      <div className='relative flex-1 h-[3px] bg-foreground-secondary '>
        <div className='absolute size-[5px] bg-card left-1/5 z-10' />
        <div className='absolute size-[5px] bg-card left-2/5 z-10' />
        <div className='absolute size-[5px] bg-card left-3/5 z-10' />
        <div className='absolute size-[5px] bg-card left-4/5 z-10' />
        <div
          className={`w-full absolute inset-0 h-[3px] bg-foreground`}
          style={{ width: `${(step - 1) * 20 + 10}%` }}
        />
      </div>
    </div>
  )
}
