"use client";

import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  CreditCard,
  Building,
  Users,
  Briefcase,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { getDashboardMetrics, DashboardMetrics } from "@/lib/api";

interface MetricCardsProps {
  currency: "INR" | "USD" | "EUR";
  employeeCount?: number;
}

const DEFAULT_METRICS: DashboardMetrics = {
  totalRevenue: 845000,
  outstanding: 125000,
  outstandingCount: 3,
  totalBudget: 1200000,
  budgetUtilizationPercent: 70.4,
  salaryPayable: 240000,
  salaryDueDate: "Nov 1",
  salaryStaffCount: 18,
  activeProjects: 12,
  projectsOnTrack: 8,
  projectsNearDeadline: 2,
  projectsAtRisk: 2,
  totalEmployees: 18,
  activeEmployees: 16,
  onboardingEmployees: 1,
};

export function MetricCards({ currency, employeeCount }: MetricCardsProps) {
  const [metrics, setMetrics] = useState<DashboardMetrics>(DEFAULT_METRICS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getDashboardMetrics()
      .then((data) => {
        if (isMounted && data) {
          setMetrics((prev) => ({
            ...prev,
            ...data,
            // If employeeCount prop provided from live users count, keep it synced
            totalEmployees: employeeCount ?? data.totalEmployees ?? prev.totalEmployees,
          }));
        }
      })
      .catch(() => {
        // Graceful fallback to default demo data
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [employeeCount]);

  const formatMoney = (valInr: number) => {
    if (currency === "USD") {
      const usdVal = Math.round(valInr / 84);
      return `$${usdVal.toLocaleString("en-US")}`;
    }
    if (currency === "EUR") {
      const eurVal = Math.round(valInr / 91);
      return `€${eurVal.toLocaleString("en-US")}`;
    }
    // INR Indian numbering formatting
    return `₹${valInr.toLocaleString("en-IN")}`;
  };

  const cards = [
    {
      label: "TOTAL REVENUE",
      value: formatMoney(metrics.totalRevenue),
      icon: TrendingUp,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      subline: (
        <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-600">
          <span>↑ +14.2%</span>
          <span className="text-[#94a3b8] font-normal">
            Rec: {formatMoney(Math.round(metrics.totalRevenue * 0.88))}
          </span>
        </span>
      ),
    },
    {
      label: "OUTSTANDING",
      value: formatMoney(metrics.outstanding),
      icon: AlertCircle,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
      subline: (
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-100/80 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            {metrics.outstandingCount} Overdue
          </span>
          <span className="text-[#64748b]">4 Clients</span>
        </div>
      ),
    },
    {
      label: "TOTAL BUDGET",
      value: formatMoney(metrics.totalBudget),
      icon: Building,
      iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100",
      subline: (
        <span className="font-mono text-[11px] text-[#64748b]">
          <strong className="text-[#0f172a] font-semibold">
            {metrics.budgetUtilizationPercent}%
          </strong>{" "}
          Committed · Annual 24-25
        </span>
      ),
    },
    {
      label: "SALARY PAYABLE",
      value: formatMoney(metrics.salaryPayable),
      icon: CreditCard,
      iconBg: "bg-sky-50 text-sky-600 border border-sky-100",
      subline: (
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="rounded-md bg-blue-100/80 px-1.5 py-0.5 text-[10px] font-bold text-blue-700">
            Due {metrics.salaryDueDate}
          </span>
          <span className="text-[#64748b]">{metrics.salaryStaffCount} Staff</span>
        </div>
      ),
    },
    {
      label: "ACTIVE PROJECTS",
      value: metrics.activeProjects.toString(),
      icon: Briefcase,
      iconBg: "bg-slate-50 text-slate-700 border border-slate-200",
      subline: (
        <span className="font-mono text-[11px] text-[#64748b]">
          <span className="text-emerald-600 font-semibold">
            {metrics.projectsOnTrack} on track
          </span>{" "}
          · {metrics.projectsNearDeadline} near ·{" "}
          <span className="text-amber-600 font-semibold">
            {metrics.projectsAtRisk} alert
          </span>
        </span>
      ),
    },
    {
      label: "TOTAL EMPLOYEES",
      value: (employeeCount ?? metrics.totalEmployees).toString(),
      icon: Users,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      subline: (
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {metrics.activeEmployees} Active
          </span>
          <span className="text-[#94a3b8]">
            {metrics.onboardingEmployees} Onboarding
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute top-1 right-2 z-10">
          <Loader2 size={12} className="animate-spin text-blue-500" />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-4 sm:p-4.5 shadow-2xs hover:shadow-md hover:border-[#cbd5e1] transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                  {card.label}
                </span>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${card.iconBg}`}
                >
                  <Icon size={14} strokeWidth={2.2} />
                </div>
              </div>

              <div className="my-2">
                <p className="font-headline text-xl sm:text-2xl font-black tracking-tight text-[#0f172a]">
                  {card.value}
                </p>
              </div>

              <div>{card.subline}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
