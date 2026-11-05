"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getProjects, ProjectItem } from "@/lib/api";

interface RevenueByProjectProps {
  currency: "INR" | "USD" | "EUR";
}

const DEFAULT_PROJECTS = [
  {
    rank: 1,
    title: "Enterprise Cloud Migration",
    code: "PRJ-3001",
    amount: 340000,
    share: 40.2,
    activeColor: "bg-[#2563eb]",
  },
  {
    rank: 2,
    title: "Fintech Core Banking UI",
    code: "PRJ-3002",
    amount: 210000,
    share: 24.8,
    activeColor: "bg-[#3b82f6]",
  },
  {
    rank: 3,
    title: "HealthTech Telehealth App",
    code: "PRJ-3003",
    amount: 165000,
    share: 19.5,
    activeColor: "bg-[#60a5fa]",
  },
  {
    rank: 4,
    title: "Retail POS Modernization",
    code: "PRJ-3004",
    amount: 130000,
    share: 15.5,
    activeColor: "bg-[#93c5fd]",
  },
];

const COLOR_STEPS = ["bg-[#2563eb]", "bg-[#3b82f6]", "bg-[#60a5fa]", "bg-[#93c5fd]"];

export function RevenueByProject({ currency }: RevenueByProjectProps) {
  const [projectList, setProjectList] = useState(DEFAULT_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getProjects(4)
      .then((data: ProjectItem[]) => {
        if (isMounted && data && data.length > 0) {
          const mapped = data.map((p, idx) => ({
            rank: idx + 1,
            title: p.title,
            code: p.code,
            amount: p.amount,
            share: p.sharePercent,
            activeColor: COLOR_STEPS[idx % COLOR_STEPS.length],
          }));
          setProjectList(mapped);
        }
      })
      .catch(() => {
        // Fallback to default demo data
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

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline text-base sm:text-lg font-bold text-[#0f172a]">
              Revenue by Project
            </h3>
            {isLoading && <Loader2 size={13} className="animate-spin text-blue-500" />}
          </div>
          <p className="mt-0.5 text-xs text-[#64748b]">
            Portfolio share and billing realization
          </p>
        </div>

        <span className="rounded-lg bg-[#eff6ff] px-2.5 py-1 font-mono text-[11px] font-bold text-[#2563eb]">
          Top {projectList.length} Accounts
        </span>
      </div>

      {/* Projects List */}
      <div className="my-3 space-y-4">
        {projectList.map((proj) => (
          <div key={proj.code} className="group">
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#eff6ff] font-mono text-[10px] font-bold text-[#2563eb]">
                  {proj.rank}
                </span>
                <span className="font-semibold text-[#0f172a] group-hover:text-[#2563eb] transition-colors">
                  {proj.title}
                </span>
                <span className="font-mono text-[10px] text-[#94a3b8]">
                  {proj.code}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <span className="font-bold text-[#0f172a]">
                  {formatMoney(proj.amount)}
                </span>
                <span className="text-[11px] text-[#64748b] w-12 text-right">
                  {proj.share}%
                </span>
              </div>
            </div>

            {/* Progress Share Bar */}
            <div className="h-1.5 w-full rounded-full bg-[#f1f5f9] overflow-hidden">
              <div
                className={`h-full rounded-full ${proj.activeColor} transition-all duration-700 ease-out`}
                style={{ width: `${Math.min(100, Math.max(0, proj.share))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
