// frontend/src/components/employee/UpcomingDeadlines.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useEmployee } from "@/context/EmployeeContext";
import { Calendar } from "lucide-react";

export function UpcomingDeadlines({ deadlines = [] }: { deadlines?: any[] }) {
  const { setCurrentTab } = useEmployee();
  const [currentMonthYear, setCurrentMonthYear] = useState("");

  useEffect(() => {
    setCurrentMonthYear(
      new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date())
    );
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md hover:border-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900">Upcoming Deadlines</h2>
          <span className="text-xs text-slate-400">{currentMonthYear}</span>
        </div>

        {deadlines.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-slate-300" />
            No upcoming project deadlines.
          </div>
        ) : (
          <div className="space-y-4">
            {deadlines.map((d: any) => (
              <div key={d.id} className="flex items-start gap-3">
                <span
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    d.isUrgent ? "bg-[#004AC6] animate-pulse" : "bg-slate-300"
                  }`}
                />
                <div>
                  <p className="text-xs font-semibold text-slate-900">{d.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {d.date} • {d.projectCode} • {d.time || "5:00 PM"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setCurrentTab("projects")}
        className="text-xs font-medium text-slate-500 hover:text-slate-900 mt-5 inline-block text-left cursor-pointer"
      >
        View all projects →
      </button>
    </div>
  );
}
