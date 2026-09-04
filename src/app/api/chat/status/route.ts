import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { GLOBAL_DAILY_SESSION_CAP, OFFLINE_MESSAGE, startOfUtcDayIso } from "@/lib/chat/limits";

export async function GET() {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("chat_sessions")
    .select("id", { count: "exact", head: true })
    .gte("created_at", startOfUtcDayIso());

  if (error) {
    console.error("chat: status check failed", error);
    return NextResponse.json({ available: true });
  }

  const available = (count ?? 0) < GLOBAL_DAILY_SESSION_CAP;
  return NextResponse.json(
    { available, message: available ? undefined : OFFLINE_MESSAGE },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
