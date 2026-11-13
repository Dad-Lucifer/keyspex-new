"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Plus,
  Wallet,
  Building,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Check,
  X,
  ArrowUpRight,
  Loader2,
  Tag,
} from "lucide-react";
import {
  CalendarEventItem,
  ObligationItem,
  getCalendarEvents,
  getObligations,
  deleteCalendarEvent,
  updateObligation,
  deleteObligation,
} from "@/lib/api";
import { CreateCalendarEventModal } from "./CreateCalendarEventModal";
import { CreateObligationModal } from "./CreateObligationModal";

interface EventCalendarViewProps {
  currency: "INR" | "USD" | "EUR";
  onBackToDashboard: () => void;
  initialFilter?: "all" | "events" | "obligations";
}

export function EventCalendarView({
  currency,
  onBackToDashboard,
  initialFilter = "all",
}: EventCalendarViewProps) {
  // Active calendar month view
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });

  // Data state
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [obligations, setObligations] = useState<ObligationItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters & Views
  const [activeFilter, setActiveFilter] = useState<"all" | "events" | "obligations">(initialFilter);
  const [viewMode, setViewMode] = useState<"month" | "agenda">("month");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isObligationModalOpen, setIsObligationModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "event" | "obligation";
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((c) => (c?.message === message ? null : c));
    }, 4000);
  };

  // Money Formatter
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

  // Load backend data
  const loadCalendarData = async () => {
    setLoading(true);
    try {
      const [fetchedEvents, fetchedObligations] = await Promise.all([
        getCalendarEvents(false).catch(() => null),
        getObligations(false).catch(() => null),
      ]);

      if (fetchedEvents && fetchedEvents.length > 0) {
        setEvents(fetchedEvents);
      } else {
        setEvents([]);
      }

      if (fetchedObligations && fetchedObligations.length > 0) {
        setObligations(fetchedObligations);
      } else {
        setObligations([]);
      }
    } catch {
      setEvents([]);
      setObligations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalendarData();
  }, []);

  // Month navigation helpers
  const handlePrevMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDateStr(today.toISOString().split("T")[0]);
  };

  const monthYearTitle = useMemo(() => {
    return currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });
  }, [currentDate]);

  // Calendar Grid Days Calculation
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: {
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
    }[] = [];

    const todayStr = new Date().toISOString().split("T")[0];

    // Leading days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevDate = new Date(year, month - 1, day);
      const y = prevDate.getFullYear();
      const m = String(prevDate.getMonth() + 1).padStart(2, "0");
      const d = String(day).padStart(2, "0");
      const dateStr = `${y}-${m}-${d}`;
      cells.push({
        dateStr,
        dayNumber: day,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
      });
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const m = String(month + 1).padStart(2, "0");
      const d = String(day).padStart(2, "0");
      const dateStr = `${year}-${m}-${d}`;
      cells.push({
        dateStr,
        dayNumber: day,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
      });
    }

    // Trailing days from next month to fill grid (multiple of 7)
    const totalRemaining = 42 - cells.length; // 6 rows * 7 columns
    for (let day = 1; day <= totalRemaining; day++) {
      const nextDate = new Date(year, month + 1, day);
      const y = nextDate.getFullYear();
      const m = String(nextDate.getMonth() + 1).padStart(2, "0");
      const d = String(day).padStart(2, "0");
      const dateStr = `${y}-${m}-${d}`;
      cells.push({
        dateStr,
        dayNumber: day,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
      });
    }

    return cells;
  }, [currentDate]);

  // Aggregate items by date map for instant lookup
  const itemsByDate = useMemo(() => {
    const map = new Map<string, { events: CalendarEventItem[]; obligations: ObligationItem[] }>();

    events.forEach((ev) => {
      const current = map.get(ev.date) || { events: [], obligations: [] };
      current.events.push(ev);
      map.set(ev.date, current);
    });

    obligations.forEach((obl) => {
      const current = map.get(obl.dueDate) || { events: [], obligations: [] };
      current.obligations.push(obl);
      map.set(obl.dueDate, current);
    });

    return map;
  }, [events, obligations]);

  // Items for Selected Date
  const selectedDayItems = useMemo(() => {
    const dayData = itemsByDate.get(selectedDateStr) || { events: [], obligations: [] };
    return dayData;
  }, [itemsByDate, selectedDateStr]);

  // KPI Metrics
  const kpis = useMemo(() => {
    const totalEvents = events.length;
    const totalObligations = obligations.length;
    const totalPipelineAmount = obligations.reduce((acc, o) => acc + (o.amount || 0), 0);
    const todayStr = new Date().toISOString().split("T")[0];
    const todayData = itemsByDate.get(todayStr) || { events: [], obligations: [] };
    const todayItemsCount = todayData.events.length + todayData.obligations.length;

    return {
      totalEvents,
      totalObligations,
      totalPipelineAmount,
      todayItemsCount,
    };
  }, [events, obligations, itemsByDate]);

  // Chronological Agenda Items List
  const allAgendaItems = useMemo(() => {
    type UnifiedItem =
      | { type: "event"; data: CalendarEventItem; sortDate: string }
      | { type: "obligation"; data: ObligationItem; sortDate: string };

    const list: UnifiedItem[] = [];

    if (activeFilter === "all" || activeFilter === "events") {
      events.forEach((ev) => {
        if (!searchQuery || ev.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          list.push({ type: "event", data: ev, sortDate: ev.date });
        }
      });
    }

    if (activeFilter === "all" || activeFilter === "obligations") {
      obligations.forEach((obl) => {
        if (
          !searchQuery ||
          obl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          obl.account.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          list.push({ type: "obligation", data: obl, sortDate: obl.dueDate });
        }
      });
    }

    return list.sort((a, b) => (a.sortDate < b.sortDate ? -1 : 1));
  }, [events, obligations, activeFilter, searchQuery]);

  // Delete handler
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      if (deleteTarget.type === "event") {
        await deleteCalendarEvent(deleteTarget.id);
        setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id));
        showNotification("success", `Deleted event "${deleteTarget.title}"`);
      } else {
        await deleteObligation(deleteTarget.id);
        setObligations((prev) => prev.filter((o) => o.id !== deleteTarget.id));
        showNotification("success", `Deleted obligation "${deleteTarget.title}"`);
      }
      setDeleteTarget(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete item.";
      showNotification("error", msg);
    } finally {
      setIsDeleting(false);
    }
  };

  // Mark Obligation as Paid
  const handleMarkPaid = async (oblId: string) => {
    try {
      await updateObligation(oblId, { status: "paid" });
      setObligations((prev) =>
        prev.map((o) => (o.id === oblId ? { ...o, status: "paid" } : o))
      );
      showNotification("success", "Obligation marked as Paid & Settled.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update obligation status.";
      showNotification("error", msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold shadow-md transition-all ${
            notification.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Top Breadcrumb & Executive Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#0f172a] transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2.5">
            <h1 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a]">
              Event &amp; Obligation Calendar
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#2563eb]">
              <Sparkles size={11} /> Unified Schedule
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#64748b]">
            Central calendar linking operational meetings, sprint deadlines, and upcoming financial payout obligations.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadCalendarData}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] shadow-2xs transition-colors disabled:opacity-50"
            title="Refresh schedule"
          >
            <RefreshCw
              size={14}
              className={loading ? "animate-spin text-blue-600" : "text-[#64748b]"}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* + New Event Button */}
          <button
            type="button"
            onClick={() => setIsEventModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1d4ed8] focus:ring-2 focus:ring-blue-400 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>+ Event</span>
          </button>

          {/* + New Obligation Button */}
          <button
            type="button"
            onClick={() => setIsObligationModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-700 focus:ring-2 focus:ring-amber-400 transition-all cursor-pointer"
          >
            <Wallet size={15} />
            <span>+ Obligation</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Events */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-[#64748b] text-xs font-semibold">
            <span>Scheduled Events</span>
            <CalendarIcon size={16} className="text-blue-600" />
          </div>
          <div className="mt-1 text-2xl font-bold text-[#0f172a] font-mono">
            {kpis.totalEvents}
          </div>
          <div className="mt-0.5 text-[11px] text-[#64748b]">
            Meetings, sprint reviews &amp; client syncs
          </div>
        </div>

        {/* Total Obligations */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-amber-900 text-xs font-bold">
            <span>Pending Obligations</span>
            <Wallet size={16} className="text-amber-600" />
          </div>
          <div className="mt-1 text-2xl font-bold text-amber-800 font-mono">
            {kpis.totalObligations}
          </div>
          <div className="mt-0.5 text-[11px] text-amber-800">
            Imminent payouts &amp; vendor renewals
          </div>
        </div>

        {/* Total Pipeline Outflow */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-blue-900 text-xs font-bold">
            <span>Total Outflow (Next 14d)</span>
            <ArrowUpRight size={16} className="text-blue-600" />
          </div>
          <div className="mt-1 text-2xl font-bold text-blue-800 font-mono">
            {formatMoney(kpis.totalPipelineAmount)}
          </div>
          <div className="mt-0.5 text-[11px] text-blue-700">
            Pipeline committed expenditures
          </div>
        </div>

        {/* Today's Agenda */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-900 text-xs font-bold">
            <span>Today&apos;s Agenda</span>
            <Clock size={16} className="text-emerald-600" />
          </div>
          <div className="mt-1 text-2xl font-bold text-emerald-800 font-mono">
            {kpis.todayItemsCount} item{kpis.todayItemsCount !== 1 ? "s" : ""}
          </div>
          <div className="mt-0.5 text-[11px] text-emerald-800">
            Due or happening today
          </div>
        </div>
      </div>

      {/* Calendar Controls & Month Switcher Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-2xl border border-[#e2e8f0] bg-white p-3 shadow-2xs">
        {/* Month Navigation */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-0.5">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 text-[#64748b] hover:text-[#0f172a] hover:bg-white rounded-lg transition-all"
              title="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="px-2.5 py-1 text-xs font-semibold text-[#0f172a] hover:bg-white rounded-lg transition-all"
            >
              Today
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 text-[#64748b] hover:text-[#0f172a] hover:bg-white rounded-lg transition-all"
              title="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <h2 className="font-headline font-bold text-base text-[#0f172a] ml-1">
            {monthYearTitle}
          </h2>
        </div>

        {/* Filters & View Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter Pills */}
          <div className="flex items-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeFilter === "all"
                  ? "bg-white text-[#2563eb] shadow-2xs font-bold"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              All Schedule
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("events")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeFilter === "events"
                  ? "bg-blue-50 text-blue-700 shadow-2xs font-bold"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              Events ({events.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("obligations")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeFilter === "obligations"
                  ? "bg-amber-50 text-amber-800 shadow-2xs font-bold"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              Obligations ({obligations.length})
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("month")}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === "month"
                  ? "bg-white text-[#0f172a] shadow-2xs font-bold"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode("agenda")}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                viewMode === "agenda"
                  ? "bg-white text-[#0f172a] shadow-2xs font-bold"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              Agenda
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MAIN CALENDAR VIEW: MONTH GRID OR AGENDA LIST
          ───────────────────────────────────────────────────────────────────────────── */}
      {viewMode === "month" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 8-col: 7x6 Interactive Calendar Grid */}
          <div className="lg:col-span-8 rounded-2xl border border-[#e2e8f0] bg-white shadow-2xs overflow-hidden">
            {/* Days of week header */}
            <div className="grid grid-cols-7 border-b border-[#e2e8f0] bg-[#f8fafc] text-center font-headline text-[11px] font-bold uppercase tracking-wider text-[#64748b] py-2.5">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* 7x6 Date Cells */}
            <div className="grid grid-cols-7 divide-x divide-y divide-[#f1f5f9]">
              {calendarDays.map((cell, idx) => {
                const dayItems = itemsByDate.get(cell.dateStr) || { events: [], obligations: [] };
                const dayEvents = activeFilter !== "obligations" ? dayItems.events : [];
                const dayObligations = activeFilter !== "events" ? dayItems.obligations : [];
                const totalItems = dayEvents.length + dayObligations.length;
                const isSelected = selectedDateStr === cell.dateStr;

                return (
                  <div
                    key={`${cell.dateStr}-${idx}`}
                    onClick={() => setSelectedDateStr(cell.dateStr)}
                    className={`min-h-[105px] p-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                      !cell.isCurrentMonth ? "bg-[#fcfdfd]/60 opacity-40" : "bg-white"
                    } ${
                      isSelected
                        ? "ring-2 ring-blue-500 bg-blue-50/20 z-10"
                        : "hover:bg-[#f8fafc]"
                    }`}
                  >
                    {/* Top Date Header */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-bold flex items-center justify-center h-6 w-6 rounded-full ${
                          cell.isToday
                            ? "bg-[#2563eb] text-white shadow-sm"
                            : isSelected
                            ? "bg-blue-100 text-blue-800"
                            : "text-[#334155]"
                        }`}
                      >
                        {cell.dayNumber}
                      </span>

                      {totalItems > 0 && (
                        <span className="font-mono text-[9px] font-semibold text-[#94a3b8]">
                          {totalItems}
                        </span>
                      )}
                    </div>

                    {/* Day Content Badges */}
                    <div className="mt-1 space-y-1 overflow-hidden flex-1">
                      {/* Events */}
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className="truncate rounded px-1.5 py-0.5 font-mono text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-100"
                          title={`${ev.time} - ${ev.title}`}
                        >
                          <span className="opacity-70">{ev.time}</span> {ev.title}
                        </div>
                      ))}

                      {/* Obligations */}
                      {dayObligations.slice(0, 2).map((obl) => (
                        <div
                          key={obl.id}
                          className="truncate rounded px-1.5 py-0.5 font-mono text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200"
                          title={`Obligation: ${formatMoney(obl.amount)} - ${obl.title}`}
                        >
                          <span>{formatMoney(obl.amount)}</span> {obl.title}
                        </div>
                      ))}

                      {/* +X More tag */}
                      {totalItems > 2 && (
                        <div className="text-[9px] font-mono text-[#94a3b8] px-1 font-semibold">
                          +{totalItems - 2} more...
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 4-col: Selected Day Inspector & Details Panel */}
          <div className="lg:col-span-4 rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-2xs space-y-5">
            {/* Day Header */}
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#94a3b8]">
                  Day Inspector
                </span>
                <h3 className="font-headline font-bold text-base text-[#0f172a]">
                  {new Date(selectedDateStr + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(true)}
                  className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200"
                  title="Add Event on this date"
                >
                  <Plus size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsObligationModalOpen(true)}
                  className="rounded-lg p-1.5 text-amber-700 hover:bg-amber-50 border border-amber-200"
                  title="Add Obligation on this date"
                >
                  <Wallet size={14} />
                </button>
              </div>
            </div>

            {/* Scheduled Events on this day */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0f172a]">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon size={14} className="text-blue-600" />
                  <span>Upcoming Events ({selectedDayItems.events.length})</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(true)}
                  className="text-[11px] font-semibold text-[#2563eb] hover:underline"
                >
                  + Add Event
                </button>
              </div>

              {selectedDayItems.events.length === 0 ? (
                <div className="py-4 text-center text-xs text-[#94a3b8] rounded-xl border border-dashed border-[#e2e8f0]">
                  No meetings or reviews scheduled
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedDayItems.events.map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3 text-xs space-y-1 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-[#2563eb] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                          {ev.time}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({ type: "event", id: ev.id, title: ev.title })
                          }
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="font-bold text-[#0f172a]">{ev.title}</div>
                      <div className="text-[11px] text-[#64748b] flex items-center justify-between">
                        <span>{ev.context}</span>
                        <span className="font-mono text-[9px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {ev.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Financial Obligations on this day */}
            <div className="space-y-2 pt-2 border-t border-[#f1f5f9]">
              <div className="flex items-center justify-between text-xs font-bold text-[#0f172a]">
                <span className="flex items-center gap-1.5">
                  <Wallet size={14} className="text-amber-600" />
                  <span>Financial Obligations ({selectedDayItems.obligations.length})</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsObligationModalOpen(true)}
                  className="text-[11px] font-semibold text-amber-700 hover:underline"
                >
                  + Add Obligation
                </button>
              </div>

              {selectedDayItems.obligations.length === 0 ? (
                <div className="py-4 text-center text-xs text-[#94a3b8] rounded-xl border border-dashed border-[#e2e8f0]">
                  No financial payouts due on this date
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedDayItems.obligations.map((obl) => (
                    <div
                      key={obl.id}
                      className="rounded-xl border border-amber-200/80 bg-amber-50/30 p-3 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-sm text-[#0f172a]">
                          {formatMoney(obl.amount)}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase ${
                            obl.status === "overdue"
                              ? "bg-rose-100 text-rose-800"
                              : obl.status === "paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : obl.status === "pending-auth"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-sky-100 text-sky-800"
                          }`}
                        >
                          {obl.status}
                        </span>
                      </div>

                      <div className="font-semibold text-[#0f172a]">{obl.title}</div>
                      <div className="text-[11px] text-[#64748b] font-mono">{obl.account}</div>

                      <div className="flex items-center justify-between pt-1 border-t border-amber-100/70 text-[11px]">
                        {obl.status !== "paid" ? (
                          <button
                            type="button"
                            onClick={() => handleMarkPaid(obl.id)}
                            className="text-emerald-700 hover:text-emerald-900 font-semibold"
                          >
                            ✓ Mark as Paid
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-semibold">✓ Paid</span>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({ type: "obligation", id: obl.id, title: obl.title })
                          }
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────────────────────
            AGENDA / LIST VIEW
            ───────────────────────────────────────────────────────────────────────────── */
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
            <h3 className="font-headline font-bold text-base text-[#0f172a]">
              Chronological Schedule &amp; Deliverables
            </h3>
            <span className="font-mono text-xs text-[#64748b]">
              {allAgendaItems.length} items queued
            </span>
          </div>

          {allAgendaItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#94a3b8]">
              No events or obligations matching your filter.
            </div>
          ) : (
            <div className="divide-y divide-[#f1f5f9]">
              {allAgendaItems.map((item, i) => {
                const isEvent = item.type === "event";

                return (
                  <div key={`${item.type}-${i}`} className="py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Date Badge */}
                      <div
                        className={`flex h-11 w-11 flex-col items-center justify-center rounded-xl border text-center font-mono leading-none ${
                          isEvent
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        <span className="text-[9px] font-bold uppercase">
                          {new Date(item.sortDate + "T00:00:00").toLocaleString("en-US", {
                            month: "short",
                          })}
                        </span>
                        <span className="text-sm font-black">
                          {new Date(item.sortDate + "T00:00:00").getDate()}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase ${
                              isEvent
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {isEvent ? "Event" : "Obligation"}
                          </span>
                          <h4 className="font-bold text-xs text-[#0f172a]">
                            {item.data.title}
                          </h4>
                        </div>

                        <p className="mt-1 font-mono text-[11px] text-[#64748b] flex items-center gap-2">
                          {isEvent ? (
                            <>
                              <Clock size={12} className="text-[#94a3b8]" />
                              <span>{(item.data as CalendarEventItem).time}</span>
                              <span>•</span>
                              <span>{(item.data as CalendarEventItem).context}</span>
                            </>
                          ) : (
                            <>
                              <Building size={12} className="text-[#94a3b8]" />
                              <span>{(item.data as ObligationItem).account}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Right Block */}
                    <div className="flex items-center gap-3">
                      {!isEvent && (
                        <div className="text-right">
                          <div className="font-mono text-sm font-bold text-[#0f172a]">
                            {formatMoney((item.data as ObligationItem).amount)}
                          </div>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-slate-700">
                            {(item.data as ObligationItem).status}
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: item.type,
                            id: item.data.id,
                            title: item.data.title,
                          })
                        }
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── MODAL: CREATE EVENT ─── */}
      <CreateCalendarEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        defaultDate={selectedDateStr}
        onEventCreated={(newEvent) => {
          setEvents((prev) => [newEvent, ...prev]);
          showNotification("success", `Event "${newEvent.title}" scheduled successfully.`);
        }}
      />

      {/* ─── MODAL: CREATE OBLIGATION ─── */}
      <CreateObligationModal
        isOpen={isObligationModalOpen}
        onClose={() => setIsObligationModalOpen(false)}
        currency={currency}
        defaultDate={selectedDateStr}
        onObligationCreated={(newObl) => {
          setObligations((prev) => [newObl, ...prev]);
          showNotification(
            "success",
            `Obligation "${newObl.title}" (${formatMoney(newObl.amount)}) recorded successfully.`
          );
        }}
      />

      {/* ─── MODAL: DELETE CONFIRMATION ─── */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDeleting) setDeleteTarget(null);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="font-headline font-bold text-sm text-[#0f172a]">
                  Delete {deleteTarget.type === "event" ? "Event" : "Obligation"}?
                </h3>
                <p className="font-mono text-[10px] text-[#64748b]">
                  This item will be permanently removed from your calendar.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#475569] mb-4">
              Are you sure you want to remove{" "}
              <span className="font-bold text-[#0f172a]">&apos;{deleteTarget.title}&apos;</span>?
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="rounded-xl border border-[#cbd5e1] bg-white px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f1f5f9] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 shadow-sm transition-all disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

