// frontend/src/app/dashboard/employee/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Briefcase,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  LayoutDashboard,
  Menu,
  Check,
  AlertCircle,
  TrendingUp,
  FileText,
  Building,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calendar,
  Search,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { useEmployee } from "@/context/EmployeeContext";
import { fetchWithAuth } from "@/lib/api";
import { WelcomeHeader } from "@/components/employee/WelcomeHeader";
import { StatsStrip } from "@/components/employee/StatsStrip";
import { MyProjectsCard } from "@/components/employee/MyProjectsCard";
import { SalarySummaryCard } from "@/components/employee/SalarySummaryCard";
import { MyTasksTable } from "@/components/employee/MyTasksTable";
import { UpcomingDeadlines } from "@/components/employee/UpcomingDeadlines";
import { SalarySlipModal, ProjectSalarySlip } from "@/components/employee/SalarySlipModal";
import {
  ContractViewerModal,
  ContractDocument,
} from "@/components/employee/ContractViewerModal";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES FOR TABS
   ═══════════════════════════════════════════════════════════════════════════ */

export interface ProjectSalaryDetail {
  id: string;
  code: string;
  title: string;
  clientName: string;
  role: string;
  status: "Completed" | "In Progress" | "Near Deadline";
  totalSalary: number;
  paidAmount: number;
  disbursedDate?: string;
  subParts: {
    label: string;
    description: string;
    percent: number;
    amount: number;
    status: "Paid" | "Pending" | "In Review";
  }[];
}

export interface ProjectPaymentItem {
  id: string;
  txnId: string;
  projectCode: string;
  projectTitle: string;
  milestoneTitle: string;
  clientName: string;
  disbursedDate: string;
  paymentMethod: string;
  amount: number;
  status: "Paid" | "In Review" | "Scheduled";
  slipId: string | null;
}

function toBackendTaskStatus(uiStatus: string): "todo" | "in-progress" | "under-review" | "completed" {
  switch (uiStatus) {
    case "In Progress":
      return "in-progress";
    case "Under Review":
      return "under-review";
    case "Completed":
      return "completed";
    default:
      return "todo";
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MASTER EMPLOYEE DASHBOARD COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function EmployeeDashboardPage() {
  const {
    currentTab,
    setCurrentTab,
    stats,
    projects: contextProjects,
    tasks: contextTasks,
    contracts: contextContracts,
    paymentEntries: contextPaymentEntries,
    salaryHistory: contextSalaries,
    user,
    refresh,
    formatCurrency,
  } = useEmployee();

  const employeeName = user?.displayName || "Employee";
  const employeeTitle = user?.title || "Team Member";
  const employeeEmail = user?.email || "";
  const employeePhone = user?.contactNo || "";
  const employeeUid = user?.uid || "";

  /* ──────────────────────────────────────────────────────────────────────────
     TAB: PROJECTS STATE
     ────────────────────────────────────────────────────────────────────────── */
  const [projectFilter, setProjectFilter] = useState<
    "All" | "In Progress" | "Near Deadline" | "Completed"
  >("All");
  const [projectViewMode, setProjectViewMode] = useState<"grid" | "list">("grid");

  const allProjects = contextProjects || [];

  const inProgressProjectsCount = allProjects.filter(
    (p: any) => p.status === "In Progress" || p.status === "on-track"
  ).length;
  const completedProjectsCount = allProjects.filter(
    (p: any) => p.status === "Completed" || p.status === "completed"
  ).length;

  const filteredProjects = allProjects.filter((p: any) => {
    if (projectFilter === "All") return true;
    if (projectFilter === "In Progress")
      return p.status === "In Progress" || p.status === "on-track";
    if (projectFilter === "Near Deadline")
      return p.status === "Near Deadline" || p.status === "near-deadline";
    if (projectFilter === "Completed")
      return p.status === "Completed" || p.status === "completed";
    return true;
  });

  /* ──────────────────────────────────────────────────────────────────────────
     TAB: TASKS STATE (PROJECT-GROUPED & LIVE SYNCED WITH /api/tasks/:id)
     ────────────────────────────────────────────────────────────────────────── */
  const [tasks, setTasks] = useState<any[]>(contextTasks || []);
  const [taskFilter, setTaskFilter] = useState<
    "All" | "To Do" | "In Progress" | "Under Review" | "Completed"
  >("All");

  useEffect(() => {
    if (Array.isArray(contextTasks)) {
      setTasks(contextTasks);
    }
  }, [contextTasks]);

  const handleToggleTask = async (taskId: string) => {
    const target = tasks.find((t) => t.id === taskId);
    if (!target) return;
    const nextUiStatus = target.status === "Completed" ? "In Progress" : "Completed";

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: nextUiStatus } : t))
    );

    try {
      await fetchWithAuth(`/api/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: toBackendTaskStatus(nextUiStatus) }),
      });
      await refresh();
    } catch {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: target.status } : t))
      );
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    const target = tasks.find((t) => t.id === taskId);
    if (!target) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await fetchWithAuth(`/api/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: toBackendTaskStatus(newStatus) }),
      });
      await refresh();
    } catch {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: target.status } : t))
      );
    }
  };

  const todoCount = tasks.filter((t) => t.status === "To Do").length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
  const completedTaskCount = tasks.filter((t) => t.status === "Completed").length;

  const taskProjectGroups = useMemo(() => {
    const hasGeneralTasks = tasks.some(
      (t) => !t.projectCode || t.projectCode === "GENERAL"
    );
    const generalGroup = hasGeneralTasks
      ? [
          {
            id: "general",
            code: "GENERAL",
            title: "General Assigned Tasks",
            clientName: "KeySpex Agency",
            role: employeeTitle,
          },
        ]
      : [];
    return [...allProjects, ...generalGroup];
  }, [allProjects, tasks, employeeTitle]);

  /* ──────────────────────────────────────────────────────────────────────────
     TAB: SALARY STATE (PROJECT-BASED COMPENSATION & INCREMENTS)
     ────────────────────────────────────────────────────────────────────────── */
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const toggleExpandProject = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  const salaryProjectsList: ProjectSalaryDetail[] = useMemo(() => {
    const signedContracts = (contextContracts || []).filter((c: any) => c.isSigned);
    let remainingUnassignedDisbursements = (contextSalaries || [])
      .filter((s: any) => {
        if (s.status !== "paid") return false;
        return !signedContracts.some(
          (c: any) =>
            c.projectCode &&
            ((s.notes && s.notes.includes(c.projectCode)) ||
              (s.period && s.period.includes(c.projectCode)))
        );
      })
      .reduce((sum: number, s: any) => sum + Number(s.amount || 0), 0);

    return signedContracts.map((c: any) => {
      const matchedProj = allProjects.find((p: any) => p.code === c.projectCode);
      const totalSalary = Number(c.projectPayout || matchedProj?.remuneration || 0);
      const isCompleted = matchedProj?.status === "Completed";

      const directMatchingSalaries = (contextSalaries || []).filter(
        (s: any) =>
          s.status === "paid" &&
          c.projectCode &&
          ((s.notes && s.notes.includes(c.projectCode)) ||
            (s.period && s.period.includes(c.projectCode)))
      );

      let paidAmount = directMatchingSalaries.reduce(
        (sum: number, s: any) => sum + Number(s.amount || 0),
        0
      );

      if (isCompleted && paidAmount < totalSalary) {
        paidAmount = totalSalary;
      } else if (paidAmount < totalSalary && remainingUnassignedDisbursements > 0) {
        const allocated = Math.min(totalSalary - paidAmount, remainingUnassignedDisbursements);
        paidAmount += allocated;
        remainingUnassignedDisbursements -= allocated;
      }

      const projTasks = tasks.filter((t) => t.projectCode === c.projectCode);
      const subParts =
        projTasks.length > 0
          ? projTasks.map((t, idx) => {
              const pct = Math.round(100 / projTasks.length);
              const amt = Math.round(totalSalary / projTasks.length);
              const cumulativeBefore = amt * idx;
              const subStatus: "Paid" | "Pending" | "In Review" =
                paidAmount >= cumulativeBefore + amt && paidAmount > 0
                  ? "Paid"
                  : t.status === "Completed" || t.status === "Under Review"
                  ? "In Review"
                  : "Pending";
              return {
                label: t.title,
                description: t.milestone || "Assigned project deliverable",
                percent: pct,
                amount: amt,
                status: subStatus,
              };
            })
          : [
              {
                label: `${c.projectTitle || c.title} — Agreed Scope`,
                description: c.description || "Agreed project remuneration",
                percent: 100,
                amount: totalSalary,
                status: paidAmount >= totalSalary && totalSalary > 0 ? ("Paid" as const) : ("Pending" as const),
              },
            ];

      return {
        id: c.id,
        code: c.projectCode || "PRJ",
        title: c.projectTitle || c.title,
        clientName: c.clientName || "—",
        role: c.projectRole || employeeTitle,
        status: matchedProj?.status || "In Progress",
        totalSalary,
        paidAmount,
        disbursedDate: directMatchingSalaries[0]?.paidAtFormatted || undefined,
        subParts,
      };
    });
  }, [contextContracts, allProjects, contextSalaries, tasks, employeeTitle]);

  const totalCompletedSalary = Number(stats?.projectEarnings ?? 0);
  const totalEstimatedSalary = Math.max(
    salaryProjectsList.reduce((acc, p) => acc + p.totalSalary, 0),
    totalCompletedSalary
  );
  const topPaidProject =
    salaryProjectsList.length > 0
      ? salaryProjectsList.reduce(
          (max, p) => (p.totalSalary > max.totalSalary ? p : max),
          salaryProjectsList[0]
        )
      : null;

  /* ──────────────────────────────────────────────────────────────────────────
     TAB: PAYMENTS TIMELINE STATE (LIVE FROM SALARIES & PAYMENT ENTRIES)
     ────────────────────────────────────────────────────────────────────────── */
  const [paymentFilter, setPaymentFilter] = useState<
    "All" | "Paid" | "In Review" | "Scheduled"
  >("All");
  const [paymentSearch, setPaymentSearch] = useState("");

  const projectPayments: ProjectPaymentItem[] = useMemo(() => {
    const salaryItems: ProjectPaymentItem[] = (contextSalaries || []).map((s: any, idx: number) => {
      const matchedContract = (contextContracts || []).find(
        (c: any) =>
          (s.notes && c.projectCode && s.notes.includes(c.projectCode)) ||
          (s.period && c.projectCode && s.period.includes(c.projectCode))
      );
      const isPaid = (s.status || "").toLowerCase() === "paid";

      return {
        id: s.id || `sal-${idx}`,
        txnId: `SAL-${(s.id || String(idx + 1)).slice(0, 8).toUpperCase()}`,
        projectCode: matchedContract?.projectCode || s.period || "PAYROLL",
        projectTitle: matchedContract?.projectTitle || s.period || "Salary Disbursement",
        milestoneTitle: s.notes || `Disbursement (${s.period || "Settled"})`,
        clientName: matchedContract?.clientName || "KeySpex Agency",
        disbursedDate: s.paidAtFormatted || s.period || "—",
        paymentMethod: s.paymentMethod || "Direct Bank Transfer (NEFT/ACH)",
        amount: Number(s.amount || 0),
        status: isPaid ? "Paid" : "In Review",
        slipId: isPaid ? `SLIP-${(s.id || String(idx + 1)).slice(0, 8).toUpperCase()}` : null,
      };
    });

    const entryItems: ProjectPaymentItem[] = (contextPaymentEntries || []).map((e: any, idx: number) => ({
      id: e.id || `pe-${idx}`,
      txnId: e.referenceNo || `TXN-${(e.id || String(idx + 1)).slice(0, 8).toUpperCase()}`,
      projectCode: e.projectCode || "PRJ",
      projectTitle: e.projectTitle || "Project Milestone",
      milestoneTitle: e.title || "Milestone Entry",
      clientName: e.clientName || "—",
      disbursedDate: e.date || "—",
      paymentMethod: e.method || "Bank Wire / NEFT",
      amount: Number(e.amount || 0),
      status: e.status === "cleared" ? "Paid" : "Scheduled",
      slipId: null,
    }));

    return [...salaryItems, ...entryItems];
  }, [contextSalaries, contextContracts, contextPaymentEntries]);

  const filteredPayments = projectPayments.filter((p) => {
    const matchesFilter = paymentFilter === "All" ? true : p.status === paymentFilter;
    const q = paymentSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.projectCode.toLowerCase().includes(q) ||
      p.projectTitle.toLowerCase().includes(q) ||
      p.milestoneTitle.toLowerCase().includes(q) ||
      p.txnId.toLowerCase().includes(q) ||
      p.clientName.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const totalPaidProjectPayouts = projectPayments
    .filter((p) => p.status === "Paid")
    .reduce((acc, p) => acc + p.amount, 0);

  const totalInReviewPayouts = projectPayments
    .filter((p) => p.status === "In Review")
    .reduce((acc, p) => acc + p.amount, 0);

  const totalScheduledPayouts = projectPayments
    .filter((p) => p.status === "Scheduled")
    .reduce((acc, p) => acc + p.amount, 0);

  const totalProjectPortfolioVal = Math.max(
    totalEstimatedSalary,
    projectPayments.reduce((acc, p) => acc + p.amount, 0)
  );
  const paidMilestoneCount = projectPayments.filter((p) => p.status === "Paid").length;

  /* ──────────────────────────────────────────────────────────────────────────
     TAB: SALARY SLIPS STATE (LIVE FROM SALARIES COLLECTION)
     ────────────────────────────────────────────────────────────────────────── */
  const [selectedSlip, setSelectedSlip] = useState<ProjectSalarySlip | null>(null);
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);

  const projectSlips: ProjectSalarySlip[] = useMemo(() => {
    return (contextSalaries || []).map((s: any, idx: number) => {
      const matchedContract = (contextContracts || []).find(
        (c: any) =>
          (s.notes && c.projectCode && s.notes.includes(c.projectCode)) ||
          (s.period && c.projectCode && s.period.includes(c.projectCode))
      );
      const gross = Number(s.amount || 0);
      const deductions = 0;

      return {
        id: s.id || `slip-${idx}`,
        slipId: `SLIP-${(s.id || String(idx + 1)).slice(0, 8).toUpperCase()}`,
        projectCode: matchedContract?.projectCode || s.period || "PAYROLL",
        projectTitle: matchedContract?.projectTitle || s.period || "Compensation Statement",
        clientName: matchedContract?.clientName || "KeySpex Agency",
        role: matchedContract?.projectRole || employeeTitle,
        disbursedDate: s.paidAtFormatted || s.period || "—",
        grossSalary: gross,
        deductions,
        netSalary: gross - deductions,
        employeeName,
        employeeTitle,
        milestones: [
          {
            name: s.notes || `Disbursement — ${s.period || "Settled"}`,
            description: s.paymentMethod || "Direct Bank Transfer (NEFT/ACH)",
            amount: gross,
          },
        ],
      };
    });
  }, [contextSalaries, contextContracts, employeeName, employeeTitle]);

  const totalDisbursedSlips = projectSlips.reduce((acc, s) => acc + s.netSalary, 0);
  const latestSlip = projectSlips[0] || null;

  const handleOpenSlip = (slip: ProjectSalarySlip | null) => {
    if (!slip) return;
    setSelectedSlip(slip);
    setIsSlipModalOpen(true);
  };

  /* ──────────────────────────────────────────────────────────────────────────
     TAB: CONTRACTS STATE (LIVE FROM /api/contracts & PATCH /api/contracts/:id/status)
     ────────────────────────────────────────────────────────────────────────── */
  const [documents, setDocuments] = useState<ContractDocument[]>(contextContracts || []);
  const [selectedDoc, setSelectedDoc] = useState<ContractDocument | null>(null);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [contractSuccessBanner, setContractSuccessBanner] = useState<string | null>(null);

  useEffect(() => {
    if (Array.isArray(contextContracts)) {
      setDocuments(contextContracts);
    }
  }, [contextContracts]);

  const handleOpenDoc = (doc: ContractDocument) => {
    setSelectedDoc({
      ...doc,
      employeeName,
      employeeTitle,
      employeeEmail,
      employeePhone,
      employeeUid,
    });
    setIsContractModalOpen(true);
  };

  const handleAcceptContract = async (docId: string, downloadPdf: boolean) => {
    const targetDoc = documents.find((d) => d.id === docId);

    try {
      await fetchWithAuth(`/api/contracts/${docId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: "signed" }),
      });

      const timestamp = new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date());

      setDocuments((prev) =>
        prev.map((d) =>
          d.id === docId
            ? { ...d, status: "Active & Binding" as const, isSigned: true, signedAt: timestamp }
            : d
        )
      );

      if (targetDoc) {
        setContractSuccessBanner(
          `Agreement signed! Project "${targetDoc.projectTitle || targetDoc.title}" is now synced with your My Projects workspace.`
        );
        setSelectedDoc({
          ...targetDoc,
          status: "Active & Binding",
          isSigned: true,
          signedAt: timestamp,
          employeeName,
          employeeTitle,
          employeeEmail,
          employeePhone,
          employeeUid,
        });
      }

      await refresh();

      if (downloadPdf) {
        setTimeout(() => {
          window.print();
        }, 300);
      } else {
        setIsContractModalOpen(false);
      }
    } catch (err: any) {
      setContractSuccessBanner(
        err?.message || "Failed to execute contract signature. Please try again."
      );
    }
  };

  const pendingContractCount = documents.filter(
    (d) => d.status === "Pending Acceptance"
  ).length;
  const activeContractCount = documents.filter(
    (d) => d.status === "Active & Binding"
  ).length;

  /* ──────────────────────────────────────────────────────────────────────────
     OVERVIEW DEADLINES
     ────────────────────────────────────────────────────────────────────────── */
  const deadlines = allProjects
    .filter((p: any) => p.endDate || p.dueDate)
    .map((p: any, idx: number) => ({
      id: p.id || `deadline-${idx}`,
      title: `${p.title || "Project"} Milestone`,
      date: p.endDate || p.dueDate || "",
      projectCode: p.code || "",
      time: "",
      isUrgent: idx === 0,
    }));

  /* ═══════════════════════════════════════════════════════════════════════════
     VIEW ROUTING BASED ON currentTab
     ═══════════════════════════════════════════════════════════════════════════ */

  return (
    <div>
      {/* 1. OVERVIEW VIEW */}
      {currentTab === "overview" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <WelcomeHeader />
          <StatsStrip stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MyProjectsCard projects={allProjects || []} />
            </div>
            <div>
              <SalarySummaryCard />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MyTasksTable tasks={tasks || []} />
            </div>
            <div>
              <UpcomingDeadlines deadlines={deadlines} />
            </div>
          </div>
        </div>
      )}

      {/* 2. MY PROJECTS VIEW */}
      {currentTab === "projects" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">My Projects</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Active client projects, technical milestones, and assigned deliverables
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCurrentTab("tasks")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs self-start cursor-pointer"
            >
              <span>View Assigned Tasks</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Top Status Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Total Projects
              </p>
              <div className="text-2xl font-bold text-slate-900 mt-1">
                {allProjects.length}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Assigned to your portfolio</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                In Progress
              </p>
              <div className="text-2xl font-bold text-[#004AC6] mt-1">
                {inProgressProjectsCount}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Active sprint delivery</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Completed
              </p>
              <div className="text-2xl font-bold text-emerald-600 mt-1">
                {completedProjectsCount}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Delivered & approved</p>
            </div>
          </div>

          {/* Filter Tabs & Grid/List Toggle Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(["All", "In Progress", "Near Deadline", "Completed"] as const).map(
                (tab) => {
                  const isActive = projectFilter === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setProjectFilter(tab)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#EBF2FE] text-[#004AC6] font-semibold"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                }
              )}
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg self-start">
              <button
                onClick={() => setProjectViewMode("grid")}
                title="Grid View"
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  projectViewMode === "grid"
                    ? "bg-white text-[#004AC6] shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
              <button
                onClick={() => setProjectViewMode("list")}
                title="List View"
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  projectViewMode === "list"
                    ? "bg-white text-[#004AC6] shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Projects View */}
          {filteredProjects.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs bg-white border border-slate-200 rounded-xl shadow-xs">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              No projects found under "{projectFilter}".
            </div>
          ) : projectViewMode === "grid" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredProjects.map((proj: any) => {
                const isCompleted =
                  proj.status === "Completed" || proj.status === "completed";
                const progress = proj.progressPercent ?? (isCompleted ? 100 : 0);

                return (
                  <div
                    key={proj.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {proj.code}
                        </span>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                            isCompleted
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-blue-50 text-[#004AC6]"
                          }`}
                        >
                          {isCompleted ? "Completed" : proj.status || "In Progress"}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Client:{" "}
                        <span className="text-slate-700 font-medium">
                          {proj.clientName || "—"}
                        </span>
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                        <div>
                          <p className="text-[10px] uppercase font-semibold text-slate-400">
                            Your Role
                          </p>
                          <p className="font-medium text-slate-800 mt-0.5">
                            {proj.role || employeeTitle}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-semibold text-slate-400">
                            Deadline
                          </p>
                          <p className="font-medium text-slate-800 mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {proj.dueDate || proj.endDate || "Ongoing"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-[11px] font-medium text-slate-500">
                            Milestone Progress
                          </span>
                          <span className="text-[11px] font-mono font-semibold text-slate-700">
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isCompleted ? "bg-emerald-500" : "bg-[#004AC6]"
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {proj.milestones && proj.milestones.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                          <p className="text-[10px] uppercase font-semibold text-slate-400 mb-1">
                            Key Deliverables
                          </p>
                          {proj.milestones.map((m: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-xs text-slate-600"
                            >
                              <CheckCircle2
                                className={`w-3.5 h-3.5 ${
                                  m.done ? "text-emerald-500" : "text-slate-300"
                                }`}
                              />
                              <span className={m.done ? "line-through text-slate-400" : ""}>
                                {m.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Synced with Admin</span>
                      <button
                        type="button"
                        onClick={() => setCurrentTab("tasks")}
                        className="text-xs font-semibold text-[#004AC6] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View tasks</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">CODE</th>
                      <th className="py-3 px-4">PROJECT & CLIENT</th>
                      <th className="py-3 px-4">YOUR ROLE</th>
                      <th className="py-3 px-4">DEADLINE</th>
                      <th className="py-3 px-4 w-44">PROGRESS</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProjects.map((proj: any) => {
                      const isCompleted =
                        proj.status === "Completed" || proj.status === "completed";
                      const progress = proj.progressPercent ?? (isCompleted ? 100 : 0);

                      return (
                        <tr key={proj.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">
                            {proj.code}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{proj.title}</div>
                            <div className="text-[11px] text-slate-500">
                              {proj.clientName || "—"}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {proj.role || employeeTitle}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {proj.dueDate || proj.endDate || "Ongoing"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    isCompleted ? "bg-emerald-500" : "bg-[#004AC6]"
                                  }`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="font-mono text-[11px] text-slate-500 font-medium">
                                {progress}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block text-[11px] px-2 py-0.5 rounded-full font-medium ${
                                isCompleted
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-blue-50 text-[#004AC6]"
                              }`}
                            >
                              {isCompleted ? "Completed" : proj.status || "In Progress"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setCurrentTab("tasks")}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#004AC6] hover:underline cursor-pointer"
                            >
                              <span>Tasks</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. MY TASKS VIEW (GROUPED BELOW EACH PROJECT) */}
      {currentTab === "tasks" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">My Tasks</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-[#004AC6] border border-blue-100 rounded-full uppercase tracking-wider">
                  Project-Specific Deliverables
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Tasks assigned by Admin grouped under each client project. Status updates sync directly with Admin.
              </p>
            </div>
          </div>

          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Total Tasks
              </p>
              <div className="text-2xl font-bold text-slate-900 mt-1">{tasks.length}</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Assigned to you</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                To Do
              </p>
              <div className="text-2xl font-bold text-slate-700 mt-1">{todoCount}</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Ready to start</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                In Progress
              </p>
              <div className="text-2xl font-bold text-[#004AC6] mt-1">{inProgressCount}</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Active sprint work</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Completed
              </p>
              <div className="text-2xl font-bold text-emerald-600 mt-1">
                {completedTaskCount}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Finished deliverables</p>
            </div>
          </div>

          {/* Status Filter Row */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 pb-3 overflow-x-auto">
            {(["All", "To Do", "In Progress", "Under Review", "Completed"] as const).map(
              (tab) => {
                const count =
                  tab === "All"
                    ? tasks.length
                    : tasks.filter((t) => t.status === tab).length;

                return (
                  <button
                    key={tab}
                    onClick={() => setTaskFilter(tab)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 cursor-pointer ${
                      taskFilter === tab
                        ? "bg-[#EBF2FE] text-[#004AC6] font-semibold"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <span>{tab}</span>
                    <span className="text-[10px] px-1 py-0.1 bg-white rounded-full border border-slate-200 font-mono">
                      {count}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          {/* Project-Grouped Task Cards */}
          {taskProjectGroups.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs bg-white border border-slate-200 rounded-xl shadow-xs">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              No tasks assigned yet.
            </div>
          ) : (
            <div className="space-y-6">
              {taskProjectGroups.map((proj: any) => {
                const projectAllTasks = tasks.filter(
                  (t) => (t.projectCode || "GENERAL") === proj.code
                );
                const projectVisibleTasks = projectAllTasks.filter((t) =>
                  taskFilter === "All" ? true : t.status === taskFilter
                );
                const doneCount = projectAllTasks.filter(
                  (t) => t.status === "Completed"
                ).length;
                const progressPct =
                  projectAllTasks.length > 0
                    ? Math.round((doneCount / projectAllTasks.length) * 100)
                    : 0;

                return (
                  <div
                    key={proj.code}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs"
                  >
                    {/* Project Header Bar */}
                    <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#004AC6] text-white rounded shadow-2xs">
                          {proj.code}
                        </span>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900">{proj.title}</h3>
                          <p className="text-[11px] text-slate-500">
                            Client:{" "}
                            <span className="text-slate-700 font-medium">
                              {proj.clientName || "—"}
                            </span>{" "}
                            • Role: {proj.role || employeeTitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs font-semibold text-slate-800">
                            {doneCount} of {projectAllTasks.length} tasks completed
                          </p>
                          <p className="text-[10px] font-mono font-medium text-slate-500">
                            {progressPct}% delivery progress
                          </p>
                        </div>
                        <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden shrink-0">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              progressPct === 100 ? "bg-emerald-500" : "bg-[#004AC6]"
                            }`}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tasks Table Below Project */}
                    {projectVisibleTasks.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-xs">
                        <CheckCircle2 className="w-6 h-6 mx-auto mb-1.5 text-slate-300" />
                        {projectAllTasks.length === 0
                          ? `No tasks assigned to ${proj.title} yet.`
                          : `No tasks matching "${taskFilter}" in this project.`}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-100 bg-white text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                              <th className="py-2.5 px-4 w-10">DONE</th>
                              <th className="py-2.5 px-4">TASK TITLE</th>
                              <th className="py-2.5 px-4">PRIORITY</th>
                              <th className="py-2.5 px-4">DUE DATE</th>
                              <th className="py-2.5 px-4 text-right">STATUS</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {projectVisibleTasks.map((t) => {
                              const isCompleted = t.status === "Completed";
                              return (
                                <tr
                                  key={t.id}
                                  className="hover:bg-slate-50/50 transition-colors"
                                >
                                  <td className="py-3 px-4">
                                    <button
                                      type="button"
                                      onClick={() => handleToggleTask(t.id)}
                                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                                        isCompleted
                                          ? "bg-emerald-500 border-emerald-500 text-white"
                                          : "border-slate-300 hover:border-slate-400 bg-white"
                                      }`}
                                    >
                                      {isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                                    </button>
                                  </td>

                                  <td
                                    className={`py-3 px-4 font-semibold ${
                                      isCompleted
                                        ? "line-through text-slate-400"
                                        : "text-slate-900"
                                    }`}
                                  >
                                    <div>{t.title}</div>
                                    {t.description && (
                                      <p className="text-[11px] font-normal text-slate-500 mt-0.5">
                                        {t.description}
                                      </p>
                                    )}
                                  </td>

                                  <td className="py-3 px-4">
                                    <span
                                      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${
                                        t.priority === "High"
                                          ? "bg-rose-50 text-rose-600 border border-rose-100"
                                          : t.priority === "Low"
                                          ? "bg-slate-100 text-slate-600"
                                          : "bg-blue-50 text-blue-600 border border-blue-100"
                                      }`}
                                    >
                                      {t.priority || "Medium"}
                                    </span>
                                  </td>

                                  <td className="py-3 px-4 text-slate-500">
                                    <span className="inline-flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-slate-400" />
                                      {t.dueDate || "—"}
                                    </span>
                                  </td>

                                  <td className="py-3 px-4 text-right">
                                    <select
                                      value={t.status}
                                      onChange={(e) =>
                                        handleStatusChange(t.id, e.target.value)
                                      }
                                      className="text-[11px] font-medium px-2 py-1 rounded-md border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#004AC6]"
                                    >
                                      <option value="To Do">To Do</option>
                                      <option value="In Progress">In Progress</option>
                                      <option value="Under Review">Under Review</option>
                                      <option value="Completed">Completed</option>
                                    </select>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. MY SALARY VIEW (PROJECT-BASED COMPENSATION) */}
      {currentTab === "salary" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Project-Based Compensation</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Earnings and milestone payouts based on your signed contracts & payroll disbursements
              </p>
            </div>

            <div className="flex items-center gap-2 self-start">
              <button
                type="button"
                onClick={() => setCurrentTab("projects")}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                <span>My Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab("slips")}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#004AC6] hover:bg-[#003ea8] rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Salary Slips</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Total Disbursed
                </p>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">
                {formatCurrency(totalCompletedSalary)} 
              </div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">
                Realized payout across {(contextSalaries || []).length} disbursement
                {(contextSalaries || []).length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Contracted Portfolio Value
                </p>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#004AC6] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#004AC6] mt-2 tracking-tight">
                {formatCurrency(totalEstimatedSalary)}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Across {salaryProjectsList.length} signed project contract
                {salaryProjectsList.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Top Paid Project
                </p>
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">
                {formatCurrency(topPaidProject?.totalSalary || 0)}
              </div>
              <p className="text-[11px] text-slate-600 font-mono mt-1 truncate">
                {topPaidProject
                  ? `${topPaidProject.code} • ${topPaidProject.title}`
                  : "No signed contracts yet"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Project Earnings & Deliverable Breakdowns
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Click on any signed project to view its agreed remuneration and disbursement status
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 bg-blue-50 text-[#004AC6] rounded-md border border-blue-100">
                    {salaryProjectsList.length} Signed Projects
                  </span>
                </div>

                {salaryProjectsList.length === 0 ? (
                  <div className="py-10 text-center text-xs text-slate-400">
                    <Briefcase className="w-7 h-7 mx-auto mb-2 text-slate-300" />
                    No signed project contracts yet. Sign a contract under My Contracts to view project compensation.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 mt-2">
                    {salaryProjectsList.map((project) => {
                      const isExpanded = expandedProjectId === project.id;
                      const isFullyPaid =
                        project.status === "Completed" ||
                        (project.totalSalary > 0 && project.paidAmount >= project.totalSalary);

                      return (
                        <div key={project.id} className="py-3.5 transition-colors">
                          <div
                            onClick={() => toggleExpandProject(project.id)}
                            className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                  isFullyPaid
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-blue-50 text-[#004AC6]"
                                }`}
                              >
                                <Briefcase className="w-4 h-4" />
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                    {project.code}
                                  </span>
                                  <span className="text-xs font-bold text-slate-900 truncate">
                                    {project.title}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  Client: {project.clientName} • Disbursed: ₹
                                  {formatCurrency(project.paidAmount)} of{" "}
                                  {formatCurrency(project.totalSalary)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <span className="text-sm font-bold font-mono text-slate-900">
                                  {formatCurrency(project.totalSalary)}
                                </span>
                                <div className="flex items-center justify-end gap-1 mt-0.5">
                                  <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                      isFullyPaid
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        : project.paidAmount > 0
                                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                                        : "bg-blue-50 text-[#004AC6] border border-blue-200"
                                    }`}
                                  >
                                    {isFullyPaid
                                      ? "Disbursed"
                                      : project.paidAmount > 0
                                      ? "Partially Paid"
                                      : "In Progress"}
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
                                aria-label="Toggle project details"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-[#004AC6]" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="mt-3 ml-2 sm:ml-12 p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                                <span>Milestone Deliverable / Sub-Part</span>
                                <span>Allocation & Status</span>
                              </div>

                              <div className="space-y-2.5">
                                {project.subParts.map((sub, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between gap-3 text-xs bg-white p-3 rounded-lg border border-slate-100 shadow-2xs"
                                  >
                                    <div className="min-w-0 pr-2">
                                      <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#004AC6]" />
                                        <p className="font-semibold text-slate-800">
                                          {sub.label}
                                        </p>
                                        <span className="text-[10px] font-mono text-slate-400">
                                          ({sub.percent}%)
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-slate-500 pl-3.5 mt-0.5">
                                        {sub.description}
                                      </p>
                                    </div>

                                    <div className="text-right shrink-0">
                                      <span className="font-mono font-semibold text-slate-900 block">
                                        {formatCurrency(sub.amount)}
                                      </span>
                                      <span
                                        className={`inline-block text-[10px] font-bold mt-0.5 ${
                                          sub.status === "Paid"
                                            ? "text-emerald-600"
                                            : sub.status === "In Review"
                                            ? "text-amber-600"
                                            : "text-slate-400"
                                        }`}
                                      >
                                        {sub.status === "Paid" ? "✓ Disbursed" : sub.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                                <span className="font-semibold text-slate-600">
                                  Disbursed / Total Project Agreed Value
                                </span>
                                <span className="font-bold font-mono text-[#004AC6] text-sm">
                                  {formatCurrency(project.paidAmount)} /{" "}
                                  {formatCurrency(project.totalSalary)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                  Compensation Summary
                </h3>

                <div className="mt-3 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Completed & Disbursed</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {formatCurrency(totalCompletedSalary)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>In-Progress Milestone Pipeline</span>
                    <span className="font-mono font-bold text-[#004AC6]">
                      {formatCurrency(Math.max(0, totalEstimatedSalary - totalCompletedSalary))}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between font-bold text-slate-900">
                    <span>Total Project Portfolio</span>
                    <span className="font-mono text-sm text-[#004AC6]">
                      {formatCurrency(totalEstimatedSalary)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-[11px] text-slate-600">
                  <p className="font-semibold text-[#004AC6] mb-0.5">Project Payout Terms</p>
                  Salaries are disbursed per milestone upon review and project sign-off by the client and project admin.
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#004AC6] flex items-center justify-center">
                    <Building className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Payout Account</h3>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-slate-400">
                      Account Holder
                    </p>
                    <p className="font-semibold text-slate-800">{employeeName}</p>
                    <p className="text-[11px] text-slate-500">
                      {employeeEmail || "Configured by Admin"}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[10px] uppercase font-semibold text-slate-400">
                      Disbursement Method
                    </p>
                    <p className="text-[11px] text-[#004AC6] font-semibold">
                      Direct Transfer on Milestone Sign-off
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PAYMENT TIMELINE VIEW */}
      {currentTab === "payments" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">Payment Timeline</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-[#004AC6] border border-blue-100 rounded-full uppercase tracking-wider">
                  Project Milestones
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Ledger of deliverable disbursements, milestone sign-offs, and scheduled escrow releases
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCurrentTab("slips")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#004AC6] hover:bg-[#003ea8] rounded-lg transition-colors shadow-xs self-start cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View All Slips</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Realized Payouts
              </p>
              <div className="text-2xl font-bold text-emerald-600 mt-1 tracking-tight">
                {formatCurrency(totalPaidProjectPayouts)}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {paidMilestoneCount} approved payout{paidMilestoneCount === 1 ? "" : "s"}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Scheduled Escrow
              </p>
              <div className="text-2xl font-bold text-[#004AC6] mt-1 tracking-tight">
                {formatCurrency(totalScheduledPayouts)}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Upcoming sprint milestones</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Contracted Portfolio
              </p>
              <div className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
                {formatCurrency(totalProjectPortfolioVal)}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Across {allProjects.length} accepted client project
                {allProjects.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-1.5">
              {(["All", "Paid", "Scheduled"] as const).map((tab) => {
                const count =
                  tab === "All"
                    ? projectPayments.length
                    : projectPayments.filter((p) => p.status === tab).length;
                return (
                  <button
                    key={tab}
                    onClick={() => setPaymentFilter(tab)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                      paymentFilter === tab
                        ? "bg-[#EBF2FE] text-[#004AC6] font-semibold"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <span>{tab}</span>
                    <span className="text-[11px] px-1.5 py-0.2 bg-white rounded-full border border-slate-200">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search project, milestone, or Txn ID..."
                value={paymentSearch}
                onChange={(e) => setPaymentSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#004AC6]"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            {filteredPayments.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                <Calendar className="w-7 h-7 mx-auto mb-2 text-slate-300" />
                No payment timeline records found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">TXN REFERENCE</th>
                      <th className="py-3 px-4">PROJECT & MILESTONE DELIVERABLE</th>
                      <th className="py-3 px-4">CLIENT</th>
                      <th className="py-3 px-4">DISBURSEMENT DATE</th>
                      <th className="py-3 px-4">MILESTONE PAYOUT</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPayments.map((p) => {
                      const isPaid = p.status === "Paid";
                      const isInReview = p.status === "In Review";

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                            {p.txnId}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded">
                                {p.projectCode}
                              </span>
                              <span className="font-semibold text-slate-900">{p.projectTitle}</span>
                            </div>
                            <p className="text-[11px] text-slate-500">{p.milestoneTitle}</p>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {p.clientName}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {p.disbursedDate}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            {formatCurrency(p.amount)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                                isPaid
                                  ? "bg-emerald-50 text-emerald-600"
                                  : isInReview
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-blue-50 text-[#004AC6]"
                              }`}
                            >
                              {isPaid ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Paid</span>
                                </>
                              ) : isInReview ? (
                                <>
                                  <Clock className="w-3 h-3" />
                                  <span>In Review</span>
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3" />
                                  <span>Scheduled</span>
                                </>
                              )}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {p.slipId ? (
                              <button
                                type="button"
                                onClick={() => setCurrentTab("slips")}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#004AC6] hover:underline cursor-pointer"
                              >
                                <span>View Slip</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            ) : isInReview ? (
                              <span className="text-amber-600 text-[11px] font-medium">
                                Pending QA
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">In Sprint</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. SALARY SLIPS VIEW */}
      {currentTab === "slips" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Project Salary Slips</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Official project-based payslip archive, milestone settlement statements, and printable tax receipts
              </p>
            </div>

            {latestSlip && (
              <button
                onClick={() => handleOpenSlip(latestSlip)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#004AC6] hover:bg-[#003ea8] rounded-lg transition-colors shadow-xs self-start cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Latest Statement</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Settled Project Slips
              </p>
              <div className="text-2xl font-bold text-slate-900 mt-1">
                {projectSlips.length}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Generated from Admin payroll</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Total Disbursed Net
              </p>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono">
                {formatCurrency(totalDisbursedSlips)}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Across all completed disbursements</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Latest Settled Statement
              </p>
              <div className="text-xl font-bold text-[#004AC6] mt-1 truncate">
                {latestSlip?.projectCode || "—"}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                {latestSlip
                  ? `${formatCurrency(latestSlip.netSalary)} • ${latestSlip.disbursedDate}`
                  : "No settled slips yet"}
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            {projectSlips.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                <FileText className="w-7 h-7 mx-auto mb-2 text-slate-300" />
                No salary slips generated yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">PAYSLIP ID</th>
                      <th className="py-3 px-4">PROJECT & CLIENT</th>
                      <th className="py-3 px-4">DISBURSEMENT DATE</th>
                      <th className="py-3 px-4">AGREED VALUE (GROSS)</th>
                      <th className="py-3 px-4">NET DISBURSED</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projectSlips.map((slip) => (
                      <tr key={slip.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                          {slip.slipId}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                              {slip.projectCode}
                            </span>
                            <span className="font-semibold text-slate-900">{slip.projectTitle}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">Client: {slip.clientName}</p>
                        </td>

                        <td className="py-3.5 px-4 text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {slip.disbursedDate}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {formatCurrency(slip.grossSalary)}
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {formatCurrency(slip.netSalary)}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            Disbursed
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleOpenSlip(slip)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[#004AC6] hover:bg-blue-50 border border-blue-200 rounded-md transition-colors cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View & Print</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <SalarySlipModal
            isOpen={isSlipModalOpen}
            onClose={() => setIsSlipModalOpen(false)}
            slip={selectedSlip}
          />
        </div>
      )}

      {/* 7. MY CONTRACTS & DOCUMENTS VIEW */}
      {currentTab === "contracts" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">My Contracts & Documents</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Review incoming project agreements issued by Admin, accept deliverable scopes, and download signed contracts
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCurrentTab("projects")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs self-start cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              <span>Go to My Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {contractSuccessBanner && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-800 animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{contractSuccessBanner}</span>
              </div>
              <button
                type="button"
                onClick={() => setContractSuccessBanner(null)}
                className="text-emerald-600 hover:text-emerald-900 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Pending Acceptance
                </p>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    pendingContractCount > 0
                      ? "bg-amber-50 text-amber-600"
                      : "bg-slate-50 text-slate-400"
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>
              <div
                className={`text-2xl font-bold mt-1 ${
                  pendingContractCount > 0 ? "text-amber-600" : "text-slate-900"
                }`}
              >
                {pendingContractCount}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {pendingContractCount > 0
                  ? "Action required: Contracts waiting for signature"
                  : "All agreements are signed & up to date"}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Active Agreements
                </p>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-emerald-600 mt-1">
                {activeContractCount}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Digitally executed & binding</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Legal Standing
                </p>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#004AC6] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#004AC6] mt-1">100% Compliant</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Verified with KeySpex Agency</p>
            </div>
          </div>

          {documents.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 bg-white border border-slate-200 rounded-xl shadow-xs">
              <FileText className="w-7 h-7 mx-auto mb-2 text-slate-300" />
              No contracts or documents assigned yet.
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => {
                const isPending = doc.status === "Pending Acceptance";

                return (
                  <div
                    key={doc.id}
                    className={`rounded-xl p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isPending
                        ? "bg-blue-50/40 border-2 border-[#004AC6]/40 shadow-xs"
                        : "bg-white border border-slate-200 shadow-xs hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isPending
                            ? "bg-[#004AC6] text-white shadow-2xs"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <FileText className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-800">
                            {doc.docId}
                          </span>
                          <span className="text-[11px] text-slate-500">• {doc.category}</span>
                          {isPending && (
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Dispatched by Admin
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-2xl">{doc.description}</p>

                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2.5 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            Date: {doc.effectiveDate}
                          </span>

                          {doc.projectPayout !== undefined && doc.projectPayout > 0 && (
                            <span className="font-mono font-semibold text-[#004AC6]">
                              Agreed Compensation: {formatCurrency(doc.projectPayout)}
                            </span>
                          )}

                          <span
                            className={`font-semibold flex items-center gap-1 ${
                              isPending ? "text-amber-600" : "text-emerald-600"
                            }`}
                          >
                            {isPending ? (
                              <>
                                <AlertCircle className="w-3.5 h-3.5" />
                                Pending Employee Acceptance
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {doc.status}
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenDoc(doc)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer ${
                          isPending
                            ? "text-white bg-[#004AC6] hover:bg-[#003ea8]"
                            : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isPending ? "Review & Sign Contract" : "View Document"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <ContractViewerModal
            isOpen={isContractModalOpen}
            onClose={() => setIsContractModalOpen(false)}
            document={selectedDoc}
            onAcceptContract={handleAcceptContract}
          />
        </div>
      )}
    </div>
  );
}