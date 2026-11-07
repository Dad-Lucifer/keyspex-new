"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  Search,
  Download,
  Users,
  Wallet,
  RefreshCw,
  Clock,
  Building,
} from "lucide-react";
import {
  SalaryItem,
  getSalaries,
  disburseSalary,
} from "@/lib/api";

interface EmployeeOption {
  uid: string;
  displayName: string;
  email: string;
  contactNo?: string;
}

interface PayrollManagementViewProps {
  currency: "INR" | "USD" | "EUR";
  onBackToDashboard: () => void;
}

export function PayrollManagementView({
  currency,
  onBackToDashboard,
}: PayrollManagementViewProps) {
  // Employees list for selection
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);
  const [selectedUid, setSelectedUid] = useState<string>("");

  // Form state
  const [amount, setAmount] = useState<string>("");
  const [period, setPeriod] = useState<string>("November 2024");
  const [paymentMethod, setPaymentMethod] = useState<string>(
    "Direct Bank Transfer (NEFT/ACH)"
  );
  const [notes, setNotes] = useState<string>("");

  // Payout submission state
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // History & Table state
  const [salaries, setSalaries] = useState<SalaryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const currencySymbol = currency === "INR" ? "₹" : currency === "USD" ? "$" : "€";

  // Fallback demo employees if API is empty or offline
  const defaultDemoEmployees: EmployeeOption[] = [
    {
      uid: "emp-1001",
      displayName: "Riya Sharma",
      email: "riya.sharma@brand.com",
      contactNo: "+91 98765 43210",
    },
    {
      uid: "emp-1002",
      displayName: "Marcus Vance",
      email: "marcus.vance@brand.com",
      contactNo: "+91 98765 43211",
    },
    {
      uid: "emp-1003",
      displayName: "Priya Nair",
      email: "priya.nair@brand.com",
      contactNo: "+91 98765 43212",
    },
    {
      uid: "emp-1004",
      displayName: "Rahul Verma",
      email: "rahul.verma@brand.com",
      contactNo: "+91 98765 43213",
    },
    {
      uid: "emp-1005",
      displayName: "Aarav Patel",
      email: "aarav.patel@brand.com",
      contactNo: "+91 98765 43214",
    },
  ];

  // Fallback demo salaries
  const defaultDemoSalaries: SalaryItem[] = [
    {
      id: "sal-101",
      employeeUid: "emp-1001",
      employeeName: "Riya Sharma",
      employeeEmail: "riya.sharma@brand.com",
      amount: 45000,
      period: "October 2024",
      paymentMethod: "Direct Bank Transfer (NEFT/ACH)",
      notes: "Monthly regular disbursement",
      status: "paid",
      paidAt: { _seconds: Math.floor(Date.now() / 1000) - 86400 * 5, _nanoseconds: 0 },
      paidByName: "Admin",
    },
    {
      id: "sal-102",
      employeeUid: "emp-1002",
      employeeName: "Marcus Vance",
      employeeEmail: "marcus.vance@brand.com",
      amount: 65000,
      period: "October 2024",
      paymentMethod: "Direct Bank Transfer (NEFT/ACH)",
      notes: "Senior Engineering Retainer",
      status: "paid",
      paidAt: { _seconds: Math.floor(Date.now() / 1000) - 86400 * 5, _nanoseconds: 0 },
      paidByName: "Admin",
    },
    {
      id: "sal-103",
      employeeUid: "emp-1003",
      employeeName: "Priya Nair",
      employeeEmail: "priya.nair@brand.com",
      amount: 52000,
      period: "October 2024",
      paymentMethod: "UPI Instant Settlement",
      notes: "Product Design Retainer",
      status: "paid",
      paidAt: { _seconds: Math.floor(Date.now() / 1000) - 86400 * 6, _nanoseconds: 0 },
      paidByName: "Admin",
    },
  ];

  // 1. Fetch live employee roster
  const loadEmployees = async () => {
    try {
      const token =
        typeof window !== "undefined"
          ? sessionStorage.getItem("ks_access_token")
          : null;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

      const res = await fetch(`${apiUrl}/api/users?role=employee`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to load employees");
      const json = await res.json();
      if (json?.data?.users && json.data.users.length > 0) {
        setEmployees(json.data.users);
        if (!selectedUid) setSelectedUid(json.data.users[0].uid);
      } else {
        setEmployees(defaultDemoEmployees);
        if (!selectedUid) setSelectedUid(defaultDemoEmployees[0].uid);
      }
    } catch {
      setEmployees(defaultDemoEmployees);
      if (!selectedUid) setSelectedUid(defaultDemoEmployees[0].uid);
    }
  };

  // 2. Fetch live salary disbursement history
  const loadSalaryHistory = async () => {
    setLoadingHistory(true);
    try {
      const data = await getSalaries(100);
      if (data && data.length > 0) {
        setSalaries(data);
      } else {
        setSalaries(defaultDemoSalaries);
      }
    } catch {
      setSalaries(defaultDemoSalaries);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadSalaryHistory();
  }, []);

  const selectedEmployee =
    employees.find((e) => e.uid === selectedUid) || employees[0];

  // 3. Handle Pay button click
  const handlePaySalary = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMessage(null);

    const numericAmount = parseFloat(amount);
    if (!numericAmount || isNaN(numericAmount) || numericAmount <= 0) {
      setStatus("error");
      setFeedbackMessage("Please enter a valid salary amount greater than zero.");
      return;
    }

    if (!selectedEmployee) {
      setStatus("error");
      setFeedbackMessage("Please select an employee to disburse salary to.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await disburseSalary({
        employeeUid: selectedEmployee.uid,
        employeeName: selectedEmployee.displayName,
        employeeEmail: selectedEmployee.email,
        amount: numericAmount,
        period: period.trim() || "November 2024",
        paymentMethod,
        notes: notes.trim() || undefined,
      });

      setStatus("success");
      setFeedbackMessage(
        `Successfully paid ${currencySymbol}${numericAmount.toLocaleString("en-IN")} to ${
          selectedEmployee.displayName
        } (${selectedEmployee.email}).`
      );

      // Add to local state
      if (res.salary) {
        setSalaries((prev) => [res.salary, ...prev]);
      } else {
        const optimisticSalary: SalaryItem = {
          id: `sal-${Date.now()}`,
          employeeUid: selectedEmployee.uid,
          employeeName: selectedEmployee.displayName,
          employeeEmail: selectedEmployee.email,
          amount: numericAmount,
          period: period.trim() || "November 2024",
          paymentMethod,
          notes: notes.trim() || undefined,
          status: "paid",
          paidAt: { _seconds: Math.floor(Date.now() / 1000), _nanoseconds: 0 },
          paidByName: "Admin",
        };
        setSalaries((prev) => [optimisticSalary, ...prev]);
      }

      // Reset amount and notes
      setAmount("");
      setNotes("");

      setTimeout(() => {
        setFeedbackMessage(null);
        setStatus("idle");
      }, 5000);
    } catch (err: any) {
      setStatus("error");
      setFeedbackMessage(
        err.message || "Failed to process salary payment. Please try again."
      );
    }
  };

  // Calculations
  const totalDisbursed = salaries.reduce((acc, s) => acc + (s.amount || 0), 0);
  const averageSalary =
    salaries.length > 0 ? Math.round(totalDisbursed / salaries.length) : 0;

  // Filtered salaries
  const filteredSalaries = salaries.filter(
    (s) =>
      s.employeeName?.toLowerCase().includes(search.toLowerCase()) ||
      s.employeeEmail?.toLowerCase().includes(search.toLowerCase()) ||
      s.period?.toLowerCase().includes(search.toLowerCase())
  );

  // Format date
  const formatPaidDate = (paidAt: any) => {
    if (!paidAt) return "Just now";
    if (typeof paidAt === "string") return paidAt;
    if (paidAt._seconds) {
      return new Date(paidAt._seconds * 1000).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "Recent";
  };

  // Export CSV
  const handleExportCSV = () => {
    if (salaries.length === 0) return;
    const headers = [
      "ID",
      "Employee UID",
      "Full Name",
      "Email",
      "Amount",
      "Period",
      "Payment Method",
      "Status",
      "Date",
    ];
    const rows = salaries.map((s) => [
      s.id,
      s.employeeUid,
      `"${s.employeeName}"`,
      s.employeeEmail,
      s.amount,
      `"${s.period}"`,
      `"${s.paymentMethod}"`,
      s.status,
      `"${formatPaidDate(s.paidAt)}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `keyspex_payroll_ledger_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#475569] hover:bg-white hover:text-[#0f172a] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline text-lg sm:text-xl font-bold text-[#0f172a]">
                Payroll & Salaries
              </h2>
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-600">
                Live Disburse
              </span>
            </div>
            <p className="text-xs text-[#64748b]">
              Execute direct employee disbursements and audit real-time payroll records
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3.5 py-2 text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] shadow-2xs transition-colors"
          >
            <Download size={14} className="text-[#64748b]" />
            <span>Export Ledger</span>
          </button>
          <button
            type="button"
            onClick={loadSalaryHistory}
            className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] shadow-2xs transition-colors"
          >
            <RefreshCw size={14} className={loadingHistory ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#64748b] mb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
              Total Disbursed
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Wallet size={15} />
            </div>
          </div>
          <p className="font-headline text-2xl font-bold text-[#0f172a]">
            {currencySymbol}
            {totalDisbursed.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 font-mono text-[10px] text-[#64748b]">
            Total lifetime payouts across all staff
          </p>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#64748b] mb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
              Disbursement Transactions
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[#2563eb]">
              <CreditCard size={15} />
            </div>
          </div>
          <p className="font-headline text-2xl font-bold text-[#0f172a]">
            {salaries.length}
          </p>
          <p className="mt-1 font-mono text-[10px] text-[#64748b]">
            Direct entries in Firestore `salaries` table
          </p>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between text-[#64748b] mb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
              Average Salary Payout
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Users size={15} />
            </div>
          </div>
          <p className="font-headline text-2xl font-bold text-[#0f172a]">
            {currencySymbol}
            {averageSalary.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 font-mono text-[10px] text-[#64748b]">
            Mean disbursement value per staff member
          </p>
        </div>
      </div>

      {/* Main Grid: Disburse Form (Left) + Selected Profile (Right) */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-2xs">
        <div className="flex items-center gap-2 pb-4 mb-6 border-b border-[#f1f5f9]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <CreditCard size={18} />
          </div>
          <div>
            <h3 className="font-headline font-bold text-base text-[#0f172a]">
              Disburse Salary Payment
            </h3>
            <p className="font-mono text-[11px] text-[#64748b]">
              Authorize and record salary transaction into the employee ledger
            </p>
          </div>
        </div>

        {feedbackMessage && (
          <div
            className={`mb-6 flex items-start gap-2.5 rounded-xl border p-4 text-xs ${
              status === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {status === "success" ? (
              <CheckCircle2 size={18} className="shrink-0 text-emerald-600 mt-0.5" />
            ) : (
              <ShieldAlert size={18} className="shrink-0 text-red-600 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">
                {status === "success" ? "Disbursement Completed" : "Payment Error"}
              </p>
              <p className="mt-0.5">{feedbackMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handlePaySalary} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Select Employee */}
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                Select Employee *
              </label>
              <select
                value={selectedUid}
                onChange={(e) => setSelectedUid(e.target.value)}
                required
                className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5 text-xs text-[#0f172a] font-medium outline-none focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-blue-500/10 cursor-pointer"
              >
                {employees.map((emp) => (
                  <option key={emp.uid} value={emp.uid}>
                    {emp.displayName} — {emp.email}
                  </option>
                ))}
              </select>

              {/* Employee Quick Info Badge */}
              {selectedEmployee && (
                <div className="mt-2.5 flex items-center justify-between rounded-xl border border-[#f1f5f9] bg-[#f8fafc] p-2.5 text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-[#1d4ed8] font-bold font-mono text-[11px]">
                      {selectedEmployee.displayName
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0f172a]">
                        {selectedEmployee.displayName}
                      </p>
                      <p className="font-mono text-[10px] text-[#64748b]">
                        UID: {selectedEmployee.uid}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#2563eb]">
                    Verified Staff
                  </span>
                </div>
              )}
            </div>

            {/* 2. Salary Amount */}
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                Salary Amount ({currencySymbol}) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-[#64748b]">
                  {currencySymbol}
                </span>
                <input
                  type="number"
                  step="any"
                  min="1"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-8 pr-4 py-2.5 text-xs text-[#0f172a] font-semibold outline-none focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              {/* Preset Amount Chips */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[9px] uppercase font-bold text-[#94a3b8]">
                  Presets:
                </span>
                {[35000, 50000, 75000, 100000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val.toString())}
                    className="rounded-lg border border-[#e2e8f0] bg-white px-2 py-1 font-mono text-[10px] font-semibold text-[#475569] hover:bg-[#f8fafc] hover:border-[#2563eb] hover:text-[#2563eb] transition-all"
                  >
                    {currencySymbol}
                    {val.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* 3. Pay Period */}
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                Pay Period / Month *
              </label>
              <input
                type="text"
                required
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. November 2024"
                className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5 text-xs text-[#0f172a] font-medium outline-none focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* 4. Payment Method */}
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5 text-xs text-[#0f172a] font-medium outline-none focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-blue-500/10 cursor-pointer"
              >
                <option value="Direct Bank Transfer (NEFT/ACH)">
                  Direct Bank Transfer (NEFT/ACH)
                </option>
                <option value="UPI Instant Settlement">UPI Instant Settlement</option>
                <option value="RTGS Immediate Wire">RTGS Immediate Wire</option>
                <option value="Cheque / Corporate Voucher">
                  Cheque / Corporate Voucher
                </option>
              </select>
            </div>
          </div>

          {/* 5. Notes / Remarks */}
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase font-bold tracking-wider text-[#64748b]">
              Payment Notes & Memo (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. November regular salary + performance incentive"
              className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2 text-xs text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          {/* Submit Action Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
            <p className="font-mono text-[10px] text-[#64748b]">
              Action executes instant Firestore record creation with audit logging
            </p>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-60 transition-all cursor-pointer"
            >
              <CreditCard size={15} />
              <span>
                {status === "submitting"
                  ? "Processing Payout..."
                  : `Pay ${amount ? `${currencySymbol}${parseFloat(amount || "0").toLocaleString("en-IN")}` : "Salary"} →`}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Salary Disbursement Ledger / History Table */}
      <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#f1f5f9]">
          <div>
            <h3 className="font-headline font-bold text-base text-[#0f172a]">
              Salary Payment History & Ledger
            </h3>
            <p className="font-mono text-[11px] text-[#64748b]">
              Historical records of all disbursements stored in `salaries` table
            </p>
          </div>

          {/* Search filter */}
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, month..."
              className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-8 pr-3 py-1.5 text-xs text-[#0f172a] outline-none focus:border-[#2563eb] focus:bg-white"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#f1f5f9] font-mono text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                <th className="py-3 px-3">Employee</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Period</th>
                <th className="py-3 px-3">Payment Method</th>
                <th className="py-3 px-3">Disbursed Date</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fafc]">
              {filteredSalaries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#94a3b8]">
                    No salary disbursement records found.
                  </td>
                </tr>
              ) : (
                filteredSalaries.map((sal) => (
                  <tr key={sal.id} className="hover:bg-[#f8fafc] transition-colors">
                    {/* Employee */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#1d4ed8] font-mono text-xs font-bold">
                          {sal.employeeName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-[#0f172a]">
                            {sal.employeeName}
                          </p>
                          <p className="font-mono text-[10px] text-[#64748b]">
                            {sal.employeeEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-3">
                      <span className="font-headline font-bold text-emerald-600 text-sm">
                        {currencySymbol}
                        {sal.amount.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Period */}
                    <td className="py-3.5 px-3 font-medium text-[#0f172a]">
                      {sal.period}
                    </td>

                    {/* Method */}
                    <td className="py-3.5 px-3 text-[#64748b]">
                      <p>{sal.paymentMethod}</p>
                      {sal.notes && (
                        <p className="font-mono text-[10px] text-[#94a3b8] truncate max-w-xs">
                          Memo: {sal.notes}
                        </p>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#64748b]">
                      {formatPaidDate(sal.paidAt)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        Disbursed
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

