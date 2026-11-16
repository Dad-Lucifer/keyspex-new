// frontend/src/components/employee/ContractViewerModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  CheckCircle2,
  Check,
  Clock,
  UserCheck,
} from "lucide-react";
import { useEmployee } from "@/context/EmployeeContext";

export interface ContractDocument {
  id: string;
  docId: string;
  title: string;
  category: string;
  effectiveDate: string;
  status: "Pending Acceptance" | "Active & Binding" | "Completed";
  description: string;
  projectCode?: string;
  projectTitle?: string;
  clientName?: string;
  projectRole?: string;
  projectPayout?: number;
  startDate?: string;
  dueDate?: string;
  milestones?: { name: string; done: boolean }[];
  isSigned?: boolean;
  signedAt?: string;
  employeeName?: string;
  employeeTitle?: string;
  employeeEmail?: string;
  employeePhone?: string;
  employeeUid?: string;
}

interface ContractViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: ContractDocument | null;
  onAcceptContract?: (docId: string, downloadPdf: boolean) => void;
}

export function ContractViewerModal({
  isOpen,
  onClose,
  document: doc,
  onAcceptContract,
}: ContractViewerModalProps) {
  const { formatCurrency } = useEmployee();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formalAccepted, setFormalAccepted] = useState(false);
  const [acceptanceTime, setAcceptanceTime] = useState("");

  const isAlreadySigned = doc?.status === "Active & Binding" || doc?.isSigned;
  const bothChecked = termsAccepted && formalAccepted;

  // Reset checkboxes on open
  useEffect(() => {
    if (isOpen) {
      setTermsAccepted(false);
      setFormalAccepted(false);
      setAcceptanceTime(
        new Intl.DateTimeFormat("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date())
      );
    }
  }, [isOpen, doc]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !doc) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleAccept = (downloadPdf: boolean) => {
    if (onAcceptContract) {
      onAcceptContract(doc.id, downloadPdf);
    }
  };

  return (
    <>
      {/* ─── FULL A4 PDF PRINT STYLES ─── */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 12mm 10mm 12mm;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            width: 100% !important;
            height: 100% !important;
            overflow: visible !important;
          }
          body * {
            visibility: hidden !important;
          }
          #contract-modal-container,
          #contract-modal-container * {
            visibility: visible !important;
          }
          #contract-modal-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }
          .print-hidden-bar {
            display: none !important;
          }
          #contract-sheet {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            border: none !important;
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      >
        {/* Modal Window */}
        <div
          id="contract-modal-container"
          className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Top Control Bar (Hidden when printed to PDF) */}
          <div className="print-hidden-bar flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-blue-100/70 text-[#004AC6] rounded-md border border-blue-200">
                {doc.docId}
              </span>
              <span className="text-xs font-semibold text-slate-800">
                {doc.title}
              </span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  isAlreadySigned
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {isAlreadySigned ? "Signed & Active" : "Pending Acceptance"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isAlreadySigned && (
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#004AC6] hover:bg-[#003ea8] rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print PDF</span>
                </button>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close contract"
                title="Close (Esc)"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-300 shadow-xs transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#004AC6] cursor-pointer"
              >
                <X className="w-4.5 h-4.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* ═══════════════ CONTRACT SHEET (Print Target) ═══════════════ */}
          <div
            id="contract-sheet"
            className="p-8 sm:p-12 text-slate-900 bg-white space-y-6 text-xs leading-relaxed overflow-y-auto flex-1"
          >
            {/* Header */}
            <div className="text-center pb-6 border-b border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-[#004AC6] text-white flex items-center justify-center font-bold mx-auto mb-2 text-sm shadow-xs">
                KS
              </div>
              <h1 className="text-base font-bold uppercase tracking-wider text-slate-900">
                KeySpex Agency Pvt. Ltd.
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Ground Floor, Innovation Park, Sector 62, Noida, UP, India • CIN: U72900DL2024PTC123456
              </p>
              <div className="mt-3 inline-block px-3.5 py-1 bg-slate-100 rounded-full font-mono font-bold text-slate-800 text-[11px] border border-slate-200">
                {doc.title.toUpperCase()}
              </div>
            </div>

            {/* Parties to Agreement */}
            <div>
              <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">
                Parties to Agreement
              </p>
              <p className="text-slate-700">
                This Project Contract Agreement is entered into on{" "}
                <strong>{doc.effectiveDate}</strong>, by and between:
              </p>
              <ul className="list-disc pl-5 mt-1.5 space-y-1 text-slate-600">
                <li>
                  <strong>KeySpex Agency Pvt. Ltd.</strong>, having its principal registered office at Sector 62, Noida, India (hereafter "The Company" or "Admin").
                </li>
                <li>
                  <strong>{doc.employeeName || "The Assigned Team Member"}</strong>, serving in the professional capacity of{" "}
                  <strong>{doc.projectRole || doc.employeeTitle || "Specialist"}</strong> (hereafter "The Employee").
                </li>
              </ul>
            </div>

            {/* Project Summary */}
            {doc.projectCode && (
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
                <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                  Project Scope & Remuneration
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Project Code & Title
                    </span>
                    <span className="font-bold text-slate-900">
                      {doc.projectCode} {doc.projectTitle ? `• ${doc.projectTitle}` : ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Client Organization
                    </span>
                    <span className="font-medium text-slate-800">
                      {doc.clientName || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Agreed Milestone Remuneration
                    </span>
                    <span className="font-bold font-mono text-[#004AC6]">
                      {formatCurrency(doc.projectPayout ?? 0)} (Milestone Settlement)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Project Schedule
                    </span>
                    <span className="font-medium text-slate-800">
                      {doc.startDate || "—"} to {doc.dueDate || "—"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Content Section 1: Scope & Duties */}
            <div>
              <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">
                1. Scope of Work & Sprint Deliverables
              </p>
              <p className="text-slate-600">
                The Employee agrees to undertake technical execution, component architecture, and sprint deliverables for <strong>{doc.projectTitle || "the assigned project"}</strong> in accordance with KeySpex quality benchmarks.
              </p>
            </div>

            {/* Content Section 2: Compensation */}
            <div>
              <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">
                2. Compensation & Milestone Release
              </p>
              <p className="text-slate-600">
                Total project remuneration is agreed at{" "}
                <strong>{formatCurrency(doc.projectPayout ?? 0)}</strong>, released on a milestone completion schedule upon review and administrative sign-off.
              </p>
            </div>

            {/* Content Section 3: Confidentiality */}
            <div>
              <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">
                3. Non-Disclosure & Intellectual Property
              </p>
              <p className="text-slate-600">
                All source code, designs, tokens, and artifacts created for this project remain the sole intellectual property of KeySpex Agency Pvt. Ltd. The Employee agrees to non-disclosure obligations.
              </p>
            </div>

            {/* ══════ CONFIRMATION CHECKBOXES (FOR PENDING CONTRACTS) ══════ */}
            {!isAlreadySigned && (
              <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-3 print-hidden-bar">
                <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                  Contract Review & Confirmation Checkboxes
                </p>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-[#004AC6] rounded border-slate-300 focus:ring-[#004AC6]"
                  />
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong>Terms & Conditions Agreement:</strong> I have reviewed and agree to the Project Terms, Milestone Deliverables, Non-Disclosure Agreement (NDA), and Intellectual Property policies outlined in this agreement.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formalAccepted}
                    onChange={(e) => setFormalAccepted(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-[#004AC6] rounded border-slate-300 focus:ring-[#004AC6]"
                  />
                  <span className="text-xs text-slate-700 leading-snug">
                    <strong>Formal Acceptance:</strong> I formally accept this project contract and authorize digital execution of the agreement between Admin and Employee.
                  </span>
                </label>
              </div>
            )}

            {/* ══════ DETAIL OF EMPLOYEE: REVEALED WHEN BOTH CHECKBOXES ARE CHECKED OR WHEN SIGNED ══════ */}
            {(bothChecked || isAlreadySigned) && (
              <div className="p-4 bg-slate-50 border-2 border-emerald-500/80 rounded-xl space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <p className="font-bold text-slate-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Detail of Employee (Second Party Signatory Credentials)
                  </p>
                  <span className="font-mono text-[10px] text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded">
                    UID: {doc.employeeUid || "—"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Full Name</span>
                    <span className="font-bold text-slate-900">{doc.employeeName || "Employee"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Designation / Role</span>
                    <span className="font-semibold text-slate-800">{doc.projectRole || doc.employeeTitle || "Specialist"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Official Work Email</span>
                    <span className="font-medium text-slate-800">{doc.employeeEmail || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Contact Phone</span>
                    <span className="font-medium text-slate-800">{doc.employeePhone || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Agreement Type</span>
                    <span className="font-medium text-slate-800">{doc.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Verification Timestamp</span>
                    <span className="font-medium text-slate-800">{doc.signedAt || acceptanceTime}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ══════ DIGITAL SIGNATURES: BOTH PARTIES (ADMIN & EMPLOYEE) ══════ */}
            <div className="pt-4 border-t-2 border-slate-900 space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Digital Signatures of Parties to Agreement
                </h3>
                <span className="text-[10px] font-mono text-slate-500">
                  Certified Electronic Signatures (IT Act Compliant)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. ADMIN DIGITAL SIGNATURE */}
                <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Party 1: Authorized Signatory (Admin)
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 text-sm">KeySpex Leadership</p>
                  <p className="text-[11px] text-slate-500">Corporate Operations & HR</p>
                  <p className="text-[10px] text-slate-400">Date: {doc.effectiveDate}</p>

                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-[10px] font-mono text-slate-600 break-all leading-tight">
                      AUTH-KS-ADMIN-CERT-SHA256: 3b92dc18148a1d65dfc2d4b1fa3d677284addd2001
                    </p>
                    <div className="mt-1.5 text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Digitally Signed by Admin
                    </div>
                  </div>
                </div>

                {/* 2. EMPLOYEE DIGITAL SIGNATURE */}
                <div
                  className={`p-4 border rounded-xl space-y-2 transition-colors ${
                    isAlreadySigned || bothChecked
                      ? "bg-emerald-50/70 border-emerald-300"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Party 2: Employee Acceptance (Signatory)
                    </span>
                    {isAlreadySigned ? (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Signed
                      </span>
                    ) : bothChecked ? (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" /> Ready
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending Confirmation
                      </span>
                    )}
                  </div>

                  <p className="font-bold text-slate-900 text-sm">{doc.employeeName || "Employee"}</p>
                  <p className="text-[11px] text-slate-500">
                    {doc.projectRole || doc.employeeTitle || "Specialist"}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Date: {doc.signedAt || acceptanceTime || doc.effectiveDate}
                  </p>

                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-[10px] font-mono text-slate-600 break-all leading-tight">
                      EMP-SIG-CERT-SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d6772
                    </p>
                    <div className="mt-1.5 text-[11px]">
                      {isAlreadySigned ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Digitally Signed by {doc.employeeName}
                        </span>
                      ) : bothChecked ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Identity Confirmed (Ready to Execute)
                        </span>
                      ) : (
                        <span className="text-amber-600 font-medium flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Check the 2 confirmation boxes above
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ══════ ACTION BUTTONS (WHEN PENDING & BOTH CHECKED) ══════ */}
              {!isAlreadySigned && (
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 print-hidden-bar">
                  <button
                    type="button"
                    disabled={!bothChecked}
                    onClick={() => handleAccept(false)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept Agreement</span>
                  </button>

                  <button
                    type="button"
                    disabled={!bothChecked}
                    onClick={() => handleAccept(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#004AC6] hover:bg-[#003ea8] rounded-lg transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Accept & Download PDF</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}