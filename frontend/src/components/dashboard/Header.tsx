"use client";

import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
  Check,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { NavItemKey } from "./Sidebar";

interface HeaderProps {
  currentTab: NavItemKey;
  onToggleSidebar: () => void;
  adminName: string;
  adminRole: string;
  onLogout: () => void;
  currency: "INR" | "USD" | "EUR";
  onCurrencyChange: (c: "INR" | "USD" | "EUR") => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Header({
  currentTab,
  onToggleSidebar,
  adminName,
  adminRole,
  onLogout,
  currency,
  onCurrencyChange,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const breadcrumbsMap: Record<NavItemKey, { group: string; name: string }> = {
    dashboard: { group: "Overview", name: "Dashboard" },
    budgets: { group: "Financial Management", name: "Budgets & Revenue" },
    payroll: { group: "Financial Management", name: "Payroll & Salaries" },
    timeline: { group: "Financial Management", name: "Payment Timeline" },
    employees: { group: "People Management", name: "Employees" },
    clients: { group: "People Management", name: "Clients" },
    projects: { group: "Project Management", name: "Projects & Assignments" },
    tasks: { group: "Project Management", name: "Task Management" },
    contracts: { group: "Business Operations", name: "Contracts & Documents" },
    calendar: { group: "Business Operations", name: "Event Calendar" },
    reports: { group: "Insights", name: "Reports & Exports" },
    activity: { group: "Insights", name: "Activity Log" },
  };

  const breadcrumb = breadcrumbsMap[currentTab] || {
    group: "Overview",
    name: "Dashboard",
  };

  const notifications = [
    {
      id: "1",
      title: "Invoice #INV-2024-88 paid",
      desc: "₹3,40,000 received from Apex Global",
      time: "10m ago",
      unread: true,
    },
    {
      id: "2",
      title: "Payroll authorization pending",
      desc: "Oct 2024 salaries require executive signoff",
      time: "1h ago",
      unread: true,
    },
    {
      id: "3",
      title: "Sprint 14 Milestone approaching",
      desc: "Scheduled for Oct 29, 10:30 AM",
      time: "3h ago",
      unread: true,
    },
  ];

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-[#e5e7eb] bg-[#ffffff]/90 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
          className="rounded-lg p-2 text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
        >
          <Menu size={18} />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#64748b]">
          <span className="hover:text-[#0f172a] transition-colors">{breadcrumb.group}</span>
          <span className="text-[#cbd5e1]">›</span>
          <span className="font-semibold text-[#0f172a]">{breadcrumb.name}</span>
        </nav>
      </div>

      {/* Middle: Global Search */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search employees, projects, invoices..."
            className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-9 pr-12 text-xs text-[#0f172a] placeholder-[#94a3b8] outline-none transition-all focus:border-[#3b82f6] focus:bg-white focus:ring-2 focus:ring-[#3b82f6]/10"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-[#e2e8f0] bg-white px-1.5 py-0.5 font-mono text-[9px] font-semibold text-[#64748b] shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions & User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Currency Switcher */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            className="flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1.5 font-mono text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] transition-colors shadow-2xs"
          >
            <span>
              {currency === "INR"
                ? "₹ INR (₹)"
                : currency === "USD"
                ? "$ USD ($)"
                : "€ EUR (€)"}
            </span>
            <ChevronDown size={14} className="text-[#94a3b8]" />
          </button>

          {showCurrencyDropdown && (
            <div className="absolute right-0 mt-1.5 w-36 rounded-xl border border-[#e2e8f0] bg-white p-1 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150">
              {(["INR", "USD", "EUR"] as const).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => {
                    onCurrencyChange(curr);
                    setShowCurrencyDropdown(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                    currency === curr
                      ? "bg-[#eff6ff] text-[#2563eb]"
                      : "text-[#334155] hover:bg-[#f8fafc]"
                  }`}
                >
                  <span>
                    {curr === "INR"
                      ? "₹ INR"
                      : curr === "USD"
                      ? "$ USD"
                      : "€ EUR"}
                  </span>
                  {currency === curr && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] text-[9px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-xs text-[#0f172a]">Notifications</h4>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 font-mono text-[10px] font-bold text-red-600">
                    3 New
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#3b82f6] hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="mt-2 divide-y divide-[#f8fafc]">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 hover:bg-[#f8fafc] px-2 rounded-lg transition-colors">
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-semibold text-[#0f172a]">{n.title}</p>
                      <span className="font-mono text-[10px] text-[#94a3b8]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#64748b] mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help button */}
        <button
          type="button"
          onClick={() => setShowHelpModal(true)}
          className="rounded-lg p-2 text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
          aria-label="Help & Documentation"
        >
          <HelpCircle size={18} />
        </button>

        {/* User profile avatar & details */}
        <div className="flex items-center gap-2.5 border-l border-[#e2e8f0] pl-3 sm:pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e40af] text-white font-mono text-xs font-bold ring-2 ring-blue-100">
            {adminName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#0f172a] leading-tight">
              {adminName}
            </span>
            <span className="font-mono text-[10px] text-[#64748b]">
              {adminRole}
            </span>
          </div>

          {/* Logout button */}
          <button
            type="button"
            onClick={onLogout}
            title="Sign out of Enterprise OS"
            className="ml-1 rounded-lg p-1.5 text-[#64748b] hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#3b82f6]" />
                <h3 className="font-bold text-sm text-[#0f172a]">
                  Enterprise OS Help Center
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="rounded-lg p-1 text-[#94a3b8] hover:text-[#0f172a]"
              >
                <X size={16} />
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs text-[#475569]">
              <p>
                <strong>KeySpex Enterprise OS v4.8</strong> is an all-in-one corporate portal for executive financial oversight, project tracking, and team administration.
              </p>
              <div className="rounded-xl bg-[#f8fafc] border border-[#e2e8f0] p-3 space-y-1 font-mono text-[11px]">
                <p>• <strong>API Status:</strong> Active & Connected to Firebase</p>
                <p>• <strong>Auth Token:</strong> Stored securely in session storage</p>
                <p>• <strong>Role:</strong> Super Admin (Full Read/Write Privilege)</p>
              </div>
              <p className="text-[11px] text-[#64748b]">
                Need technical assistance? Reach our engineering team at <span className="text-[#3b82f6]">dev@keyspex.com</span>.
              </p>
            </div>
            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="rounded-xl bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1e293b]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

