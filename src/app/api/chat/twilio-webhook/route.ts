import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isValidTwilioSignature } from "@/lib/chat/twilio";

const EMPTY_TWIML = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

function twiml() {
  return new NextResponse(EMPTY_TWIML, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

// Saren replies to the SMS notification from his phone; this webhook routes
// that reply back into whichever chat session is currently waiting on him.
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const params: Record<string, string> = {};
  formData.forEach((value, key) => {
    params[key] = String(value);
  });

  const signature = req.headers.get("x-twilio-signature") ?? "";
  const webhookUrl = process.env.CHAT_TWILIO_WEBHOOK_URL ?? "";
  const authToken = process.env.CHAT_TWILIO_AUTH_TOKEN ?? "";

  if (!isValidTwilioSignature(webhookUrl, params, signature, authToken)) {
    return new NextResponse("Invalid signature", { status: 403 });
  }

  const from = params.From;
  const replyBody = (params.Body ?? "").trim();

  if (from !== process.env.CHAT_ADMIN_PHONE || !replyBody) {
    return twiml();
  }

  const supabase = createAdminClient();
  const { data: session } = await supabase
    .from("chat_sessions")
    .select("id")
    .eq("status", "waiting_admin")
    .order("last_message_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (session) {
    await supabase.from("chat_messages").insert({
      session_id: session.id,
      role: "saren",
      body: replyBody,
    });
    await supabase
      .from("chat_sessions")
      .update({ status: "open", last_message_at: new Date().toISOString() })
      .eq("id", session.id);
  }

  return twiml();
}
