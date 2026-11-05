"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical, Loader2 } from "lucide-react";
import { getBudgetData, BudgetData } from "@/lib/api";

interface BudgetUtilizationProps {
  currency: "INR" | "USD" | "EUR";
}

const DEFAULT_BUDGET: BudgetData = {
  allocatedCap: 1200000,
  committedSpent: 845000,
  remainingBuffer: 355000,
  utilizedPercent: 70.4,
  segments: [
    { name: "Operations", amountInLakhs: 4.2, percent: 49.7 },
    { name: "Payroll", amountInLakhs: 2.8, percent: 33.1 },
    { name: "Infra & SaaS", amountInLakhs: 1.45, percent: 17.2 },
  ],
};

export function BudgetUtilization({ currency }: BudgetUtilizationProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [budget, setBudget] = useState<BudgetData>(DEFAULT_BUDGET);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getBudgetData()
      .then((data) => {
        if (isMounted && data) {
          setBudget(data);
        }
      })
      .catch(() => {
        // Fallback to default
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const formatMoney = (valInr: number) => {
    if (currency === "USD") {
      const usdVal = Math.round(valInr / 84);
      return `$${usdVal.toLocaleString("en-US")}`;
    }
    if (currency === "EUR") {
      const eurVal = Math.round(valInr / 91);
      return `€${eurVal.toLocaleString("en-US")}`;
    }
    return `₹${valInr.toLocaleString("en-IN")}`;
  };

  const formatLakhs = (valInLakhs: number) => {
    const raw = valInLakhs * 100000;
    if (currency === "USD") {
      const usd = Math.round(raw / 84);
      return `$${usd.toLocaleString("en-US")}`;
    }
    if (currency === "EUR") {
      const eur = Math.round(raw / 91);
      return `€${eur.toLocaleString("en-US")}`;
    }
    return `₹${valInLakhs.toFixed(2)}L`;
  };

  // Donut chart stroke dash calculation
  // Radius = 54, circumference = 2 * PI * 54 ≈ 339.29
  const circumference = 339.29;
  const utilizedPercent = Math.min(100, Math.max(0, budget.utilizedPercent));
  const strokeDashoffset = circumference - (utilizedPercent / 100) * circumference;

  const segmentColors = [
    "border-blue-200 bg-blue-50/50",
    "border-indigo-200 bg-indigo-50/50",
    "border-sky-200 bg-sky-50/50",
    "border-emerald-200 bg-emerald-50/50",
  ];

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-[#f1f5f9]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline text-base sm:text-lg font-bold text-[#0f172a]">
              Budget Utilization
            </h3>
            {isLoading && <Loader2 size={13} className="animate-spin text-blue-500" />}
          </div>
          <p className="mt-0.5 text-xs text-[#64748b]">
            Fiscal cap vs commitments
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="rounded-lg p-1 text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
          >
            <MoreVertical size={16} />
          </button>

          {showOptions && (
            <div className="absolute right-0 mt-1 w-44 rounded-xl border border-[#e2e8f0] bg-white p-1.5 shadow-lg z-20 text-xs text-[#334155]">
              <button
                type="button"
                onClick={() => setShowOptions(false)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f8fafc]"
              >
                Download Ledger
              </button>
              <button
                type="button"
                onClick={() => setShowOptions(false)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f8fafc]"
              >
                Reallocate Cap
              </button>
              <button
                type="button"
                onClick={() => setShowOptions(false)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#f8fafc] text-red-600"
              >
                Reset Projections
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Donut and Cap Stats */}
      <div className="my-5 flex items-center justify-between gap-6">
        {/* Circular Donut Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 130 130">
            {/* Background ring */}
            <circle
              cx="65"
              cy="65"
              r="54"
              stroke="#e2e8f0"
              strokeWidth="11"
              fill="transparent"
            />
            {/* Progress ring */}
            <circle
              cx="65"
              cy="65"
              r="54"
              stroke="#2563eb"
              strokeWidth="11"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-headline text-lg sm:text-xl font-black text-[#0f172a] tracking-tight">
              {budget.utilizedPercent}%
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#64748b]">
              UTILIZED
            </span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#64748b]">Allocated Cap</span>
            <span className="font-mono font-bold text-[#0f172a]">
              {formatMoney(budget.allocatedCap)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#64748b]">Committed / Spent</span>
            <span className="font-mono font-bold text-[#2563eb]">
              {formatMoney(budget.committedSpent)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#f1f5f9]">
            <span className="text-[#64748b]">Remaining Buffer</span>
            <span className="font-mono font-bold text-emerald-600">
              {formatMoney(budget.remainingBuffer)}
            </span>
          </div>
        </div>
      </div>

      {/* Allocation Segments */}
      <div className="pt-3 border-t border-[#f1f5f9]">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
          ALLOCATION SEGMENTS
        </p>

        <div className="grid grid-cols-3 gap-2">
          {budget.segments.map((seg, i) => (
            <div
              key={i}
              className={`rounded-xl border p-2 text-center ${segmentColors[i % segmentColors.length]}`}
            >
              <p className="truncate text-[10px] font-medium text-[#64748b]">
                {seg.name}
              </p>
              <p className="font-mono text-xs font-bold text-[#0f172a]">
                {formatLakhs(seg.amountInLakhs)}
              </p>
              <p className="font-mono text-[9px] text-[#94a3b8]">
                {seg.percent}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
