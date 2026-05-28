import { Lock } from "lucide-react";
import type { Playbook } from "@/lib/playbooks";

export function GatedTeaser({
  playbook,
  priceCents,
}: {
  playbook: Playbook;
  priceCents: number;
}) {
  const price = `$${(priceCents / 100).toFixed(0)}`;

  return (
    <div className="rounded-2xl border border-charcoal/10 dark:border-charcoal/10 bg-white dark:bg-charcoal/5 p-8 lg:p-12 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-ember/10 border border-ember/20 mx-auto">
        <Lock className="w-6 h-6 text-ember" />
      </div>

      <div className="space-y-2">
        <span className="inline-block px-3 py-1 bg-ember/10 text-ember text-xs font-bold rounded-full uppercase tracking-wide">
          Premium — {price} one-time
        </span>
        <h2 className="text-2xl font-bold text-charcoal dark:text-white">
          What&apos;s inside
        </h2>
        <p className="text-slate dark:text-slate leading-relaxed max-w-xl mx-auto">
          {playbook.description}
        </p>
      </div>

      {playbook.steps.length > 0 && (
        <p className="text-sm text-slate dark:text-slate">
          {playbook.steps.length} steps · immediate access after purchase
        </p>
      )}

      {playbook.steps.length === 0 && (
        <p className="text-sm text-slate dark:text-slate">
          Downloadable files · immediate access after purchase
        </p>
      )}
    </div>
  );
}
