"use client";

import { fitScoreFactors, type BuyerProfile } from "@/lib/behavioral-scoring";
import { Building2, Briefcase, MapPin, Factory } from "lucide-react";

interface FitScoreBreakdownProps {
  profile: BuyerProfile;
  fitScore: number;
  fitBreakdown: { factor: string; points: number }[];
  onProfileChange: (updates: Partial<BuyerProfile>) => void;
}

export function FitScoreBreakdown({
  profile,
  fitScore,
  fitBreakdown,
  onProfileChange,
}: FitScoreBreakdownProps) {
  const getFactorIcon = (factorId: string) => {
    switch (factorId) {
      case "company-size":
        return <Building2 className="w-5 h-5" />;
      case "industry":
        return <Factory className="w-5 h-5" />;
      case "role":
        return <Briefcase className="w-5 h-5" />;
      case "geography":
        return <MapPin className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-charcoal dark:text-foreground mb-2">
          Fit Score Configuration
        </h3>
        <p className="text-slate dark:text-foreground-muted">
          Fit is intentional, not vibes-based. Adjust firmographic factors to
          see how identity alignment affects scoring.
        </p>
      </div>

      {/* Fit Score Summary */}
      <div className="bg-gradient-to-br from-electric/5 to-copper/5 dark:from-background-secondary dark:to-background-secondary border border-charcoal/10 dark:border-electric/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate dark:text-foreground-muted uppercase tracking-wide mb-1">
              Current Fit Score
            </p>
            <p className="text-4xl font-bold text-electric">{fitScore} / 50</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate dark:text-foreground-muted mb-1">
              Confidence Level
            </p>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-charcoal/10 dark:bg-ash/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-electric transition-all duration-500"
                  style={{ width: `${(fitScore / 50) * 100}%` }}
                />
              </div>
              <span className="text-sm font-mono font-semibold text-charcoal dark:text-foreground">
                {Math.round((fitScore / 50) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fit Factors */}
      <div className="space-y-4">
        {fitScoreFactors.map((factor) => {
          const currentValue = (profile as any)[
            factor.id.replace(/-/g, "")
          ] as string;
          const breakdown = fitBreakdown.find((b) => b.factor === factor.label);
          const currentPoints = breakdown?.points || 0;

          return (
            <div
              key={factor.id}
              className="bg-white dark:bg-card-bg border border-charcoal/10 dark:border-ember/20 rounded-lg p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-electric/10 rounded-lg flex items-center justify-center text-electric">
                  {getFactorIcon(factor.id)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-charcoal dark:text-foreground">
                        {factor.label}
                      </h4>
                      <p className="text-xs text-slate dark:text-foreground-muted">
                        {factor.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-electric">
                        {currentPoints}
                      </span>
                      <span className="text-sm text-slate dark:text-foreground-muted">
                        {" "}
                        / {factor.weight}
                      </span>
                    </div>
                  </div>

                  {/* Criteria Options */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {factor.criteria.map((criterion) => {
                      const isSelected = currentValue === criterion.value;
                      return (
                        <button
                          key={criterion.value}
                          onClick={() =>
                            onProfileChange({
                              [factor.id.replace(/-/g, "")]: criterion.value,
                            })
                          }
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            isSelected
                              ? "bg-electric text-white"
                              : "bg-charcoal/5 dark:bg-background-secondary text-charcoal dark:text-foreground hover:bg-charcoal/10 dark:hover:bg-ash/10"
                          }`}
                        >
                          {criterion.value}
                          <span className="ml-1.5 opacity-70">
                            ({criterion.points}pts)
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <div className="bg-charcoal/5 dark:bg-background-secondary rounded-lg p-4 text-sm">
        <p className="text-slate dark:text-foreground-muted">
          <strong className="text-charcoal dark:text-foreground">Note:</strong>{" "}
          Fit score is mostly static once identity is captured. It establishes
          the baseline for sales qualification. Engagement score drives
          progression through the buyer journey.
        </p>
      </div>
    </div>
  );
}
