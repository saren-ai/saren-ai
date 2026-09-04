import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { startOfUtcDayIso } from "@/lib/chat/limits";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createAdminClient();

  const [{ count: waitingChats }, { count: chatsToday }, { count: purchasesToday }, { count: entitlementsToday }] =
    await Promise.all([
      supabase.from("chat_sessions").select("id", { count: "exact", head: true }).eq("status", "waiting_admin"),
      supabase
        .from("chat_sessions")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfUtcDayIso()),
      supabase.from("purchases").select("id", { count: "exact", head: true }).gte("created_at", startOfUtcDayIso()),
      supabase.from("entitlements").select("id", { count: "exact", head: true }).gte("created_at", startOfUtcDayIso()),
    ]);

  // v_pipeline isn't in database.types.ts yet — same justified cast desk/page.tsx uses.
  const sb = supabase as unknown as SupabaseClient;
  const { count: pipelineContacts } = await sb
    .from("v_pipeline")
    .select("contact_id", { count: "exact", head: true });

  return {
    waitingChats: waitingChats ?? 0,
    chatsToday: chatsToday ?? 0,
    purchasesToday: (purchasesToday ?? 0) + (entitlementsToday ?? 0),
    pipelineContacts: pipelineContacts ?? 0,
  };
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-xl font-semibold text-foreground">Overview</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/admin/chat" className="card block p-5">
          <p className="metric-value">{stats.waitingChats}</p>
          <p className="metric-label">Chats waiting on a reply</p>
          <p className="mt-2 text-xs text-foreground-muted">{stats.chatsToday} started today</p>
        </Link>

        <Link href="/admin/purchases" className="card block p-5">
          <p className="metric-value">{stats.purchasesToday}</p>
          <p className="metric-label">Purchases / unlocks today</p>
        </Link>

        <a href="/desk" className="card block p-5">
          <p className="metric-value">{stats.pipelineContacts}</p>
          <p className="metric-label">Contacts in Desk pipeline</p>
          <p className="mt-2 text-xs text-foreground-muted">Open Desk ↗</p>
        </a>
      </div>
    </div>
  );
}
