"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  TrendingUp,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
} from "lucide-react";
import {
  createPaymentEntry,
  PaymentTimelineItem,
  PaymentEntryType,
  PaymentEntryStatus,
} from "@/lib/api";

interface CreatePaymentEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    code: string;
    title: string;
    clientName: string;
    amount: number;
  };
  onEntrySaved: (entry: PaymentTimelineItem) => void;
  currency: "INR" | "USD" | "EUR";
  initialType?: PaymentEntryType;
}

function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function CreatePaymentEntryModal({
  isOpen,
  onClose,
  project,
  onEntrySaved,
  currency,
  initialType = "received",
}: CreatePaymentEntryModalProps) {
  // Form State
  const [entryType, setEntryType] = useState<PaymentEntryType>(initialType);
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(() => formatDate(new Date()));
  const [title, setTitle] = useState<string>("");
  const [method, setMethod] = useState<string>("Bank Wire / NEFT");
  const [referenceNo, setReferenceNo] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [status, setStatus] = useState<PaymentEntryStatus>("cleared");

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initial type when opening
  useEffect(() => {
    if (isOpen) {
      setEntryType(initialType);
      setAmount("");
      setDate(formatDate(new Date()));
      setTitle("");
      setReferenceNo("");
      setNotes("");
      setStatus("cleared");
      setSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen, initialType]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !submitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, submitting, onClose]);

  if (!isOpen) return null;

  const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₹";

  const handleQuickDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    setDate(formatDate(d));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Please enter a valid amount greater than zero.");
      return;
    }

    if (!title.trim() || title.trim().length < 2) {
      setErrorMessage("Please enter a descriptive entry title or milestone name.");
      return;
    }

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setErrorMessage("Please specify a valid transaction date (YYYY-MM-DD).");
      return;
    }

    setSubmitting(true);

    try {
      const response = await createPaymentEntry({
        projectId: project.id,
        projectCode: project.code,
        projectTitle: project.title,
        clientName: project.clientName,
        type: entryType,
        amount: parsedAmount,
        date,
        title: title.trim(),
        method,
        referenceNo: referenceNo.trim(),
        notes: notes.trim(),
        status,
      });

      const savedEntry: PaymentTimelineItem = response.data?.entry || {
        id: `entry-${Date.now()}`,
        projectId: project.id,
        projectCode: project.code,
        projectTitle: project.title,
        clientName: project.clientName,
        type: entryType,
        amount: parsedAmount,
        date,
        title: title.trim(),
        method,
        referenceNo: referenceNo.trim(),
        notes: notes.trim(),
        status,
        createdByName: "Admin",
      };

      setSuccess(true);
      onEntrySaved(savedEntry);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to record payment entry. Please try again.";
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-2xl border border-[#e2e8f0] bg-white shadow-2xl animate-in zoom-in-95 duration-150 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9] bg-gradient-to-r from-blue-50/40 via-white to-indigo-50/20">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm text-white ${
                entryType === "received"
                  ? "bg-emerald-600 shadow-emerald-500/20"
                  : "bg-amber-600 shadow-amber-500/20"
              }`}
            >
              {entryType === "received" ? (
                <ArrowDownLeft size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-base text-[#0f172a]">
                  Record Payment Timeline Entry
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100/70 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#2563eb]">
                  <Sparkles size={11} /> {project.code || "Project"}
                </span>
              </div>
              <p className="text-xs text-[#64748b] truncate max-w-sm">
                {project.title} • {project.clientName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg p-1.5 text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto px-6 py-5">
          {success ? (
            <div className="py-10 flex flex-col items-center justify-center text-center animate-in zoom-in-95">
              <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 border border-emerald-200 shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="font-headline font-bold text-lg text-[#0f172a]">
                Entry Saved Successfully!
              </h4>
              <p className="text-xs text-[#64748b] mt-1 max-w-sm">
                Recorded {entryType === "received" ? "received payment from client" : "invested amount"} of{" "}
                <span className="font-bold text-[#0f172a]">
                  {currencySymbol}
                  {parseFloat(amount || "0").toLocaleString()}
                </span>{" "}
                for <span className="font-semibold">{project.title}</span>.
              </p>
            </div>
          ) : (
            <form id="payment-entry-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {errorMessage && (
                <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 animate-in fade-in">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-600" />
                  <div className="flex-1">
                    <p className="font-semibold">Unable to Save Entry</p>
                    <p className="text-rose-700 text-[11px] mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Type Switcher Tab */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Transaction Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEntryType("received")}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all ${
                      entryType === "received"
                        ? "border-emerald-500 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-500/20 shadow-xs"
                        : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                    }`}
                  >
                    <ArrowDownLeft
                      size={16}
                      className={entryType === "received" ? "text-emerald-600" : "text-[#94a3b8]"}
                    />
                    <div className="text-left">
                      <div>Receive Payment</div>
                      <div className="text-[10px] font-normal text-[#64748b]">
                        Income from client
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEntryType("invested")}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all ${
                      entryType === "invested"
                        ? "border-amber-500 bg-amber-50/70 text-amber-800 ring-2 ring-amber-500/20 shadow-xs"
                        : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                    }`}
                  >
                    <ArrowUpRight
                      size={16}
                      className={entryType === "invested" ? "text-amber-600" : "text-[#94a3b8]"}
                    />
                    <div className="text-left">
                      <div>Invested Amount</div>
                      <div className="text-[10px] font-normal text-[#64748b]">
                        Project expense / capital
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Amount and Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Amount */}
                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                    Amount ({currency}) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-xs font-bold text-[#64748b]">
                      {currencySymbol}
                    </span>
                    <input
                      type="number"
                      step="any"
                      min="1"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 75000"
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white pl-8 pr-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] font-mono font-semibold focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#0f172a]">
                      Date <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleQuickDate(0)}
                        className="px-1.5 py-0.5 rounded text-[10px] font-medium text-[#475569] bg-[#f1f5f9] hover:bg-[#e2e8f0]"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickDate(1)}
                        className="px-1.5 py-0.5 rounded text-[10px] font-medium text-[#475569] bg-[#f1f5f9] hover:bg-[#e2e8f0]"
                      >
                        Yesterday
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#64748b]">
                      <Calendar size={15} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title / Milestone Name */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Entry Title / Milestone Description <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    entryType === "received"
                      ? "e.g. Milestone 1: 40% Advance Payment release"
                      : "e.g. AWS EKS Kubernetes Cluster & GPU hosting fee"
                  }
                  className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                />
              </div>

              {/* Payment Method & Reference Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Method */}
                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                    Payment Method
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2.5 text-xs text-[#0f172a] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  >
                    <option value="Bank Wire / NEFT">Bank Wire / NEFT</option>
                    <option value="UPI / Instant Transfer">UPI / Instant Transfer</option>
                    <option value="Stripe / Card Payment">Stripe / Card Payment</option>
                    <option value="Corporate Cheque">Corporate Cheque</option>
                    <option value="ACH Direct Debit">ACH Direct Debit</option>
                    <option value="Cash / Other">Cash / Other</option>
                  </select>
                </div>

                {/* Reference Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                    Reference / UTR / Txn ID
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    placeholder="e.g. UTR-98421034"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] font-mono focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Settlement Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: "cleared", label: "Cleared / Settled" },
                      { id: "pending", label: "Pending Verification" },
                      { id: "reconciled", label: "Audited & Reconciled" },
                    ] as const
                  ).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStatus(s.id)}
                      className={`rounded-xl border px-2.5 py-2 text-[11px] font-semibold text-center transition-all ${
                        status === s.id
                          ? "border-[#2563eb] bg-blue-50 text-[#2563eb] ring-2 ring-blue-500/20"
                          : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Additional Notes / Scope Breakdown <span className="text-[#94a3b8] font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  maxLength={2000}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Invoice number, tax deductibles, vendor details, or deliverable comments..."
                  className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer with "Button to Save" */}
        {!success && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#f1f5f9] bg-[#f8fafc]/60">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-[#cbd5e1] bg-white px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f1f5f9] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="payment-entry-form"
              disabled={submitting}
              className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold text-white shadow-sm transition-all disabled:opacity-50 ${
                entryType === "received"
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 focus:ring-2 focus:ring-emerald-400"
                  : "bg-[#2563eb] hover:bg-[#1d4ed8] shadow-blue-600/20 focus:ring-2 focus:ring-blue-400"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Saving Entry...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={14} />
                  <span>Save Entry</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

