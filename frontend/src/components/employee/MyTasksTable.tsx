// frontend/src/components/employee/MyTasksTable.tsx
"use client";

import React, { useState } from "react";
import { useEmployee } from "@/context/EmployeeContext";
import { EmployeeTask } from "@/lib/employeeApi";
import { CheckCircle2, Clock } from "lucide-react";

export function MyTasksTable({ tasks }: { tasks: EmployeeTask[] }) {
  const { setCurrentTab } = useEmployee();
  const [selectedProject, setSelectedProject] = useState<string>("all");

  // Extract unique projects from tasks
  const projectCodes = Array.from(new Set(tasks.map((t) => t.projectCode))).filter(Boolean);

  const filteredTasks =
    selectedProject === "all"
      ? tasks
      : tasks.filter((t) => t.projectCode === selectedProject);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:border-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-slate-900">Project Tasks</h2>
          {/* Project-specific quick filter pills */}
          <div className="flex items-center gap-1 text-[11px] overflow-x-auto">
            <button
              onClick={() => setSelectedProject("all")}
              className={`px-2 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
                selectedProject === "all"
                  ? "bg-slate-900 text-white font-semibold"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({tasks.length})
            </button>
            {projectCodes.map((code) => {
              const count = tasks.filter((t) => t.projectCode === code).length;
              return (
                <button
                  key={code}
                  onClick={() => setSelectedProject(code)}
                  className={`px-2 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
                    selectedProject === code
                      ? "bg-[#004AC6] text-white font-semibold"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {code} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrentTab("tasks")}
          className="text-xs font-semibold text-[#004AC6] hover:underline cursor-pointer self-start sm:self-auto"
        >
          View all tasks →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-2.5 font-semibold">TASK &amp; MILESTONE</th>
              <th className="pb-2.5 font-semibold">PROJECT</th>
              <th className="pb-2.5 font-semibold">DUE DATE</th>
              <th className="pb-2.5 font-semibold text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400 text-xs">
                  No tasks assigned for this project.
                </td>
              </tr>
            ) : (
              filteredTasks.map((t) => {
                const isCompleted = t.status === "Completed";
                return (
                  <tr
                    key={t.id}
                    onClick={() => setCurrentTab("tasks")}
                    className="hover:bg-slate-50/80 transition-colors duration-150 cursor-pointer"
                  >
                    <td className="py-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-emerald-500" : "bg-[#004AC6]"}`} />
                        <span className={isCompleted ? "line-through text-slate-400" : ""}>{t.title}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {t.projectCode}
                      </span>
                    </td>
                    <td className="py-3 text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {t.dueDate}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : t.status === "In Progress"
                            ? "bg-blue-50 text-[#004AC6] border border-blue-100"
                            : t.status === "Under Review"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
