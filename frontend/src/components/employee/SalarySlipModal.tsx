// frontend/src/components/employee/SalarySlipModal.tsx
"use client";

import React, { useEffect } from "react";
import { X, Download, CheckCircle2, Briefcase } from "lucide-react";
import { useEmployee } from "@/context/EmployeeContext";

export interface ProjectSalarySlip {
  id: string;
  slipId: string;
  projectCode: string;
  projectTitle: string;
  clientName: string;
  role: string;
  disbursedDate: string;
  grossSalary: number;
  deductions: number;
  netSalary: number;
  employeeName: string;
  employeeTitle: string;
  milestones: {
    name: string;
    description?: string;
    amount: number;
  }[];
}

interface SalarySlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  slip: ProjectSalarySlip | null;
}

export function SalarySlipModal({ isOpen, onClose, slip }: SalarySlipModalProps) {
  const { formatCurrency, currency } = useEmployee();
  // Allow closing via Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !slip) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* ─── PRINT-SPECIFIC CSS: OCCUPIES 100% OF A4 PDF PAGE ─── */}
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
          #salary-slip-modal-container,
          #salary-slip-modal-container * {
            visibility: visible !important;
          }
          #salary-slip-modal-container {
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
          #salary-slip-sheet {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            border: none !important;
          }
        }
      `}</style>

      {/* Backdrop: Click outside to close */}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      >
        {/* Modal Window: max-w-4xl for comfortable full-screen reading */}
        <div
          id="salary-slip-modal-container"
          className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto"
        >
          {/* Top Control Bar (Hidden when printed to PDF) */}
          <div className="print-hidden-bar flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold px-2.5 py-1 bg-blue-100/70 text-[#004AC6] rounded-md border border-blue-200">
                {slip.slipId}
              </span>
              <span className="text-xs font-semibold text-slate-700">
                • {slip.projectCode} ({slip.projectTitle})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#004AC6] hover:bg-[#003ea8] rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download / Save as PDF</span>
              </button>

              {/* High-visibility Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close salary slip"
                title="Close (Esc)"
                className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-300 shadow-xs transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#004AC6] cursor-pointer"
              >
                <X className="w-4.5 h-4.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* ═══════════════ OFFICIAL PROJECT PAYSLIP SHEET ═══════════════ */}
          <div id="salary-slip-sheet" className="p-8 sm:p-12 text-slate-900 bg-white space-y-6">
            {/* 1. Header with Company Logo & Project Ref */}
            <div className="flex items-start justify-between pb-6 border-b-2 border-slate-900">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-md bg-[#004AC6] flex items-center justify-center text-white text-xs font-bold tracking-wider">
                    KS
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 uppercase">
                    KeySpex Agency Pvt. Ltd.
                  </h1>
                </div>
                <p className="text-xs text-slate-500">
                  Ground Floor, Innovation Park, Sector 62, Noida, UP, India
                </p>
                <p className="text-xs text-slate-500">
                  CIN: U72900DL2024PTC123456 • PAN: AABCK9876Q
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#004AC6] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  PROJECT PAYSLIP
                </span>
                <p className="text-base font-bold text-slate-900 mt-1">{slip.projectCode}</p>
                <p className="text-xs font-mono text-slate-500 mt-0.5">Ref: {slip.slipId}</p>
              </div>
            </div>

            {/* 2. Project & Employee Metadata (No Department) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 py-4 border-b border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Employee Name
                </span>
                <span className="font-bold text-slate-900 text-sm">{slip.employeeName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Project Title
                </span>
                <span className="font-semibold text-slate-800 text-sm">{slip.projectTitle}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Client Organization
                </span>
                <span className="font-semibold text-slate-800 text-sm">{slip.clientName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Role in Project
                </span>
                <span className="font-medium text-slate-800">{slip.role}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Disbursement Date
                </span>
                <span className="font-medium text-slate-800">{slip.disbursedDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Settlement Status
                </span>
                <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Disbursed (NEFT)
                </span>
              </div>
            </div>

            {/* 3. Milestone Deliverables (Earnings) & Deductions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
              {/* Project Milestone Earnings */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 text-[11px] uppercase tracking-wider text-slate-600">
                      <th className="pb-2.5 text-left font-bold">Milestone Deliverable</th>
                      <th className="pb-2.5 text-right font-bold">Amount ({currency})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {slip.milestones.map((m, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 text-slate-700 font-medium">
                          {m.name}
                          {m.description && (
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {m.description}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 text-right font-mono font-semibold align-top">
                          {formatCurrency(m.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-300 font-bold text-slate-900">
                      <td className="pt-3 pb-1">Gross Project Compensation</td>
                      <td className="pt-3 pb-1 text-right font-mono text-sm text-[#004AC6]">
                        {formatCurrency(slip.grossSalary)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Deductions Table */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 text-[11px] uppercase tracking-wider text-slate-600">
                      <th className="pb-2.5 text-left font-bold">Deductions / Withholdings</th>
                      <th className="pb-2.5 text-right font-bold">Amount ({currency})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 text-slate-700 font-medium">Professional Tax (PT)</td>
                      <td className="py-2.5 text-right font-mono font-semibold">
                        {formatCurrency(slip.deductions)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-slate-700 font-medium">TDS / Income Tax</td>
                      <td className="py-2.5 text-right font-mono font-semibold">{formatCurrency(0)}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-slate-400 italic">Platform / Service Fee</td>
                      <td className="py-2.5 text-right font-mono text-slate-400">{formatCurrency(0)}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-300 font-bold text-slate-900">
                      <td className="pt-3 pb-1">Total Deductions</td>
                      <td className="pt-3 pb-1 text-right font-mono text-sm text-slate-900">
                        {formatCurrency(slip.deductions)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* 4. Net Project Compensation Strip */}
            <div className="p-5 bg-gradient-to-r from-blue-50/80 to-slate-50 border-2 border-blue-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[#004AC6] uppercase tracking-wider">
                  Net Disbursed Project Salary
                </p>
                <p className="text-[11px] text-slate-500 italic mt-0.5">
                  Agreed milestone settlement credited to registered employee bank account
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#004AC6]">
                  {formatCurrency(slip.netSalary)}
                </span>
              </div>
            </div>

            {/* 5. Legal Sign-Off Note */}
            <div className="pt-6 border-t border-slate-200 text-center">
              <p className="text-[11px] text-slate-400">
                This document is a computer-generated project salary statement certifying milestone settlement.
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                KeySpex Agency Pvt. Ltd. • All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}