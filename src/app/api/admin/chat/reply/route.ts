import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAuthorizedAdminRequest } from "@/lib/admin/cloudflare-access";

export async function POST(req: NextRequest) {
  const isLocalDev = process.env.NODE_ENV === "development";
  if (!isLocalDev && !(await isAuthorizedAdminRequest(req))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const sessionId = body?.sessionId as string | undefined;
  const replyBody = (body?.message as string | undefined)?.trim();

  if (!sessionId || !replyBody) {
    return NextResponse.json({ error: "Missing sessionId or message" }, { status: 400 });
  }

  const supabase = createAdminClient();

  await supabase.from("chat_messages").insert({
    session_id: sessionId,
    role: "saren",
    body: replyBody,
  });

  await supabase
    .from("chat_sessions")
    .update({ status: "open", last_message_at: new Date().toISOString() })
    .eq("id", sessionId);

  return NextResponse.json({ ok: true });
}
