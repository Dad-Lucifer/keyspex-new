"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  Calendar,
  User,
  Clock,
  AlertTriangle,
  Trash2,
  Eye,
  Loader2,
  Sparkles,
  CheckCircle2,
  Kanban,
  List,
  Flag,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  Check,
  X,
} from "lucide-react";
import {
  TaskItem,
  TaskPriority,
  TaskStatus,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "@/lib/api";
import { CreateTaskModal, EmployeeOption } from "./CreateTaskModal";

interface TaskManagementViewProps {
  onBackToDashboard: () => void;
  onTasksChanged?: () => void;
}

export function TaskManagementView({
  onBackToDashboard,
  onTasksChanged,
}: TaskManagementViewProps) {
  // State
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [employees, setEmployees] = useState<EmployeeOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"board" | "list">("board");

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("all");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalDefaultStatus, setCreateModalDefaultStatus] = useState<TaskStatus>("todo");
  const [selectedTaskForDetails, setSelectedTaskForDetails] = useState<TaskItem | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<TaskItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast / notification
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  // Fetch tasks and employees on mount
  const loadTasksAndEmployees = async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
    const token = typeof window !== "undefined" ? sessionStorage.getItem("ks_access_token") : null;

    try {
      const [tasksRes, empRes] = await Promise.all([
        getTasks().catch(() => null),
        fetch(`${apiUrl}/api/users?role=employee`, {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          credentials: "include",
        }).catch(() => null),
      ]);

      if (tasksRes) {
        setTasks(tasksRes);
      } else {
        setTasks([]);
      }

      if (empRes && empRes.ok) {
        const empJson = await empRes.json();
        if (empJson?.data?.users?.length > 0) {
          const mapped: EmployeeOption[] = empJson.data.users.map((u: any) => ({
            uid: u.uid,
            displayName: u.displayName || u.email.split("@")[0],
            email: u.email,
            roleTitle: u.jobTitle || "Team Member",
          }));
          setEmployees(mapped);
        } else {
          setEmployees([]);
        }
      }
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasksAndEmployees();
  }, []);

  // Update status handler
  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    const previousTasks = [...tasks];
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    if (selectedTaskForDetails && selectedTaskForDetails.id === taskId) {
      setSelectedTaskForDetails((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await updateTaskStatus(taskId, newStatus);
      showNotification("success", `Task moved to ${newStatus.replace("-", " ").toUpperCase()}`);
      if (onTasksChanged) onTasksChanged();
    } catch (err: unknown) {
      // Revert on failure
      setTasks(previousTasks);
      const msg = err instanceof Error ? err.message : "Failed to update task status.";
      showNotification("error", msg);
    }
  };

  // Delete task handler
  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);

    try {
      await deleteTask(taskToDelete.id);
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      if (selectedTaskForDetails?.id === taskToDelete.id) {
        setSelectedTaskForDetails(null);
      }
      showNotification("success", `Deleted task "${taskToDelete.title}"`);
      setTaskToDelete(null);
      if (onTasksChanged) onTasksChanged();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete task.";
      showNotification("error", msg);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered tasks computation
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = (task.description || "").toLowerCase().includes(query);
        const matchesAssignee = task.assignedEmployeeName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesAssignee) return false;
      }
      // Status
      if (selectedStatus !== "all" && task.status !== selectedStatus) {
        return false;
      }
      // Priority
      if (selectedPriority !== "all" && task.priority !== selectedPriority) {
        return false;
      }
      // Assignee
      if (selectedAssignee !== "all" && task.assignedTo !== selectedAssignee) {
        return false;
      }
      return true;
    });
  }, [tasks, searchQuery, selectedStatus, selectedPriority, selectedAssignee]);

  // Statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const review = tasks.filter((t) => t.status === "review").length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const urgent = tasks.filter(
      (t) => (t.priority === "urgent" || t.priority === "high") && t.status !== "completed"
    ).length;
    const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, todo, inProgress, review, completed, urgent, completionPercent };
  }, [tasks]);

  // Check if a task is overdue
  const isOverdue = (dueDate: string, status: TaskStatus) => {
    if (status === "completed") return false;
    const today = new Date().toISOString().split("T")[0];
    return dueDate < today;
  };

  // Render Priority Badge
  const renderPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "urgent":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
            Urgent
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700 border border-orange-200">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            High
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-800 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700 border border-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Low
          </span>
        );
    }
  };

  // Render Status Badge
  const renderStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "todo":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 border border-slate-200">
            To Do
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            In Progress
          </span>
        );
      case "review":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-semibold text-purple-700 border border-purple-200">
            In Review
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={11} className="text-emerald-600" />
            Completed
          </span>
        );
    }
  };

  const COLUMNS: { id: TaskStatus; title: string; color: string; badgeBg: string }[] = [
    { id: "todo", title: "To Do", color: "border-slate-300", badgeBg: "bg-slate-100 text-slate-700" },
    { id: "in-progress", title: "In Progress", color: "border-blue-400", badgeBg: "bg-blue-100 text-blue-800" },
    { id: "review", title: "Under Review", color: "border-purple-400", badgeBg: "bg-purple-100 text-purple-800" },
    { id: "completed", title: "Completed", color: "border-emerald-400", badgeBg: "bg-emerald-100 text-emerald-800" },
  ];

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
            {notification.type === "success" ? (
              <CheckCircle2 size={16} className="text-emerald-600" />
            ) : (
              <AlertCircle size={16} className="text-rose-600" />
            )}
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
              Task Management
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#2563eb]">
              <Sparkles size={11} /> Enterprise Workflow
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#64748b]">
            Delegate assignments, track sprints, and oversee deliverables across engineering and operations.
          </p>
        </div>

        {/* Primary Action Button: + Create Task (Opens Pop-up Modal) */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadTasksAndEmployees}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] shadow-2xs transition-colors disabled:opacity-50"
            title="Refresh tasks"
          >
            <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : "text-[#64748b]"} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCreateModalDefaultStatus("todo");
              setIsCreateModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#1d4ed8] focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-3.5 shadow-2xs">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
            Total Deliverables
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-[#0f172a]">{stats.total}</span>
            <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-3.5 shadow-2xs">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
            To Do
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-700">{stats.todo}</span>
            <span className="font-mono text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              Backlog
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-3.5 shadow-2xs">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
            In Progress
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-blue-600">{stats.inProgress}</span>
            <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded animate-pulse">
              Underway
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-3.5 shadow-2xs">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
            In Review
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-purple-600">{stats.review}</span>
            <span className="font-mono text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
              QA Audit
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-3.5 shadow-2xs">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
            Completed
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-emerald-600">{stats.completed}</span>
            <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
              {stats.completionPercent}%
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-3.5 shadow-2xs">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#64748b]">
            Urgent Attention
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-rose-600">{stats.urgent}</span>
            <span className="font-mono text-[10px] text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
              High Priority
            </span>
          </div>
        </div>
      </div>

      {/* Filter, Search, and View Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-2xl border border-[#e2e8f0] bg-white p-3 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by task title, description, or employee name..."
            className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] pl-9 pr-3 py-2 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Dropdown Filters & View Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#2563eb] focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Under Review</option>
            <option value="completed">Completed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#2563eb] focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Assignee Filter */}
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#2563eb] focus:outline-none max-w-[150px] truncate"
          >
            <option value="all">All Assignees</option>
            {employees.map((emp) => (
              <option key={emp.uid} value={emp.uid}>
                {emp.displayName}
              </option>
            ))}
          </select>

          {/* Board / List View Mode Toggle */}
          <div className="flex items-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("board")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                viewMode === "board"
                  ? "bg-white text-[#2563eb] shadow-2xs font-bold"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              <Kanban size={13} />
              <span className="hidden sm:inline">Board</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                viewMode === "list"
                  ? "bg-white text-[#2563eb] shadow-2xs font-bold"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              <List size={13} />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Board View or List View */}
      {viewMode === "board" ? (
        /* ─── KANBAN BOARD VIEW ─── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {COLUMNS.map((col) => {
            const columnTasks = filteredTasks.filter((t) => t.status === col.id);

            return (
              <div
                key={col.id}
                className="flex flex-col rounded-2xl border border-[#e2e8f0] bg-[#f8fafc]/70 min-h-[500px] shadow-2xs"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between p-3.5 border-b border-[#e2e8f0] bg-white rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-headline font-bold text-xs text-[#0f172a]">
                      {col.title}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-bold ${col.badgeBg}`}
                    >
                      {columnTasks.length}
                    </span>
                  </div>

                  {/* Add task to this specific column */}
                  <button
                    type="button"
                    onClick={() => {
                      setCreateModalDefaultStatus(col.id);
                      setIsCreateModalOpen(true);
                    }}
                    className="p-1 text-[#64748b] hover:text-[#2563eb] hover:bg-blue-50 rounded-lg transition-colors"
                    title={`Add task to ${col.title}`}
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* Column Cards Container */}
                <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[72vh]">
                  {columnTasks.length === 0 ? (
                    <div className="py-12 px-4 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#e2e8f0] rounded-xl text-[#94a3b8]">
                      <CheckSquare size={24} className="mb-2 opacity-40" />
                      <p className="text-xs font-medium">No tasks in {col.title}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setCreateModalDefaultStatus(col.id);
                          setIsCreateModalOpen(true);
                        }}
                        className="mt-2 text-[11px] font-semibold text-[#2563eb] hover:underline"
                      >
                        + Create a task
                      </button>
                    </div>
                  ) : (
                    columnTasks.map((task) => {
                      const overdue = isOverdue(task.dueDate, task.status);

                      return (
                        <div
                          key={task.id}
                          className="group relative rounded-xl border border-[#e2e8f0] bg-white p-3.5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                          onClick={() => setSelectedTaskForDetails(task)}
                        >
                          {/* Top Row: Priority Badge & Actions */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            {renderPriorityBadge(task.priority)}

                            {/* Overdue tag */}
                            {overdue && (
                              <span className="inline-flex items-center gap-1 rounded bg-rose-50 px-1.5 py-0.5 font-mono text-[9px] font-bold text-rose-700 border border-rose-200">
                                <AlertTriangle size={10} /> Overdue
                              </span>
                            )}
                          </div>

                          {/* Task Title */}
                          <h4 className="font-headline font-semibold text-xs text-[#0f172a] group-hover:text-[#2563eb] transition-colors leading-snug line-clamp-2">
                            {task.title}
                          </h4>

                          {/* Description Snippet */}
                          {task.description && (
                            <p className="mt-1 text-[11px] text-[#64748b] line-clamp-2 leading-relaxed">
                              {task.description}
                            </p>
                          )}

                          {/* Divider */}
                          <div className="my-2.5 border-t border-[#f1f5f9]" />

                          {/* Card Footer: Assignee & Due Date */}
                          <div className="flex items-center justify-between text-xs">
                            {/* Assignee Avatar & Name */}
                            <div className="flex items-center gap-1.5 max-w-[140px] truncate">
                              <div className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                                {task.assignedEmployeeName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>
                              <span className="text-[11px] font-medium text-[#334155] truncate">
                                {task.assignedEmployeeName}
                              </span>
                            </div>

                            {/* Due Date */}
                            <div
                              className={`flex items-center gap-1 font-mono text-[10px] ${
                                overdue ? "text-rose-600 font-bold" : "text-[#64748b]"
                              }`}
                            >
                              <Calendar size={11} />
                              <span>{task.dueDate.slice(5)}</span>
                            </div>
                          </div>

                          {/* Quick Status Mover Dropdown (stops propagation) */}
                          <div
                            className="mt-3 pt-2 border-t border-[#f8fafc] flex items-center justify-between"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-[10px] text-[#94a3b8] font-medium">Move to:</span>
                            <div className="flex items-center gap-1">
                              {COLUMNS.filter((c) => c.id !== task.status).map((targetCol) => (
                                <button
                                  key={targetCol.id}
                                  type="button"
                                  onClick={() => handleStatusChange(task.id, targetCol.id)}
                                  className="px-1.5 py-0.5 rounded text-[9px] font-semibold text-[#475569] bg-[#f1f5f9] hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                  title={`Move to ${targetCol.title}`}
                                >
                                  {targetCol.title.slice(0, 4)}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ─── LIST / TABLE VIEW ─── */
        <div className="rounded-2xl border border-[#e2e8f0] bg-white shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] font-headline text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                <tr>
                  <th className="py-3 px-4">Task Deliverable</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#64748b]">
                      <CheckSquare size={32} className="mx-auto mb-2 text-[#94a3b8]" />
                      <p className="font-semibold text-sm text-[#0f172a]">No tasks found</p>
                      <p className="text-xs text-[#94a3b8] mt-1">
                        Try adjusting your search filters or create a new task.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1d4ed8]"
                      >
                        <Plus size={14} /> Create Task
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => {
                    const overdue = isOverdue(task.dueDate, task.status);

                    return (
                      <tr
                        key={task.id}
                        className="hover:bg-[#f8fafc]/80 transition-colors cursor-pointer"
                        onClick={() => setSelectedTaskForDetails(task)}
                      >
                        {/* Task Title & Description */}
                        <td className="py-3.5 px-4 max-w-sm">
                          <div className="font-headline font-semibold text-[#0f172a] hover:text-[#2563eb] transition-colors">
                            {task.title}
                          </div>
                          {task.description && (
                            <div className="text-[11px] text-[#64748b] line-clamp-1 mt-0.5">
                              {task.description}
                            </div>
                          )}
                        </td>

                        {/* Assignee */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                              {task.assignedEmployeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-[#0f172a]">
                                {task.assignedEmployeeName}
                              </div>
                              <div className="text-[10px] text-[#94a3b8]">
                                {task.assignedEmployeeRole || "Employee"}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Priority */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {renderPriorityBadge(task.priority)}
                        </td>

                        {/* Due Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px]">
                          <div
                            className={`flex items-center gap-1.5 ${
                              overdue ? "text-rose-600 font-bold" : "text-[#475569]"
                            }`}
                          >
                            <Calendar size={13} />
                            <span>{task.dueDate}</span>
                            {overdue && (
                              <span className="rounded bg-rose-50 px-1 text-[9px] font-bold text-rose-700">
                                Overdue
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status (Interactive dropdown) */}
                        <td
                          className="py-3.5 px-4 whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <select
                            value={task.status}
                            onChange={(e) =>
                              handleStatusChange(task.id, e.target.value as TaskStatus)
                            }
                            className="rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1 text-xs font-semibold text-[#0f172a] focus:border-[#2563eb] focus:outline-none"
                          >
                            <option value="todo">📋 To Do</option>
                            <option value="in-progress">⚡ In Progress</option>
                            <option value="review">🔍 Under Review</option>
                            <option value="completed">✅ Completed</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td
                          className="py-3.5 px-4 whitespace-nowrap text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedTaskForDetails(task)}
                              className="p-1.5 text-[#64748b] hover:text-[#2563eb] hover:bg-blue-50 rounded-lg transition-colors"
                              title="View details"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setTaskToDelete(task)}
                              className="p-1.5 text-[#64748b] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete task"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── CREATE TASK POP-UP MODAL ─── */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        employees={employees}
        defaultStatus={createModalDefaultStatus}
        onTaskCreated={(newTask) => {
          setTasks((prev) => [newTask, ...prev]);
          showNotification(
            "success",
            `Task "${newTask.title}" successfully assigned to ${newTask.assignedEmployeeName}`
          );
          if (onTasksChanged) onTasksChanged();
        }}
      />

      {/* ─── TASK DETAILS DRAWER / MODAL ─── */}
      {selectedTaskForDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedTaskForDetails(null);
          }}
        >
          <div className="w-full max-w-lg rounded-2xl border border-[#e2e8f0] bg-white shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {renderPriorityBadge(selectedTaskForDetails.priority)}
                  {renderStatusBadge(selectedTaskForDetails.status)}
                </div>
                <h3 className="font-headline font-bold text-base text-[#0f172a] pt-1">
                  {selectedTaskForDetails.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTaskForDetails(null)}
                className="rounded-lg p-1 text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Description */}
            <div className="rounded-xl border border-[#f1f5f9] bg-[#f8fafc] p-3.5 text-xs text-[#334155] leading-relaxed">
              <div className="font-semibold text-[#0f172a] mb-1">Scope &amp; Acceptance Criteria:</div>
              <p className="whitespace-pre-line text-[#475569]">
                {selectedTaskForDetails.description || "No specific details provided for this task."}
              </p>
            </div>

            {/* Assignee Card */}
            <div className="rounded-xl border border-[#e2e8f0] p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  {selectedTaskForDetails.assignedEmployeeName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-xs text-[#0f172a]">
                    {selectedTaskForDetails.assignedEmployeeName}
                  </div>
                  <div className="text-[11px] text-[#64748b]">
                    {selectedTaskForDetails.assignedEmployeeRole || "Technical Associate"} •{" "}
                    {selectedTaskForDetails.assignedEmployeeEmail || "team@keyspex.com"}
                  </div>
                </div>
              </div>
              <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-blue-700 border border-blue-100">
                Assigned
              </span>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-[#f1f5f9] p-2.5">
                <div className="text-[10px] uppercase font-mono font-semibold text-[#94a3b8]">
                  Due Date
                </div>
                <div className="mt-1 font-semibold text-[#0f172a] flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#64748b]" />
                  <span>{selectedTaskForDetails.dueDate}</span>
                  {isOverdue(selectedTaskForDetails.dueDate, selectedTaskForDetails.status) && (
                    <span className="text-[9px] font-bold text-rose-600">(Overdue)</span>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-[#f1f5f9] p-2.5">
                <div className="text-[10px] uppercase font-mono font-semibold text-[#94a3b8]">
                  Created By
                </div>
                <div className="mt-1 font-semibold text-[#0f172a] flex items-center gap-1.5">
                  <User size={13} className="text-[#64748b]" />
                  <span>{selectedTaskForDetails.createdByName || "Administrator"}</span>
                </div>
              </div>
            </div>

            {/* Move Status Buttons */}
            <div>
              <div className="text-xs font-semibold text-[#0f172a] mb-2">Change Status:</div>
              <div className="grid grid-cols-4 gap-2">
                {COLUMNS.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => handleStatusChange(selectedTaskForDetails.id, col.id)}
                    className={`rounded-xl border px-2 py-2 text-xs font-semibold transition-all ${
                      selectedTaskForDetails.status === col.id
                        ? "border-[#2563eb] bg-blue-50 text-[#2563eb] ring-2 ring-blue-500/20"
                        : "border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
                    }`}
                  >
                    {col.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const toDel = selectedTaskForDetails;
                  setSelectedTaskForDetails(null);
                  setTaskToDelete(toDel);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors"
              >
                <Trash2 size={14} /> Delete Task
              </button>

              <button
                type="button"
                onClick={() => setSelectedTaskForDetails(null)}
                className="rounded-xl bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1e293b]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRMATION MODAL ─── */}
      {taskToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/60 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isDeleting) setTaskToDelete(null);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="font-headline font-bold text-sm text-[#0f172a]">
                  Delete Task Deliverable?
                </h3>
                <p className="font-mono text-[10px] text-[#64748b]">
                  This action permanently removes the task from the system.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#475569] mb-4">
              Are you sure you want to delete <span className="font-bold text-[#0f172a]">&apos;{taskToDelete.title}&apos;</span>? The assigned employee ({taskToDelete.assignedEmployeeName}) will no longer see this in their backlog.
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setTaskToDelete(null)}
                disabled={isDeleting}
                className="rounded-xl border border-[#cbd5e1] bg-white px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f1f5f9] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteTask}
                disabled={isDeleting}
                className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 shadow-sm transition-all disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

