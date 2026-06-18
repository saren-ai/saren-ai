import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import PipelineClient, { type PipelineRow } from "./pipeline/PipelineClient";

export const metadata = {
  title: "Desk — Saren.ai",
  robots: { index: false, follow: false },
};

const CEILING = 10; // Saren's ≤10 sends/day ceiling

export default async function DeskPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/desk/login");

  // v_pipeline isn't in database.types.ts yet (added by migrations 001–003).
  // Regenerate types to type it properly; until then, read via an untyped
  // client view query. (No `any`: a justified single cast.)
  const sb = supabase as unknown as SupabaseClient;
  const { data: pipeRows } = await sb
    .from("v_pipeline")
    .select(
      "contact_id, client, company, full_name, title, segment, fit_score, stage, next_action, next_due, overdue, priority"
    )
    .order("priority", { ascending: true });
  const rows = (pipeRows ?? []) as PipelineRow[];

  // Gamification source: real sent touches over the last 60 days.
  const since = new Date();
  since.setDate(since.getDate() - 60);
  const { data: touchData } = await supabase
    .from("touches")
    .select("sent_at")
    .not("sent_at", "is", null)
    .gte("sent_at", since.toISOString());

  const days = new Set(
    (touchData ?? []).map((t) => (t.sent_at as string).slice(0, 10))
  );
  const today = new Date().toISOString().slice(0, 10);
  const sentToday = (touchData ?? []).filter(
    (t) => (t.sent_at as string).slice(0, 10) === today
  ).length;

  let streak = 0;
  const cursor = new Date();
  if (!days.has(today)) cursor.setDate(cursor.getDate() - 1);
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Which contacts have a completed research job?
  const contactIds = rows.map((r) => r.contact_id);
  const { data: researchJobs } = contactIds.length
    ? await supabase
        .from("agent_jobs")
        .select("contact_id")
        .in("contact_id", contactIds)
        .eq("kind", "research")
        .eq("status", "done")
    : { data: [] };
  const researchedIds = new Set((researchJobs ?? []).map((j) => j.contact_id as string));

  const clients = [...new Set(rows.map((r) => r.client).filter(Boolean))].sort();

  return (
    <PipelineClient
      userEmail={user.email ?? ""}
      rows={rows}
      clients={clients as string[]}
      sentToday={sentToday}
      streak={streak}
      ceiling={CEILING}
      researchedIds={researchedIds}
    />
  );
}
