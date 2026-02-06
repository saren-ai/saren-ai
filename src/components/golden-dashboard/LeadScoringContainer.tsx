"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Activity, ArrowRight, ExternalLink } from "lucide-react";
import MetricCard from "./MetricCard";
import { MetricMeta, Bench } from "@/lib/golden-dashboard";

interface InfoCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

function InfoCard({ title, subtitle, description, icon }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center p-4 rounded-lg w-36 bg-background/50 border border-border/50 hover:border-electric/30 transition-colors group">
      <div className="text-electric mb-2 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="font-medium text-sm text-foreground">{title}</span>
      <span className="text-xs text-foreground-muted">{subtitle}</span>
      <span className="text-[10px] text-foreground-muted mt-1 text-center leading-tight">
        {description}
      </span>
    </div>
  );
}

interface LeadScoringContainerProps {
  mqls: number;
  cpmql: number | null;
  mqlToSqlRate: number;
  mqlMetricMeta: MetricMeta;
  mqlBenchmark?: Bench;
  delta?: number;
  showBenchmark?: boolean;
  onMqlClick: () => void;
}

export default function LeadScoringContainer({
  mqls,
  cpmql,
  mqlToSqlRate,
  mqlMetricMeta,
  mqlBenchmark,
  delta,
  showBenchmark = false,
  onMqlClick,
}: LeadScoringContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="w-full max-w-4xl rounded-xl p-6 bg-electric/5 border border-electric/20 dark:bg-electric/10 dark:border-electric/30"
    >
      {/* Section title - linked to future lead scoring page */}
      <Link
        href="/portfolio/behavioral-lead-scoring"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-electric hover:underline mb-4 group"
      >
        <span className="w-2 h-2 rounded-full bg-electric" />
        Lead Scoring
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Content row */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {/* Fit card - informational */}
        <InfoCard
          title="Fit"
          subtitle="0-50 pts"
          description="Title, company size, region, industry"
          icon={<Target className="w-6 h-6" />}
        />

        {/* Plus sign */}
        <span className="text-2xl text-foreground-muted font-light">+</span>

        {/* Engagement card - informational */}
        <InfoCard
          title="Engagement"
          subtitle="0-50 pts"
          description="Email opens, content downloads, webinar attendance"
          icon={<Activity className="w-6 h-6" />}
        />

        {/* Arrow */}
        <ArrowRight className="w-6 h-6 text-foreground-muted" />

        {/* MQL card - computed, interactive */}
        <div className="w-[200px]">
          <MetricCard
            id="mqls"
            name="MQLs"
            volume={mqls}
            volumeLabel="Marketing Qualified"
            cost={cpmql}
            costLabel="CPMQL"
            rate={mqlToSqlRate}
            rateLabel="MQL→SQL"
            index={4}
            tooltipMeta={mqlMetricMeta}
            delta={delta}
            onClick={onMqlClick}
            showBenchmark={showBenchmark && mqlBenchmark !== undefined}
            benchmark={mqlBenchmark}
          />
        </div>
      </div>

      {/* Threshold note */}
      <p className="text-xs text-foreground-muted text-center mt-4">
        Leads scoring 75+ points qualify as MQLs
      </p>

      {/* Scoring breakdown hint */}
      <div className="mt-4 pt-4 border-t border-electric/10">
        <div className="flex items-center justify-center gap-6 text-xs text-foreground-muted">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>75+ = MQL</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span>50-74 = Nurture</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-slate" />
            <span>&lt;50 = Low Priority</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
