// frontend/src/components/employee/MyProjectsCard.tsx
"use client";

import React from "react";
import { useEmployee } from "@/context/EmployeeContext";
import { EmployeeProject } from "@/lib/employeeApi";

export function MyProjectsCard({ projects }: { projects: EmployeeProject[] }) {
  const { setCurrentTab } = useEmployee();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:border-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-slate-900">My Projects</h2>
        <button
          type="button"
          onClick={() => setCurrentTab("projects")}
          className="text-xs font-semibold text-[#004AC6] hover:underline cursor-pointer"
        >
          View all ({projects.length}) →
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((proj) => {
          const isCompleted = proj.status === "Completed";
          return (
            <div key={proj.id} className="pt-2 pb-1 first:pt-0">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-slate-700">
                  <span className="text-slate-400 font-mono text-[11px]">{proj.code}</span>
                  <span className="mx-1.5 text-slate-300">•</span>
                  <span className="font-semibold text-slate-900">{proj.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentTab("projects")}
                  className="text-[11px] font-medium text-[#004AC6] hover:underline cursor-pointer"
                >
                  View project →
                </button>
              </div>

              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                <span>{proj.role}</span>
                <span className="text-slate-300">•</span>
                <span>Due {proj.dueDate}</span>
                <span className="text-slate-300">•</span>
                <span className={isCompleted ? "text-emerald-600 font-semibold" : "text-[#004AC6] font-medium"}>
                  {proj.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-2.5 flex items-center gap-3">
                <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${isCompleted ? "bg-emerald-500" : "bg-[#004AC6]"}`}
                    style={{ width: `${proj.progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-medium">
                  {proj.progressPercent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
