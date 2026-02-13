import { CreditCardDeactivateProps } from '@/types/creditcard-data-props'
import Image from 'next/image'

export default function CardCreditFrontInfo({
  data
}: {
  data: CreditCardDeactivateProps
}) {
  return (
    <div
      key={data.id}
      className={`relative m-auto h-45 w-full max-w-max aspect-video rounded-xl bg-radial
                from-sky-800 border border-disabled`}
    >
      <Image
        src={'/chip.png'}
        alt='chip cartão de crédito'
        width={512}
        height={512}
        className='w-10 absolute top-3 left-5'
      />
      <Image
        src={cardBrand.find(b => b.title === data?.cardBrand)?.url ?? ''}
        alt='bandeira do cartão de crédito'
        width={512}
        height={512}
        className='w-16 absolute top-0 right-5'
      />
      <div className='text-xl lg:text-base xl:text-xl absolute bottom-18 left-9 font-mono tracking-wider'>
        **** **** **** {data?.lastNumber}
      </div>
      <div className='absolute bottom-3 left-7 flex flex-col'>
        <span className='opacity-70 text-[12px]'>Titular</span>
        <span>{data?.holder.toUpperCase()}</span>
      </div>
      <div className='absolute bottom-3 right-7 flex flex-col'>
        <span className='opacity-70 text-[12px]'>Expira</span>
        <span>
          {data?.expMonth} / {data?.expYear}
        </span>
      </div>
    </div>
  )
}
