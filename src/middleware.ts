import { NextResponse } from 'next/server'
import { auth } from '../auth'
import { privateRoutes } from './lib/privateRoutes'
import { publicRoutes } from './lib/publicRoutes'

export default auth(async req => {
  const isLogged = !!req.auth

  const isPrivateRoute = privateRoutes.includes(req.nextUrl.pathname)
  const isAuthRoute = publicRoutes.includes(req.nextUrl.pathname)
  const isApiRoute = req.nextUrl.pathname.includes('/api')

  if (isApiRoute) return

  if (!isLogged && isAuthRoute) return

  if (isAuthRoute && isLogged) {
    return NextResponse.redirect(new URL('/painel', req.nextUrl.origin))
  }

  if (!isLogged && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
