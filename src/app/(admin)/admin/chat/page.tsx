import { createAdminClient } from "@/lib/supabase/admin";
import ChatAdminClient, { type ChatSessionRow } from "./ChatAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminChatPage() {
  const supabase = createAdminClient();
  const { data: sessions } = await supabase
    .from("chat_sessions")
    .select("id, status, mode, created_at, last_message_at")
    .order("last_message_at", { ascending: false })
    .limit(50);

  return <ChatAdminClient initialSessions={(sessions ?? []) as ChatSessionRow[]} />;
}
