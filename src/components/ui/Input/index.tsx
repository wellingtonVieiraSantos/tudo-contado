import { Eye, EyeOff, LucideIcon } from 'lucide-react'
import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'number' | 'password' | 'email' | 'search'
  icon?: LucideIcon
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type = 'text', icon: Icon, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      <div className='relative w-full'>
        <input
          type={showPassword ? 'text' : type}
          name={id}
          id={id}
          ref={ref}
          className={twMerge(
            `w-full h-9 text-sm appearance-none border rounded-full lg:rounded placeholder:text-sm
           no-spinner peer disabled:bg-disabled disabled:cursor-not-allowed disabled:text-foreground-secondary`,
            Icon ? 'px-10' : 'pl-2 pr-8',
            className
          )}
          {...props}
        />
        {type === 'password' &&
          (showPassword ? (
            <Eye
              className={`size-4 absolute bottom-2.5 right-3 `}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOff
              className={`size-4 absolute bottom-2.5 right-3`}
              onClick={() => setShowPassword(true)}
            />
          ))}
        {Icon && (
          <Icon
            className={`size-4.5 absolute bottom-2.5 left-3 pointer-events-none peer-disabled:text-foreground-secondary`}
          />
        )}
      </div>
    )
  }
)

Input.displayName = 'input'

export { Input }
