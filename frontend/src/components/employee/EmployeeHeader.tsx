// frontend/src/components/employee/EmployeeHeader.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  FileText,
  X,
  Mail,
  Briefcase,
  UserCheck,
  Check,
} from "lucide-react";
import { useEmployee, EmployeeTabKey } from "@/context/EmployeeContext";
import { getInitials } from "@/lib/utils";

const TAB_MAP: Record<EmployeeTabKey, { section: string; title: string }> = {
  overview: { section: "Workspace", title: "Overview" },
  projects: { section: "Workspace", title: "My Projects" },
  tasks: { section: "Workspace", title: "My Tasks" },
  salary: { section: "My Finances", title: "My Salary" },
  payments: { section: "My Finances", title: "Payment Timeline" },
  slips: { section: "My Finances", title: "Salary Slips" },
  contracts: { section: "My Documents", title: "My Contracts" },
};

export interface HeaderNotification {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

export function EmployeeHeader() {
  const router = useRouter();
  const {
    user,
    projects,
    tasks,
    openProfileModal,
    currentTab,
    setCurrentTab,
    currency,
    setCurrency,
  } = useEmployee();
  const initials = getInitials(user?.displayName);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [notifications, setNotifications] = useState<HeaderNotification[]>([]);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const currencyMenuRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        currencyMenuRef.current &&
        !currencyMenuRef.current.contains(event.target as Node)
      ) {
        setShowCurrencyDropdown(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentRoute = TAB_MAP[currentTab] || TAB_MAP.overview;

  const allProjects = projects || [];
  const allTasks = tasks || [];

  const query = searchQuery.trim().toLowerCase();
  const matchingProjects = query
    ? allProjects
        .filter(
          (p: any) =>
            p.title?.toLowerCase().includes(query) ||
            p.code?.toLowerCase().includes(query)
        )
        .slice(0, 3)
    : [];

  const matchingTasks = query
    ? allTasks
        .filter((t: any) => t.title?.toLowerCase().includes(query))
        .slice(0, 3)
    : [];

  const showSearchResults = isSearchFocused && query.length > 0;

  const navigateToTab = (tab: EmployeeTabKey) => {
    setSearchQuery("");
    setIsSearchFocused(false);
    setCurrentTab(tab);
  };

  const handleLogout = async () => {
    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("ks_access_token")
          : null;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

      await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        credentials: "include",
      }).catch(() => {});
    } finally {
      sessionStorage.removeItem("ks_access_token");
      sessionStorage.removeItem("ks_user");
      document.cookie =
        "ks_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "ks_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/login");
    }
  };

  return (
    <>
      <header className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-20">
        {/* Left: Dynamic Breadcrumbs & Search Bar */}
        <div className="flex items-center gap-6">
          <div className="text-[13px] text-slate-500 hidden sm:flex items-center">
            <span>{currentRoute.section}</span>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-semibold text-slate-900">
              {currentRoute.title}
            </span>
          </div>

          {/* Search Bar Container */}
          <div className="relative w-72 sm:w-84" ref={searchContainerRef}>
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, tasks, slips..."
              className="w-full pl-9 pr-16 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#004AC6] focus:bg-white transition-colors"
            />

            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-0.5 text-slate-400 hover:text-slate-600 rounded transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-block text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  Ctrl K
                </kbd>
              )}
            </div>

            {showSearchResults && (
              <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                {matchingProjects.length === 0 && matchingTasks.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-500">
                    No results found for "
                    <span className="font-medium text-slate-700">
                      {searchQuery}
                    </span>
                    "
                  </div>
                ) : (
                  <div className="space-y-2">
                    {matchingProjects.length > 0 && (
                      <div>
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                          Projects
                        </div>
                        {matchingProjects.map((proj: any) => (
                          <button
                            key={proj.id}
                            type="button"
                            onClick={() => navigateToTab("projects")}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-xs transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Briefcase className="w-3.5 h-3.5 text-[#004AC6] shrink-0" />
                              <span className="font-medium text-slate-800 truncate">
                                {proj.title}
                              </span>
                              {proj.code && (
                                <span className="text-[10px] text-slate-400 font-mono">
                                  [{proj.code}]
                                </span>
                              )}
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}

                    {matchingTasks.length > 0 && (
                      <div>
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                          Tasks
                        </div>
                        {matchingTasks.map((task: any) => (
                          <button
                            key={task.id}
                            type="button"
                            onClick={() => navigateToTab("tasks")}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 flex items-center justify-between text-xs transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="font-medium text-slate-800 truncate">
                                {task.title}
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Currency, Notifications, Help, User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <div className="relative" ref={currencyMenuRef}>
            <button
              type="button"
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <span>
                {currency === "INR"
                  ? "₹ INR (₹)"
                  : currency === "USD"
                  ? "$ USD ($)"
                  : "€ EUR (€)"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-1.5 w-36 rounded-xl border border-slate-200 bg-white p-1 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150">
                {(["INR", "USD", "EUR"] as const).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => {
                      setCurrency(curr);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium cursor-pointer ${
                      currency === curr
                        ? "bg-blue-50 text-[#004AC6]"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>
                      {curr === "INR"
                        ? "₹ INR"
                        : curr === "USD"
                        ? "$ USD"
                        : "€ EUR"}
                    </span>
                    {currency === curr && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Popover */}
          <div className="relative" ref={notifMenuRef}>
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#004AC6] text-[9px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#004AC6]">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="text-[11px] text-[#004AC6] font-medium hover:underline cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="py-2 divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          className={`py-2.5 px-2 rounded-lg flex items-start gap-3 transition-colors ${
                            item.unread ? "bg-slate-50/70" : "hover:bg-slate-50"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg shrink-0 ${item.iconColor}`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p
                                className={`text-xs ${
                                  item.unread
                                    ? "font-semibold text-slate-900"
                                    : "text-slate-700"
                                }`}
                              >
                                {item.title}
                              </p>
                              <span className="text-[10px] text-slate-400 shrink-0">
                                {item.time}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Help & Support Button */}
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Help & Support"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <div className="h-4 w-[1px] bg-slate-200 mx-1" />

          {/* User Profile Avatar with Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
              aria-label="User profile menu"
            >
              <div className="w-8 h-8 rounded-full bg-[#004AC6] text-white font-semibold text-xs flex items-center justify-center ring-2 ring-blue-100 shadow-sm shrink-0">
                {initials}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div
                  onClick={() => {
                    setShowProfileMenu(false);
                    openProfileModal();
                  }}
                  className="px-3.5 py-2.5 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {user?.displayName || "Employee"}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {user?.email || "No email"}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium bg-blue-50 text-[#004AC6] rounded-md">
                    {user?.title || "Employee"}
                  </span>
                </div>

                <div className="pt-1 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      openProfileModal();
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#004AC6] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>View & Edit Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-3.5 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Help & Support Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#004AC6]" />
                <h3 className="font-bold text-sm text-slate-900">
                  Employee Portal Help
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-slate-600">
              <p>
                Welcome to the <strong>KeySpex Employee Portal</strong>. Here you
                can track assigned tasks, monitor your projects, review your
                compensation, and download salary slips.
              </p>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-[#004AC6] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800">
                      Salary & Slips
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Navigate to "Salary Slips" under My Finances to
                      view breakdown and download PDFs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800">
                      Task Management
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Update task status from "Pending" to
                      "Completed" to keep your PM updated.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>
                  Need payroll or HR assistance? Contact{" "}
                  <span className="text-[#004AC6] font-medium">
                    hr@keyspex.com
                  </span>
                </span>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}