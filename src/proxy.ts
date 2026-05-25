import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function studioRequest(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-is-studio', '1')
  return NextResponse.next({ request: { headers } })
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only gate studio routes
  if (!pathname.startsWith('/studio')) {
    return NextResponse.next()
  }

  // Login page is always accessible — still stamp the header
  if (pathname === '/studio/login') {
    return studioRequest(request)
  }

  let response = studioRequest(request)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          const headers = new Headers(request.headers)
          headers.set('x-is-studio', '1')
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request: { headers } })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/studio/login'
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const allowedEmails = ['saren@wethos.ai', 'saren.sakurai@gmail.com', 'saren@saren.ai']
  if (!user.email || !allowedEmails.includes(user.email)) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/studio/login'
    loginUrl.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ['/studio/:path*'],
}
