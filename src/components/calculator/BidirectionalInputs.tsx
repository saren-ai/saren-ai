"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import type { CalculationDirection } from "@/lib/calculator/types";
import { formatCurrencyFull } from "@/lib/calculator/funnel-calculations";
import { DollarSign, Lock, ArrowLeftRight, Target } from "lucide-react";

interface BidirectionalInputsProps {
  direction: CalculationDirection;
  budget: number | null;
  revenueGoal: number | null;
  avgDealSize: number;
  calculatedRevenue: number;
  calculatedBudget: number;
  onDirectionChange: (direction: CalculationDirection) => void;
  onBudgetChange: (value: number) => void;
  onRevenueGoalChange: (value: number) => void;
  onAvgDealSizeChange: (value: number) => void;
}

interface InputErrors {
  budget?: string;
  revenueGoal?: string;
  avgDealSize?: string;
}

export function BidirectionalInputs({
  direction,
  budget,
  revenueGoal,
  avgDealSize,
  calculatedRevenue,
  calculatedBudget,
  onDirectionChange,
  onBudgetChange,
  onRevenueGoalChange,
  onAvgDealSizeChange,
}: BidirectionalInputsProps) {
  const [errors, setErrors] = useState<InputErrors>({});

  const parseInput = useCallback((value: string): number => {
    return parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  }, []);

  const handleBudgetChange = useCallback((raw: string) => {
    const value = parseInput(raw);
    onBudgetChange(value);
    setErrors((prev) => ({
      ...prev,
      budget: value <= 0 ? "Ad spend must be greater than $0" : undefined,
    }));
  }, [parseInput, onBudgetChange]);

  const handleRevenueGoalChange = useCallback((raw: string) => {
    const value = parseInput(raw);
    onRevenueGoalChange(value);
    let error: string | undefined;
    if (value <= 0) error = "Revenue goal must be greater than $0";
    else if (value > 1_000_000_000) error = "Revenue goal must be under $1B";
    setErrors((prev) => ({ ...prev, revenueGoal: error }));
  }, [parseInput, onRevenueGoalChange]);

  const handleAvgDealSizeChange = useCallback((raw: string) => {
    const value = parseInput(raw);
    onAvgDealSizeChange(value);
    let error: string | undefined;
    if (value <= 0) {
      error = "Deal size must be greater than $0";
    } else if (direction === "reverse" && revenueGoal && value > revenueGoal) {
      error = "Deal size can't exceed the revenue goal";
    }
    setErrors((prev) => ({ ...prev, avgDealSize: error }));
  }, [parseInput, onAvgDealSizeChange, direction, revenueGoal]);

  const isForward = direction === "forward";

  return (
    <div className="space-y-5">
      {/* Direction Toggle */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center bg-charcoal/5 dark:bg-background-secondary rounded-lg p-1">
          <button
            onClick={() => onDirectionChange("forward")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              isForward
                ? "bg-white dark:bg-card-bg text-charcoal dark:text-foreground shadow-sm"
                : "text-slate dark:text-foreground-muted hover:text-charcoal dark:hover:text-foreground"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Budget → Revenue
          </button>
          <button
            onClick={() => onDirectionChange("reverse")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              !isForward
                ? "bg-white dark:bg-card-bg text-charcoal dark:text-foreground shadow-sm"
                : "text-slate dark:text-foreground-muted hover:text-charcoal dark:hover:text-foreground"
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            Revenue Goal → Budget
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Budget Input */}
        <div className={`relative ${!isForward ? "opacity-60" : ""}`}>
          <label
            htmlFor="budget-input"
            className="flex items-center gap-1.5 text-sm font-semibold text-charcoal dark:text-foreground mb-1.5"
          >
            <DollarSign className="w-4 h-4 text-ember" />
            Total Ad Spend
            {!isForward && <Lock className="w-3 h-3 text-slate dark:text-foreground-muted" />}
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate dark:text-foreground-muted text-sm">
              $
            </div>
            {isForward ? (
              <input
                id="budget-input"
                type="text"
                value={budget ? formatCurrencyFull(budget).replace("$", "") : ""}
                onChange={(e) => handleBudgetChange(e.target.value)}
                className={`calculator-input w-full pl-7 text-sm ${errors.budget ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                placeholder="100,000"
              />
            ) : (
              <div className="calculator-input w-full pl-7 text-sm bg-charcoal/5 dark:bg-background-secondary cursor-not-allowed">
                {calculatedBudget > 0 ? formatCurrencyFull(calculatedBudget).replace("$", "") : "—"}
              </div>
            )}
          </div>
          {errors.budget && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-1">
              {errors.budget}
            </motion.p>
          )}
          {!isForward && !errors.budget && calculatedBudget > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-electric mt-1"
            >
              Required to hit your goal
            </motion.p>
          )}
        </div>

        {/* Average Deal Size */}
        <div>
          <label
            htmlFor="deal-size-input"
            className="flex items-center gap-1.5 text-sm font-semibold text-charcoal dark:text-foreground mb-1.5"
          >
            <ArrowLeftRight className="w-4 h-4 text-copper" />
            Avg Deal Size
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate dark:text-foreground-muted text-sm">
              $
            </div>
            <input
              id="deal-size-input"
              type="text"
              value={formatCurrencyFull(avgDealSize).replace("$", "")}
              onChange={(e) => handleAvgDealSizeChange(e.target.value)}
              className={`calculator-input w-full pl-7 text-sm ${errors.avgDealSize ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
              placeholder="20,000"
            />
          </div>
          {errors.avgDealSize ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-1">
              {errors.avgDealSize}
            </motion.p>
          ) : (
            <p className="text-xs text-slate dark:text-foreground-muted mt-1">
              ACV from your CRM
            </p>
          )}
        </div>

        {/* Revenue Goal Input */}
        <div className={`relative ${isForward ? "opacity-60" : ""}`}>
          <label
            htmlFor="revenue-input"
            className="flex items-center gap-1.5 text-sm font-semibold text-charcoal dark:text-foreground mb-1.5"
          >
            <Target className="w-4 h-4 text-emerald-500" />
            Revenue Goal
            {isForward && <Lock className="w-3 h-3 text-slate dark:text-foreground-muted" />}
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate dark:text-foreground-muted text-sm">
              $
            </div>
            {!isForward ? (
              <input
                id="revenue-input"
                type="text"
                value={revenueGoal ? formatCurrencyFull(revenueGoal).replace("$", "") : ""}
                onChange={(e) => handleRevenueGoalChange(e.target.value)}
                className={`calculator-input w-full pl-7 text-sm ${errors.revenueGoal ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
                placeholder="1,000,000"
              />
            ) : (
              <div className="calculator-input w-full pl-7 text-sm bg-charcoal/5 dark:bg-background-secondary cursor-not-allowed">
                {calculatedRevenue > 0 ? formatCurrencyFull(calculatedRevenue).replace("$", "") : "—"}
              </div>
            )}
          </div>
          {errors.revenueGoal && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-1">
              {errors.revenueGoal}
            </motion.p>
          )}
          {isForward && !errors.revenueGoal && calculatedRevenue > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-emerald-500 mt-1"
            >
              Projected annual revenue
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
