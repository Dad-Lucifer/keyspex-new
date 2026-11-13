"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  ArrowLeft,
  Search,
  Plus,
  Wallet,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trash2,
  Building,
  FileText,
  Download,
  Loader2,
  Sparkles,
  FileSignature,
} from "lucide-react";
import {
  ProjectItem,
  CreateProjectInput,
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "@/lib/api";

interface ClientOption {
  uid: string;
  displayName: string;
  email: string;
}

interface ProjectManagementViewProps {
  currency: "INR" | "USD" | "EUR";
  onBackToDashboard: () => void;
  onProjectsChanged?: () => void;
}

export function ProjectManagementView({
  currency,
  onBackToDashboard,
  onProjectsChanged,
}: ProjectManagementViewProps) {
  // Projects state
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Clients for the form
  const [clients, setClients] = useState<ClientOption[]>([]);

  // Form State
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [clientName, setClientName] = useState("Direct / Internal Deliverable");
  const [projectStatus, setProjectStatus] = useState<
    "on-track" | "near-deadline" | "at-risk" | "completed" | "paused"
  >("on-track");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);

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

  const currencySymbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "€";

  // Load Projects from backend
  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Load live client accounts for the form dropdown
  const loadClients = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
    const token =
      typeof window !== "undefined"
        ? sessionStorage.getItem("ks_access_token")
        : null;

    try {
      const cliRes = await fetch(`${apiUrl}/api/users?role=client`, {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        credentials: "include",
      }).catch(() => null);

      if (cliRes && cliRes.ok) {
        const cliJson = await cliRes.json();
        if (cliJson?.data?.users?.length > 0) {
          const loadedClients: ClientOption[] = cliJson.data.users.map((c: any) => ({
            uid: c.uid,
            displayName: c.displayName || c.email,
            email: c.email,
          }));
          setClients(loadedClients);
          if (loadedClients.length > 0) {
            setClientName(loadedClients[0].displayName);
          }
        }
      }
    } catch {
      // Keep empty
    }
  };

  useEffect(() => {
    loadProjects();
    loadClients();
  }, []);

  // Set default deadline to 1 month from now
  useEffect(() => {
    if (!deadline) {
      const future = new Date();
      future.setMonth(future.getMonth() + 1);
      setDeadline(future.toISOString().split("T")[0]);
    }
  }, [deadline]);

  // Quick deadline helper
  const setQuickDeadline = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setDeadline(d.toISOString().split("T")[0]);
  };

  // Quick budget helper
  const setQuickBudget = (amount: number) => {
    setBudget(amount.toString());
  };

  // Handle Create Project Submit
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionMessage(null);

    if (!projectName.trim()) {
      setActionMessage({ type: "error", text: "Please enter the Project Name." });
      return;
    }
    if (!projectDetails.trim()) {
      setActionMessage({
        type: "error",
        text: "Please provide Project Details / Scope description.",
      });
      return;
    }
    if (!deadline) {
      setActionMessage({ type: "error", text: "Please select the Project Deadline." });
      return;
    }
    const numBudget = Number(budget.replace(/,/g, ""));
    if (!numBudget || numBudget <= 0) {
      setActionMessage({
        type: "error",
        text: "Please enter a valid positive Project Budget amount.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const matchedClient = clients.find((c) => c.displayName === clientName);
      // Projects start with no assigned team — employees join by signing a contract
      const payload: CreateProjectInput = {
        title: projectName.trim(),
        description: projectDetails.trim(),
        amount: Math.round(numBudget),
        endDate: deadline,
        clientName: clientName.trim() || "Direct Client",
        clientId: matchedClient?.uid || "cli-direct",
        status: projectStatus,
        assignedTo: [],
        assignedNames: [],
      };

      const res = await createProject(payload);

      const createdItem: ProjectItem = res?.data?.project || {
        id: `prj-${Date.now()}`,
        code: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
        title: payload.title,
        description: payload.description,
        clientId: payload.clientId || "cli-direct",
        clientName: payload.clientName || "Direct Client",
        amount: payload.amount,
        sharePercent: 10,
        status: payload.status || "on-track",
        startDate: new Date().toISOString().split("T")[0],
        endDate: payload.endDate,
        assignedTo: [],
        assignedNames: [],
      };

      setProjects((prev) => [createdItem, ...prev]);
      setActionMessage({
        type: "success",
        text: `Project "${createdItem.title}" (${createdItem.code}) created. Issue contracts to bring engineers on board.`,
      });

      // Reset form
      setProjectName("");
      setProjectDetails("");
      setBudget("");

      if (onProjectsChanged) onProjectsChanged();
    } catch (err: any) {
      setActionMessage({
        type: "error",
        text: err?.message || "Failed to create project. Please verify your connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Project Delete
  const handleDeleteProject = async (id: string, code: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete project ${code} (${title})?`)) {
      return;
    }

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setActionMessage({
        type: "success",
        text: `Project ${code} deleted successfully.`,
      });
      if (onProjectsChanged) onProjectsChanged();
    } catch {
      // Optimistic delete
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setActionMessage({
        type: "success",
        text: `Project ${code} removed from workspace.`,
      });
    }
  };

  // Handle Status Update
  const handleUpdateStatus = async (
    id: string,
    newStatus: "on-track" | "near-deadline" | "at-risk" | "completed" | "paused"
  ) => {
    try {
      await updateProject(id, { status: newStatus });
    } catch {
      // Proceed optimistically
    }
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  // Calculate Metrics
  const totalBudgetVal = projects.reduce((sum, p) => sum + (p.amount || 0), 0);
  const onTrackCount = projects.filter((p) => p.status === "on-track").length;
  const nearDeadlineCount = projects.filter((p) => p.status === "near-deadline").length;
  const atRiskCount = projects.filter((p) => p.status === "at-risk").length;

  // Filter projects by search and status
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase())) ||
      (p.assignedNames &&
        p.assignedNames.some((n) => n.toLowerCase().includes(search.toLowerCase())));

    const matchesStatus =
      statusFilter === "all" ? true : p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate days remaining
  const getDaysRemaining = (endDateStr: string) => {
    try {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const end = new Date(endDateStr);
      end.setHours(0, 0, 0, 0);
      const diffTime = end.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch {
      return 0;
    }
  };

  // CSV Export
  const exportProjectsCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["Code", "Project Title", "Client", "Budget (INR)", "Deadline", "Status", "Signed Engineers"],
        ...projects.map((p) => [
          `"${p.code}"`,
          `"${p.title.replace(/"/g, '""')}"`,
          `"${p.clientName.replace(/"/g, '""')}"`,
          p.amount,
          p.endDate,
          p.status,
          `"${(p.assignedNames || []).join(", ").replace(/"/g, '""')}"`,
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KeySpex_Projects_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0f172a] shadow-2xs transition-colors"
            title="Back to Overview"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline text-2xl font-bold tracking-tight text-[#0f172a]">
                Project Management
              </h1>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-blue-600 border border-blue-200">
                {projects.length} Active
              </span>
            </div>
            <p className="text-xs text-[#64748b]">
              Define project scope, budget, and delivery deadlines. Engineers join a project by signing its contract.
            </p>
          </div>
        </div>

        {/* Top Action Bar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportProjectsCsv}
            className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] shadow-2xs transition-colors"
          >
            <Download size={14} className="text-[#64748b]" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsFormOpen(!isFormOpen);
              if (!isFormOpen) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1d4ed8] transition-all"
          >
            <Plus size={15} />
            <span>{isFormOpen ? "Hide Form" : "Create New Project"}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#64748b] font-mono uppercase tracking-wider font-semibold">
            <span>Total Projects</span>
            <Briefcase size={16} className="text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#0f172a]">
            {projects.length}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-mono text-emerald-600">
            <span>● {onTrackCount} on schedule</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#64748b] font-mono uppercase tracking-wider font-semibold">
            <span>Total Budget</span>
            <Wallet size={16} className="text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#0f172a]">
            {formatMoney(totalBudgetVal)}
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#64748b]">
            Committed across portfolios
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#64748b] font-mono uppercase tracking-wider font-semibold">
            <span>Near Deadline</span>
            <Clock size={16} className="text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#0f172a]">
            {nearDeadlineCount}
          </div>
          <div className="mt-1 text-[11px] font-mono text-amber-600">
            Due within next 30 days
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#64748b] font-mono uppercase tracking-wider font-semibold">
            <span>Alerts &amp; Risks</span>
            <AlertTriangle size={16} className="text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#0f172a]">
            {atRiskCount}
          </div>
          <div className="mt-1 text-[11px] font-mono text-rose-600">
            Requires milestone review
          </div>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div
          className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold animate-in fade-in transition-all ${
            actionMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === "success" ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-rose-600 shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionMessage(null)}
            className="text-slate-400 hover:text-slate-600 ml-4 font-mono"
          >
            ✕
          </button>
        </div>
      )}

      {/* CREATE PROJECT FORM CARD */}
      {isFormOpen && (
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="font-headline text-base font-bold text-[#0f172a]">
                  Create New Project
                </h2>
                <p className="text-xs text-[#64748b]">
                  Define scope, delivery deadline, and budget. Engineers join by signing the project contract.
                </p>
              </div>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94a3b8] font-bold">
              ADMIN AUTHORIZED
            </span>
          </div>

          <form onSubmit={handleCreateProject} className="space-y-6">
            {/* Row 1: Project Name & Client */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-8 space-y-1.5">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                  Project Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. NextGen Omnichannel E-Commerce System"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                  Client Account
                </label>
                <select
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2.5 text-xs text-[#0f172a] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                >
                  {clients.map((c) => (
                    <option key={c.uid} value={c.displayName}>
                      {c.displayName}
                    </option>
                  ))}
                  <option value="Direct / Internal Deliverable">
                    Direct / Internal Deliverable
                  </option>
                </select>
              </div>
            </div>

            {/* Row 2: Details of Project */}
            <div className="space-y-1.5">
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                Details of Project &amp; Scope <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                placeholder="Describe project deliverables, architecture specifications, key requirements, milestone goals, and technology stack..."
                rows={4}
                className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium leading-relaxed resize-y"
                required
              />
            </div>

            {/* Row 3: Deadline & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Deadline of Project */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                    Deadline of Project <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-blue-600 font-semibold">
                    {deadline ? `${getDaysRemaining(deadline)} days from now` : ""}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    required
                  />
                </div>
                {/* Quick Deadline Preset Buttons */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-[#94a3b8] mr-1 self-center">
                    Quick:
                  </span>
                  {[
                    { label: "+2 Weeks", days: 14 },
                    { label: "+1 Month", days: 30 },
                    { label: "+3 Months", days: 90 },
                    { label: "+6 Months", days: 180 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setQuickDeadline(p.days)}
                      className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2 py-1 font-mono text-[10px] text-[#475569] hover:bg-[#eef2ff] hover:text-blue-600 hover:border-blue-200 transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget of Project */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                    Budget of Project <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                    {budget ? formatMoney(Number(budget) || 0) : ""}
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 font-bold text-xs text-[#64748b]">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 150000"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white pl-8 pr-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium font-mono"
                    required
                  />
                </div>
                {/* Quick Budget Preset Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-[#94a3b8] mr-1 self-center">
                    Presets:
                  </span>
                  {[50000, 100000, 150000, 250000, 500000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setQuickBudget(amt)}
                      className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2 py-1 font-mono text-[10px] text-[#475569] hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
                    >
                      {formatMoney(amt)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contract hint banner */}
            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3">
              <FileSignature size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                <span className="font-bold">Team assignment is contract-driven.</span> Engineers
                are linked to this project automatically when they sign a contract issued
                for this project via <span className="font-semibold">Contracts &amp; Documents</span>.
                One employee can hold contracts on multiple projects simultaneously.
              </p>
            </div>

            {/* Row 4: Health Status Selection & Submit Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#e2e8f0]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                  Initial Status:
                </span>
                <div className="flex items-center gap-2">
                  {(
                    [
                      { key: "on-track", label: "On Track", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                      { key: "near-deadline", label: "Near Deadline", color: "text-amber-700 bg-amber-50 border-amber-200" },
                      { key: "at-risk", label: "At Risk", color: "text-rose-700 bg-rose-50 border-rose-200" },
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.key}
                      type="button"
                      onClick={() => setProjectStatus(st.key)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all ${
                        projectStatus === st.key
                          ? `${st.color} ring-2 ring-blue-500/30`
                          : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 transition-all font-headline tracking-wide uppercase"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin text-white" />
                    <span>Creating Project...</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Create Project</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PROJECTS DIRECTORY TABLE */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white shadow-xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-[#e2e8f0] bg-[#fafafa]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, code, client, or engineer..."
              className="w-full rounded-xl border border-[#cbd5e1] bg-white pl-9 pr-3.5 py-2 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#0f172a] text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Status Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { key: "all", label: "All Projects" },
              { key: "on-track", label: "On Track" },
              { key: "near-deadline", label: "Near Deadline" },
              { key: "at-risk", label: "At Risk" },
              { key: "completed", label: "Completed" },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setStatusFilter(f.key)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  statusFilter === f.key
                    ? "bg-[#2563eb] text-white font-semibold"
                    : "text-[#64748b] bg-white hover:bg-[#e2e8f0] border border-[#e2e8f0]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List / Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-[#64748b] text-xs">
            <Loader2 size={24} className="animate-spin text-blue-600 mb-2" />
            <span>Loading projects...</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-[#64748b]">
            <Briefcase size={36} className="text-[#cbd5e1] mb-2 stroke-[1.5]" />
            <p className="text-sm font-semibold text-[#0f172a]">
              No projects found matching criteria
            </p>
            <p className="text-xs text-[#94a3b8] mt-1 max-w-sm">
              Adjust your search keywords or status filter, or use the form above to create a new project.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#e2e8f0] bg-[#f8fafc] text-[10px] font-mono uppercase tracking-wider text-[#64748b]">
                  <th className="py-3 px-4 font-bold">Code</th>
                  <th className="py-3 px-4 font-bold">Project &amp; Details</th>
                  <th className="py-3 px-4 font-bold">Client</th>
                  <th className="py-3 px-4 font-bold">Budget</th>
                  <th className="py-3 px-4 font-bold">Deadline</th>
                  <th className="py-3 px-4 font-bold">Signed Engineers</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {filteredProjects.map((p) => {
                  const daysRemaining = getDaysRemaining(p.endDate);
                  const isOverdue = daysRemaining < 0 && p.status !== "completed";
                  const signedCount = (p.assignedNames || []).length;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-[#fbfcfe] transition-colors group"
                    >
                      {/* Code */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] font-bold text-blue-600">
                        {p.code}
                      </td>

                      {/* Project Title & Details preview */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-semibold text-[#0f172a] text-xs leading-snug group-hover:text-blue-600 transition-colors">
                          {p.title}
                        </div>
                        {p.description && (
                          <div className="text-[11px] text-[#64748b] truncate mt-0.5 line-clamp-1">
                            {p.description}
                          </div>
                        )}
                      </td>

                      {/* Client */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#334155] font-medium">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
                          <Building size={11} className="text-[#94a3b8]" />
                          {p.clientName}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-[#0f172a]">
                        {formatMoney(p.amount)}
                      </td>

                      {/* Deadline */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-mono text-[11px] text-[#334155] font-medium">
                          {p.endDate}
                        </div>
                        <div
                          className={`font-mono text-[10px] font-bold mt-0.5 ${
                            isOverdue
                              ? "text-rose-600"
                              : daysRemaining <= 14
                              ? "text-amber-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {p.status === "completed"
                            ? "Delivered"
                            : isOverdue
                            ? `Overdue (${Math.abs(daysRemaining)}d)`
                            : `${daysRemaining} days left`}
                        </div>
                      </td>

                      {/* Signed Engineers — read-only, populated via contracts */}
                      <td className="py-3.5 px-4">
                        {signedCount > 0 ? (
                          <div className="flex flex-wrap items-center gap-1 max-w-[200px]">
                            {(p.assignedNames || []).map((name, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 rounded-md bg-blue-50 border border-blue-200 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-blue-700"
                              >
                                <FileSignature size={9} className="text-blue-500" />
                                {name.split(" ")[0]}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#94a3b8] italic">
                            <FileSignature size={10} className="text-[#cbd5e1]" />
                            Awaiting contracts
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={p.status}
                          onChange={(e) =>
                            handleUpdateStatus(p.id, e.target.value as any)
                          }
                          className={`rounded-lg px-2 py-1 font-mono text-[10px] font-bold border cursor-pointer focus:outline-none transition-colors ${
                            p.status === "on-track"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : p.status === "near-deadline"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : p.status === "at-risk"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : p.status === "completed"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          <option value="on-track">● On Track</option>
                          <option value="near-deadline">▲ Near Deadline</option>
                          <option value="at-risk">■ At Risk</option>
                          <option value="completed">✓ Completed</option>
                          <option value="paused">❚❚ Paused</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedProjectForModal(p)}
                            className="rounded-lg border border-[#e2e8f0] bg-white p-1.5 text-[#64748b] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                            title="View Scope Details"
                          >
                            <FileText size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteProject(p.id, p.code, p.title)
                            }
                            className="rounded-lg border border-[#e2e8f0] bg-white p-1.5 text-[#64748b] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProjectForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600">
                  {selectedProjectForModal.code}
                </span>
                <h3 className="font-headline text-lg font-bold text-[#0f172a]">
                  {selectedProjectForModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(null)}
                className="text-slate-400 hover:text-slate-600 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#94a3b8] block">
                  Project Details &amp; Scope
                </span>
                <p className="mt-1 text-[#334155] leading-relaxed bg-[#f8fafc] p-3 rounded-xl border border-[#e2e8f0]">
                  {selectedProjectForModal.description || "No description provided."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#94a3b8] block">
                    Budget
                  </span>
                  <p className="mt-0.5 font-mono text-sm font-bold text-[#0f172a]">
                    {formatMoney(selectedProjectForModal.amount)}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#94a3b8] block">
                    Deadline
                  </span>
                  <p className="mt-0.5 font-mono text-sm font-bold text-[#0f172a]">
                    {selectedProjectForModal.endDate}
                  </p>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#94a3b8] block mb-1.5">
                  Signed Engineers
                </span>
                {selectedProjectForModal.assignedNames &&
                selectedProjectForModal.assignedNames.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProjectForModal.assignedNames.map((name, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-200 px-2.5 py-1 font-mono text-xs font-semibold text-blue-700"
                      >
                        <FileSignature size={11} className="text-blue-500" />
                        {name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] px-3 py-2.5 text-[11px] text-[#94a3b8]">
                    <FileSignature size={14} className="text-[#cbd5e1]" />
                    <span>No engineers signed yet. Issue a contract for this project via <strong className="text-[#64748b]">Contracts &amp; Documents</strong>.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#e2e8f0] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProjectForModal(null)}
                className="rounded-xl bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
