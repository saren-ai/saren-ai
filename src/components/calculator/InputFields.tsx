"use client";

import { formatCurrency } from "@/lib/calculator/funnel-calculations";
import type { CalculatorState } from "@/lib/calculator/types";
import { DollarSign } from "lucide-react";

interface InputFieldsProps {
  state: CalculatorState;
  onChange: (updates: Partial<CalculatorState>) => void;
}

export function InputFields({ state, onChange }: InputFieldsProps) {
  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/[^0-9.]/g, "")) || 0;
    onChange({ revenueGoal: value });
  };

  const handleDealSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/[^0-9.]/g, "")) || 0;
    onChange({ avgDealSize: value });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Revenue Goal Input */}
      <div>
        <label
          htmlFor="revenueGoal"
          className="block text-sm font-semibold text-charcoal dark:text-foreground mb-2"
        >
          Annual Revenue Goal
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <DollarSign className="w-5 h-5 text-slate dark:text-foreground-muted" />
          </div>
          <input
            id="revenueGoal"
            type="text"
            value={formatCurrency(state.revenueGoal).replace("$", "")}
            onChange={handleRevenueChange}
            className="calculator-input w-full pl-12"
            placeholder="1,000,000"
          />
        </div>
        <p className="text-xs text-slate dark:text-foreground-muted mt-2">
          Your target revenue for the year
        </p>
      </div>

      {/* Average Deal Size Input */}
      <div>
        <label
          htmlFor="avgDealSize"
          className="block text-sm font-semibold text-charcoal dark:text-foreground mb-2"
        >
          Average Deal Size
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <DollarSign className="w-5 h-5 text-slate dark:text-foreground-muted" />
          </div>
          <input
            id="avgDealSize"
            type="text"
            value={formatCurrency(state.avgDealSize).replace("$", "")}
            onChange={handleDealSizeChange}
            className="calculator-input w-full pl-12"
            placeholder="20,000"
          />
        </div>
        <p className="text-xs text-slate dark:text-foreground-muted mt-2">
          Pull this from your CRM (HubSpot/Salesforce)
        </p>
      </div>
    </div>
  );
}
