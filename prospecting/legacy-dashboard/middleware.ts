import { NextRequest, NextResponse } from "next/server";

// HTTP Basic auth gate, active only when DASHBOARD_AUTH ("user:pass") is set.
// Local dev keeps working with no env var; any deployed instance MUST set it —
// server actions run with the service-role key, so an unauthenticated deploy
// hands full pipeline control to anyone with the URL. Interim gate until the
// client-facing Supabase Auth / RBAC work on the roadmap lands.
const CREDS = process.env.DASHBOARD_AUTH ?? "";

// Edge runtime has no node:crypto timingSafeEqual; compare without
// short-circuiting on the first mismatched character instead.
function constantTimeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length === b.length ? 0 : 1;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export function middleware(req: NextRequest) {
  if (!CREDS) return NextResponse.next();

  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    let decoded = "";
    try {
      decoded = atob(header.slice(6));
    } catch {
      // malformed base64 — fall through to 401
    }
    if (decoded && constantTimeEqual(decoded, CREDS)) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="lead-prospecting"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
