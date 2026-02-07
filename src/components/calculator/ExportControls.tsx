"use client";

import { FileText, Calendar } from "lucide-react";

interface ExportControlsProps {
  hasData: boolean;
}

export function ExportControls({ hasData }: ExportControlsProps) {
  return (
    <div className="bg-gradient-to-br from-charcoal to-offblack dark:from-card-bg dark:to-background-secondary rounded-xl p-6 md:p-8 text-center">
      <h3 className="text-xl font-bold text-ash dark:text-foreground mb-2">
        These numbers don&apos;t lie. But they do tell stories.
      </h3>
      <p className="text-sm text-ash/70 dark:text-foreground-muted mb-6 max-w-md mx-auto">
        Get a deeper analysis of your funnel, or talk to someone who&apos;s built the systems behind these numbers.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href="/contact"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <Calendar className="w-4 h-4" />
          Book a Strategy Call
        </a>
        <a
          href="/portfolio"
          className="btn-secondary inline-flex items-center gap-2 text-sm !text-ash !border-ash/30 hover:!bg-ash hover:!text-charcoal"
        >
          <FileText className="w-4 h-4" />
          See Case Studies
        </a>
      </div>
    </div>
  );
}
