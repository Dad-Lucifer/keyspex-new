"use client";

import React from "react";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  TrendingUp,
  Users,
  Briefcase,
  CheckSquare,
  FileText,
  Calendar,
  BarChart3,
  History,
  Settings,
  ChevronRight,
  ShieldCheck,
  Building,
} from "lucide-react";

export type NavItemKey =
  | "dashboard"
  | "budgets"
  | "payroll"
  | "timeline"
  | "employees"
  | "clients"
  | "projects"
  | "tasks"
  | "contracts"
  | "calendar"
  | "reports"
  | "activity";

interface SidebarProps {
  currentTab: NavItemKey;
  onSelectTab: (tab: NavItemKey) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  adminName?: string;
  adminEmail?: string;
  employeeCount?: number;
  clientCount?: number;
}

export function Sidebar({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  adminName = "Alex Rivera",
  adminEmail = "superadmin@brand.com",
  employeeCount = 18,
  clientCount = 24,
}: SidebarProps) {
  const sections = [
    {
      title: "OVERVIEW",
      items: [
        {
          key: "dashboard" as NavItemKey,
          label: "Dashboard",
          icon: LayoutDashboard,
          badge: null,
        },
      ],
    },
    {
      title: "FINANCIAL MANAGEMENT",
      items: [
        {
          key: "budgets" as NavItemKey,
          label: "Budgets & Revenue",
          icon: Wallet,
          badge: null,
        },
        {
          key: "payroll" as NavItemKey,
          label: "Payroll & Salaries",
          icon: CreditCard,
          badge: null,
        },
        {
          key: "timeline" as NavItemKey,
          label: "Payment Timeline",
          icon: TrendingUp,
          badge: null,
        },
      ],
    },
    {
      title: "PEOPLE MANAGEMENT",
      items: [
        {
          key: "employees" as NavItemKey,
          label: "Employees",
          icon: Users,
          badge: employeeCount.toString(),
        },
        {
          key: "clients" as NavItemKey,
          label: "Clients",
          icon: Building,
          badge: clientCount.toString(),
        },
      ],
    },
    {
      title: "PROJECT MANAGEMENT",
      items: [
        {
          key: "projects" as NavItemKey,
          label: "Projects & Assignments",
          icon: Briefcase,
          badge: "12",
        },
        {
          key: "tasks" as NavItemKey,
          label: "Task Management",
          icon: CheckSquare,
          badge: null,
        },
      ],
    },
    {
      title: "BUSINESS OPERATIONS",
      items: [
        {
          key: "contracts" as NavItemKey,
          label: "Contracts & Documents",
          icon: FileText,
          badge: null,
        },
        {
          key: "calendar" as NavItemKey,
          label: "Event Calendar",
          icon: Calendar,
          badge: "4",
        },
      ],
    },
    {
      title: "INSIGHTS",
      items: [
        {
          key: "reports" as NavItemKey,
          label: "Reports & Exports",
          icon: BarChart3,
          badge: null,
        },
        {
          key: "activity" as NavItemKey,
          label: "Activity Log",
          icon: History,
          badge: null,
        },
      ],
    },
  ];

  return (
    <aside
      className={`relative flex flex-col border-r border-[#e5e7eb] bg-[#ffffff] transition-all duration-300 z-30 shrink-0 ${
        collapsed ? "w-18" : "w-64"
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center px-4 border-b border-[#e5e7eb] justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Logo 4-box tile icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#1d4ed8] to-[#3b82f6] text-white shadow-sm shadow-blue-500/20">
            <div className="grid grid-cols-2 gap-0.5">
              <span className="h-1.5 w-1.5 rounded-xs bg-white" />
              <span className="h-1.5 w-1.5 rounded-xs bg-white/70" />
              <span className="h-1.5 w-1.5 rounded-xs bg-white/70" />
              <span className="h-1.5 w-1.5 rounded-xs bg-white" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-headline font-bold text-base tracking-tight text-[#0f172a]">
                Enterprise OS
              </span>
              <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-[#3b82f6]">
                KeySpex Portal
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
        {sections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="px-3 mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onSelectTab(item.key)}
                    title={collapsed ? item.label : undefined}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#eef2ff] text-[#2563eb] font-semibold shadow-xs"
                        : "text-[#475569] hover:bg-[#f8fafc] hover:text-[#0f172a]"
                    } ${collapsed ? "justify-center px-0" : ""}`}
                  >
                    <Icon
                      size={18}
                      className={`shrink-0 transition-transform ${
                        isActive
                          ? "text-[#2563eb]"
                          : "text-[#64748b] group-hover:text-[#0f172a]"
                      }`}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                    {!collapsed && (
                      <span className="truncate flex-1 text-left">
                        {item.label}
                      </span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        className={`ml-auto font-mono text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                          isActive
                            ? "bg-[#2563eb] text-white"
                            : "bg-[#f1f5f9] text-[#64748b]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom User Card */}
      <div className="border-t border-[#e5e7eb] p-3 bg-[#ffffff]">
        <div
          className={`flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[#f8fafc] ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {/* Avatar with initials */}
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6] text-white font-mono text-xs font-bold shadow-xs">
            {adminName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          {!collapsed && (
            <div className="flex flex-1 flex-col overflow-hidden text-left">
              <span className="truncate text-xs font-semibold text-[#0f172a]">
                {adminName}
              </span>
              <span className="truncate font-mono text-[10px] text-[#64748b]">
                {adminEmail}
              </span>
            </div>
          )}
          {!collapsed && (
            <button
              type="button"
              onClick={() => onSelectTab("dashboard")}
              title="Settings"
              className="rounded-lg p-1 text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
            >
              <Settings size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

