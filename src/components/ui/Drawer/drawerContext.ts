import { createContext, useContext } from 'react'
import { DrawerContentProps } from '.'

const DrawerContext = createContext<DrawerContentProps | null>(null)

const useDrawer = () => {
  const context = useContext(DrawerContext)

  if (!context) {
    throw new Error('useDrawer must be used within a <Drawer />')
  }

  return context
}

export { useDrawer, DrawerContext }
