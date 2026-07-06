import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service-role key (bypasses RLS).
// Never import this from a "use client" file — it must only be reached via
// server actions (app/actions.ts) or other server-side code paths.
export function supabaseAdmin() {
  if (typeof window !== "undefined") {
    throw new Error("supabaseAdmin() must never run in the browser.");
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
