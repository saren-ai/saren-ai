import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Common attack paths bots scan for — 404 them immediately
const BLOCKED_PATH = /\/(\.env|\.git|\.svn|\.htaccess|\.htpasswd|wp-admin|wp-login|wp-content|xmlrpc|phpinfo|phpmyadmin|adminer|administrator|config\.php|setup\.php|install\.php|eval-stdin|shell|webshell|\.aws|\.ssh)(\/|$|\?|\.)/i

function studioRequest(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-is-studio', '1')
  return NextResponse.next({ request: { headers } })
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block scanner/attack paths globally
  if (BLOCKED_PATH.test(pathname)) {
    return new NextResponse(null, { status: 404 })
  }

  // Only gate studio routes past this point
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
  // Run on all routes except Next.js internals and static assets
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
