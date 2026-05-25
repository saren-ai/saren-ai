import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_EMAILS = ["saren@wethos.ai", "saren.sakurai@gmail.com", "saren@saren.ai"];

export async function POST(request: NextRequest) {
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
