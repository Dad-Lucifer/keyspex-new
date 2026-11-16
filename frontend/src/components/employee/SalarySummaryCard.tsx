// frontend/src/components/employee/SalarySummaryCard.tsx
"use client";

import React from "react";
import { useEmployee } from "@/context/EmployeeContext";
import { ArrowUpRight, CheckCircle2, TrendingUp } from "lucide-react";

export function SalarySummaryCard() {
  const { setCurrentTab, stats, projects, latestSalary, formatCurrency } = useEmployee();

  // Project-based compensation figures
  const totalContractedPortfolio = stats?.totalProjectValue ?? 0;
  const realizedPayout = stats?.projectEarnings ?? stats?.monthlySalary ?? 0;
  const inProgressPipeline = Math.max(0, totalContractedPortfolio - realizedPayout);
  const projectCount = projects?.length ?? 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:border-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Project Compensation</h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-[#004AC6] border border-blue-100 rounded-full uppercase tracking-wider">
            Project-Based
          </span>
        </div>

        <div className="mb-4">
          <p className="text-[11px] text-slate-500">Total agreed portfolio value</p>
          <div className="text-2xl font-bold text-[#004AC6] mt-0.5 tracking-tight">
            {formatCurrency(totalContractedPortfolio)} {/* ← REPLACE ₹{totalContractedPortfolio.toLocaleString("en-IN")} */}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Across {projectCount} accepted client {projectCount === 1 ? "project" : "projects"}
          </p>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-3">
          {/* Realized Milestone Earnings */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-slate-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Realized Earnings
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Approved milestone disbursements</p>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-emerald-600">
                {formatCurrency(realizedPayout)} {/* ← REPLACE ₹{realizedPayout.toLocaleString("en-IN")} */}
              </span>
              <span className="block text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded mt-0.5">
                Paid
              </span>
            </div>
          </div>

          {/* In-Progress Pipeline */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-slate-800 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#004AC6]" />
                In-Progress Escrow
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">Milestones pending delivery & QA</p>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-[#004AC6]">
                {formatCurrency(inProgressPipeline)} {/* ← REPLACE ₹{inProgressPipeline.toLocaleString("en-IN")} */}
              </span>
              <span className="block text-[10px] font-semibold text-[#004AC6] bg-blue-50 px-1.5 py-0.2 rounded mt-0.5">
                In Pipeline
              </span>
            </div>
          </div>

          {/* Latest Settled Project */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <div>
              <p className="font-semibold text-slate-800">Latest settled payout</p>
              <p className="text-[11px] text-slate-500 font-mono">
                {latestSalary
                  ? `${latestSalary.projectCode || latestSalary.period || "Disbursed"} (${formatCurrency(
                      latestSalary.netAmount ?? latestSalary.amount ?? 0
                    )} net)`
                  : "No settled payouts yet"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCurrentTab("slips")}
              className="text-[#004AC6] font-semibold text-[11px] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View Slip</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCurrentTab("salary")}
        className="w-full mt-5 py-2 text-center text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-[#004AC6] transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
      >
        <span>View Project Compensation Details</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
      </button>
    </div>
  );
}