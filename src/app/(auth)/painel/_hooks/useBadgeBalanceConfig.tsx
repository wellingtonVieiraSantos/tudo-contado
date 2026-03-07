import { useMemo } from 'react'
import { ChevronDown, ChevronUp, Equal, Search } from 'lucide-react'

export const useBadgeBalanceConfig = (percentage: number | null) => {
  return useMemo(() => {
    if (percentage === null) {
      return {
        variant: 'outline' as const,
        className: 'text-foreground-secondary text-center text-sm',
        message: 'Sem dados'
      }
    }
    if (percentage > 0) {
      return {
        variant: 'success' as const,
        className: '',
        message: `${percentage}%`,
        icon: <ChevronUp size={20} />
      }
    }

    if (percentage < 0) {
      return {
        variant: 'error' as const,
        className: '',
        message: ` ${Math.abs(percentage)}%`,
        icon: <ChevronDown size={20} />
      }
    }

    return {
      variant: 'warning' as const,
      className: '',
      message: `${percentage}%`,
      icon: <Equal size={20} />
    }
  }, [percentage])
}
