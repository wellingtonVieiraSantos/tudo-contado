import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface CarouselContextProps {
  index: number
  setIndex: Dispatch<SetStateAction<number>>
  itemCount: number
  setItemCount: Dispatch<SetStateAction<number>>
  itemsPerView: number
}

const CarouselContext = createContext<CarouselContextProps | null>(null)

const useCarousel = () => {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

export { useCarousel, CarouselContext }
