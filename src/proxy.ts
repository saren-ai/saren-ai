import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { extractMain, htmlToMarkdown } from '@/lib/agent-markdown'
import { isAuthorizedAdminRequest } from '@/lib/admin/cloudflare-access'

// Common attack paths bots scan for — 404 them immediately
const BLOCKED_PATH = /\/(\.env|\.git|\.svn|\.htaccess|\.htpasswd|wp-admin|wp-login|wp-content|xmlrpc|phpinfo|phpmyadmin|adminer|administrator|config\.php|setup\.php|install\.php|eval-stdin|shell|webshell|\.aws|\.ssh)(\/|$|\?|\.)/i

// Routes with no meaningful HTML page to convert, or that must never be content-negotiated
const MARKDOWN_EXCLUDED_PREFIXES = ['/desk', '/admin', '/api', '/auth']

function wantsMarkdown(request: NextRequest): boolean {
  const { pathname, searchParams } = request.nextUrl
  if (MARKDOWN_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return false
  }
  if (searchParams.get('format') === 'md') {
    return true
  }
  return /\btext\/markdown\b/i.test(request.headers.get('accept') ?? '')
}

// Rough English-text heuristic (~4 chars/token) — no tokenizer dependency needed for an estimate header
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

// Fetching the public saren.ai domain from inside Vercel round-trips through Cloudflare,
// which challenges the request ("Just a moment...") instead of serving real HTML — every
// markdown response ends up being the challenge page. VERCEL_URL is Vercel's own direct
// deployment host, which bypasses Cloudflare entirely for this internal call. Unset in
// local dev, where the request's own origin is already Cloudflare-free.
function internalFetchOrigin(publicOrigin: string): string {
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : publicOrigin
}

async function serveMarkdown(request: NextRequest): Promise<NextResponse> {
  const upstreamUrl = new URL(request.nextUrl.toString())
  upstreamUrl.searchParams.delete('format')

  const fetchUrl = new URL(
    upstreamUrl.pathname + upstreamUrl.search,
    internalFetchOrigin(upstreamUrl.origin)
  )

  const upstreamRes = await fetch(fetchUrl.toString(), {
    headers: { accept: 'text/html' },
  })
  const html = await upstreamRes.text()
  const { title, body } = extractMain(html)
  // Always resolve relative links/images against the public origin, not the internal
  // fetch origin — a reader outside Vercel needs a URL it can actually reach.
  const markdown = htmlToMarkdown(body, upstreamUrl.origin)
  const heading = title ? `# ${title}\n\n` : ''
  const content = `${heading}${markdown}\n\nSource: ${upstreamUrl.origin}${upstreamUrl.pathname}\n`

  return new NextResponse(content, {
    status: upstreamRes.status,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(estimateTokens(content)),
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      vary: 'Accept, Accept-Encoding',
    },
  })
}

function deskRequest(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-is-desk', '1')
  return NextResponse.next({ request: { headers } })
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block scanner/attack paths globally
  if (BLOCKED_PATH.test(pathname)) {
    return new NextResponse(null, { status: 404 })
  }

  // Agent content negotiation — serve markdown when explicitly requested
  if (wantsMarkdown(request)) {
    return serveMarkdown(request)
  }

  // /admin is gated by Cloudflare Access at the edge — this is defense in
  // depth against the *.vercel.app fallback domain, which bypasses Cloudflare
  // (and therefore Access) entirely. See src/lib/admin/cloudflare-access.ts.
  // `next dev` never runs with NODE_ENV=production, so this bypass can't ship live.
  const isLocalDev = process.env.NODE_ENV === 'development'
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (!isLocalDev && !(await isAuthorizedAdminRequest(request))) {
      return new NextResponse('Forbidden', { status: 403 })
    }
    return NextResponse.next()
  }

  // Only gate desk (admin) routes past this point
  if (!pathname.startsWith('/desk')) {
    return NextResponse.next()
  }

  // Login page is always accessible — still stamp the header
  if (pathname === '/desk/login') {
    return deskRequest(request)
  }

  let response = deskRequest(request)

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
          headers.set('x-is-desk', '1')
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
    loginUrl.pathname = '/desk/login'
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const allowedEmails = ['saren@wethos.ai', 'saren.sakurai@gmail.com', 'saren@saren.ai']
  if (!user.email || !allowedEmails.includes(user.email)) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/desk/login'
    loginUrl.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
