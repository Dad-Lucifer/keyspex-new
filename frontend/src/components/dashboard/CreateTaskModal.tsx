"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckSquare,
  Calendar,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  Flag,
} from "lucide-react";
import { createTask, TaskItem, TaskPriority, TaskStatus } from "@/lib/api";

export interface EmployeeOption {
  uid: string;
  displayName: string;
  email: string;
  roleTitle?: string;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated?: (task: TaskItem) => void;
  employees?: EmployeeOption[];
  defaultStatus?: TaskStatus;
}

// Helper to format date as YYYY-MM-DD
function formatDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
  employees = [],
  defaultStatus = "todo",
}: CreateTaskModalProps) {
  const activeEmployees = employees;

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return formatDate(nextWeek);
  });
  const [assignedUid, setAssignedUid] = useState(
    activeEmployees[0]?.uid || ""
  );
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);

  // Submission & UI status
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initial employee and status when modal opens
  useEffect(() => {
    if (isOpen) {
      if (activeEmployees.length > 0 && !activeEmployees.some((e) => e.uid === assignedUid)) {
        setAssignedUid(activeEmployees[0].uid);
      }
      setStatus(defaultStatus);
      setFormStatus("idle");
      setErrorMessage(null);
    }
  }, [isOpen, defaultStatus, activeEmployees, assignedUid]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && formStatus !== "submitting") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, formStatus, onClose]);

  if (!isOpen) return null;

  const selectedEmployee =
    activeEmployees.find((e) => e.uid === assignedUid) || activeEmployees[0];

  // Quick date selector helpers
  const handleQuickDate = (daysAhead: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysAhead);
    setDueDate(formatDate(target));
  };

  const handleEndOfMonth = () => {
    const target = new Date();
    target.setMonth(target.getMonth() + 1);
    target.setDate(0); // last day of current month
    setDueDate(formatDate(target));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!title.trim() || title.trim().length < 2) {
      setErrorMessage("Task title is required and must be at least 2 characters.");
      setFormStatus("error");
      return;
    }

    if (!dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      setErrorMessage("Please select a valid due date (YYYY-MM-DD).");
      setFormStatus("error");
      return;
    }

    if (!selectedEmployee) {
      setErrorMessage("Please select an employee to assign this task.");
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

    try {
      const response = await createTask({
        title: title.trim(),
        description: description.trim(),
        dueDate,
        assignedTo: selectedEmployee.uid,
        assignedEmployeeName: selectedEmployee.displayName,
        assignedEmployeeEmail: selectedEmployee.email,
        assignedEmployeeRole: selectedEmployee.roleTitle || "Employee",
        priority,
        status,
      });

      const createdTask: TaskItem = response.data?.task || {
        id: `task-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        dueDate,
        assignedTo: selectedEmployee.uid,
        assignedEmployeeName: selectedEmployee.displayName,
        assignedEmployeeEmail: selectedEmployee.email,
        assignedEmployeeRole: selectedEmployee.roleTitle || "Employee",
        priority,
        status,
      };

      setFormStatus("success");
      if (onTaskCreated) {
        onTaskCreated(createdTask);
      }

      // Close modal smoothly after brief celebration
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setFormStatus("idle");
        onClose();
      }, 1100);
    } catch (err: unknown) {
      setFormStatus("error");
      const message = err instanceof Error ? err.message : "Failed to create task. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget && formStatus !== "submitting") {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl border border-[#e2e8f0] bg-white shadow-2xl animate-in zoom-in-95 duration-150 overflow-hidden">
        {/* Modal Top Banner & Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9] bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb] text-white shadow-sm shadow-blue-500/20">
              <CheckSquare size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-base text-[#0f172a]">
                  Create New Task
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100/70 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#2563eb]">
                  <Sparkles size={11} /> Admin Action
                </span>
              </div>
              <p className="text-xs text-[#64748b]">
                Assign deliverable, deadline, and priority to a team member
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={formStatus === "submitting"}
            className="rounded-lg p-1.5 text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto px-6 py-5">
          {formStatus === "success" ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
              <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 border border-emerald-200 shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="font-headline font-bold text-lg text-[#0f172a]">
                Task Created &amp; Assigned!
              </h4>
              <p className="text-xs text-[#64748b] mt-1 max-w-sm">
                <span className="font-semibold text-[#0f172a]">&apos;{title}&apos;</span> has been successfully assigned to{" "}
                <span className="font-semibold text-[#2563eb]">{selectedEmployee?.displayName}</span>.
              </p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                <span>Status: {status.toUpperCase()}</span>
                <span>•</span>
                <span>Due: {dueDate}</span>
              </div>
            </div>
          ) : (
            <form id="create-task-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {errorMessage && (
                <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/90 p-3 text-xs text-rose-800 animate-in fade-in">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-600" />
                  <div className="flex-1">
                    <p className="font-semibold">Creation Failed</p>
                    <p className="mt-0.5 text-rose-700 text-[11px]">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Task Title */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Task Name / Title <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={200}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Implement OAuth 2.0 PKCE authentication flow"
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] text-[#94a3b8]">
                  <span>Actionable deliverable name</span>
                  <span>{title.length}/200</span>
                </div>
              </div>

              {/* Assignee Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Assign To Team Member <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={assignedUid}
                    onChange={(e) => setAssignedUid(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 pr-10 text-xs text-[#0f172a] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  >
                    {activeEmployees.length === 0 ? (
                      <option value="">No employees available</option>
                    ) : (
                      activeEmployees.map((emp) => (
                        <option key={emp.uid} value={emp.uid}>
                          {emp.displayName} — {emp.roleTitle || "Technical Specialist"} ({emp.email})
                        </option>
                      ))
                    )}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#64748b]">
                    <User size={15} />
                  </div>
                </div>

                {/* Selected Employee Preview Pill */}
                {selectedEmployee && (
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                        {selectedEmployee.displayName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-[#0f172a]">
                          {selectedEmployee.displayName}
                        </div>
                        <div className="text-[11px] text-[#64748b]">
                          {selectedEmployee.roleTitle || "Employee"} • {selectedEmployee.email}
                        </div>
                      </div>
                    </div>
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-100">
                      Assigned
                    </span>
                  </div>
                )}
              </div>

              {/* Due Date & Quick Selectors */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[#0f172a]">
                    Due Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleQuickDate(0)}
                      className="px-2 py-0.5 rounded text-[10px] font-medium text-[#475569] bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors"
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDate(1)}
                      className="px-2 py-0.5 rounded text-[10px] font-medium text-[#475569] bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors"
                    >
                      Tomorrow
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDate(7)}
                      className="px-2 py-0.5 rounded text-[10px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      +1 Week
                    </button>
                    <button
                      type="button"
                      onClick={handleEndOfMonth}
                      className="px-2 py-0.5 rounded text-[10px] font-medium text-[#475569] bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors"
                    >
                      Month End
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#64748b]">
                    <Calendar size={15} />
                  </div>
                </div>
              </div>

              {/* Priority & Status Selector Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Priority Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1.5 flex items-center gap-1">
                    <Flag size={12} className="text-[#64748b]" /> Priority Level
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(
                      [
                        { id: "low", label: "Low", color: "text-slate-700 bg-slate-50 border-slate-200" },
                        { id: "medium", label: "Medium", color: "text-amber-700 bg-amber-50 border-amber-200" },
                        { id: "high", label: "High", color: "text-orange-700 bg-orange-50 border-orange-200" },
                        { id: "urgent", label: "Urgent", color: "text-rose-700 bg-rose-50 border-rose-200" },
                      ] as const
                    ).map((p) => {
                      const isSelected = priority === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPriority(p.id)}
                          className={`flex items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs font-semibold transition-all ${
                            isSelected
                              ? `${p.color} ring-2 ring-blue-500/30 border-transparent shadow-xs`
                              : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc]"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              p.id === "low"
                                ? "bg-slate-400"
                                : p.id === "medium"
                                ? "bg-amber-500"
                                : p.id === "high"
                                ? "bg-orange-500"
                                : "bg-rose-500 animate-pulse"
                            }`}
                          />
                          <span>{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Initial Status Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1.5 flex items-center gap-1">
                    <CheckSquare size={12} className="text-[#64748b]" /> Initial Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2 text-xs text-[#0f172a] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium h-[42px]"
                  >
                    <option value="todo">📋 To Do (Backlog)</option>
                    <option value="in-progress">⚡ In Progress</option>
                    <option value="review">🔍 Under Review</option>
                    <option value="completed">✅ Completed</option>
                  </select>
                  <p className="mt-1 text-[11px] text-[#64748b]">
                    Status can be updated as work progresses
                  </p>
                </div>
              </div>

              {/* Description & Requirements */}
              <div>
                <label className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Task Description &amp; Scope <span className="text-[#94a3b8] font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  maxLength={3000}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the deliverables, acceptance criteria, Figma/Github links, and dependencies..."
                  className="w-full rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-y"
                />
                <div className="flex justify-end text-[11px] text-[#94a3b8] mt-0.5">
                  <span>{description.length}/3000</span>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        {formStatus !== "success" && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#f1f5f9] bg-[#f8fafc]/60">
            <button
              type="button"
              onClick={onClose}
              disabled={formStatus === "submitting"}
              className="rounded-xl border border-[#cbd5e1] bg-white px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f1f5f9] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="create-task-form"
              disabled={formStatus === "submitting"}
              className="flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1d4ed8] focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all disabled:opacity-50"
            >
              {formStatus === "submitting" ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Assigning Task...</span>
                </>
              ) : (
                <>
                  <CheckSquare size={14} />
                  <span>Create &amp; Assign Task</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

