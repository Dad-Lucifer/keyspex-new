"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Tag,
} from "lucide-react";
import { createCalendarEvent, CalendarEventItem } from "@/lib/api";

type EventTag =
  | "Project Deadline"
  | "Operations"
  | "Financial"
  | "Client Meeting"
  | "HR"
  | "Review";

interface CreateCalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: (event: CalendarEventItem) => void;
  defaultDate?: string;
}

const TAG_OPTIONS: { id: EventTag; label: string; color: string }[] = [
  { id: "Project Deadline", label: "Project Deadline", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "Client Meeting", label: "Client Meeting", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "Financial", label: "Financial Review", color: "bg-amber-50 text-amber-800 border-amber-200" },
  { id: "Operations", label: "Operations", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { id: "HR", label: "HR & People", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "Review", label: "Sprint / QA Review", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
];

export function CreateCalendarEventModal({
  isOpen,
  onClose,
  onEventCreated,
  defaultDate,
}: CreateCalendarEventModalProps) {
  const [date, setDate] = useState(() => defaultDate || new Date().toISOString().split("T")[0]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("10:30 AM");
  const [context, setContext] = useState("");
  const [tag, setTag] = useState<EventTag>("Client Meeting");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (defaultDate) setDate(defaultDate);
      setTitle("");
      setContext("");
      setTag("Client Meeting");
      setSuccess(false);
      setErrorMessage(null);
    }
  }, [isOpen, defaultDate]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim() || title.trim().length < 2) {
      setErrorMessage("Event title must be at least 2 characters.");
      return;
    }

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setErrorMessage("Please enter a valid date (YYYY-MM-DD).");
      return;
    }

    if (!time.trim() || !/^\d{1,2}:\d{2}\s?(AM|PM)$/i.test(time.trim())) {
      setErrorMessage("Time must be formatted like '10:30 AM' or '02:00 PM'.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await createCalendarEvent({
        date,
        title: title.trim(),
        time: time.trim().toUpperCase(),
        context: context.trim() || "Virtual Conference Room",
        tag,
      });

      const created = res.data?.event || {
        id: `evt-${Date.now()}`,
        date,
        title: title.trim(),
        time: time.trim().toUpperCase(),
        context: context.trim() || "Virtual Conference Room",
        tag,
      };

      setSuccess(true);
      onEventCreated(created);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create calendar event.";
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9] bg-gradient-to-r from-blue-50/50 via-white to-purple-50/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
              <Calendar size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-base text-[#0f172a]">
                  Schedule New Event
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100/70 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#2563eb]">
                  <Sparkles size={11} /> Calendar
                </span>
              </div>
              <p className="text-xs text-[#64748b]">
                Add meeting, sprint review, or client check-in
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
                Event Scheduled!
              </h4>
              <p className="text-xs text-[#64748b] mt-1">
                &apos;{title}&apos; has been added to the calendar for {date} at {time}.
              </p>
            </div>
          ) : (
            <form id="create-event-form" onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-600" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Event Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sprint 15 Milestone Review & UAT Demo"
                  className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                />
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                    Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                    Time (e.g. 10:30 AM) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="10:30 AM"
                      className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 font-medium"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#64748b]">
                      <Clock size={15} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Context / Location */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Context / Project / Location <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. PRJ-3001 • Google Meet / Conference Room A"
                  className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Tag / Category */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1.5 flex items-center gap-1">
                  <Tag size={12} className="text-[#64748b]" /> Event Classification
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TAG_OPTIONS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTag(t.id)}
                      className={`rounded-xl border px-2.5 py-2 text-[11px] font-semibold text-center transition-all ${
                        tag === t.id
                          ? `${t.color} ring-2 ring-blue-500/30 border-transparent shadow-xs font-bold`
                          : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                      }`}
                    >
                      {t.label}
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
              form="create-event-form"
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1d4ed8] focus:ring-2 focus:ring-blue-400"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Saving Event...</span>
                </>
              ) : (
                <>
                  <Calendar size={14} />
                  <span>Save Event</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

