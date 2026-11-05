"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getObligations, ObligationItem } from "@/lib/api";

interface UpcomingObligationsProps {
  currency: "INR" | "USD" | "EUR";
}

const DEFAULT_OBLIGATIONS = [
  {
    id: "obl-1",
    month: "OCT",
    day: "28",
    title: "AWS Cloud Infra Renewal",
    account: "Apex Global • CLI-2001",
    amount: 65000,
    badge: "Due in 3 days",
    badgeColor: "bg-amber-100/90 text-amber-800",
    dateColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "obl-2",
    month: "OCT",
    day: "31",
    title: "October Payroll Run",
    account: "Core Team (18 Staff) • Auto-ACH",
    amount: 240000,
    badge: "Scheduled",
    badgeColor: "bg-sky-100 text-sky-800",
    dateColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "obl-3",
    month: "NOV",
    day: "05",
    title: "Milestone 2 Disbursement",
    account: "Nexa Systems • CLI-2002",
    amount: 110000,
    badge: "Pending Auth",
    badgeColor: "bg-purple-100 text-purple-800",
    dateColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "obl-4",
    month: "NOV",
    day: "10",
    title: "SaaS Tooling & Licenses",
    account: "Vertex Labs • CLI-2003",
    amount: 35000,
    badge: "Scheduled",
    badgeColor: "bg-sky-100 text-sky-800",
    dateColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
];

export function UpcomingObligations({ currency }: UpcomingObligationsProps) {
  const [obligations, setObligations] = useState(DEFAULT_OBLIGATIONS);
  const [pipelineTotal, setPipelineTotal] = useState(450000);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getObligations(false)
      .then((data: ObligationItem[]) => {
        if (isMounted && data && data.length > 0) {
          const mapped = data.map((item) => {
            const dateObj = new Date(item.dueDate);
            const month = !isNaN(dateObj.getTime())
              ? dateObj.toLocaleString("en-IN", { month: "short" }).toUpperCase()
              : "OCT";
            const day = !isNaN(dateObj.getTime())
              ? String(dateObj.getDate()).padStart(2, "0")
              : "01";

            let badge = "Scheduled";
            let badgeColor = "bg-sky-100 text-sky-800";
            let dateColor = "bg-blue-50 text-blue-700 border-blue-200";

            if (item.status === "overdue") {
              badge = "Overdue";
              badgeColor = "bg-amber-100/90 text-amber-800";
              dateColor = "bg-amber-50 text-amber-700 border-amber-200";
            } else if (item.status === "pending-auth") {
              badge = "Pending Auth";
              badgeColor = "bg-purple-100 text-purple-800";
              dateColor = "bg-purple-50 text-purple-700 border-purple-200";
            } else if (item.status === "paid") {
              badge = "Paid";
              badgeColor = "bg-emerald-100 text-emerald-800";
              dateColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
            }

            return {
              id: item.id,
              month,
              day,
              title: item.title,
              account: item.account,
              amount: item.amount,
              badge,
              badgeColor,
              dateColor,
            };
          });

          setObligations(mapped);
          const total = data.reduce((sum, o) => sum + (o.amount || 0), 0);
          setPipelineTotal(total);
        }
      })
      .catch(() => {
        // Fallback to default
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline text-base sm:text-lg font-bold text-[#0f172a]">
              Upcoming Obligations
            </h3>
            {isLoading && <Loader2 size={13} className="animate-spin text-blue-500" />}
          </div>
          <p className="mt-0.5 text-xs text-[#64748b]">
            Imminent payouts & disbursements
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
        >
          View All
        </button>
      </div>

      {/* List */}
      <div className="my-3 divide-y divide-[#f8fafc]">
        {obligations.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-3">
              {/* Date Box */}
              <div
                className={`flex h-11 w-11 flex-col items-center justify-center rounded-xl border text-center font-mono leading-none ${item.dateColor}`}
              >
                <span className="text-[9px] font-bold uppercase">{item.month}</span>
                <span className="text-sm font-black">{item.day}</span>
              </div>

              {/* Title & Account */}
              <div>
                <p className="text-xs font-bold text-[#0f172a] hover:text-[#2563eb] transition-colors cursor-pointer">
                  {item.title}
                </p>
                <p className="font-mono text-[10px] text-[#64748b]">
                  {item.account}
                </p>
              </div>
            </div>

            {/* Amount & Status Badge */}
            <div className="text-right">
              <p className="font-mono text-xs font-bold text-[#0f172a]">
                {formatMoney(item.amount)}
              </p>
              <span
                className={`mt-1 inline-block rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold ${item.badgeColor}`}
              >
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Total */}
      <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9] font-mono text-xs">
        <span className="text-[#64748b]">Total Pipeline Outflow (Next 14d)</span>
        <span className="font-bold text-[#0f172a]">
          {formatMoney(pipelineTotal)}
        </span>
      </div>
    </div>
  );
}
