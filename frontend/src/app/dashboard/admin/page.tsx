"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Download,
  Plus,
  Radio,
  Sparkles,
  Check,
  Shield,
  Loader2,
} from "lucide-react";
import { Sidebar, NavItemKey } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { BudgetUtilization } from "@/components/dashboard/BudgetUtilization";
import { RevenueByProject } from "@/components/dashboard/RevenueByProject";
import { UpcomingObligations } from "@/components/dashboard/UpcomingObligations";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { CreateUserModal } from "@/components/dashboard/CreateUserModal";
import { UserManagementView } from "@/components/dashboard/UserManagementView";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<NavItemKey>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD" | "EUR">("INR");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("This Month: Oct 1 - Oct 31, 2024");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCurrencyDefaultDropdown, setShowCurrencyDefaultDropdown] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // User & counts
  const [adminUser, setAdminUser] = useState<{
    displayName: string;
    email: string;
    role: string;
  }>({
    displayName: "",
    email: "",
    role: "",
  });
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(18);
  const [clientCount, setClientCount] = useState(24);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Authenticate & load live profile with strict route guard
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check session storage
    const token = sessionStorage.getItem("ks_access_token");
    const storedUserStr = sessionStorage.getItem("ks_user");

    // 1. If not logged in -> redirect to login immediately
    if (!token || !storedUserStr) {
      document.cookie = "ks_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "ks_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.replace("/login?error=auth_required");
      return;
    }

    // 2. Role verification -> Must be admin
    let userRole = "";
    try {
      const u = JSON.parse(storedUserStr);
      userRole = u.role;
      if (userRole !== "admin") {
        document.cookie = "ks_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "ks_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.replace("/login?error=admin_only");
        return;
      }
      setAdminUser({
        displayName: u.displayName || "Admin User",
        email: u.email || "admin@keyspex.com",
        role: "Super Admin",
      });
    } catch {
      router.replace("/login");
      return;
    }

    // 3. Verify session validity with backend /api/auth/me
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
    fetch(`${apiUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid or expired session");
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data && data.data.role === "admin" && data.data.active !== false) {
          setAdminUser({
            displayName: data.data.displayName || "Admin User",
            email: data.data.email,
            role: "Super Admin",
          });
          setIsAuthorized(true);
          setIsCheckingAuth(false);
        } else {
          throw new Error("Unauthorized role");
        }
      })
      .catch(() => {
        // Clear invalid tokens and redirect to login
        sessionStorage.removeItem("ks_access_token");
        sessionStorage.removeItem("ks_user");
        document.cookie = "ks_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "ks_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.replace("/login?error=session_expired");
      });

    // Fetch live employee & client count
    fetch(`${apiUrl}/api/users?role=employee`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data?.users?.length) {
          setEmployeeCount(data.data.users.length);
        }
      })
      .catch(() => {});

    fetch(`${apiUrl}/api/users?role=client`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data?.users?.length) {
          setClientCount(data.data.users.length);
        }
      })
      .catch(() => {});
  }, [router]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("ks_access_token")
          : null;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

      await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      }).catch(() => {});
    } finally {
      sessionStorage.removeItem("ks_access_token");
      sessionStorage.removeItem("ks_user");
      document.cookie = "ks_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "ks_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.replace("/login");
    }
  };

  // Export report generator (CSV download)
  const handleExportReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["KeySpex Enterprise OS - Financial Summary Report"],
        ["Generated", new Date().toISOString()],
        ["Period", dateRange],
        ["Currency", currency],
        [],
        ["Metric", "Value", "Notes"],
        ["Total Revenue", "8,45,000", "+14.2% MoM"],
        ["Outstanding", "1,25,000", "3 Overdue, 4 Clients"],
        ["Total Budget", "12,00,000", "70.4% Committed"],
        ["Salary Payable", "2,40,000", "Due Nov 1, 18 Staff"],
        ["Active Projects", "12", "8 on track, 2 near, 2 alert"],
        ["Total Employees", employeeCount.toString(), "Active team"],
        [],
        ["Project", "Billing Realization", "Share"],
        ["Enterprise Cloud Migration", "3,40,000", "40.2%"],
        ["Fintech Core Banking UI", "2,10,000", "24.8%"],
        ["HealthTech Telehealth App", "1,65,000", "19.5%"],
        ["Retail POS Modernization", "1,30,000", "15.5%"],
      ]
        .map((e) => e.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KeySpex_Enterprise_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice("Financial summary report downloaded as CSV.");
    setTimeout(() => setExportNotice(null), 3000);
  };

  // Direct access block: Render security screen while validating credentials
  if (isCheckingAuth || !isAuthorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] text-[#0f172a] p-4">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm text-center max-w-sm w-full">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Shield className="animate-pulse" size={24} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider font-headline">
              Verifying Admin Session
            </h2>
            <p className="mt-1 text-xs text-[#64748b]">
              Authorized administrator access only. Verifying security token...
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-blue-600">
            <Loader2 size={13} className="animate-spin text-blue-600" />
            <span>Secure handshake in progress</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-[#2563eb] selection:text-white">
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        adminName={adminUser.displayName}
        adminEmail={adminUser.email}
        employeeCount={employeeCount}
        clientCount={clientCount}
      />

      {/* Main Panel */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
        {/* Sticky Header */}
        <Header
          currentTab={currentTab}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          adminName={adminUser.displayName}
          adminRole={adminUser.role}
          onLogout={handleLogout}
          currency={currency}
          onCurrencyChange={setCurrency}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto pb-20">
          {/* Notification toast if exported */}
          {exportNotice && (
            <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs font-semibold text-blue-800 animate-in fade-in">
              <span>{exportNotice}</span>
              <button
                type="button"
                onClick={() => setExportNotice(null)}
                className="text-blue-500 hover:text-blue-700"
              >
                ✕
              </button>
            </div>
          )}

          {/* Conditional View: Dashboard vs User Management */}
          {currentTab === "employees" ? (
            <UserManagementView
              roleFilter="employee"
              onBackToDashboard={() => setCurrentTab("dashboard")}
              onRefreshStats={() => setEmployeeCount((prev) => prev + 1)}
            />
          ) : currentTab === "clients" ? (
            <UserManagementView
              roleFilter="client"
              onBackToDashboard={() => setCurrentTab("dashboard")}
              onRefreshStats={() => setClientCount((prev) => prev + 1)}
            />
          ) : (
            <>
              {/* Executive Page Header matching Image 1 */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
                      Good morning, {adminUser.displayName.split(" ")[0]}
                    </h1>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#2563eb]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb] animate-pulse" />
                      Live Environment
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-[#64748b]">
                    Here&apos;s your business performance at a glance. Illustrative demo data.
                  </p>
                </div>

                {/* Right Top Action Bar */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  {/* Date Range Selector */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowDateDropdown(!showDateDropdown)}
                      className="flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-medium text-[#334155] hover:bg-[#f8fafc] shadow-2xs transition-colors"
                    >
                      <CalendarIcon size={14} className="text-[#64748b]" />
                      <span>{dateRange}</span>
                      <ChevronDown size={14} className="text-[#94a3b8]" />
                    </button>

                    {showDateDropdown && (
                      <div className="absolute right-0 mt-1.5 w-60 rounded-2xl border border-[#e2e8f0] bg-white p-2 shadow-xl z-50 text-xs">
                        {[
                          "This Month: Oct 1 - Oct 31, 2024",
                          "Last Month: Sep 1 - Sep 30, 2024",
                          "Q3: Jul 1 - Sep 30, 2024",
                          "Full Year: FY 2024-2025",
                        ].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => {
                              setDateRange(d);
                              setShowDateDropdown(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs ${
                              dateRange === d
                                ? "bg-blue-50 font-bold text-[#2563eb]"
                                : "text-[#475569] hover:bg-[#f8fafc]"
                            }`}
                          >
                            <span>{d}</span>
                            {dateRange === d && <Check size={14} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Currency Format Toggle */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrencyDefaultDropdown(!showCurrencyDefaultDropdown)
                      }
                      className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-medium text-[#334155] hover:bg-[#f8fafc] shadow-2xs transition-colors"
                    >
                      <span>
                        {currency === "INR"
                          ? "₹ INR (₹) Default"
                          : currency === "USD"
                          ? "$ USD ($) Default"
                          : "€ EUR (€) Default"}
                      </span>
                      <ChevronDown size={14} className="text-[#94a3b8]" />
                    </button>

                    {showCurrencyDefaultDropdown && (
                      <div className="absolute right-0 mt-1.5 w-40 rounded-2xl border border-[#e2e8f0] bg-white p-1.5 shadow-xl z-50 text-xs">
                        {(["INR", "USD", "EUR"] as const).map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => {
                              setCurrency(c);
                              setShowCurrencyDefaultDropdown(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs ${
                              currency === c
                                ? "bg-blue-50 font-bold text-[#2563eb]"
                                : "text-[#475569] hover:bg-[#f8fafc]"
                            }`}
                          >
                            <span>{c}</span>
                            {currency === c && <Check size={14} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Export Report Button */}
                  <button
                    type="button"
                    onClick={handleExportReport}
                    className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] shadow-2xs transition-colors"
                  >
                    <Download size={14} className="text-[#64748b]" />
                    <span>Export Report</span>
                  </button>

                  {/* Primary CTA: + Create New */}
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1d4ed8] transition-all"
                  >
                    <Plus size={15} />
                    <span>Create New</span>
                  </button>
                </div>
              </div>

              {/* Top 6 Metric Cards Row */}
              <MetricCards currency={currency} employeeCount={employeeCount} />

              {/* Main Content Grid (Left 2/3, Right 1/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 8-col Section */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Revenue Overview Chart */}
                  <RevenueChart currency={currency} />

                  {/* Revenue by Project Card */}
                  <RevenueByProject currency={currency} />

                  {/* Recent Activity Table (Image 2) */}
                  <RecentActivity />
                </div>

                {/* Right 4-col Section */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Budget Utilization Donut */}
                  <BudgetUtilization currency={currency} />

                  {/* Upcoming Obligations List */}
                  <UpcomingObligations currency={currency} />

                  {/* Upcoming Events Calendar (Image 2) */}
                  <UpcomingEvents />
                </div>
              </div>
            </>
          )}
        </main>

        {/* Bottom System Status Bar matching Image 2 */}
        <footer className="fixed bottom-0 left-0 right-0 z-20 flex h-9 items-center justify-between border-t border-[#e2e8f0] bg-[#ffffff]/95 px-4 sm:px-6 font-mono text-[10px] text-[#64748b] backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate">
              Enterprise OS v4.8 • Core Banking &amp; Payroll engines operational
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#94a3b8]">
            <span>REFRESH: 60s</span>
            <span>SERVER: AP-SOUTH-1</span>
            <span>LATENCY: 24ms</span>
          </div>
        </footer>
      </div>

      {/* Create New Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onUserCreated={() => {
          setEmployeeCount((c) => c + 1);
        }}
      />
    </div>
  );
}

