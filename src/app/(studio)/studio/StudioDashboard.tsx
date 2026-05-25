"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

interface Stats {
  contacts: number;
  activeSequences: number;
  outreachPages: number;
  totalPageViews: number;
}

interface OutreachPage {
  slug: string;
  company: string | null;
  view_count: number | null;
}

export default function StudioDashboard({
  user,
  stats,
  outreachPages,
}: {
  user: User;
  stats: Stats;
  outreachPages: OutreachPage[];
}) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/studio/login");
  }

  const statCards = [
    { label: "Contacts", value: stats.contacts },
    { label: "Active Sequences", value: stats.activeSequences },
    { label: "Outreach Pages", value: stats.outreachPages },
    { label: "Total Page Views", value: stats.totalPageViews },
  ];

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-mono">
            <span className="text-ember">studio</span>
            <span className="text-foreground-muted">/</span>
            <span className="text-foreground">hustle-and-flow</span>
          </h1>
          <p className="text-foreground-muted text-sm mt-1">{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="text-foreground-muted hover:text-foreground text-sm transition-colors"
        >
          Sign out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <div className="text-3xl font-bold font-mono text-ember mb-1">
              {stat.value}
            </div>
            <div className="text-xs uppercase tracking-widest text-foreground-muted font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Outreach Pages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Outreach Pages</h2>
          <span className="text-xs text-foreground-muted font-mono">
            saren.ai/for/[slug]
          </span>
        </div>

        {outreachPages.length === 0 ? (
          <p className="text-foreground-muted text-sm">No outreach pages yet.</p>
        ) : (
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-foreground-muted text-xs uppercase tracking-widest">
                  <th className="text-left px-4 py-3 font-semibold">Slug</th>
                  <th className="text-left px-4 py-3 font-semibold">Company</th>
                  <th className="text-right px-4 py-3 font-semibold">Views</th>
                  <th className="text-right px-4 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {outreachPages.map((page, i) => (
                  <tr
                    key={page.slug}
                    className={i < outreachPages.length - 1 ? "border-b border-white/5" : ""}
                  >
                    <td className="px-4 py-3 font-mono text-foreground">
                      {page.slug}
                    </td>
                    <td className="px-4 py-3 text-foreground-muted">
                      {page.company ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-ember">
                      {page.view_count ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={`/for/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lavender hover:text-ember text-xs transition-colors"
                      >
                        View →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
