"use client";

import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, ArrowUpRight, Loader2 } from "lucide-react";
import { getCalendarEvents, CalendarEventItem } from "@/lib/api";

const DEFAULT_EVENTS = [
  {
    id: "evt-1",
    month: "OCT",
    day: "29",
    title: "Sprint 14 Milestone Review",
    time: "10:30 AM",
    context: "PRJ-3001 (Cloud Migration)",
    tag: "Project Deadline",
    tagColor: "bg-blue-100 text-blue-800",
    dateColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "evt-2",
    month: "OCT",
    day: "31",
    title: "Monthly Payroll Reconciliation",
    time: "04:00 PM",
    context: "Finance & HR Core Team",
    tag: "Operations",
    tagColor: "bg-sky-100 text-sky-800",
    dateColor: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    id: "evt-3",
    month: "NOV",
    day: "02",
    title: "Executive Q4 Budget Review",
    time: "02:00 PM",
    context: "Leadership Council Room",
    tag: "Financial",
    tagColor: "bg-amber-100 text-amber-800",
    dateColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "evt-4",
    month: "NOV",
    day: "04",
    title: "Client Sync: Apex Global",
    time: "11:00 AM",
    context: "CLI-2001 (Google Meet)",
    tag: "Client Meeting",
    tagColor: "bg-purple-100 text-purple-800",
    dateColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

export function UpcomingEvents() {
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getCalendarEvents(true)
      .then((data: CalendarEventItem[]) => {
        if (isMounted && data && data.length > 0) {
          const mapped = data.map((ev) => {
            const dateObj = new Date(ev.date);
            const month = !isNaN(dateObj.getTime())
              ? dateObj.toLocaleString("en-IN", { month: "short" }).toUpperCase()
              : "OCT";
            const day = !isNaN(dateObj.getTime())
              ? String(dateObj.getDate()).padStart(2, "0")
              : "01";

            let tagColor = "bg-blue-100 text-blue-800";
            let dateColor = "bg-blue-50 text-blue-700 border-blue-200";

            if (ev.tag === "Operations") {
              tagColor = "bg-sky-100 text-sky-800";
              dateColor = "bg-sky-50 text-sky-700 border-sky-200";
            } else if (ev.tag === "Financial") {
              tagColor = "bg-amber-100 text-amber-800";
              dateColor = "bg-amber-50 text-amber-700 border-amber-200";
            } else if (ev.tag === "Client Meeting") {
              tagColor = "bg-purple-100 text-purple-800";
              dateColor = "bg-purple-50 text-purple-700 border-purple-200";
            } else if (ev.tag === "HR") {
              tagColor = "bg-emerald-100 text-emerald-800";
              dateColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
            } else if (ev.tag === "Review") {
              tagColor = "bg-indigo-100 text-indigo-800";
              dateColor = "bg-indigo-50 text-indigo-700 border-indigo-200";
            }

            return {
              id: ev.id,
              month,
              day,
              title: ev.title,
              time: ev.time,
              context: ev.context,
              tag: ev.tag,
              tagColor,
              dateColor,
            };
          });

          setEvents(mapped);
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
      <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline text-base sm:text-lg font-bold text-[#0f172a]">
              Upcoming Events
            </h3>
            {isLoading && <Loader2 size={13} className="animate-spin text-blue-500" />}
          </div>
          <p className="mt-0.5 text-xs text-[#64748b]">
            Schedules, reviews, and client syncs
          </p>
        </div>

        <button
          type="button"
          aria-label="Add event"
          className="rounded-lg p-1.5 text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
        >
          <CalendarIcon size={16} />
        </button>
      </div>

      {/* Events List */}
      <div className="my-3 divide-y divide-[#f8fafc]">
        {events.map((ev) => (
          <div key={ev.id} className="flex items-start justify-between py-2.5">
            <div className="flex items-start gap-3">
              {/* Date Block */}
              <div
                className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl border text-center font-mono leading-none ${ev.dateColor}`}
              >
                <span className="text-[9px] font-bold uppercase">{ev.month}</span>
                <span className="text-sm font-black">{ev.day}</span>
              </div>

              {/* Title & Context */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-bold text-[#0f172a] hover:text-[#2563eb] transition-colors cursor-pointer">
                    {ev.title}
                  </p>
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold ${ev.tagColor}`}
                  >
                    {ev.tag}
                  </span>
                </div>

                <p className="mt-1 flex items-center gap-1 font-mono text-[10px] text-[#64748b]">
                  <Clock size={11} className="text-[#94a3b8]" />
                  <span>{ev.time}</span>
                  <span className="text-[#cbd5e1]">•</span>
                  <span className="truncate max-w-[170px] sm:max-w-[210px]">
                    {ev.context}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9] text-xs">
        <span className="font-mono text-[#64748b]">
          {events.length} meeting{events.length !== 1 ? "s" : ""} queued this cycle
        </span>

        <button
          type="button"
          className="flex items-center gap-1 font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
        >
          <span>Open Full Calendar</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
