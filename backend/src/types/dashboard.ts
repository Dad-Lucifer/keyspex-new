import type { Timestamp } from "firebase-admin/firestore";
import type { UserRole } from "./index";

// ─── Financial / Dashboard Metrics ─────────────────────────────────────────

export interface DashboardMetrics {
  // Revenue
  totalRevenue: number;             // INR
  outstanding: number;              // INR — unpaid invoices
  outstandingCount: number;         // number of overdue invoices
  // Budget
  totalBudget: number;              // INR — annual fiscal cap
  budgetUtilizationPercent: number; // 0-100
  // Salary
  salaryPayable: number;            // INR
  salaryDueDate: string;            // e.g. "Nov 1"
  salaryStaffCount: number;
  // Projects
  activeProjects: number;
  projectsOnTrack: number;
  projectsNearDeadline: number;
  projectsAtRisk: number;
  // Employees
  totalEmployees: number;
  activeEmployees: number;
  onboardingEmployees: number;
}

// ─── Revenue Chart ──────────────────────────────────────────────────────────

export type RevenuePeriod = "6M" | "YTD" | "1Y";

export interface RevenueChartData {
  period: RevenuePeriod;
  months: string[];      // e.g. ["May","Jun","Jul","Aug","Sep","Oct"]
  current: number[];     // INR values (raw, not lakhs — UI divides)
  previous: number[];
}

// ─── Budget Utilization ─────────────────────────────────────────────────────

export interface BudgetSegment {
  name: string;             // e.g. "Operations"
  amountInLakhs: number;    // e.g. 4.20
  percent: number;          // e.g. 49.7
}

export interface BudgetData {
  allocatedCap: number;       // INR
  committedSpent: number;     // INR
  remainingBuffer: number;    // INR
  utilizedPercent: number;    // 0-100
  segments: BudgetSegment[];
}

// ─── Project ────────────────────────────────────────────────────────────────

export type ProjectStatus = "on-track" | "near-deadline" | "at-risk" | "completed" | "paused";

export interface Project {
  id: string;
  code: string;         // e.g. "PRJ-3001"
  title: string;
  clientId: string;     // CLI-XXXX
  clientName: string;
  amount: number;       // INR — total contract value
  sharePercent: number; // portfolio share %
  status: ProjectStatus;
  startDate: string;    // ISO date string
  endDate: string;      // ISO date string
  createdBy: string;    // admin uid
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateProjectInput {
  code: string;
  title: string;
  clientId: string;
  clientName: string;
  amount: number;
  sharePercent: number;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
}

export type UpdateProjectInput = Partial<Omit<CreateProjectInput, "code">>;

// ─── Payment Obligation ─────────────────────────────────────────────────────

export type ObligationStatus = "overdue" | "scheduled" | "pending-auth" | "paid";

export interface Obligation {
  id: string;
  dueDate: string;      // ISO date string
  title: string;
  account: string;      // e.g. "Apex Global • CLI-2001"
  amount: number;       // INR
  status: ObligationStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateObligationInput {
  dueDate: string;
  title: string;
  account: string;
  amount: number;
  status: ObligationStatus;
}

export type UpdateObligationInput = Partial<CreateObligationInput>;

// ─── Audit Log ──────────────────────────────────────────────────────────────

export type AuditStatus = "Completed" | "Verified" | "Reconciled" | "Updated" | "Failed" | "Pending";

export interface AuditActor {
  uid: string;
  name: string;
  role: UserRole | "system";
  initials: string; // 2-char, e.g. "AR"
}

export interface AuditLogEntry {
  id: string;
  actor: AuditActor;
  action: string;       // e.g. "Created Contract CON-5001"
  target: string;       // e.g. "Apex Global (CLI-2001)"
  time: Timestamp;
  status: AuditStatus;
}

// ─── Calendar Event ─────────────────────────────────────────────────────────

export type EventTag =
  | "Project Deadline"
  | "Operations"
  | "Financial"
  | "Client Meeting"
  | "HR"
  | "Review";

export interface CalendarEvent {
  id: string;
  date: string;         // ISO date string
  title: string;
  time: string;         // e.g. "10:30 AM"
  context: string;      // e.g. "PRJ-3001 (Cloud Migrati...)"
  tag: EventTag;
  createdBy: string;    // admin uid
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateEventInput {
  date: string;
  title: string;
  time: string;
  context: string;
  tag: EventTag;
}

export type UpdateEventInput = Partial<CreateEventInput>;

