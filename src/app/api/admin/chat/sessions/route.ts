import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAuthorizedAdminRequest } from "@/lib/admin/cloudflare-access";

export async function GET(req: NextRequest) {
  const isLocalDev = process.env.NODE_ENV === "development";
  if (!isLocalDev && !(await isAuthorizedAdminRequest(req))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const supabase = createAdminClient();
  const { data: sessions, error } = await supabase
    .from("chat_sessions")
    .select("id, status, mode, created_at, last_message_at")
    .order("last_message_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("admin: failed to list chat sessions", error);
    return NextResponse.json({ error: "Could not load sessions" }, { status: 500 });
  }

  const sessionIds = (sessions ?? []).map((s) => s.id);
  const { data: lastMessages } = sessionIds.length
    ? await supabase
        .from("chat_messages")
        .select("session_id, role, body, created_at")
        .in("session_id", sessionIds)
        .order("created_at", { ascending: false })
    : { data: [] };

  const previewBySession = new Map<string, { role: string; body: string }>();
  for (const m of lastMessages ?? []) {
    if (!previewBySession.has(m.session_id)) {
      previewBySession.set(m.session_id, { role: m.role, body: m.body });
    }
  }

  const enriched = (sessions ?? []).map((s) => ({
    ...s,
    preview: previewBySession.get(s.id) ?? null,
  }));

  return NextResponse.json({ sessions: enriched });
}
