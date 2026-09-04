import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isRateLimited } from "@/lib/rate-limit";
import { isNightMode } from "@/lib/chat/night-mode";
import { sendSms } from "@/lib/chat/twilio";
import { verifyTurnstileToken } from "@/lib/chat/turnstile";
import { isSpammy } from "@/lib/chat/spam-filter";
import { generateNightReply } from "@/lib/chat/ai-reply";
import {
  GLOBAL_DAILY_SESSION_CAP,
  IP_DAILY_LIMIT_MESSAGE,
  IP_DAILY_MESSAGE_LIMIT,
  MAX_MESSAGE_LENGTH,
  OFFLINE_MESSAGE,
  SESSION_MESSAGE_LIMIT,
  SESSION_RATE_LIMIT_MESSAGE,
  SESSION_WINDOW_SECONDS,
  SPAM_BLOCKED_MESSAGE,
  startOfUtcDayIso,
} from "@/lib/chat/limits";
import type { ChatMessageRow, ChatSendResponse } from "@/lib/chat/types";

const HISTORY_LIMIT = 30;
const FALLBACK_NIGHT_REPLY =
  "Sorry — having trouble reaching the AI assistant right now. Saren will follow up personally in the morning.";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Cheap in-memory burst gate, first line of defense before anything else runs.
  if (isRateLimited(`chat-send:${ip}`)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { sessionId, message, honeypot, turnstileToken } = body as {
    sessionId?: string;
    message?: string;
    honeypot?: string;
    turnstileToken?: string;
  };

  // Bots tend to fill every field — a legit visitor never touches this one.
  // Report fake success so the bot doesn't learn to skip it.
  if (honeypot) {
    return NextResponse.json({ sessionId: sessionId ?? "", mode: "day" } satisfies ChatSendResponse);
  }

  const validHuman = await verifyTurnstileToken(turnstileToken, ip);
  if (!validHuman) {
    return NextResponse.json({ error: "Verification failed" }, { status: 403 });
  }

  const trimmed = (message ?? "").trim().slice(0, MAX_MESSAGE_LENGTH);
  if (!trimmed) {
    return NextResponse.json({ error: "Empty message" }, { status: 400 });
  }

  if (isSpammy(trimmed)) {
    return NextResponse.json({ error: "blocked", message: SPAM_BLOCKED_MESSAGE }, { status: 422 });
  }

  const supabase = createAdminClient();
  const night = isNightMode();
  const nowIso = new Date().toISOString();
  const todayStartIso = startOfUtcDayIso();

  let activeSessionId = sessionId;
  if (!activeSessionId) {
    const { count: sessionsToday } = await supabase
      .from("chat_sessions")
      .select("id", { count: "exact", head: true })
      .gte("created_at", todayStartIso);

    if ((sessionsToday ?? 0) >= GLOBAL_DAILY_SESSION_CAP) {
      return NextResponse.json({ offline: true, message: OFFLINE_MESSAGE }, { status: 503 });
    }

    const { data, error } = await supabase
      .from("chat_sessions")
      .insert({ mode: night ? "night" : "day" })
      .select("id")
      .single();

    if (error || !data) {
      console.error("chat: failed to create session", error);
      return NextResponse.json({ error: "Could not start session" }, { status: 500 });
    }
    activeSessionId = data.id;
  }

  const windowStartIso = new Date(Date.now() - SESSION_WINDOW_SECONDS * 1000).toISOString();
  const { count: recentCount } = await supabase
    .from("chat_messages")
    .select("id", { count: "exact", head: true })
    .eq("session_id", activeSessionId)
    .eq("role", "visitor")
    .gte("created_at", windowStartIso);

  if ((recentCount ?? 0) >= SESSION_MESSAGE_LIMIT) {
    return NextResponse.json({ error: "rate_limited", message: SESSION_RATE_LIMIT_MESSAGE }, { status: 429 });
  }

  const { count: ipCountToday } = await supabase
    .from("chat_messages")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .eq("role", "visitor")
    .gte("created_at", todayStartIso);

  if ((ipCountToday ?? 0) >= IP_DAILY_MESSAGE_LIMIT) {
    return NextResponse.json({ error: "rate_limited", message: IP_DAILY_LIMIT_MESSAGE }, { status: 429 });
  }

  await supabase.from("chat_messages").insert({
    session_id: activeSessionId,
    role: "visitor",
    body: trimmed,
    ip,
  });

  if (night) {
    const { data: history } = await supabase
      .from("chat_messages")
      .select("id, role, body, created_at")
      .eq("session_id", activeSessionId)
      .order("created_at", { ascending: true })
      .limit(HISTORY_LIMIT);

    let reply: string;
    try {
      // role is a checked text column ("visitor" | "saren" | "ai") — narrower
      // than database.types.ts's plain `string`.
      reply = await generateNightReply((history ?? []) as ChatMessageRow[]);
    } catch (err) {
      console.error("chat: night-mode AI reply failed", err);
      reply = FALLBACK_NIGHT_REPLY;
    }

    await supabase.from("chat_messages").insert({
      session_id: activeSessionId,
      role: "ai",
      body: reply,
    });
    await supabase
      .from("chat_sessions")
      .update({ mode: "night", status: "open", last_message_at: nowIso })
      .eq("id", activeSessionId);

    return NextResponse.json({ sessionId: activeSessionId, mode: "night" } satisfies ChatSendResponse);
  }

  await supabase
    .from("chat_sessions")
    .update({ mode: "day", status: "waiting_admin", last_message_at: nowIso })
    .eq("id", activeSessionId);

  const adminPhone = process.env.CHAT_ADMIN_PHONE;
  if (adminPhone) {
    try {
      await sendSms(
        adminPhone,
        `saren.ai chat:\n"${trimmed.slice(0, 300)}"\n\nReply to this text to answer.`
      );
    } catch (err) {
      console.error("chat: Twilio notify failed", err);
    }
  }

  return NextResponse.json({ sessionId: activeSessionId, mode: "day" } satisfies ChatSendResponse);
}
