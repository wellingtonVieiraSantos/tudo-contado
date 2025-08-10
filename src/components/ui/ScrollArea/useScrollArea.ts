import { useRef, useState } from 'react'

export default function useScrollArea() {
  const [start, setIsStart] = useState(true)
  const [end, setIsEnd] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const start = el.scrollLeft === 0
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth

    setIsStart(start)
    setIsEnd(end)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return { start, end, handleScroll, scroll, scrollRef }
}
