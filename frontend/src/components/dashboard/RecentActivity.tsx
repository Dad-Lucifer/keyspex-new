"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Bot, Loader2 } from "lucide-react";
import { getAuditLog, AuditLogItem } from "@/lib/api";

const DEFAULT_ACTIVITIES = [
  {
    id: "ACT-1",
    actor: {
      name: "Alex Rivera",
      role: "Super Admin",
      avatar: "AR",
      bg: "bg-[#2563eb] text-white",
    },
    action: "Created Contract CON-5001",
    target: "Apex Global (CLI-2001)",
    time: "10m ago",
    status: "Completed",
    statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500",
  },
  {
    id: "ACT-2",
    actor: {
      name: "Riya Sharma",
      role: "HR Operations",
      avatar: "RS",
      bg: "bg-purple-600 text-white",
    },
    action: "Approved Salary Slip for EMP-1004",
    target: "DevOps Lead • Nov Run",
    time: "1h ago",
    status: "Verified",
    statusBadge: "bg-blue-50 text-blue-700 border-blue-200",
    dotColor: "bg-blue-500",
  },
  {
    id: "ACT-3",
    actor: {
      name: "Finance Bot",
      role: "Automated Job",
      avatar: "BOT",
      bg: "bg-slate-700 text-white",
    },
    action: "Recorded Inward Payment PAY-6001",
    target: "₹85,000 from Nexa Systems",
    time: "3h ago",
    status: "Reconciled",
    statusBadge: "bg-teal-50 text-teal-700 border-teal-200",
    dotColor: "bg-teal-500",
  },
  {
    id: "ACT-4",
    actor: {
      name: "Marcus Vance",
      role: "Project Lead",
      avatar: "MV",
      bg: "bg-amber-600 text-white",
    },
    action: "Reassigned Task TSK-4012",
    target: "Fintech Banking UI (PRJ-3002)",
    time: "5h ago",
    status: "Updated",
    statusBadge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dotColor: "bg-indigo-500",
  },
];

function formatRelativeTime(time: { _seconds: number } | string | undefined): string {
  if (!time) return "just now";
  let epochMs = Date.now();
  if (typeof time === "object" && "_seconds" in time) {
    epochMs = time._seconds * 1000;
  } else if (typeof time === "string") {
    const parsed = Date.parse(time);
    if (!isNaN(parsed)) epochMs = parsed;
  }

  const diffSec = Math.floor((Date.now() - epochMs) / 1000);
  if (diffSec < 60) return "just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
}

export function RecentActivity() {
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getAuditLog(10)
      .then((data: AuditLogItem[]) => {
        if (isMounted && data && data.length > 0) {
          const mapped = data.map((act) => {
            const isBot =
              act.actor.name.toLowerCase().includes("bot") ||
              act.actor.role === "system";

            let bg = "bg-[#2563eb] text-white";
            if (isBot) bg = "bg-slate-700 text-white";
            else if (act.actor.role.toLowerCase().includes("hr") || act.actor.name.includes("Riya"))
              bg = "bg-purple-600 text-white";
            else if (act.actor.role.toLowerCase().includes("lead") || act.actor.name.includes("Marcus"))
              bg = "bg-amber-600 text-white";

            let statusBadge = "bg-emerald-50 text-emerald-700 border-emerald-200";
            let dotColor = "bg-emerald-500";

            if (act.status === "Verified") {
              statusBadge = "bg-blue-50 text-blue-700 border-blue-200";
              dotColor = "bg-blue-500";
            } else if (act.status === "Reconciled") {
              statusBadge = "bg-teal-50 text-teal-700 border-teal-200";
              dotColor = "bg-teal-500";
            } else if (act.status === "Updated") {
              statusBadge = "bg-indigo-50 text-indigo-700 border-indigo-200";
              dotColor = "bg-indigo-500";
            } else if (act.status === "Failed") {
              statusBadge = "bg-red-50 text-red-700 border-red-200";
              dotColor = "bg-red-500";
            }

            return {
              id: act.id,
              actor: {
                name: act.actor.name,
                role: act.actor.role,
                avatar: isBot ? "BOT" : act.actor.initials || "U",
                bg,
              },
              action: act.action,
              target: act.target,
              time: formatRelativeTime(act.time as any),
              status: act.status,
              statusBadge,
              dotColor,
            };
          });

          setActivities(mapped);
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

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-2">
          <h3 className="font-headline text-base sm:text-lg font-bold text-[#0f172a]">
            Recent Activity
          </h3>
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          {isLoading && <Loader2 size={13} className="animate-spin text-blue-500" />}
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
        >
          <span>Full Audit Log</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#f1f5f9] font-mono text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
              <th className="py-3 px-2">Actor</th>
              <th className="py-3 px-2">Action & Target</th>
              <th className="py-3 px-2">Time</th>
              <th className="py-3 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f8fafc]">
            {activities.map((act) => (
              <tr key={act.id} className="hover:bg-[#f8fafc] transition-colors">
                {/* Actor */}
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold shadow-2xs ${act.actor.bg}`}
                    >
                      {act.actor.avatar === "BOT" ? (
                        <Bot size={14} />
                      ) : (
                        act.actor.avatar
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0f172a]">{act.actor.name}</p>
                      <p className="font-mono text-[10px] text-[#64748b]">
                        {act.actor.role}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Action & Target */}
                <td className="py-3 px-2">
                  <p className="font-medium text-[#0f172a]">{act.action}</p>
                  <p className="font-mono text-[10px] text-[#64748b]">{act.target}</p>
                </td>

                {/* Time */}
                <td className="py-3 px-2 font-mono text-[11px] text-[#64748b] whitespace-nowrap">
                  {act.time}
                </td>

                {/* Status Badge */}
                <td className="py-3 px-2 text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold ${act.statusBadge}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${act.dotColor}`} />
                    {act.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
