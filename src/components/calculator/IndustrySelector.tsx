"use client";

import { INDUSTRY_CONVERSION_RATES } from "@/lib/calculator/conversion-rates";
import { Building2 } from "lucide-react";

interface IndustrySelectorProps {
  value: string;
  onChange: (industry: string) => void;
}

export function IndustrySelector({ value, onChange }: IndustrySelectorProps) {
  return (
    <div>
      <label
        htmlFor="industry"
        className="block text-sm font-semibold text-charcoal dark:text-foreground mb-2"
      >
        Industry
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Building2 className="w-5 h-5 text-slate dark:text-foreground-muted" />
        </div>
        <select
          id="industry"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="calculator-input w-full pl-12 appearance-none cursor-pointer"
        >
          {INDUSTRY_CONVERSION_RATES.map((industry) => (
            <option key={industry.industry} value={industry.industry}>
              {industry.industry}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-slate dark:text-foreground-muted"
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
        </div>
      </div>
      <p className="text-xs text-slate dark:text-foreground-muted mt-2">
        Conversion rates automatically adjust based on your industry
      </p>
    </div>
  );
}
