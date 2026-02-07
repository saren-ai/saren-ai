"use client";

import { motion } from "framer-motion";
import { FREE_TRIAL_RATES } from "@/lib/calculator/conversion-rates";
import { formatPercent, formatCurrency } from "@/lib/calculator/funnel-calculations";
import { Rocket, ArrowRight, Clock } from "lucide-react";

interface AlternativePathwaysProps {
  industry: string;
  currentCAC: number;
  totalSpend: number;
}

// Fuzzy match industry to free trial data
function findFreeTrialData(industry: string) {
  const lower = industry.toLowerCase();

  // Try direct match
  let match = FREE_TRIAL_RATES.find(
    (r) => r.industry.toLowerCase() === lower
  );
  if (match) return match;

  // Fuzzy mapping
  const mapping: Record<string, string> = {
    "adtech": "Advertising / AdTech",
    "crms": "CRM",
    "cybersecurity": "Cybersecurity",
    "edtech": "Education / Edtech",
    "fintech": "Fintech",
    "medtech": "Healthcare / Medtech",
    "legaltech": "Legal / Legaltech",
    "industrial & iot": "IoT",
    "project management": "Project Management",
    "average / general saas": "Sales Enablement",
  };

  const mapped = mapping[lower];
  if (mapped) {
    match = FREE_TRIAL_RATES.find(
      (r) => r.industry.toLowerCase() === mapped.toLowerCase()
    );
    if (match) return match;
  }

  // Partial match
  match = FREE_TRIAL_RATES.find(
    (r) =>
      r.industry.toLowerCase().includes(lower) ||
      lower.includes(r.industry.toLowerCase().split("/")[0].trim())
  );

  // Default to Sales Enablement (closest to general SaaS)
  return match || FREE_TRIAL_RATES.find((r) => r.industry === "Sales Enablement")!;
}

export function AlternativePathways({
  industry,
  currentCAC,
  totalSpend,
}: AlternativePathwaysProps) {
  const plgData = findFreeTrialData(industry);

  if (!plgData) return null;

  // Estimate PLG CAC (much lower since organic traffic dominates)
  const estimatedTrialCAC = currentCAC * 0.15; // Free trial path typically 85% cheaper
  const estimatedFreemiumCAC = currentCAC * 0.07; // Freemium even cheaper

  return (
    <div className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-5">
        <Rocket className="w-5 h-5 text-electric" />
        <h3 className="text-base font-semibold text-charcoal dark:text-foreground">
          The Product-Led Alternative
        </h3>
      </div>

      <p className="text-sm text-slate dark:text-foreground-muted mb-5">
        Instead of {formatCurrency(totalSpend)} in paid acquisition, what if you invested in product-led growth?
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Free Trial Path */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-electric/5 dark:bg-electric/10 rounded-lg p-4 border border-electric/20"
        >
          <h4 className="text-sm font-semibold text-charcoal dark:text-foreground mb-3">
            Free Trial Path
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate dark:text-foreground-muted">
              <ArrowRight className="w-3 h-3 text-electric" />
              <span>
                Visitor → Trial:{" "}
                <span className="font-mono font-semibold text-charcoal dark:text-foreground">
                  {formatPercent(plgData.visitorToTrial)}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate dark:text-foreground-muted">
              <ArrowRight className="w-3 h-3 text-electric" />
              <span>
                Trial → Paid:{" "}
                <span className="font-mono font-semibold text-charcoal dark:text-foreground">
                  {formatPercent(plgData.trialToPaid)}
                </span>
              </span>
            </div>
            <div className="pt-2 border-t border-charcoal/10 dark:border-ember/10">
              <span className="text-xs text-slate dark:text-foreground-muted">
                Est. Blended CAC:{" "}
              </span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(estimatedTrialCAC)}
              </span>
              <span className="text-xs text-slate dark:text-foreground-muted ml-1">
                vs {formatCurrency(currentCAC)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Freemium Path */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-copper/5 dark:bg-copper/10 rounded-lg p-4 border border-copper/20"
        >
          <h4 className="text-sm font-semibold text-charcoal dark:text-foreground mb-3">
            Freemium Path
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate dark:text-foreground-muted">
              <ArrowRight className="w-3 h-3 text-copper" />
              <span>
                Visitor → Free:{" "}
                <span className="font-mono font-semibold text-charcoal dark:text-foreground">
                  {formatPercent(plgData.visitorToFreemium)}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate dark:text-foreground-muted">
              <ArrowRight className="w-3 h-3 text-copper" />
              <span>
                Free → Paid:{" "}
                <span className="font-mono font-semibold text-charcoal dark:text-foreground">
                  {formatPercent(plgData.freemiumToPaid)}
                </span>
              </span>
            </div>
            <div className="pt-2 border-t border-charcoal/10 dark:border-ember/10">
              <span className="text-xs text-slate dark:text-foreground-muted">
                Est. Blended CAC:{" "}
              </span>
              <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(estimatedFreemiumCAC)}
              </span>
              <span className="text-xs text-slate dark:text-foreground-muted ml-1">
                vs {formatCurrency(currentCAC)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 mt-4 p-3 bg-charcoal/5 dark:bg-background-secondary rounded-lg">
        <Clock className="w-4 h-4 text-slate dark:text-foreground-muted flex-shrink-0" />
        <p className="text-xs text-slate dark:text-foreground-muted">
          <strong className="text-charcoal dark:text-foreground">Trade-off:</strong>{" "}
          Lower CAC, but longer sales cycle (6-9 months to see results).
          PLG works best alongside—not instead of—paid acquisition.
        </p>
      </div>
    </div>
  );
}
