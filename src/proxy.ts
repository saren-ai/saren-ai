import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { extractMain, htmlToMarkdown } from '@/lib/agent-markdown'

// Common attack paths bots scan for — 404 them immediately
const BLOCKED_PATH = /\/(\.env|\.git|\.svn|\.htaccess|\.htpasswd|wp-admin|wp-login|wp-content|xmlrpc|phpinfo|phpmyadmin|adminer|administrator|config\.php|setup\.php|install\.php|eval-stdin|shell|webshell|\.aws|\.ssh)(\/|$|\?|\.)/i

// Routes with no meaningful HTML page to convert, or that must never be content-negotiated
const MARKDOWN_EXCLUDED_PREFIXES = ['/desk', '/api', '/auth']

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

async function serveMarkdown(request: NextRequest): Promise<NextResponse> {
  const upstreamUrl = new URL(request.nextUrl.toString())
  upstreamUrl.searchParams.delete('format')

  const upstreamRes = await fetch(upstreamUrl.toString(), {
    headers: { accept: 'text/html' },
  })
  const html = await upstreamRes.text()
  const { title, body } = extractMain(html)
  const markdown = htmlToMarkdown(body, upstreamUrl.origin)
  const heading = title ? `# ${title}\n\n` : ''
  const content = `${heading}${markdown}\n\nSource: ${upstreamUrl.origin}${upstreamUrl.pathname}\n`

  return new NextResponse(content, {
    status: upstreamRes.status,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(estimateTokens(content)),
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
