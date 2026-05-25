import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_EMAILS = ["saren@wethos.ai", "saren.sakurai@gmail.com", "saren@saren.ai"];

// Simple per-instance rate limiter: max 5 attempts per IP per hour
const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  try {
    const { email, redirectTo } = await request.json() as { email: string; redirectTo: string };

    if (!email || !ALLOWED_EMAILS.includes(email)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      console.error("[send-otp] Supabase error:", error.message, error.status);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unexpected error" },
      { status: 500 }
    );
  }
}
