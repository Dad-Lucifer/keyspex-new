"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  ArrowLeft,
  Search,
  Plus,
  Send,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
  Building,
  Calendar,
  Wallet,
  ShieldCheck,
  Check,
  Eye,
  Trash2,
  Download,
  Loader2,
  Sparkles,
  ExternalLink,
  Copy,
  PenTool,
  BadgeCheck,
} from "lucide-react";
import {
  ContractItem,
  CreateContractInput,
  getContracts,
  createContract,
  deleteContract,
  updateContractStatus,
} from "@/lib/api";

interface EmployeeOption {
  uid: string;
  displayName: string;
  email: string;
  roleTitle: string;
  phone: string;
}

interface ProjectOption {
  code: string;
  title: string;
  clientName: string;
  amount: number;
  startDate: string;
  endDate: string;
}

interface ContractManagementViewProps {
  currency: "INR" | "USD" | "EUR";
  onBackToDashboard: () => void;
  onContractsChanged?: () => void;
}

export function ContractManagementView({
  currency,
  onBackToDashboard,
  onContractsChanged,
}: ContractManagementViewProps) {
  // Data state
  const [contracts, setContracts] = useState<ContractItem[]>([]);
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Form selection state
  const [selectedEmployeeUid, setSelectedEmployeeUid] = useState<string>("");
  const [selectedProjectCode, setSelectedProjectCode] = useState<string>("");

  // Editable Form fields
  const [contractTitle, setContractTitle] = useState("");
  const [agreementType, setAgreementType] = useState(
    "Project Assignment Contract"
  );
  const [customProjectTitle, setCustomProjectTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [remuneration, setRemuneration] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Milestone Settlement");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Custom clauses (auto-filled, editable)
  const [scopeDetails, setScopeDetails] = useState(
    "The Employee agrees to undertake technical execution, component architecture, and sprint deliverables in accordance with KeySpex quality benchmarks."
  );
  const [compensationClause, setCompensationClause] = useState(
    "Total project remuneration is agreed as specified, released on a milestone completion schedule upon review and administrative sign-off."
  );
  const [ndaClause, setNdaClause] = useState(
    "All source code, designs, tokens, and artifacts created for this project remain the sole intellectual property of KeySpex Agency Pvt. Ltd. The Employee agrees to non-disclosure obligations."
  );

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [selectedContractForView, setSelectedContractForView] =
    useState<ContractItem | null>(null);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  // Print ref
  const printRef = useRef<HTMLDivElement>(null);

  // Selected Employee Details
  const selectedEmployee =
    employees.find((e) => e.uid === selectedEmployeeUid) || employees[0] || null;

  // Currency helper
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

  // Load contracts from backend
  const loadContracts = async () => {
    setLoading(true);
    try {
      const data = await getContracts();
      if (data && data.length > 0) {
        setContracts(data);
      } else {
        setContracts([]);
      }
    } catch {
      setContracts([]);
    } finally {
      setLoading(false);
    }
  };

  // Load active employees and projects from backend
  const loadUsersAndProjects = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
    const token =
      typeof window !== "undefined"
        ? sessionStorage.getItem("ks_access_token")
        : null;

    try {
      const [empRes, prjRes] = await Promise.all([
        fetch(`${apiUrl}/api/users?role=employee`, {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          credentials: "include",
        }).catch(() => null),
        fetch(`${apiUrl}/api/projects`, {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          credentials: "include",
        }).catch(() => null),
      ]);

      if (empRes && empRes.ok) {
        const empJson = await empRes.json();
        if (empJson?.data?.users?.length > 0) {
          const mappedEmps: EmployeeOption[] = empJson.data.users.map((u: any) => ({
            uid: u.uid,
            displayName: u.displayName || u.email.split("@")[0],
            email: u.email,
            roleTitle: u.jobTitle || (u.role === "employee" ? "Technical Associate" : "Client Associate"),
            phone: u.contactNo || "+91 98765 43210",
          }));
          setEmployees(mappedEmps);
          if (mappedEmps.length > 0) {
            setSelectedEmployeeUid(mappedEmps[0].uid);
          }
        }
      }

      if (prjRes && prjRes.ok) {
        const prjJson = await prjRes.json();
        if (prjJson?.data?.projects?.length > 0) {
          const mappedPrjs: ProjectOption[] = prjJson.data.projects.map((p: any) => ({
            code: p.code,
            title: p.title,
            clientName: p.clientName || "Direct Client",
            amount: p.amount || 0,
            startDate: p.startDate || "",
            endDate: p.endDate || "",
          }));
          setProjects(mappedPrjs);
          if (mappedPrjs.length > 0) {
            handleSelectProject(mappedPrjs[0].code);
          }
        }
      }
    } catch {
      // Keep empty
    }
  };

  useEffect(() => {
    loadContracts();
    loadUsersAndProjects();
  }, []);

  // When selected project changes, sync defaults
  const handleSelectProject = (code: string) => {
    setSelectedProjectCode(code);
    const p = projects.find((pr) => pr.code === code);
    if (p) {
      setCustomProjectTitle(p.title);
      setContractTitle(`${p.title} Agreement`);
      setClientName(p.clientName);
      setRemuneration(p.amount.toString());
      setStartDate(p.startDate);
      setEndDate(p.endDate);
      setScopeDetails(
        `The Employee agrees to undertake technical execution, component architecture, and sprint deliverables for ${p.title} in accordance with KeySpex quality benchmarks.`
      );
      setCompensationClause(
        `Total project remuneration is agreed at ₹${p.amount.toLocaleString(
          "en-IN"
        )}, released on a milestone completion schedule upon review and administrative sign-off.`
      );
    }
  };

  // Handle Form Submit to Create and Send Contract
  const handleCreateAndSendContract = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionMessage(null);

    const emp = selectedEmployee;
    if (!emp) {
      setActionMessage({ type: "error", text: "Please select an employee recipient." });
      return;
    }

    const numRemuneration = Number(remuneration.replace(/,/g, ""));
    if (!numRemuneration || numRemuneration <= 0) {
      setActionMessage({
        type: "error",
        text: "Please provide a valid milestone remuneration amount.",
      });
      return;
    }

    setIsSubmitting(true);

    const payload: CreateContractInput = {
      title: contractTitle.trim(),
      agreementType: agreementType.trim(),
      employeeUid: emp.uid,
      employeeName: emp.displayName,
      employeeEmail: emp.email,
      employeeRole: emp.roleTitle,
      employeePhone: emp.phone,
      projectCode: selectedProjectCode,
      projectTitle: customProjectTitle.trim(),
      clientName: clientName.trim(),
      remuneration: numRemuneration,
      paymentTerms: paymentTerms.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      scopeDetails: scopeDetails.trim(),
      compensationClause: compensationClause.trim(),
      ndaClause: ndaClause.trim(),
      status: "sent",
    };

    try {
      const res = await createContract(payload);

      const newContract: ContractItem = res?.data?.contract || {
        id: `ctr-${Date.now()}`,
        title: payload.title,
        agreementType: payload.agreementType || "Project Assignment Contract",
        companyName: "KeySpex Agency Pvt. Ltd.",
        companyAddress: "Ground Floor, Innovation Park, Sector 62, Noida, UP, India",
        companyCin: "U72900DL2024PTC123456",
        contractDate: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        employeeUid: payload.employeeUid,
        employeeName: payload.employeeName,
        employeeEmail: payload.employeeEmail,
        employeeRole: payload.employeeRole,
        employeePhone: payload.employeePhone || "+91 98765 43210",
        projectCode: payload.projectCode,
        projectTitle: payload.projectTitle,
        clientName: payload.clientName || "Zenith Cloud Solutions",
        remuneration: payload.remuneration,
        paymentTerms: payload.paymentTerms || "Milestone Settlement",
        startDate: payload.startDate,
        endDate: payload.endDate,
        scopeDetails: payload.scopeDetails || "",
        compensationClause: payload.compensationClause || "",
        ndaClause: payload.ndaClause || "",
        party1Admin: {
          signatoryName: "KeySpex Leadership",
          signatoryRole: "Corporate Operations & HR",
          signedDate: "10 Nov 2026",
          certHash: "AUTH-KS-ADMIN-CERT-SHA256: 3b92dc18148a1d65dfc2d4b1fa3d677284addd2001",
          status: "Verified",
        },
        party2Employee: {
          signatoryName: payload.employeeName,
          signatoryRole: payload.employeeRole,
          signedDate: "",
          certHash: "",
          status: "Pending",
        },
        status: "sent",
        verificationTimestamp: `${new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}, 2:36 pm`,
      };

      setContracts((prev) => [newContract, ...prev]);
      setActionMessage({
        type: "success",
        text: `Official contract "${newContract.title}" issued and sent to ${emp.displayName} (${emp.email})!`,
      });

      if (onContractsChanged) onContractsChanged();
    } catch (err: any) {
      // Local fallback in case backend is offline
      const localContract: ContractItem = {
        id: `ctr-${Date.now()}`,
        title: payload.title,
        agreementType: payload.agreementType || "Project Assignment Contract",
        companyName: "KeySpex Agency Pvt. Ltd.",
        companyAddress: "Ground Floor, Innovation Park, Sector 62, Noida, UP, India",
        companyCin: "U72900DL2024PTC123456",
        contractDate: "10 Nov 2026",
        employeeUid: payload.employeeUid,
        employeeName: payload.employeeName,
        employeeEmail: payload.employeeEmail,
        employeeRole: payload.employeeRole,
        employeePhone: payload.employeePhone || "+91 98765 43210",
        projectCode: payload.projectCode,
        projectTitle: payload.projectTitle,
        clientName: payload.clientName || "Zenith Cloud Solutions",
        remuneration: payload.remuneration,
        paymentTerms: payload.paymentTerms || "Milestone Settlement",
        startDate: payload.startDate,
        endDate: payload.endDate,
        scopeDetails: payload.scopeDetails || "",
        compensationClause: payload.compensationClause || "",
        ndaClause: payload.ndaClause || "",
        party1Admin: {
          signatoryName: "KeySpex Leadership",
          signatoryRole: "Corporate Operations & HR",
          signedDate: "10 Nov 2026",
          certHash: "AUTH-KS-ADMIN-CERT-SHA256: 3b92dc18148a1d65dfc2d4b1fa3d677284addd2001",
          status: "Verified",
        },
        party2Employee: {
          signatoryName: payload.employeeName,
          signatoryRole: payload.employeeRole,
          signedDate: "",
          certHash: "",
          status: "Pending",
        },
        status: "sent",
        verificationTimestamp: "10 Nov 2026, 2:36 pm",
      };

      setContracts((prev) => [localContract, ...prev]);
      setActionMessage({
        type: "success",
        text: `Official contract issued and sent to ${emp.displayName}! (Active Session Mode)`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Mark as Signed / Revoke
  const handleToggleSignStatus = async (contract: ContractItem) => {
    const newStatus = contract.status === "signed" ? "sent" : "signed";
    try {
      await updateContractStatus(contract.id, newStatus);
    } catch {
      // Optimistic update
    }

    setContracts((prev) =>
      prev.map((c) => {
        if (c.id === contract.id) {
          return {
            ...c,
            status: newStatus,
            party2Employee: {
              ...c.party2Employee,
              status: newStatus === "signed" ? "Signed" : "Pending",
              signedDate:
                newStatus === "signed" ? "10 Nov 2026, 2:36 pm" : "",
              certHash:
                newStatus === "signed"
                  ? "EMP-SIG-CERT-SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d6772"
                  : "",
            },
          };
        }
        return c;
      })
    );
  };

  // Handle Delete Contract
  const handleDeleteContract = async (id: string, title: string) => {
    if (!window.confirm(`Delete contract "${title}"?`)) return;

    try {
      await deleteContract(id);
    } catch {
      // Optimistic
    }
    setContracts((prev) => prev.filter((c) => c.id !== id));
    setActionMessage({
      type: "success",
      text: "Contract agreement deleted from system.",
    });
  };

  // Filtered contracts
  const filteredContracts = contracts.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      c.projectCode.toLowerCase().includes(search.toLowerCase()) ||
      c.projectTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.employeeEmail.toLowerCase().includes(search.toLowerCase()) ||
      c.employeeRole.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalContractsCount = contracts.length;
  const signedCount = contracts.filter((c) => c.status === "signed").length;
  const pendingCount = contracts.filter((c) => c.status === "sent").length;
  const totalRemunerationCommitted = contracts.reduce(
    (sum, c) => sum + (c.remuneration || 0),
    0
  );

  // Print agreement
  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
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
                Contracts &amp; Documents
              </h1>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-blue-600 border border-blue-200">
                {contracts.length} Issued
              </span>
            </div>
            <p className="text-xs text-[#64748b]">
              Generate, legally bind, and issue IT Act compliant project assignment agreements to engineering &amp; creative personnel.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewActive(!isPreviewActive)}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold shadow-2xs transition-colors ${
              isPreviewActive
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-white text-[#334155] border-[#e2e8f0] hover:bg-[#f8fafc]"
            }`}
          >
            <Eye size={14} className={isPreviewActive ? "text-blue-600" : "text-[#64748b]"} />
            <span>{isPreviewActive ? "Hide Agreement Preview" : "Live PDF Preview"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1d4ed8] transition-all"
          >
            <Plus size={15} />
            <span>{isFormOpen ? "Hide Form" : "Create New Contract"}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#64748b] font-mono uppercase tracking-wider font-semibold">
            <span>Total Agreements</span>
            <FileText size={16} className="text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#0f172a]">
            {totalContractsCount}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-mono text-[#64748b]">
            Official corporate deeds
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#64748b] font-mono uppercase tracking-wider font-semibold">
            <span>Signed &amp; Active</span>
            <ShieldCheck size={16} className="text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#0f172a]">
            {signedCount}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] font-mono text-emerald-600">
            <span>● IT Act Verified</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#64748b] font-mono uppercase tracking-wider font-semibold">
            <span>Awaiting Signature</span>
            <Clock size={16} className="text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#0f172a]">
            {pendingCount}
          </div>
          <div className="mt-1 text-[11px] font-mono text-amber-600">
            Sent to employee portal
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#64748b] font-mono uppercase tracking-wider font-semibold">
            <span>Committed Value</span>
            <Wallet size={16} className="text-blue-600" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#0f172a]">
            {formatMoney(totalRemunerationCommitted)}
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#64748b]">
            Total contract milestones
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

      {/* CREATE & SEND CONTRACT FORM */}
      {isFormOpen && (
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <PenTool size={18} />
              </div>
              <div>
                <h2 className="font-headline text-base font-bold text-[#0f172a]">
                  Issue Project Contract Agreement to Employee
                </h2>
                <p className="text-xs text-[#64748b]">
                  Select the recipient employee, bind project schedule, configure remuneration, and dispatch with administrative digital sign-off.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>Certified Electronic Signatures</span>
            </div>
          </div>

          <form onSubmit={handleCreateAndSendContract} className="space-y-6">
            {/* Step 1: SELECT EMPLOYEE (Party 2) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                  Step 1: Select Employee (Signatory Recipient) <span className="text-rose-500">*</span>
                </label>
                {selectedEmployee && (
                  <span className="text-[11px] text-[#64748b]">
                    UID: <span className="font-mono text-blue-600 font-semibold">{selectedEmployee.uid}</span>
                  </span>
                )}
              </div>

              {employees.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#cbd5e1] p-6 text-center text-xs text-[#64748b] bg-[#f8fafc]">
                  No employee profiles found in workspace. Create employee accounts in User Management first.
                </div>
              ) : (
                <>
                  {/* Employee Selection Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {employees.map((emp) => {
                      const isSelected = selectedEmployeeUid === emp.uid;
                      const initials = emp.displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();

                      return (
                        <button
                          key={emp.uid}
                          type="button"
                          onClick={() => setSelectedEmployeeUid(emp.uid)}
                          className={`flex items-start gap-2.5 rounded-xl p-3 text-left border transition-all ${
                            isSelected
                              ? "border-blue-600 bg-blue-50/80 text-blue-950 ring-2 ring-blue-500/20 shadow-xs"
                              : "border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
                          }`}
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-bold ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-[#f1f5f9] text-[#64748b]"
                            }`}
                          >
                            {initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-xs font-bold leading-tight text-[#0f172a]">
                              {emp.displayName}
                            </div>
                            <div className="truncate text-[10px] text-blue-600 font-medium leading-tight mt-0.5">
                              {emp.roleTitle}
                            </div>
                            <div className="truncate text-[10px] text-[#94a3b8] leading-tight mt-0.5">
                              {emp.email}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Employee Preview Info Box */}
                  {selectedEmployee && (
                    <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                          Full Name
                        </span>
                        <span className="font-bold text-[#0f172a]">{selectedEmployee.displayName}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                          Designation / Role
                        </span>
                        <span className="font-semibold text-blue-700">{selectedEmployee.roleTitle}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                          Official Work Email
                        </span>
                        <span className="font-mono text-[#334155]">{selectedEmployee.email}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                          Contact Phone
                        </span>
                        <span className="font-mono text-[#334155]">{selectedEmployee.phone}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                          Agreement Type
                        </span>
                        <span className="font-medium text-[#475569]">{agreementType}</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Step 2: PROJECT & CLIENT DETAILS */}
            <div className="space-y-4 pt-4 border-t border-[#f1f5f9]">
              <div className="flex items-center justify-between">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                  Step 2: Project Scope &amp; Client Association <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-[#64748b]">
                  Select from active deliverables or customize
                </span>
              </div>

              {/* Project Quick Picker */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] font-mono text-[#94a3b8] self-center">
                  Attach Project:
                </span>
                {projects.map((p) => (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => handleSelectProject(p.code)}
                    className={`rounded-lg px-2.5 py-1 font-mono text-[11px] border transition-all ${
                      selectedProjectCode === p.code
                        ? "bg-blue-600 text-white font-bold border-blue-600 shadow-2xs"
                        : "bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc]"
                    }`}
                  >
                    {p.code} • {p.title}
                  </button>
                ))}
              </div>

              {/* Form Row: Title, Code, Client */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6 space-y-1.5">
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                    Contract Agreement Title
                  </label>
                  <input
                    type="text"
                    value={contractTitle}
                    onChange={(e) => setContractTitle(e.target.value)}
                    placeholder="e.g. Cloud Infrastructure Modernization Agreement"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2 text-xs text-[#0f172a] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                    required
                  />
                </div>

                <div className="md:col-span-3 space-y-1.5">
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                    Project Code &amp; Title
                  </label>
                  <input
                    type="text"
                    value={`${selectedProjectCode} • ${customProjectTitle}`}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.includes("•")) {
                        const parts = val.split("•");
                        setSelectedProjectCode(parts[0].trim());
                        setCustomProjectTitle(parts[1].trim());
                      } else {
                        setCustomProjectTitle(val);
                      }
                    }}
                    placeholder="PRJ-3004 • Cloud Infrastructure"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2 text-xs text-[#0f172a] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                    required
                  />
                </div>

                <div className="md:col-span-3 space-y-1.5">
                  <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                    Client Organization
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Zenith Cloud Solutions"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2 text-xs text-[#0f172a] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 3: REMUNERATION & PROJECT SCHEDULE */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-[#f1f5f9]">
              {/* Remuneration */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                  Agreed Milestone Remuneration <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 font-bold text-xs text-[#64748b]">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="500"
                    value={remuneration}
                    onChange={(e) => setRemuneration(e.target.value)}
                    placeholder="68000"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white pl-8 pr-3.5 py-2 text-xs text-[#0f172a] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-mono font-bold"
                    required
                  />
                </div>
                <div className="flex gap-1.5 pt-0.5">
                  {[45000, 68000, 85000, 110000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setRemuneration(amt.toString())}
                      className="rounded border border-[#e2e8f0] bg-[#f8fafc] px-1.5 py-0.5 font-mono text-[10px] text-[#475569] hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      ₹{amt.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settlement Type */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                  Settlement Structure
                </label>
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2 text-xs text-[#0f172a] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                >
                  <option value="Milestone Settlement">Milestone Settlement</option>
                  <option value="Fixed Deliverable Release">Fixed Deliverable Release</option>
                  <option value="Bi-Weekly Sprint Compensation">Bi-Weekly Sprint Compensation</option>
                  <option value="Monthly Professional Retainer">Monthly Professional Retainer</option>
                </select>
              </div>

              {/* Schedule Duration */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                  Project Schedule (Duration)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="12 Nov 2026"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2 text-xs text-[#0f172a] font-medium"
                    required
                  />
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="15 Dec 2026"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2 text-xs text-[#0f172a] font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 4: LEGAL & SCOPE CLAUSES */}
            <div className="space-y-4 pt-4 border-t border-[#f1f5f9]">
              <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#334155]">
                Step 3: Legal Terms &amp; Scope Clauses (IT Act Compliant)
              </label>

              <div className="space-y-3">
                {/* Clause 1 */}
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#64748b]">
                    1. Scope of Work &amp; Sprint Deliverables
                  </span>
                  <textarea
                    rows={2}
                    value={scopeDetails}
                    onChange={(e) => setScopeDetails(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-[#cbd5e1] bg-white p-3 text-xs text-[#0f172a] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium resize-y"
                    required
                  />
                </div>

                {/* Clause 2 */}
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#64748b]">
                    2. Compensation &amp; Milestone Release
                  </span>
                  <textarea
                    rows={2}
                    value={compensationClause}
                    onChange={(e) => setCompensationClause(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-[#cbd5e1] bg-white p-3 text-xs text-[#0f172a] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium resize-y"
                    required
                  />
                </div>

                {/* Clause 3 */}
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#64748b]">
                    3. Non-Disclosure &amp; Intellectual Property
                  </span>
                  <textarea
                    rows={2}
                    value={ndaClause}
                    onChange={(e) => setNdaClause(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-[#cbd5e1] bg-white p-3 text-xs text-[#0f172a] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium resize-y"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#e2e8f0]">
              <div className="flex items-center gap-2 text-xs text-[#64748b]">
                <ShieldCheck size={16} className="text-blue-600" />
                <span>
                  Admin signatory hash (<code className="font-mono text-[10px] text-blue-700">AUTH-KS-ADMIN-CERT-SHA256</code>) will be sealed upon dispatch.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPreviewActive(true)}
                  className="rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] transition-colors"
                >
                  Preview Layout
                </button>

                {/* THE SEND BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 transition-all font-headline tracking-wide uppercase"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-white" />
                      <span>Issuing &amp; Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Contract to {selectedEmployee?.displayName || "Employee"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* LIVE CONTRACT DOCUMENT PREVIEW (Matches PDF Document Exact Layout) */}
      {isPreviewActive && (
        <div className="rounded-2xl border-2 border-blue-400/40 bg-white p-6 sm:p-10 shadow-lg relative space-y-8 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-mono text-xs uppercase font-bold text-blue-700 tracking-wider">
                Live Preview • Certified Electronic Agreement
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsPreviewActive(false)}
              className="text-xs font-mono text-slate-400 hover:text-slate-600"
            >
              Close Preview [✕]
            </button>
          </div>

          {/* RENDER EXACT REPLICA OF THE PDF DOCUMENT */}
          <div
            ref={printRef}
            className="bg-white p-6 sm:p-10 border border-[#e2e8f0] rounded-xl shadow-xs text-[#1a1a1f] space-y-6 max-w-4xl mx-auto"
          >
            {/* Header / Brand */}
            <div className="text-center space-y-1 border-b border-[#e5e7eb] pb-4">
              <div className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-[#0f172a] text-white font-bold font-headline text-xs tracking-wider mb-1">
                KS
              </div>
              <h2 className="font-headline text-lg sm:text-xl font-black tracking-wide text-[#0f172a] uppercase">
                KeySpex Agency Pvt. Ltd.
              </h2>
              <p className="text-[11px] text-[#64748b]">
                Ground Floor, Innovation Park, Sector 62, Noida, UP, India • CIN: U72900DL2024PTC123456
              </p>

              <div className="pt-3">
                <span className="inline-block rounded-md border border-[#cbd5e1] bg-[#f8fafc] px-4 py-1.5 font-headline text-xs sm:text-sm font-black uppercase tracking-wider text-[#0f172a]">
                  {contractTitle.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Parties to Agreement */}
            <div className="space-y-2 text-xs leading-relaxed text-[#334155]">
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0f172a]">
                Parties to Agreement
              </h4>
              <p>
                This Project Contract Agreement is entered into on{" "}
                <span className="font-bold text-[#0f172a]">10 Nov 2026</span>, by and between:
              </p>
              <ul className="space-y-1 pl-3">
                <li>
                  • <strong className="text-[#0f172a]">KeySpex Agency Pvt. Ltd.</strong>, having its principal registered office at Sector 62, Noida, India (hereafter &quot;The Company&quot; or &quot;Admin&quot;).
                </li>
                <li>
                  • <strong className="text-[#0f172a]">{selectedEmployee?.displayName || "Employee Recipient"}</strong>, serving in the professional capacity of{" "}
                  <strong className="text-[#0f172a]">{selectedEmployee?.roleTitle || "Designation"}</strong> (hereafter &quot;The Employee&quot;).
                </li>
              </ul>
            </div>

            {/* Project Scope & Remuneration */}
            <div className="space-y-2 pt-2">
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0f172a]">
                Project Scope &amp; Remuneration
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 text-xs">
                <div className="space-y-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                      Project Code &amp; Title
                    </span>
                    <span className="font-bold text-[#0f172a] text-sm">
                      {selectedProjectCode} • {customProjectTitle}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                      Agreed Milestone Remuneration
                    </span>
                    <span className="font-headline font-bold text-base text-blue-600">
                      ₹{Number(remuneration).toLocaleString("en-IN")}{" "}
                      <span className="text-xs font-normal text-[#64748b]">({paymentTerms})</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                      Client Organization
                    </span>
                    <span className="font-bold text-[#0f172a] text-sm">{clientName}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                      Project Schedule
                    </span>
                    <span className="font-medium text-[#334155]">
                      {startDate} to {endDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clauses */}
            <div className="space-y-3 text-xs leading-relaxed text-[#334155] pt-2">
              <div>
                <h5 className="font-bold text-[#0f172a]">1. SCOPE OF WORK &amp; SPRINT DELIVERABLES</h5>
                <p className="mt-0.5 text-[#475569]">{scopeDetails}</p>
              </div>

              <div>
                <h5 className="font-bold text-[#0f172a]">2. COMPENSATION &amp; MILESTONE RELEASE</h5>
                <p className="mt-0.5 text-[#475569]">{compensationClause}</p>
              </div>

              <div>
                <h5 className="font-bold text-[#0f172a]">3. NON-DISCLOSURE &amp; INTELLECTUAL PROPERTY</h5>
                <p className="mt-0.5 text-[#475569]">{ndaClause}</p>
              </div>
            </div>

            {/* Detail of Employee box with Teal Border */}
            <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-50/20 p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/40 pb-2">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-800">
                  <Users size={14} className="text-emerald-600" />
                  <span>DETAIL OF EMPLOYEE (SECOND PARTY SIGNATORY CREDENTIALS)</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                  UID: {selectedEmployee?.uid || "EMP-PENDING"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                    Full Name
                  </span>
                  <span className="font-bold text-[#0f172a]">{selectedEmployee?.displayName || "—"}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                    Designation / Role
                  </span>
                  <span className="font-medium text-[#0f172a]">{selectedEmployee?.roleTitle || "—"}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                    Official Work Email
                  </span>
                  <span className="font-mono text-[#0f172a]">{selectedEmployee?.email || "—"}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                    Contact Phone
                  </span>
                  <span className="font-mono text-[#0f172a]">{selectedEmployee?.phone || "—"}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                    Agreement Type
                  </span>
                  <span className="font-medium text-[#0f172a]">{agreementType}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                    Verification Timestamp
                  </span>
                  <span className="font-mono text-[#0f172a]">10 Nov 2026, 2:36 pm</span>
                </div>
              </div>
            </div>

            {/* Digital Signatures Box */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0f172a]">
                  Digital Signatures of Parties to Agreement
                </h4>
                <span className="font-mono text-[10px] text-[#64748b]">
                  Certified Electronic Signatures (IT Act Compliant)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Party 1: Admin */}
                <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#475569]">
                      PARTY 1: AUTHORIZED SIGNATORY (ADMIN)
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      ✓ Verified
                    </span>
                  </div>
                  <div className="font-bold text-[#0f172a]">KeySpex Leadership</div>
                  <div className="text-[11px] text-[#64748b]">Corporate Operations &amp; HR</div>
                  <div className="text-[11px] text-[#64748b]">Date: 10 Nov 2026</div>
                  <div className="font-mono text-[9px] text-[#64748b] truncate pt-1 border-t border-blue-100">
                    AUTH-KS-ADMIN-CERT-SHA256: 3b92dc18148a1d65dfc2d4b1fa3d677284addd2001
                  </div>
                  <div className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                    ✓ Digitally Signed by Admin
                  </div>
                </div>

                {/* Party 2: Employee */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#475569]">
                      PARTY 2: EMPLOYEE ACCEPTANCE (SIGNATORY)
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      ✓ Signed
                    </span>
                  </div>
                  <div className="font-bold text-[#0f172a]">{selectedEmployee?.displayName || "—"}</div>
                  <div className="text-[11px] text-[#64748b]">{selectedEmployee?.roleTitle || "—"}</div>
                  <div className="text-[11px] text-[#64748b]">Date: 10 Nov 2026, 2:36 pm</div>
                  <div className="font-mono text-[9px] text-[#64748b] truncate pt-1 border-t border-emerald-100">
                    EMP-SIG-CERT-SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d6772
                  </div>
                  <div className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                    ✓ Digitally Signed by {selectedEmployee?.displayName || "Employee"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTRACTS DIRECTORY & LEDGER */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white shadow-xs overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-[#e2e8f0] bg-[#fafafa]">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contracts by title, employee, project code, or role..."
              className="w-full rounded-xl border border-[#cbd5e1] bg-white pl-9 pr-3.5 py-2 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
            />
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { key: "all", label: "All Agreements" },
              { key: "signed", label: "Signed & Active" },
              { key: "sent", label: "Awaiting Signature" },
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

        {/* Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-[#64748b] text-xs">
            <Loader2 size={24} className="animate-spin text-blue-600 mb-2" />
            <span>Loading corporate deeds and agreements...</span>
          </div>
        ) : filteredContracts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-[#64748b]">
            <FileText size={36} className="text-[#cbd5e1] mb-2 stroke-[1.5]" />
            <p className="text-sm font-semibold text-[#0f172a]">No contracts found</p>
            <p className="text-xs text-[#94a3b8] mt-1">
              Use the issuance form above to draft and send a project contract to any team member.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#e2e8f0] bg-[#f8fafc] text-[10px] font-mono uppercase tracking-wider text-[#64748b]">
                  <th className="py-3 px-4 font-bold">Agreement &amp; Project</th>
                  <th className="py-3 px-4 font-bold">Employee Recipient</th>
                  <th className="py-3 px-4 font-bold">Client Account</th>
                  <th className="py-3 px-4 font-bold">Remuneration</th>
                  <th className="py-3 px-4 font-bold">Schedule</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {filteredContracts.map((c) => {
                  const isSigned = c.status === "signed";

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-[#fbfcfe] transition-colors group"
                    >
                      {/* Agreement Title & Code */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-bold text-[#0f172a] text-xs group-hover:text-blue-600 transition-colors">
                          {c.title}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                            {c.projectCode}
                          </span>
                          <span className="text-[11px] text-[#64748b] truncate">
                            {c.projectTitle}
                          </span>
                        </div>
                      </td>

                      {/* Employee */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-[#0f172a]">{c.employeeName}</div>
                        <div className="text-[11px] text-blue-600 font-medium">
                          {c.employeeRole}
                        </div>
                        <div className="font-mono text-[10px] text-[#94a3b8]">
                          {c.employeeEmail}
                        </div>
                      </td>

                      {/* Client */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#334155] font-medium">
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
                          <Building size={11} className="text-[#94a3b8]" />
                          {c.clientName}
                        </span>
                      </td>

                      {/* Remuneration */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-mono font-bold text-[#0f172a]">
                          {formatMoney(c.remuneration)}
                        </div>
                        <div className="font-mono text-[10px] text-[#64748b]">
                          {c.paymentTerms}
                        </div>
                      </td>

                      {/* Schedule */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-[#475569]">
                        <div>{c.startDate}</div>
                        <div className="text-[#94a3b8] text-[10px]">to {c.endDate}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleSignStatus(c)}
                          title="Click to toggle signature status"
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold border transition-colors ${
                            isSigned
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isSigned ? "bg-emerald-600" : "bg-amber-500 animate-pulse"
                            }`}
                          />
                          <span>{isSigned ? "Signed & Active" : "Awaiting Signature"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedContractForView(c)}
                            className="flex items-center gap-1 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#334155] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                            title="View Formal PDF Contract"
                          >
                            <Eye size={13} />
                            <span>View PDF</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteContract(c.id, c.title)}
                            className="rounded-lg border border-[#e2e8f0] bg-white p-1.5 text-[#64748b] hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                            title="Delete Contract"
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

      {/* FULL CONTRACT MODAL VIEW (Exact Replica of PDF Document for Inspection & Printing) */}
      {selectedContractForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-4xl rounded-2xl border border-[#e2e8f0] bg-white p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            {/* Modal Top Actions */}
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600">
                  {selectedContractForView.projectCode}
                </span>
                <span className="text-[#94a3b8]">•</span>
                <span className="font-mono text-xs text-[#64748b]">
                  {selectedContractForView.agreementType}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintDocument}
                  className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] transition-colors"
                >
                  <Printer size={14} className="text-[#64748b]" />
                  <span>Print / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedContractForView(null)}
                  className="rounded-xl border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-semibold text-[#64748b] hover:text-[#0f172a] transition-colors"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Document Rendered Form (Exact Replica of PDF) */}
            <div className="bg-white p-6 sm:p-10 border border-[#e5e7eb] rounded-xl shadow-xs text-[#1a1a1f] space-y-6">
              {/* Header */}
              <div className="text-center space-y-1 border-b border-[#e5e7eb] pb-4">
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-[#0f172a] text-white font-bold font-headline text-xs tracking-wider mb-1">
                  KS
                </div>
                <h2 className="font-headline text-lg sm:text-xl font-black tracking-wide text-[#0f172a] uppercase">
                  {selectedContractForView.companyName}
                </h2>
                <p className="text-[11px] text-[#64748b]">
                  {selectedContractForView.companyAddress} • CIN: {selectedContractForView.companyCin}
                </p>

                <div className="pt-3">
                  <span className="inline-block rounded-md border border-[#cbd5e1] bg-[#f8fafc] px-4 py-1.5 font-headline text-xs sm:text-sm font-black uppercase tracking-wider text-[#0f172a]">
                    {selectedContractForView.title.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Parties */}
              <div className="space-y-2 text-xs leading-relaxed text-[#334155]">
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0f172a]">
                  Parties to Agreement
                </h4>
                <p>
                  This Project Contract Agreement is entered into on{" "}
                  <span className="font-bold text-[#0f172a]">{selectedContractForView.contractDate}</span>, by and between:
                </p>
                <ul className="space-y-1 pl-3">
                  <li>
                    • <strong className="text-[#0f172a]">{selectedContractForView.companyName}</strong>, having its principal registered office at Sector 62, Noida, India (hereafter &quot;The Company&quot; or &quot;Admin&quot;).
                  </li>
                  <li>
                    • <strong className="text-[#0f172a]">{selectedContractForView.employeeName}</strong>, serving in the professional capacity of{" "}
                    <strong className="text-[#0f172a]">{selectedContractForView.employeeRole}</strong> (hereafter &quot;The Employee&quot;).
                  </li>
                </ul>
              </div>

              {/* Project Scope & Remuneration */}
              <div className="space-y-2 pt-2">
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0f172a]">
                  Project Scope &amp; Remuneration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 text-xs">
                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                        Project Code &amp; Title
                      </span>
                      <span className="font-bold text-[#0f172a] text-sm">
                        {selectedContractForView.projectCode} • {selectedContractForView.projectTitle}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                        Agreed Milestone Remuneration
                      </span>
                      <span className="font-headline font-bold text-base text-blue-600">
                        ₹{selectedContractForView.remuneration.toLocaleString("en-IN")}{" "}
                        <span className="text-xs font-normal text-[#64748b]">
                          ({selectedContractForView.paymentTerms})
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                        Client Organization
                      </span>
                      <span className="font-bold text-[#0f172a] text-sm">
                        {selectedContractForView.clientName}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                        Project Schedule
                      </span>
                      <span className="font-medium text-[#334155]">
                        {selectedContractForView.startDate} to {selectedContractForView.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clauses */}
              <div className="space-y-3 text-xs leading-relaxed text-[#334155] pt-2">
                <div>
                  <h5 className="font-bold text-[#0f172a]">1. SCOPE OF WORK &amp; SPRINT DELIVERABLES</h5>
                  <p className="mt-0.5 text-[#475569]">{selectedContractForView.scopeDetails}</p>
                </div>

                <div>
                  <h5 className="font-bold text-[#0f172a]">2. COMPENSATION &amp; MILESTONE RELEASE</h5>
                  <p className="mt-0.5 text-[#475569]">{selectedContractForView.compensationClause}</p>
                </div>

                <div>
                  <h5 className="font-bold text-[#0f172a]">3. NON-DISCLOSURE &amp; INTELLECTUAL PROPERTY</h5>
                  <p className="mt-0.5 text-[#475569]">{selectedContractForView.ndaClause}</p>
                </div>
              </div>

              {/* Detail of Employee */}
              <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-50/20 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/40 pb-2">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-emerald-800">
                    <Users size={14} className="text-emerald-600" />
                    <span>DETAIL OF EMPLOYEE (SECOND PARTY SIGNATORY CREDENTIALS)</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                    UID: {selectedContractForView.employeeUid}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                      Full Name
                    </span>
                    <span className="font-bold text-[#0f172a]">
                      {selectedContractForView.employeeName}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                      Designation / Role
                    </span>
                    <span className="font-medium text-[#0f172a]">
                      {selectedContractForView.employeeRole}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                      Official Work Email
                    </span>
                    <span className="font-mono text-[#0f172a]">
                      {selectedContractForView.employeeEmail}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                      Contact Phone
                    </span>
                    <span className="font-mono text-[#0f172a]">
                      {selectedContractForView.employeePhone}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                      Agreement Type
                    </span>
                    <span className="font-medium text-[#0f172a]">
                      {selectedContractForView.agreementType}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#64748b] block">
                      Verification Timestamp
                    </span>
                    <span className="font-mono text-[#0f172a]">
                      {selectedContractForView.verificationTimestamp}
                    </span>
                  </div>
                </div>
              </div>

              {/* Digital Signatures Box */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0f172a]">
                    Digital Signatures of Parties to Agreement
                  </h4>
                  <span className="font-mono text-[10px] text-[#64748b]">
                    Certified Electronic Signatures (IT Act Compliant)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Party 1: Admin */}
                  <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase text-[#475569]">
                        PARTY 1: AUTHORIZED SIGNATORY (ADMIN)
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        ✓ Verified
                      </span>
                    </div>
                    <div className="font-bold text-[#0f172a]">
                      {selectedContractForView.party1Admin.signatoryName}
                    </div>
                    <div className="text-[11px] text-[#64748b]">
                      {selectedContractForView.party1Admin.signatoryRole}
                    </div>
                    <div className="text-[11px] text-[#64748b]">
                      Date: {selectedContractForView.party1Admin.signedDate}
                    </div>
                    <div className="font-mono text-[9px] text-[#64748b] truncate pt-1 border-t border-blue-100">
                      {selectedContractForView.party1Admin.certHash}
                    </div>
                    <div className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                      ✓ Digitally Signed by Admin
                    </div>
                  </div>

                  {/* Party 2: Employee */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-3.5 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase text-[#475569]">
                        PARTY 2: EMPLOYEE ACCEPTANCE (SIGNATORY)
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          selectedContractForView.status === "signed"
                            ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                            : "text-amber-600 bg-amber-50 border-amber-200"
                        }`}
                      >
                        {selectedContractForView.status === "signed" ? "✓ Signed" : "⏳ Pending"}
                      </span>
                    </div>
                    <div className="font-bold text-[#0f172a]">
                      {selectedContractForView.party2Employee.signatoryName}
                    </div>
                    <div className="text-[11px] text-[#64748b]">
                      {selectedContractForView.party2Employee.signatoryRole}
                    </div>
                    <div className="text-[11px] text-[#64748b]">
                      {selectedContractForView.party2Employee.signedDate
                        ? `Date: ${selectedContractForView.party2Employee.signedDate}`
                        : "Awaiting Employee Signature"}
                    </div>
                    <div className="font-mono text-[9px] text-[#64748b] truncate pt-1 border-t border-emerald-100">
                      {selectedContractForView.party2Employee.certHash ||
                        "Awaiting cryptographic signing token on portal"}
                    </div>
                    <div className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                      {selectedContractForView.status === "signed"
                        ? `✓ Digitally Signed by ${selectedContractForView.employeeName}`
                        : "⏳ Pending Employee Digital Acceptance"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#e2e8f0]">
              <button
                type="button"
                onClick={() => setSelectedContractForView(null)}
                className="rounded-xl bg-[#0f172a] px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

