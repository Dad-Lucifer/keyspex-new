// frontend/src/components/employee/EmployeeSidebar.tsx
"use client";

import React from "react";
import { useEmployee, EmployeeTabKey } from "@/context/EmployeeContext";
import { getInitials } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  CheckCircle2,
  Wallet,
  Calendar,
  FileText,
} from "lucide-react";

interface NavItem {
  key: EmployeeTabKey;
  label: string;
  icon: any;
}

const NAV_GROUPS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "WORKSPACE",
    items: [
      { key: "overview", label: "Overview", icon: LayoutDashboard },
      { key: "projects", label: "My Projects", icon: Briefcase },
      { key: "tasks", label: "My Tasks", icon: CheckCircle2 },
    ],
  },
  {
    heading: "MY FINANCES",
    items: [
      { key: "salary", label: "My Salary", icon: Wallet },
      { key: "payments", label: "Payment Timeline", icon: Calendar },
      { key: "slips", label: "Salary Slips", icon: FileText },
    ],
  },
  {
    heading: "MY DOCUMENTS",
    items: [
      { key: "contracts", label: "My Contracts", icon: FileText },
    ],
  },
];

export function EmployeeSidebar() {
  const { user, currentTab, setCurrentTab, openProfileModal } = useEmployee();
  const initials = getInitials(user?.displayName);

  return (
    <aside className="w-[230px] shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between h-screen sticky top-0 select-none z-30">
      <div className="p-4">
        {/* Brand Header */}
        <div
          onClick={() => setCurrentTab("overview")}
          className="flex items-center gap-2.5 px-2 py-2 mb-6 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#004AC6] flex items-center justify-center text-white shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="text-[14px] font-bold text-slate-900 leading-tight">KeySpex OS</div>
            <div className="text-[11px] font-medium text-slate-500 leading-tight">Employee Portal</div>
          </div>
        </div>

        {/* Navigation Categories */}
        <div className="space-y-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.heading}>
              <div className="text-[10px] font-semibold tracking-wider text-slate-400 px-2.5 mb-2">
                {group.heading}
              </div>
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setCurrentTab(item.key)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors text-left cursor-pointer ${
                        isActive
                          ? "bg-[#EBF2FE] text-[#004AC6]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#004AC6]" : "text-slate-500"}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* User Info Footer (Opens Profile Modal) */}
      <div className="p-2 border-t border-slate-100">
        <button
          type="button"
          onClick={openProfileModal}
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer group text-left"
          title="Click to view & edit your profile"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#004AC6] text-white font-semibold text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:ring-2 group-hover:ring-blue-200 transition-all">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-slate-900 truncate group-hover:text-[#004AC6] transition-colors">
                {user?.displayName || "Employee"}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {user?.title || "Employee"}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-[#004AC6] opacity-0 group-hover:opacity-100 transition-opacity pr-1">
            Edit
          </span>
        </button>
      </div>
    </aside>
  );
}
