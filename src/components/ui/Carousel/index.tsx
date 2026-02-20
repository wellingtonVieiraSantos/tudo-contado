'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Children, forwardRef, useEffect, useState } from 'react'
import { useCarousel, CarouselContext } from './carouselContext'
import { twMerge } from 'tailwind-merge'

const Carousel = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { itemsPerView?: number }
>(({ className, itemsPerView = 1, ...props }, ref) => {
  const [index, setIndex] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  return (
    <CarouselContext.Provider
      value={{ index, setIndex, itemCount, setItemCount, itemsPerView }}
    >
      <div
        tabIndex={0}
        className={twMerge(
          `relative w-full h-fit overflow-hidden group`,
          className
        )}
        onKeyDown={e => {
          if (e.key === 'ArrowLeft') {
            setIndex(i =>
              i > 0 ? i - 1 : Math.ceil(itemCount / itemsPerView) - 1
            )
          } else if (e.key === 'ArrowRight') {
            setIndex(i => (i + 1) % Math.ceil(itemCount / itemsPerView))
          }
        }}
        ref={ref}
        {...props}
      />
    </CarouselContext.Provider>
  )
})

Carousel.displayName = 'Carousel'

const CarouselContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, children, ...props }, ref) => {
  const { index, itemCount, setItemCount, itemsPerView } = useCarousel()

  useEffect(() => {
    setItemCount(Children.count(children))
  }, [children, setItemCount])

  return (
    <div
      className={twMerge(
        `h-full flex transition-transform duration-300`,
        className
      )}
      style={{
        transform: `translateX(-${
          index * (100 / (itemCount / itemsPerView))
        }%)`,
        width: `${(itemCount / itemsPerView) * 100}%`
      }}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

CarouselContent.displayName = 'CarouselContent'

const CarouselItem = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const { itemCount } = useCarousel()
  return (
    <div
      className={twMerge(`bg-card`, className)}
      style={{
        width: `${100 / itemCount}%`
      }}
      ref={ref}
      {...props}
    />
  )
})

CarouselItem.displayName = 'CarouselItem'

const CarouselControlLeft = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const { setIndex, itemCount, itemsPerView } = useCarousel()
  return (
    <div
      className={twMerge(
        `absolute left-1 top-1/2 -translate-y-1/2 hidden group-hover:block`,
        className
      )}
      ref={ref}
      {...props}
    >
      <ChevronLeft
        className={twMerge(
          `size-10 cursor-pointer text-foreground-secondary`,
          className
        )}
        onClick={() =>
          setIndex(i =>
            i > 0 ? i - 1 : Math.ceil(itemCount / itemsPerView) - 1
          )
        }
      />
    </div>
  )
})

CarouselControlLeft.displayName = 'CarouselControlLeft'

const CarouselControlRight = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const { setIndex, itemCount, itemsPerView } = useCarousel()
  return (
    <div
      className={twMerge(
        `absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:block`,
        className
      )}
      ref={ref}
      {...props}
    >
      <ChevronRight
        className={twMerge(
          `size-10 cursor-pointer text-foreground-secondary`,
          className
        )}
        onClick={() =>
          setIndex(i => (i + 1) % Math.ceil(itemCount / itemsPerView))
        }
      />
    </div>
  )
})

CarouselControlRight.displayName = 'CarouselControlRight'

const CarouselControlMiniature = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => {
  const { index, setIndex, itemCount, itemsPerView } = useCarousel()
  return (
    <div
      className={twMerge(
        `w-full h-12 absolute flex justify-center items-center gap-1 bottom-0
        bg-gradient-to-t from-black/50 to-transparent`,
        className
      )}
      ref={ref}
      {...props}
    >
      {Array.from({ length: Math.ceil(itemCount / itemsPerView) }).map(
        (_, i) => (
          <div
            key={i}
            className={twMerge(
              `h-3 w-3 cursor-pointer rounded-full transition duration-300`,
              index === i
                ? 'bg-button-foreground w-8'
                : 'bg-button-foreground/60',
              className
            )}
            onClick={() => setIndex(i)}
          />
        )
      )}
    </div>
  )
})

CarouselControlMiniature.displayName = 'CarouselControlMiniature'

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselControlLeft,
  CarouselControlRight,
  CarouselControlMiniature
}
