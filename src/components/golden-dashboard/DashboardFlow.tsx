"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MetricCard, { MetricData } from "./MetricCard";
import StageConnector from "./StageConnector";

// Dashboard data based on the Golden Dashboard PDF
const dashboardData: MetricData[] = [
  {
    id: "spend",
    name: "Total Ad Spend",
    volume: "$161.9K",
    volumeLabel: "Total Budget",
    cost: "—",
    costLabel: "Starting Point",
    tooltip: {
      title: "Total Ad Spend",
      description:
        "The total budget invested in paid advertising across all channels. This is your input cost that flows through the entire funnel.",
    },
  },
  {
    id: "impressions",
    name: "Impressions",
    volume: "2.8M",
    volumeLabel: "Total Impressions",
    cost: "$58.03",
    costLabel: "CPM",
    rate: "1.7",
    rateLabel: "CTR",
    tooltip: {
      title: "Impressions & CPM",
      description:
        "Cost Per Mille (CPM) measures the cost per 1,000 ad views. A lower CPM means you're reaching more people for less money. Industry average is $5-15 for B2B.",
    },
  },
  {
    id: "clicks",
    name: "Clicks",
    volume: "48.6K",
    volumeLabel: "Total Clicks",
    cost: "$3.33",
    costLabel: "CPC",
    rate: "10.6",
    rateLabel: "CVR to Lead",
    tooltip: {
      title: "Clicks & CPC",
      description:
        "Cost Per Click (CPC) measures what you pay for each click to your landing page. Click-through rate (CTR) shows how compelling your ad creative is. B2B average CTR is 0.5-1%.",
    },
  },
  {
    id: "leads",
    name: "Leads",
    volume: "5,066",
    volumeLabel: "Total Leads",
    cost: "$31.96",
    costLabel: "CPL",
    rate: "21.7",
    rateLabel: "QL Rate",
    tooltip: {
      title: "Leads & CPL",
      description:
        "Cost Per Lead (CPL) is what you pay for each form fill or signup. The conversion rate (CVR) from click to lead shows landing page effectiveness. A good B2B CPL is $50-200.",
    },
  },
  {
    id: "qualified",
    name: "Qualified Leads",
    volume: "1,125",
    volumeLabel: "Total QLs",
    cost: "$144",
    costLabel: "CPQL",
    rate: "91.2",
    rateLabel: "Opp Rate",
    tooltip: {
      title: "Qualified Leads & CPQL",
      description:
        "Cost Per Qualified Lead (CPQL) measures what you pay for leads that meet your ICP criteria. The QL rate shows how well your targeting and messaging attract the right audience.",
    },
  },
  {
    id: "opportunities",
    name: "Opportunities",
    volume: "1,026",
    volumeLabel: "Total Opps",
    cost: "$158",
    costLabel: "CPO",
    rate: "21.9",
    rateLabel: "Meeting Rate",
    tooltip: {
      title: "Opportunities & CPO",
      description:
        "Cost Per Opportunity (CPO) measures what you pay for each sales-accepted opportunity. This is where marketing spend starts converting to real pipeline.",
    },
  },
  {
    id: "meetings",
    name: "First Meetings",
    volume: "225",
    volumeLabel: "Total Meetings",
    cost: "$720",
    costLabel: "Cost/Meeting",
    rate: "5.3",
    rateLabel: "Close Rate",
    tooltip: {
      title: "First Meetings",
      description:
        "Cost per first meeting (demo) shows the efficiency of converting opportunities to actual sales conversations. This is the handoff point from marketing to sales.",
    },
  },
  {
    id: "closed",
    name: "Closed-Won",
    volume: "12",
    volumeLabel: "Deals Won",
    cost: "$13,491",
    costLabel: "CAC",
    tooltip: {
      title: "Closed-Won & CAC",
      description:
        "Customer Acquisition Cost (CAC) is the total cost to acquire a customer. The close rate from meetings shows sales effectiveness. Compare CAC to LTV for unit economics.",
    },
  },
];

// Conversion rates between stages (7 connectors for 8 stages)
const conversionRates = [
  { rate: 100, label: "Reach" }, // Spend → Impressions (budget deployed)
  { rate: 1.7, label: "CTR" },   // Impressions → Clicks
  { rate: 10.6, label: "CVR" },  // Clicks → Leads
  { rate: 21.7, label: "QL Rate" }, // Leads → Qualified
  { rate: 91.2, label: "Opp Rate" }, // Qualified → Opportunities
  { rate: 21.9, label: "Meet Rate" }, // Opportunities → Meetings
  { rate: 5.3, label: "Close Rate" }, // Meetings → Closed
];

export default function DashboardFlow() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-slate">Healthy (&gt;20%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-slate">Moderate (10-20%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-ember" />
          <span className="text-slate">Needs Attention (&lt;10%)</span>
        </div>
      </div>

      {/* Desktop View - Horizontal Flow */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto pb-4">
          <div className="flex items-stretch gap-0 min-w-max">
            {dashboardData.map((metric, index) => (
              <div key={metric.id} className="flex items-center">
                <div className="w-[180px]">
                  <MetricCard
                    data={metric}
                    index={index}
                    isFirst={index === 0}
                    isLast={index === dashboardData.length - 1}
                  />
                </div>
                {index < dashboardData.length - 1 && (
                  <StageConnector
                    rate={conversionRates[index].rate}
                    label={conversionRates[index].label}
                    index={index}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet View - 2x4 Grid */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-4 gap-3">
          {dashboardData.slice(0, 4).map((metric, index) => (
            <MetricCard
              key={metric.id}
              data={metric}
              index={index}
              isFirst={index === 0}
            />
          ))}
        </div>
        <div className="flex justify-center my-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-electric"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 16l-6-6h12l-6 6z" />
            </svg>
            <span className="text-sm font-mono">Funnel Continues</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 16l-6-6h12l-6 6z" />
            </svg>
          </motion.div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {dashboardData.slice(4).map((metric, index) => (
            <MetricCard
              key={metric.id}
              data={metric}
              index={index + 4}
              isLast={index === 3}
            />
          ))}
        </div>
      </div>

      {/* Mobile View - Vertical Stack */}
      <div className="md:hidden space-y-2">
        {/* Show first 4 stages, expandable to show rest */}
        {dashboardData.slice(0, isExpanded ? undefined : 4).map((metric, index) => (
          <div key={metric.id}>
            <MetricCard
              data={metric}
              index={index}
              isFirst={index === 0}
              isLast={index === dashboardData.length - 1}
            />
            {index < (isExpanded ? dashboardData.length - 1 : 3) && (
              <StageConnector
                rate={conversionRates[index]?.rate || 0}
                label={conversionRates[index]?.label || ""}
                index={index}
                isVertical
              />
            )}
          </div>
        ))}

        {/* Expand/Collapse Button */}
        {!isExpanded && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsExpanded(true)}
            className="w-full py-4 bg-electric/10 text-electric rounded-lg font-medium hover:bg-electric/20 transition-colors flex items-center justify-center gap-2"
          >
            Show Full Funnel
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>
        )}

        {isExpanded && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsExpanded(false)}
            className="w-full py-3 text-slate text-sm hover:text-charcoal transition-colors flex items-center justify-center gap-2"
          >
            Collapse
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 bg-charcoal/5 rounded-xl"
      >
        <h4 className="text-sm font-semibold text-charcoal mb-4 uppercase tracking-wider">
          Funnel Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="font-mono text-2xl font-bold text-ember">
              $161.9K
            </div>
            <div className="text-xs text-slate">Total Spend</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-electric">12</div>
            <div className="text-xs text-slate">Deals Won</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-copper">
              $13,491
            </div>
            <div className="text-xs text-slate">CAC</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-charcoal">
              0.0004%
            </div>
            <div className="text-xs text-slate">Full-Funnel CVR</div>
          </div>
        </div>
      </motion.div>

      {/* Tap hint for mobile */}
      <p className="text-center text-xs text-slate md:hidden">
        Tap any card to see what each metric means
      </p>
    </div>
  );
}
