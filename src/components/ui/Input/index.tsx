import { LucideIcon, X } from 'lucide-react'
import { forwardRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'number' | 'password' | 'email' | 'search'
  icon?: LucideIcon
  handleDelete?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, type = 'text', icon: Icon, handleDelete, className, ...props },
    ref
  ) => {
    return (
      <div className='relative w-full'>
        <input
          type={type}
          name={id}
          id={id}
          ref={ref}
          className={twMerge(
            `w-full h-8 text-sm appearance-none border rounded placeholder:text-sm
           no-spinner peer disabled:bg-disabled disabled:cursor-not-allowed disabled:text-foreground-secondary`,
            Icon ? 'px-10' : 'pl-2 pr-8',
            className
          )}
          {...props}
        />
        <X
          className={`size-4 absolute bottom-2 hidden peer-focus:block cursor-pointer right-2`}
          onMouseDown={handleDelete}
        />
        {Icon && (
          <Icon
            className={`size-4.5 absolute bottom-2 left-2 pointer-events-none peer-disabled:text-foreground-secondary`}
          />
        )}
      </div>
    )
  }
)

Input.displayName = 'input'

export { Input }
