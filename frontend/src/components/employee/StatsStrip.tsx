// frontend/src/components/employee/StatsStrip.tsx
"use client";

import React from "react";
import { useEmployee } from "@/context/EmployeeContext";

export function StatsStrip({
  stats,
}: {
  stats?: {
    monthlySalary?: number;
    projectEarnings?: number;
    totalProjectValue?: number;
    activeProjects?: number;
    inProgressProjects?: number;
    completedProjects?: number;
    pendingTasks?: number;
    completedTasks?: number;
    dueThisWeekTasks?: number;
    sprintVelocity?: string;
  };
}) {
  const { formatCurrency } = useEmployee();
  const projectEarnings = stats?.projectEarnings ?? stats?.monthlySalary ?? 0;
  const active = stats?.activeProjects ?? 0;
  const inProgress = stats?.inProgressProjects ?? 0;
  const completedProjects = stats?.completedProjects ?? 0;
  const pending = stats?.pendingTasks ?? 0;
  const completedTasks = stats?.completedTasks ?? 0;
  const dueThisWeek = stats?.dueThisWeekTasks ?? 0;
  const velocity = stats?.sprintVelocity ?? "Sprint velocity";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Project Earnings */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:border-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
        <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Project Earnings
        </p>
        <div className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">
          {formatCurrency(projectEarnings)} {/* ← REPLACE ₹{projectEarnings.toLocaleString("en-IN")} */}
        </div>
        <p className="text-[11px] text-emerald-600 font-medium mt-1">Realized milestone payouts</p>
      </div>

      {/* Active Projects */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:border-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
        <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Active Projects
        </p>
        <div className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">
          {active}
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          {inProgress} in progress, {completedProjects} completed
        </p>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:border-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
        <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Pending Tasks
        </p>
        <div className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">
          {pending}
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          {dueThisWeek} due this week
        </p>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:border-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
        <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Completed Tasks
        </p>
        <div className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">
          {completedTasks}
        </div>
        <p className="text-[11px] text-slate-500 mt-1">{velocity}</p>
      </div>
    </div>
  );
}