import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SequencesClient from "./SequencesClient";

export const metadata = {
  title: "Sequences — Studio",
  robots: { index: false, follow: false },
};

export default async function SequencesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/studio/login");

  const { data: sequences } = await supabase
    .from("sequences")
    .select("*, contacts(id, full_name, company), touches(*)")
    .order("updated_at", { ascending: false });

  const groups: Record<string, typeof sequences> = {};
  for (const seq of sequences ?? []) {
    const play = seq.play ?? "unknown";
    if (!groups[play]) groups[play] = [];
    groups[play]!.push({
      ...seq,
      touches: ((seq.touches ?? []) as typeof seq.touches).sort(
        (a, b) => a.touch_num - b.touch_num
      ),
    });
  }

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-foreground-muted text-xs font-mono mb-1">
            <Link href="/studio" className="hover:text-foreground transition-colors">studio</Link>
            <span className="mx-1">/</span>
            <span className="text-foreground">sequences</span>
          </p>
          <h1 className="text-xl font-bold text-foreground">Sequences</h1>
        </div>
        <span className="text-xs text-foreground-muted font-mono">
          {sequences?.length ?? 0} total
        </span>
      </div>

      <SequencesClient groups={groups as Record<string, NonNullable<typeof sequences>>} />
    </div>
  );
}
