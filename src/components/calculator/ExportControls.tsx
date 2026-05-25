"use client";

import { FileText, Calendar, Download } from "lucide-react";
import type { FunnelResult } from "@/lib/calculator/types";

interface ExportControlsProps {
  hasData: boolean;
  funnel: FunnelResult;
}

export function ExportControls({ hasData, funnel }: ExportControlsProps) {
  const fmt = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
      ? `$${(n / 1_000).toFixed(0)}K`
      : `$${n.toFixed(0)}`;

  const fmtNum = (n: number) =>
    n >= 1_000 ? `${(n / 1_000).toFixed(1)}K` : String(Math.round(n));

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Print-only summary — hidden on screen */}
      {hasData && (
        <div className="hidden print:block border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
            <span className="font-bold text-lg">GTM Funnel Analysis</span>
            <span className="text-sm text-gray-500">saren.ai · {today}</span>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Budget Required", fmt(funnel.totalSpend)],
                ["Projected Revenue", fmt(funnel.revenue)],
                ["ROI", `${funnel.roi.toFixed(1)}×`],
                ["Blended CAC", fmt(funnel.cac)],
                ["Web Visitors Needed", fmtNum(funnel.webVisitors)],
                ["MQLs", fmtNum(funnel.mqls)],
                ["Opportunities", fmtNum(funnel.opportunities)],
                ["Closed Won", fmtNum(funnel.closedWon)],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-gray-100 last:border-0">
                  <td className="py-2 text-gray-600">{label}</td>
                  <td className="py-2 font-semibold text-right">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {funnel.gap && (
            <p className="mt-4 text-sm text-gray-500">
              Revenue gap to goal:{" "}
              <span className="font-semibold text-red-600">
                {fmt(Math.abs(funnel.gap.revenueGap))} (
                {Math.abs(funnel.gap.percentageOff).toFixed(0)}%)
              </span>
            </p>
          )}
          <p className="mt-4 text-xs text-gray-400">
            Generated at saren.ai/portfolio/gtm-budget-calculator
          </p>
        </div>
      )}

      {/* On-screen CTA — hidden during print */}
      <div className="print:hidden bg-gradient-to-br from-charcoal to-offblack dark:from-card-bg dark:to-background-secondary rounded-xl p-6 md:p-8 text-center">
        <h3 className="text-xl font-bold text-ash dark:text-foreground mb-2">
          These numbers don&apos;t lie. But they do tell stories.
        </h3>
        <p className="text-sm text-ash/70 dark:text-foreground-muted mb-6 max-w-md mx-auto">
          Get a deeper analysis of your funnel, or talk to someone who&apos;s
          built the systems behind these numbers.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {hasData && (
            <button
              onClick={() => window.print()}
              className="btn-secondary-dark inline-flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          )}
          <a
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            <Calendar className="w-4 h-4" />
            Book a Strategy Call
          </a>
          <a
            href="/portfolio"
            className="btn-secondary-dark inline-flex items-center gap-2 text-sm"
          >
            <FileText className="w-4 h-4" />
            See Case Studies
          </a>
        </div>
      </div>
    </>
  );
}
