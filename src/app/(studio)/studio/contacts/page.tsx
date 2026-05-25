import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import StatusPill from "@/components/studio/StatusPill";
import RelativeTime from "@/components/studio/RelativeTime";
import AddContactButton from "./AddContactButton";

export const metadata = {
  title: "Contacts — Studio",
  robots: { index: false, follow: false },
};

export default async function ContactsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/studio/login");

  const { data: contacts } = await supabase
    .from("contacts")
    .select(
      `*, sequences(id, touches(status, sent_at))`
    )
    .order("created_at", { ascending: false });

  type Row = NonNullable<typeof contacts>[number];

  function getLastTouch(row: Row) {
    const allTouches = (row.sequences ?? []).flatMap((s) => s.touches ?? []);
    if (!allTouches.length) return null;
    allTouches.sort(
      (a, b) => new Date(b.sent_at ?? 0).getTime() - new Date(a.sent_at ?? 0).getTime()
    );
    return allTouches[0];
  }

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-foreground-muted text-xs font-mono mb-1">
            <Link href="/studio" className="hover:text-foreground transition-colors">studio</Link>
            <span className="text-foreground-muted mx-1">/</span>
            <span className="text-foreground">contacts</span>
          </p>
          <h1 className="text-xl font-bold text-foreground">Contacts</h1>
        </div>
        <AddContactButton />
      </div>

      {!contacts?.length ? (
        <div className="text-center py-24 border border-dashed border-border rounded-xl">
          <p className="text-foreground-muted mb-4">No contacts yet — add your first one.</p>
          <AddContactButton />
        </div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-foreground-muted text-xs uppercase tracking-widest">
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold">Company</th>
                <th className="text-left px-4 py-3 font-semibold">Email</th>
                <th className="text-left px-4 py-3 font-semibold">Last touch</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Sequences</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => {
                const lastTouch = getLastTouch(c);
                const seqCount = c.sequences?.length ?? 0;
                return (
                  <tr
                    key={c.id}
                    className={`hover:bg-white/5 transition-colors ${
                      i < contacts.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/studio/contacts/${c.id}`}
                        className="font-medium text-foreground hover:text-ember transition-colors"
                      >
                        {c.full_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-foreground-muted">{c.company ?? "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs text-foreground-muted">
                      {c.email ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-foreground-muted text-xs">
                      {lastTouch?.sent_at ? (
                        <RelativeTime iso={lastTouch.sent_at} />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {lastTouch?.status ? (
                        <StatusPill status={lastTouch.status} variant="touch" />
                      ) : (
                        <span className="text-foreground-muted text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {seqCount > 0 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-lavender/20 text-lavender text-xs font-mono font-bold">
                          {seqCount}
                        </span>
                      ) : (
                        <span className="text-foreground-muted text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
