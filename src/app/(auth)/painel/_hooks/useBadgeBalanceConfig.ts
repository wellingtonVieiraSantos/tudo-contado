import { useMemo } from 'react'

export const useBadgeBalanceConfig = (percentage: number | null) => {
  return useMemo(() => {
    if (percentage === null) {
      return {
        variant: 'outline' as const,
        className: 'text-foreground-secondary text-center text-sm',
        message: 'Mês anterior sem dados'
      }
    }
    if (percentage > 0) {
      return {
        variant: 'success' as const,
        className: '',
        message: `${percentage}% à mais que mês anterior`
      }
    }

    if (percentage < 0) {
      return {
        variant: 'error' as const,
        className: '',
        message: `${Math.abs(percentage)}% à menos que mês anterior`
      }
    }

    return {
      variant: 'warning' as const,
      className: '',
      message: 'Rendimento igual ao mês anterior'
    }
  }, [percentage])
}
