// frontend/src/components/employee/WelcomeHeader.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useEmployee } from "@/context/EmployeeContext";
import { getFirstName } from "@/lib/utils";
import { FileText, CheckCircle2 } from "lucide-react";

export function WelcomeHeader() {
  const { user, setCurrentTab } = useEmployee();
  const firstName = getFirstName(user?.displayName);
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
    setToday(formattedDate);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Good morning, {firstName}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Here&apos;s your project milestone deliverables and payment overview.{today ? ` • ${today}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setCurrentTab("slips")}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-95 transition-all shadow-2xs cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>View Project Slips</span>
        </button>
        <button
          type="button"
          onClick={() => setCurrentTab("tasks")}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#004AC6] hover:bg-[#003ea8] active:scale-95 rounded-lg transition-all shadow-2xs cursor-pointer"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>View Assigned Tasks</span>
        </button>
      </div>
    </div>
  );
}
