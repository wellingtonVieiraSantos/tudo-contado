import { NextResponse } from 'next/server'
import { auth } from '../auth'
import { privateRoutes } from './data/privateRoutes'
import { publicRoutes } from './data/publicRoutes'

export default auth(async req => {
  const isLogged = !!req.auth

  const isPrivateRoute = privateRoutes.includes(req.nextUrl.pathname)
  const isAuthRoute = publicRoutes.includes(req.nextUrl.pathname)
  const isApiRoute = req.nextUrl.pathname.includes('/api')

  if (isApiRoute) return

  if (!isLogged && isAuthRoute) return

  if (isAuthRoute && isLogged) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl.origin))
  }

  if (!isLogged && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
