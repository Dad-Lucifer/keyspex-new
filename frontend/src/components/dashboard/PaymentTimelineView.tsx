"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  TrendingUp,
  Wallet,
  ArrowLeft,
  Search,
  Plus,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Trash2,
  Download,
  Sparkles,
  RefreshCw,
  Building,
  Briefcase,
  ChevronRight,
  Check,
  X,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Percent,
} from "lucide-react";
import {
  ProjectItem,
  PaymentTimelineItem,
  PaymentEntryType,
  getProjects,
  getPaymentEntries,
  deletePaymentEntry,
} from "@/lib/api";
import { CreatePaymentEntryModal } from "./CreatePaymentEntryModal";

interface PaymentTimelineViewProps {
  currency: "INR" | "USD" | "EUR";
  onBackToDashboard: () => void;
  initialProjectId?: string | null;
}

export function PaymentTimelineView({
  currency,
  onBackToDashboard,
  initialProjectId = null,
}: PaymentTimelineViewProps) {
  // Navigation: null = list of projects, string = selected project details
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialProjectId);

  // Data State
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [entries, setEntries] = useState<PaymentTimelineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Filters for Main List
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filters for Project Detail View
  const [entryTypeFilter, setEntryTypeFilter] = useState<"all" | "received" | "invested">("all");

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalDefaultType, setModalDefaultType] = useState<PaymentEntryType>("received");
  const [entryToDelete, setEntryToDelete] = useState<PaymentTimelineItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Notification Toast
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  // Currency Formatter
  const formatMoney = (valInr: number) => {
    if (currency === "USD") {
      const usdVal = Math.round(valInr / 84);
      return `$${usdVal.toLocaleString("en-US")}`;
    }
    if (currency === "EUR") {
      const eurVal = Math.round(valInr / 91);
      return `€${eurVal.toLocaleString("en-US")}`;
    }
    return `₹${valInr.toLocaleString("en-IN")}`;
  };

  // Load live projects & entries
  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedProjects, fetchedEntries] = await Promise.all([
        getProjects().catch(() => null),
        getPaymentEntries().catch(() => null),
      ]);

      if (fetchedProjects && fetchedProjects.length > 0) {
        setProjects(fetchedProjects);
      } else {
        setProjects([]);
      }

      if (fetchedEntries && fetchedEntries.length > 0) {
        setEntries(fetchedEntries);
      } else {
        setEntries([]);
      }
    } catch {
      setProjects([]);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute stats per project (budget, received, invested, net)
  const projectStatsMap = useMemo(() => {
    const map = new Map<
      string,
      {
        received: number;
        invested: number;
        net: number;
        remaining: number;
        percent: number;
        entriesCount: number;
      }
    >();

    projects.forEach((p) => {
      const pEntries = entries.filter((e) => e.projectId === p.id || e.projectCode === p.code);
      let received = 0;
      let invested = 0;

      pEntries.forEach((e) => {
        if (e.type === "received") received += e.amount;
        if (e.type === "invested") invested += e.amount;
      });

      const budget = p.amount || 0;
      const net = received - invested;
      const remaining = Math.max(0, budget - received);
      const percent = budget > 0 ? Math.min(100, Math.round((received / budget) * 100)) : 0;

      map.set(p.id, {
        received,
        invested,
        net,
        remaining,
        percent,
        entriesCount: pEntries.length,
      });
    });

    return map;
  }, [projects, entries]);

  // Overall Portfolio Totals
  const overallPortfolioStats = useMemo(() => {
    let totalBudget = 0;
    let totalReceived = 0;
    let totalInvested = 0;

    projects.forEach((p) => {
      totalBudget += p.amount || 0;
    });

    entries.forEach((e) => {
      if (e.type === "received") totalReceived += e.amount;
      if (e.type === "invested") totalInvested += e.amount;
    });

    const netOperatingCash = totalReceived - totalInvested;
    const collectionRate =
      totalBudget > 0 ? Math.round((totalReceived / totalBudget) * 100) : 0;

    return {
      totalBudget,
      totalReceived,
      totalInvested,
      netOperatingCash,
      collectionRate,
    };
  }, [projects, entries]);

  // Filtered Projects for List View
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesClient = p.clientName.toLowerCase().includes(q);
        const matchesCode = (p.code || "").toLowerCase().includes(q);
        if (!matchesTitle && !matchesClient && !matchesCode) return false;
      }
      if (statusFilter !== "all" && p.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [projects, searchQuery, statusFilter]);

  // Selected project for Detail View
  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return projects.find((p) => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  // Entries for Selected Project
  const selectedProjectEntries = useMemo(() => {
    if (!selectedProject) return [];
    return entries
      .filter((e) => e.projectId === selectedProject.id || e.projectCode === selectedProject.code)
      .filter((e) => {
        if (entryTypeFilter !== "all" && e.type !== entryTypeFilter) return false;
        return true;
      })
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  }, [entries, selectedProject, entryTypeFilter]);

  // Selected Project Financial Summary
  const selectedProjectFinancials = useMemo(() => {
    if (!selectedProject) return null;
    const stats = projectStatsMap.get(selectedProject.id) || {
      received: 0,
      invested: 0,
      net: 0,
      remaining: selectedProject.amount,
      percent: 0,
      entriesCount: 0,
    };

    return {
      budget: selectedProject.amount,
      ...stats,
    };
  }, [selectedProject, projectStatsMap]);

  // Handle Delete Entry
  const handleDeleteEntry = async () => {
    if (!entryToDelete) return;
    setIsDeleting(true);

    try {
      await deletePaymentEntry(entryToDelete.id);
      setEntries((prev) => prev.filter((e) => e.id !== entryToDelete.id));
      showNotification("success", `Deleted entry "${entryToDelete.title}"`);
      setEntryToDelete(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete entry.";
      showNotification("error", msg);
    } finally {
      setIsDeleting(false);
    }
  };

  // Export CSV for Project Timeline
  const handleExportLedger = () => {
    if (!selectedProject) return;

    const rows = [
      ["Project Payment Timeline & Ledger"],
      ["Project", `${selectedProject.title} (${selectedProject.code})`],
      ["Client", selectedProject.clientName],
      ["Budget", selectedProject.amount.toString()],
      [],
      ["Date", "Type", "Title / Milestone", "Amount", "Method", "Reference", "Status", "Notes"],
      ...selectedProjectEntries.map((e) => [
        e.date,
        e.type.toUpperCase(),
        `"${e.title.replace(/"/g, '""')}"`,
        e.amount.toString(),
        `"${e.method || ""}"`,
        `"${e.referenceNo || ""}"`,
        e.status,
        `"${(e.notes || "").replace(/"/g, '""')}"`,
      ]),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map((r) => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedProject.code}_Payment_Timeline.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold shadow-md transition-all ${
            notification.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          VIEW 1: PROJECT LIST VIEW (Default)
          ───────────────────────────────────────────────────────────────────────────── */}
      {!selectedProject ? (
        <div className="space-y-6">
          {/* Breadcrumb & Executive Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button
                type="button"
                onClick={onBackToDashboard}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#0f172a] transition-colors mb-2"
              >
                <ArrowLeft size={14} /> Back to Dashboard
              </button>
              <div className="flex items-center gap-2.5">
                <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
                  Payment Timeline &amp; Ledger
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#2563eb]">
                  <Sparkles size={11} /> Financial Control
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-[#64748b]">
                Select a project below to manage received payments from client, record investments, and audit transaction timelines.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={loadData}
                disabled={loading}
                className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] shadow-2xs transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  size={14}
                  className={loading ? "animate-spin text-blue-600" : "text-[#64748b]"}
                />
                <span className="hidden sm:inline">Refresh Data</span>
              </button>
            </div>
          </div>

          {/* Top 4 Financial Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Contracted Budget */}
            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between text-[#64748b] text-xs font-semibold">
                <span>Total Portfolio Budget</span>
                <Wallet size={16} className="text-blue-600" />
              </div>
              <div className="mt-2 text-2xl font-bold text-[#0f172a] font-mono">
                {formatMoney(overallPortfolioStats.totalBudget)}
              </div>
              <div className="mt-1 text-[11px] text-[#64748b]">
                Across {projects.length} contracted active projects
              </div>
            </div>

            {/* Total Received Payments */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs">
              <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
                <span>Received From Clients</span>
                <ArrowDownLeft size={16} className="text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-bold text-emerald-700 font-mono">
                {formatMoney(overallPortfolioStats.totalReceived)}
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-800">
                <span className="font-bold">{overallPortfolioStats.collectionRate}%</span> of total
                budget collected
              </div>
            </div>

            {/* Total Invested Amount */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 shadow-2xs">
              <div className="flex items-center justify-between text-amber-900 text-xs font-bold">
                <span>Capital Invested / Spent</span>
                <ArrowUpRight size={16} className="text-amber-600" />
              </div>
              <div className="mt-2 text-2xl font-bold text-amber-800 font-mono">
                {formatMoney(overallPortfolioStats.totalInvested)}
              </div>
              <div className="mt-1 text-[11px] text-amber-900">
                Direct tech, cloud &amp; operational expenses
              </div>
            </div>

            {/* Net Operating Margin */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 shadow-2xs">
              <div className="flex items-center justify-between text-blue-900 text-xs font-bold">
                <span>Net Retained Margin</span>
                <TrendingUp size={16} className="text-blue-600" />
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-800 font-mono">
                {formatMoney(overallPortfolioStats.netOperatingCash)}
              </div>
              <div className="mt-1 text-[11px] text-blue-700">
                Net cash retained (Received − Invested)
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-[#e2e8f0] bg-white p-3 shadow-2xs">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project name, code, or client..."
                className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-9 pr-3 py-2 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#2563eb] focus:outline-none"
              >
                <option value="all">All Project Statuses</option>
                <option value="on-track">On Track</option>
                <option value="near-deadline">Near Deadline</option>
                <option value="at-risk">At Risk</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Projects List Grid with Budget & Payment Progress */}
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#cbd5e1] bg-white p-12 text-center">
              <Briefcase size={36} className="text-[#94a3b8] mb-3" />
              <h3 className="font-headline font-semibold text-sm text-[#0f172a]">
                No projects found
              </h3>
              <p className="text-xs text-[#64748b] mt-1 max-w-sm">
                There are no projects matching your search criteria. Create projects in Project Management to track payment timelines.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project) => {
              const stats = projectStatsMap.get(project.id) || {
                received: 0,
                invested: 0,
                net: 0,
                remaining: project.amount,
                percent: 0,
                entriesCount: 0,
              };

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div>
                    {/* Top Row: Code & Status */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-700 border border-blue-100">
                        {project.code}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                          project.status === "on-track"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : project.status === "near-deadline"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {project.status.replace("-", " ")}
                      </span>
                    </div>

                    {/* Project Title & Client */}
                    <h3 className="font-headline font-bold text-base text-[#0f172a] group-hover:text-[#2563eb] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#64748b] flex items-center gap-1.5 mt-0.5">
                      <Building size={13} className="text-[#94a3b8]" />
                      <span>{project.clientName}</span>
                    </p>

                    {/* Financial Snapshot Matrix */}
                    <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[#f8fafc] p-3 border border-[#f1f5f9]">
                      <div>
                        <div className="text-[10px] font-mono text-[#64748b] uppercase">
                          Project Budget
                        </div>
                        <div className="font-mono text-xs font-bold text-[#0f172a] mt-0.5">
                          {formatMoney(project.amount)}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-emerald-700 uppercase font-semibold">
                          Received
                        </div>
                        <div className="font-mono text-xs font-bold text-emerald-600 mt-0.5">
                          {formatMoney(stats.received)}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-amber-800 uppercase font-semibold">
                          Invested
                        </div>
                        <div className="font-mono text-xs font-bold text-amber-700 mt-0.5">
                          {formatMoney(stats.invested)}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar (Received vs Budget) */}
                    <div className="mt-3.5 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[#64748b]">Client Collection Progress</span>
                        <span className="font-bold text-[#0f172a]">{stats.percent}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#f1f5f9] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
                          style={{ width: `${stats.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-semibold text-[#2563eb] group-hover:text-[#1d4ed8]">
                    <div className="text-[11px] text-[#64748b] font-normal">
                      {stats.entriesCount} recorded {stats.entriesCount === 1 ? "entry" : "entries"}
                    </div>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Open Payment Timeline &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────────────────────
            VIEW 2: DEDICATED PROJECT PAYMENT TIMELINE & ENTRY CREATOR PAGE
            ───────────────────────────────────────────────────────────────────────────── */
        <div className="space-y-6">
          {/* Back Navigation Bar & Project Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button
                type="button"
                onClick={() => setSelectedProjectId(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] hover:underline transition-colors mb-2 cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to All Projects
              </button>
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-xs font-bold text-blue-700 border border-blue-100">
                  {selectedProject.code}
                </span>
                <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
                  {selectedProject.title}
                </h1>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-[#64748b] flex items-center gap-2">
                <Building size={14} className="text-[#94a3b8]" />
                <span className="font-medium text-[#0f172a]">{selectedProject.clientName}</span>
                <span>•</span>
                <span>Duration: {selectedProject.startDate} to {selectedProject.endDate}</span>
              </p>
            </div>

            {/* Top Action Buttons: "+ Create Entry" Button */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleExportLedger}
                className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] shadow-2xs transition-colors"
              >
                <Download size={14} className="text-[#64748b]" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              {/* Primary "Button to Create Entries" */}
              <button
                type="button"
                onClick={() => {
                  setModalDefaultType("received");
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-all cursor-pointer"
              >
                <Plus size={16} />
                <span>Create Entry</span>
              </button>
            </div>
          </div>

          {/* Project Financial Overview 4-Card Strip */}
          {selectedProjectFinancials && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Project Budget */}
              <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
                  Contracted Budget
                </div>
                <div className="mt-1 text-xl font-bold text-[#0f172a] font-mono">
                  {formatMoney(selectedProjectFinancials.budget)}
                </div>
                <div className="mt-1 text-[11px] text-[#64748b]">Total contract value</div>
              </div>

              {/* Total Received */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-2xs">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
                  Received from Client
                </div>
                <div className="mt-1 text-xl font-bold text-emerald-700 font-mono">
                  {formatMoney(selectedProjectFinancials.received)}
                </div>
                <div className="mt-1 text-[11px] text-emerald-800">
                  {selectedProjectFinancials.percent}% of budget cleared
                </div>
              </div>

              {/* Total Invested */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-900">
                  Invested Amount
                </div>
                <div className="mt-1 text-xl font-bold text-amber-800 font-mono">
                  {formatMoney(selectedProjectFinancials.invested)}
                </div>
                <div className="mt-1 text-[11px] text-amber-900">Direct expenditures / infra</div>
              </div>

              {/* Net Retained Cash */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-2xs">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-900">
                  Net Retained Cash
                </div>
                <div className="mt-1 text-xl font-bold text-blue-800 font-mono">
                  {formatMoney(selectedProjectFinancials.net)}
                </div>
                <div className="mt-1 text-[11px] text-blue-700">
                  Remaining to collect: {formatMoney(selectedProjectFinancials.remaining)}
                </div>
              </div>
            </div>
          )}

          {/* Quick Transaction Action Prompts Banner */}
          <div className="rounded-2xl border border-dashed border-blue-300 bg-blue-50/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <CreditCard size={20} />
              </div>
              <div>
                <h4 className="font-headline font-bold text-xs text-[#0f172a]">
                  Record Client Payments or Capital Investments
                </h4>
                <p className="text-[11px] text-[#64748b]">
                  Add milestone disbursements from {selectedProject.clientName} or log server, design, and developer investment costs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setModalDefaultType("received");
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold transition-all shadow-xs"
              >
                <ArrowDownLeft size={14} /> + Receive Payment
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalDefaultType("invested");
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 text-xs font-bold transition-all shadow-xs"
              >
                <ArrowUpRight size={14} /> + Record Investment
              </button>
            </div>
          </div>

          {/* Timeline Stream Controls */}
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-sm text-[#0f172a]">
                Transaction Timeline &amp; Ledger
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-700">
                {selectedProjectEntries.length}
              </span>
            </div>

            {/* Filter by Entry Type */}
            <div className="flex items-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setEntryTypeFilter("all")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  entryTypeFilter === "all"
                    ? "bg-white text-[#2563eb] shadow-2xs font-bold"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setEntryTypeFilter("received")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  entryTypeFilter === "received"
                    ? "bg-emerald-50 text-emerald-700 shadow-2xs font-bold"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                Received Only
              </button>
              <button
                type="button"
                onClick={() => setEntryTypeFilter("invested")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  entryTypeFilter === "invested"
                    ? "bg-amber-50 text-amber-800 shadow-2xs font-bold"
                    : "text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                Invested Only
              </button>
            </div>
          </div>

          {/* Chronological Timeline Stream */}
          {selectedProjectEntries.length === 0 ? (
            <div className="py-16 px-4 flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-[#e2e8f0] bg-white">
              <Wallet size={36} className="text-[#94a3b8] mb-2" />
              <h3 className="font-headline font-bold text-sm text-[#0f172a]">
                No Payment Entries Recorded Yet
              </h3>
              <p className="text-xs text-[#64748b] mt-1 max-w-sm">
                Get started by recording your first received client milestone or invested expense for {selectedProject.title}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setModalDefaultType("received");
                  setIsCreateModalOpen(true);
                }}
                className="mt-4 flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
              >
                <Plus size={15} /> Create First Entry
              </button>
            </div>
          ) : (
            <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e2e8f0]">
              {selectedProjectEntries.map((entry) => {
                const isReceived = entry.type === "received";

                return (
                  <div key={entry.id} className="relative group">
                    {/* Timeline Node Icon */}
                    <div
                      className={`absolute -left-[31px] top-3.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-xs ${
                        isReceived ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"
                      }`}
                    >
                      {isReceived ? <ArrowDownLeft size={12} /> : <ArrowUpRight size={12} />}
                    </div>

                    {/* Entry Card */}
                    <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        {/* Title, Date & Badges */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                isReceived
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-amber-50 text-amber-800 border border-amber-200"
                              }`}
                            >
                              {isReceived ? "Received from Client" : "Invested Amount"}
                            </span>

                            <span className="flex items-center gap-1 font-mono text-[11px] text-[#64748b]">
                              <Calendar size={12} />
                              <span>{entry.date}</span>
                            </span>

                            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[9px] font-semibold text-slate-700">
                              {entry.status.toUpperCase()}
                            </span>
                          </div>

                          <h4 className="font-headline font-bold text-sm text-[#0f172a] pt-0.5">
                            {entry.title}
                          </h4>

                          {entry.notes && (
                            <p className="text-xs text-[#475569] leading-relaxed pt-1">
                              {entry.notes}
                            </p>
                          )}
                        </div>

                        {/* Amount & Method Block */}
                        <div className="sm:text-right shrink-0 pt-2 sm:pt-0">
                          <div
                            className={`font-mono text-lg font-bold ${
                              isReceived ? "text-emerald-600" : "text-amber-700"
                            }`}
                          >
                            {isReceived ? "+" : "−"} {formatMoney(entry.amount)}
                          </div>

                          <div className="text-[11px] text-[#64748b] mt-0.5">
                            {entry.method || "Bank Wire"}
                          </div>

                          {entry.referenceNo && (
                            <div className="font-mono text-[10px] text-[#94a3b8]">
                              Ref: {entry.referenceNo}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-3 pt-2.5 border-t border-[#f8fafc] flex items-center justify-between text-[11px] text-[#94a3b8]">
                        <span>Recorded by {entry.createdByName || "Admin"}</span>
                        <button
                          type="button"
                          onClick={() => setEntryToDelete(entry)}
                          className="flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Modal to Create Entry */}
          <CreatePaymentEntryModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            project={{
              id: selectedProject.id,
              code: selectedProject.code,
              title: selectedProject.title,
              clientName: selectedProject.clientName,
              amount: selectedProject.amount,
            }}
            currency={currency}
            initialType={modalDefaultType}
            onEntrySaved={(newEntry) => {
              setEntries((prev) => [newEntry, ...prev]);
              showNotification(
                "success",
                `Successfully saved ${
                  newEntry.type === "received" ? "client payment" : "investment entry"
                } of ${formatMoney(newEntry.amount)}`
              );
            }}
          />

          {/* Delete Confirmation Modal */}
          {entryToDelete && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
              onClick={(e) => {
                if (e.target === e.currentTarget && !isDeleting) setEntryToDelete(null);
              }}
            >
              <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 shadow-2xl animate-in zoom-in-95">
                <div className="flex items-center gap-3 text-rose-600 mb-3">
                  <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
                    <AlertTriangle size={22} />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-sm text-[#0f172a]">
                      Delete Payment Entry?
                    </h3>
                    <p className="font-mono text-[10px] text-[#64748b]">
                      This will remove the transaction and update financial totals.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#475569] mb-4">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-[#0f172a]">&apos;{entryToDelete.title}&apos;</span>{" "}
                  ({formatMoney(entryToDelete.amount)})?
                </p>

                <div className="flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEntryToDelete(null)}
                    disabled={isDeleting}
                    className="rounded-xl border border-[#cbd5e1] bg-white px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f1f5f9] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteEntry}
                    disabled={isDeleting}
                    className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 shadow-sm transition-all disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Confirm Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

