import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ContactDetailClient from "./ContactDetailClient";
import type { AgentJob } from "@/components/desk/JobTriggers";

export const metadata = {
  title: "Contact — Desk",
  robots: { index: false, follow: false },
};

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/desk/login");

  const jobsQuery = supabase
    .from("agent_jobs")
    .select("id, skill, kind, status, result, error, created_at, finished_at")
    .eq("contact_id", id)
    .order("created_at", { ascending: false })
    .limit(10);

  const [{ data: contact }, { data: sequences }, { data: jobs }, { data: sources }] =
    await Promise.all([
      supabase.from("contacts").select("*").eq("id", id).single(),
      supabase
        .from("sequences")
        .select("*, touches(*)")
        .eq("contact_id", id)
        .order("started_at", { ascending: false }),
      jobsQuery,
      supabase
        .from("contact_sources")
        .select("source, raw, imported_at")
        .eq("contact_id", id)
        .order("imported_at", { ascending: false })
        .limit(5),
    ]);

  if (!contact) notFound();

  const seqsWithSortedTouches = (sequences ?? []).map((seq) => ({
    ...seq,
    touches: (seq.touches ?? []).sort((a, b) => a.touch_num - b.touch_num),
  }));

  // Latest completed research job = the intel brief for this contact.
  const researchJob = (jobs ?? []).find((j) => j.kind === "research" && j.status === "done") ?? null;

  return (
    <ContactDetailClient
      contact={contact}
      sequences={seqsWithSortedTouches}
      jobs={(jobs ?? []) as AgentJob[]}
      researchJob={researchJob as AgentJob | null}
      sources={(sources ?? []) as { source: string | null; raw: Record<string, unknown> | null; imported_at: string | null }[]}
    />
  );
}
