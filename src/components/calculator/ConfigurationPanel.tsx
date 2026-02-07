"use client";

import { INDUSTRY_CONVERSION_RATES } from "@/lib/calculator/conversion-rates";
import type { CustomerType, ChannelMix } from "@/lib/calculator/types";
import { Building2, Users, Megaphone } from "lucide-react";

interface ConfigurationPanelProps {
  selectedIndustry: string;
  customerType: CustomerType;
  channelMix: ChannelMix;
  onIndustryChange: (industry: string) => void;
  onCustomerTypeChange: (type: CustomerType) => void;
  onChannelMixChange: (mix: ChannelMix) => void;
}

const customerTypeOptions: { value: CustomerType; label: string }[] = [
  { value: "consumer", label: "Consumer" },
  { value: "smb", label: "SMB" },
  { value: "middleMarket", label: "Mid-Market" },
  { value: "enterprise", label: "Enterprise" },
];

const channelMixOptions: { value: ChannelMix; label: string; desc: string }[] = [
  { value: "paid-led", label: "Paid-Led", desc: "Mostly ads & outbound" },
  { value: "product-led", label: "Product-Led", desc: "Organic & freemium" },
  { value: "hybrid", label: "Hybrid", desc: "Balanced mix" },
];

export function ConfigurationPanel({
  selectedIndustry,
  customerType,
  channelMix,
  onIndustryChange,
  onCustomerTypeChange,
  onChannelMixChange,
}: ConfigurationPanelProps) {
  return (
    <div className="space-y-5">
      <p className="text-sm font-semibold text-charcoal dark:text-foreground uppercase tracking-wider">
        Configure your funnel
      </p>

      {/* Industry Selector */}
      <div>
        <label
          htmlFor="industry-select"
          className="block text-sm font-medium text-charcoal dark:text-foreground mb-1.5"
        >
          Industry
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Building2 className="w-4 h-4 text-slate dark:text-foreground-muted" />
          </div>
          <select
            id="industry-select"
            value={selectedIndustry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="calculator-input w-full pl-10 pr-8 appearance-none cursor-pointer text-sm"
          >
            {INDUSTRY_CONVERSION_RATES.map((industry) => (
              <option key={industry.industry} value={industry.industry}>
                {industry.industry}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-slate dark:text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Customer Type */}
      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium text-charcoal dark:text-foreground mb-1.5">
          <Users className="w-4 h-4 text-slate dark:text-foreground-muted" />
          Customer Type
        </label>
        <div className="flex flex-wrap gap-2">
          {customerTypeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onCustomerTypeChange(option.value)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                customerType === option.value
                  ? "bg-ember text-white shadow-sm"
                  : "bg-white dark:bg-card-bg text-charcoal dark:text-foreground border border-charcoal/15 dark:border-ember/20 hover:border-ember dark:hover:border-ember"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Go-to-Market Motion */}
      <div>
        <label className="flex items-center gap-1.5 text-sm font-medium text-charcoal dark:text-foreground mb-1.5">
          <Megaphone className="w-4 h-4 text-slate dark:text-foreground-muted" />
          Go-to-Market Motion
        </label>
        <div className="flex flex-wrap gap-2">
          {channelMixOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onChannelMixChange(option.value)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                channelMix === option.value
                  ? "bg-electric text-white shadow-sm"
                  : "bg-white dark:bg-card-bg text-charcoal dark:text-foreground border border-charcoal/15 dark:border-ember/20 hover:border-electric dark:hover:border-electric"
              }`}
              title={option.desc}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
