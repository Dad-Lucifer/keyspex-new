"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Wallet,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Building,
} from "lucide-react";
import { createObligation, ObligationItem } from "@/lib/api";

interface CreateObligationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onObligationCreated: (obligation: ObligationItem) => void;
  currency: "INR" | "USD" | "EUR";
  defaultDate?: string;
}

export function CreateObligationModal({
  isOpen,
  onClose,
  onObligationCreated,
  currency,
  defaultDate,
}: CreateObligationModalProps) {
  const [dueDate, setDueDate] = useState(() => defaultDate || new Date().toISOString().split("T")[0]);
  const [title, setTitle] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"scheduled" | "pending-auth" | "overdue" | "paid">("scheduled");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (defaultDate) setDueDate(defaultDate);
      setTitle("");
      setAccount("");
      setAmount("");
      setStatus("scheduled");
      setSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen, defaultDate]);

  if (!isOpen) return null;

  const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₹";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const parsedAmt = parseInt(amount, 10);
    if (isNaN(parsedAmt) || parsedAmt <= 0) {
      setErrorMessage("Please enter a valid amount greater than zero.");
      return;
    }

    if (!title.trim() || title.trim().length < 2) {
      setErrorMessage("Obligation title is required.");
      return;
    }

    if (!account.trim()) {
      setErrorMessage("Account or vendor name is required.");
      return;
    }

    if (!dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      setErrorMessage("Please enter a valid due date (YYYY-MM-DD).");
      return;
    }

    setSubmitting(true);

    try {
      const res = await createObligation({
        dueDate,
        title: title.trim(),
        account: account.trim(),
        amount: parsedAmt,
        status,
      });

      const created = res.data?.obligation || {
        id: `obl-${Date.now()}`,
        dueDate,
        title: title.trim(),
        account: account.trim(),
        amount: parsedAmt,
        status,
      };

      setSuccess(true);
      onObligationCreated(created);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to record obligation.";
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
      <div className="relative w-full max-w-lg rounded-2xl border border-[#e2e8f0] bg-white shadow-2xl overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9] bg-gradient-to-r from-amber-50/50 via-white to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white shadow-sm shadow-amber-500/20">
              <Wallet size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-base text-[#0f172a]">
                  Record Payment Obligation
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/70 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-800">
                  <Sparkles size={11} /> Outflow
                </span>
              </div>
              <p className="text-xs text-[#64748b]">
                Add scheduled invoice, vendor subscription, or payroll payout
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg p-1.5 text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {success ? (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <div className="h-14 w-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2 border border-emerald-200">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-headline font-bold text-base text-[#0f172a]">
                Obligation Added!
              </h4>
              <p className="text-xs text-[#64748b] mt-1">
                &apos;{title}&apos; ({currencySymbol}{parseInt(amount || "0").toLocaleString()}) scheduled for {dueDate}.
              </p>
            </div>
          ) : (
            <form id="create-obligation-form" onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-600" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Obligation Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AWS Cloud Infrastructure Annual Renewal"
                  className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                />
              </div>

              {/* Account / Counterparty */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Account / Counterparty / Vendor <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="e.g. Apex Global • CLI-2001 or Amazon Web Services Inc."
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#64748b]">
                    <Building size={15} />
                  </div>
                </div>
              </div>

              {/* Amount & Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      min="1"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="65000"
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white pl-8 pr-3.5 py-2.5 text-xs text-[#0f172a] font-mono font-bold focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                    Due Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#64748b]">
                      <Calendar size={15} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Obligation Status
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: "scheduled", label: "Scheduled", color: "bg-sky-50 text-sky-700 border-sky-200" },
                      { id: "pending-auth", label: "Pending Auth", color: "bg-purple-50 text-purple-700 border-purple-200" },
                      { id: "overdue", label: "Overdue", color: "bg-amber-50 text-amber-800 border-amber-200" },
                      { id: "paid", label: "Paid / Settled", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                    ] as const
                  ).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStatus(s.id)}
                      className={`rounded-xl border px-2 py-2 text-[11px] font-semibold text-center transition-all ${
                        status === s.id
                          ? `${s.color} ring-2 ring-blue-500/30 border-transparent shadow-xs font-bold`
                          : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#f1f5f9] bg-[#f8fafc]/60">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-[#cbd5e1] bg-white px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f1f5f9] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="create-obligation-form"
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-700 focus:ring-2 focus:ring-amber-400"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Recording...</span>
                </>
              ) : (
                <>
                  <Wallet size={14} />
                  <span>Save Obligation</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

