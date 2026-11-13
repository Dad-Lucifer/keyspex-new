/**
 * Centralized API client for KeySpex Dashboard
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("ks_access_token");
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function silentRefreshToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Refresh token expired or invalid");
      }

      const json = await res.json();
      const newAccessToken = json?.data?.accessToken;
      if (newAccessToken && typeof window !== "undefined") {
        sessionStorage.setItem("ks_access_token", newAccessToken);
        document.cookie = `ks_token=${newAccessToken}; path=/; max-age=900; SameSite=Lax`;
        return newAccessToken;
      }
      return null;
    } catch {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("ks_access_token");
        sessionStorage.removeItem("ks_user");
        document.cookie = "ks_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "ks_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  let res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  // Silent automatic token refresh if token expired (401)
  if (
    res.status === 401 &&
    !endpoint.includes("/auth/refresh") &&
    !endpoint.includes("/auth/login")
  ) {
    const newToken = await silentRefreshToken();
    if (newToken) {
      headers.set("Authorization", `Bearer ${newToken}`);
      res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include",
      });
    }
  }

  if (!res.ok) {
    let errMessage = `HTTP ${res.status}: ${res.statusText}`;
    try {
      const errorJson = await res.json();
      if (errorJson?.error?.message) {
        errMessage = errorJson.error.message;
      }
    } catch {
      // no json body
    }
    throw new Error(errMessage);
  }

  return res.json();
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface DashboardMetrics {
  totalRevenue: number;
  outstanding: number;
  outstandingCount: number;
  totalBudget: number;
  budgetUtilizationPercent: number;
  salaryPayable: number;
  salaryDueDate: string;
  salaryStaffCount: number;
  activeProjects: number;
  projectsOnTrack: number;
  projectsNearDeadline: number;
  projectsAtRisk: number;
  totalEmployees: number;
  activeEmployees: number;
  onboardingEmployees: number;
}

export interface RevenueChartData {
  period: "6M" | "YTD" | "1Y";
  months: string[];
  current: number[];
  previous: number[];
}

export interface BudgetSegment {
  name: string;
  amountInLakhs: number;
  percent: number;
}

export interface BudgetData {
  allocatedCap: number;
  committedSpent: number;
  remainingBuffer: number;
  utilizedPercent: number;
  segments: BudgetSegment[];
}

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  description?: string;
  clientId: string;
  clientName: string;
  amount: number;
  sharePercent: number;
  status: "on-track" | "near-deadline" | "at-risk" | "completed" | "paused";
  startDate: string;
  endDate: string;
  assignedTo?: string[];
  assignedNames?: string[];
}

export interface CreateProjectInput {
  title: string;
  description?: string;
  amount: number;
  endDate: string; // deadline
  startDate?: string;
  code?: string;
  clientId?: string;
  clientName?: string;
  status?: "on-track" | "near-deadline" | "at-risk" | "completed" | "paused";
  sharePercent?: number;
  assignedTo?: string[];
  assignedNames?: string[];
}

export interface ObligationItem {
  id: string;
  dueDate: string;
  title: string;
  account: string;
  amount: number;
  status: "overdue" | "scheduled" | "pending-auth" | "paid";
}

export interface CalendarEventItem {
  id: string;
  date: string;
  title: string;
  time: string;
  context: string;
  tag:
    | "Project Deadline"
    | "Operations"
    | "Financial"
    | "Client Meeting"
    | "HR"
    | "Review";
}

export interface AuditLogActor {
  uid: string;
  name: string;
  role: string;
  initials: string;
}

export interface AuditLogItem {
  id: string;
  actor: AuditLogActor;
  action: string;
  target: string;
  time: { _seconds: number; _nanoseconds: number } | string;
  status: "Completed" | "Verified" | "Reconciled" | "Updated" | "Failed" | "Pending";
}

export interface SalaryItem {
  id: string;
  employeeUid: string;
  employeeName: string;
  employeeEmail: string;
  amount: number;
  period: string;
  paymentMethod: string;
  notes?: string;
  status: "paid" | "processing" | "failed";
  paidAt: { _seconds: number; _nanoseconds: number } | string;
  paidBy?: string;
  paidByName?: string;
}

export interface CreateSalaryInput {
  employeeUid: string;
  employeeName: string;
  employeeEmail: string;
  amount: number;
  period?: string;
  paymentMethod?: string;
  notes?: string;
}

export interface DigitalSignatureInfo {
  signatoryName: string;
  signatoryRole: string;
  signedDate: string;
  certHash: string;
  status: "Verified" | "Signed" | "Pending";
}

export interface ContractItem {
  id: string;
  title: string;
  agreementType: string;
  companyName: string;
  companyAddress: string;
  companyCin: string;
  contractDate: string;

  // Employee (Party 2)
  employeeUid: string;
  employeeName: string;
  employeeEmail: string;
  employeeRole: string;
  employeePhone: string;

  // Project Details
  projectCode: string;
  projectTitle: string;
  clientName: string;
  remuneration: number;
  paymentTerms: string;
  startDate: string;
  endDate: string;

  // Clauses
  scopeDetails: string;
  compensationClause: string;
  ndaClause: string;

  // Digital Signatures
  party1Admin: DigitalSignatureInfo;
  party2Employee: DigitalSignatureInfo;

  status: "draft" | "sent" | "signed" | "revoked";
  verificationTimestamp: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface CreateContractInput {
  title: string;
  agreementType?: string;
  employeeUid: string;
  employeeName: string;
  employeeEmail: string;
  employeeRole: string;
  employeePhone?: string;
  projectCode: string;
  projectTitle: string;
  clientName?: string;
  remuneration: number;
  paymentTerms?: string;
  startDate: string;
  endDate: string;
  scopeDetails?: string;
  compensationClause?: string;
  ndaClause?: string;
  status?: "draft" | "sent" | "signed" | "revoked";
}

// ── API Methods ────────────────────────────────────────────────────────────

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const json = await fetchWithAuth<{ success: boolean; data: { metrics: DashboardMetrics } }>(
    "/api/dashboard/metrics"
  );
  return json.data.metrics;
}

export async function getRevenueData(
  period: "6M" | "YTD" | "1Y" = "6M"
): Promise<RevenueChartData> {
  const json = await fetchWithAuth<{ success: boolean; data: RevenueChartData }>(
    `/api/dashboard/revenue?period=${period}`
  );
  return json.data;
}

export async function getBudgetData(): Promise<BudgetData> {
  const json = await fetchWithAuth<{ success: boolean; data: { budget: BudgetData } }>(
    "/api/dashboard/budget"
  );
  return json.data.budget;
}

export async function getProjects(top?: number): Promise<ProjectItem[]> {
  const query = top ? `?top=${top}` : "";
  const json = await fetchWithAuth<{ success: boolean; data: { projects: ProjectItem[] } }>(
    `/api/projects${query}`
  );
  return json.data.projects;
}

export async function createProject(
  data: CreateProjectInput
): Promise<{ success: boolean; data: { project: ProjectItem } }> {
  return await fetchWithAuth<{ success: boolean; data: { project: ProjectItem } }>(
    "/api/projects",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function deleteProject(
  id: string
): Promise<{ success: boolean; message: string }> {
  return await fetchWithAuth<{ success: boolean; message: string }>(
    `/api/projects/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function updateProject(
  id: string,
  data: Partial<CreateProjectInput>
): Promise<{ success: boolean; message: string }> {
  return await fetchWithAuth<{ success: boolean; message: string }>(
    `/api/projects/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

export interface CreateEventInput {
  date: string; // YYYY-MM-DD
  title: string;
  time: string; // e.g. "10:30 AM"
  context: string;
  tag:
    | "Project Deadline"
    | "Operations"
    | "Financial"
    | "Client Meeting"
    | "HR"
    | "Review";
}

export interface CreateObligationInput {
  dueDate: string; // YYYY-MM-DD
  title: string;
  account: string;
  amount: number;
  status: "overdue" | "scheduled" | "pending-auth" | "paid";
}

export async function getObligations(next14days = false): Promise<ObligationItem[]> {
  const query = next14days ? "?next14days=true" : "";
  const json = await fetchWithAuth<{ success: boolean; data: { obligations: ObligationItem[] } }>(
    `/api/obligations${query}`
  );
  return json.data.obligations;
}

export async function createObligation(
  data: CreateObligationInput
): Promise<{ success: boolean; data: { obligation: ObligationItem } }> {
  return await fetchWithAuth<{ success: boolean; data: { obligation: ObligationItem } }>(
    "/api/obligations",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function updateObligation(
  id: string,
  data: Partial<CreateObligationInput>
): Promise<{ success: boolean; message: string }> {
  return await fetchWithAuth<{ success: boolean; message: string }>(
    `/api/obligations/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

export async function deleteObligation(
  id: string
): Promise<{ success: boolean; message: string }> {
  return await fetchWithAuth<{ success: boolean; message: string }>(
    `/api/obligations/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function getCalendarEvents(upcoming = true): Promise<CalendarEventItem[]> {
  const query = upcoming ? "?upcoming=true" : "?upcoming=false";
  const json = await fetchWithAuth<{ success: boolean; data: { events: CalendarEventItem[] } }>(
    `/api/events${query}`
  );
  return json.data.events;
}

export async function createCalendarEvent(
  data: CreateEventInput
): Promise<{ success: boolean; data: { event: CalendarEventItem } }> {
  return await fetchWithAuth<{ success: boolean; data: { event: CalendarEventItem } }>(
    "/api/events",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function updateCalendarEvent(
  id: string,
  data: Partial<CreateEventInput>
): Promise<{ success: boolean; message: string }> {
  return await fetchWithAuth<{ success: boolean; message: string }>(
    `/api/events/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

export async function deleteCalendarEvent(
  id: string
): Promise<{ success: boolean; message: string }> {
  return await fetchWithAuth<{ success: boolean; message: string }>(
    `/api/events/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function getAuditLog(limit = 10): Promise<AuditLogItem[]> {
  const json = await fetchWithAuth<{ success: boolean; data: { entries: AuditLogItem[] } }>(
    `/api/audit-log?limit=${limit}`
  );
  return json.data.entries;
}

export async function getSalaries(limit = 100): Promise<SalaryItem[]> {
  const json = await fetchWithAuth<{ success: boolean; data: { salaries: SalaryItem[] } }>(
    `/api/payroll?limit=${limit}`
  );
  return json.data.salaries;
}

export async function disburseSalary(
  data: CreateSalaryInput
): Promise<{ success: boolean; message: string; salary: SalaryItem }> {
  const json = await fetchWithAuth<{
    success: boolean;
    message: string;
    data: { salary: SalaryItem };
  }>("/api/payroll", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return {
    success: json.success,
    message: json.message,
    salary: json.data.salary,
  };
}

// ── Contract API Methods ──────────────────────────────────────────────────

export async function getContracts(
  employeeUid?: string,
  status?: string
): Promise<ContractItem[]> {
  const params = new URLSearchParams();
  if (employeeUid) params.set("employeeUid", employeeUid);
  if (status) params.set("status", status);
  const q = params.toString() ? `?${params.toString()}` : "";
  const json = await fetchWithAuth<{ success: boolean; data: { contracts: ContractItem[] } }>(
    `/api/contracts${q}`
  );
  return json.data.contracts;
}

export async function getContractById(id: string): Promise<ContractItem> {
  const json = await fetchWithAuth<{ success: boolean; data: { contract: ContractItem } }>(
    `/api/contracts/${id}`
  );
  return json.data.contract;
}

export async function createContract(
  data: CreateContractInput
): Promise<{ success: boolean; message: string; data: { contract: ContractItem } }> {
  return await fetchWithAuth<{
    success: boolean;
    message: string;
    data: { contract: ContractItem };
  }>("/api/contracts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateContractStatus(
  id: string,
  status: "draft" | "sent" | "signed" | "revoked"
): Promise<{ success: boolean; message: string; data: { contract: ContractItem } }> {
  return await fetchWithAuth<{
    success: boolean;
    message: string;
    data: { contract: ContractItem };
  }>(`/api/contracts/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteContract(
  id: string
): Promise<{ success: boolean; message: string }> {
  return await fetchWithAuth<{ success: boolean; message: string }>(
    `/api/contracts/${id}`,
    {
      method: "DELETE",
    }
  );
}

// ── Tasks ────────────────────────────────────────────────────────────────────

export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in-progress" | "review" | "completed";

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  assignedTo: string; // employee uid
  assignedEmployeeName: string;
  assignedEmployeeEmail?: string;
  assignedEmployeeRole?: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdBy?: string;
  createdByName?: string;
  createdAt?: { _seconds?: number; seconds?: number; [key: string]: unknown } | string;
  updatedAt?: { _seconds?: number; seconds?: number; [key: string]: unknown } | string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate: string;
  assignedTo: string;
  assignedEmployeeName: string;
  assignedEmployeeEmail?: string;
  assignedEmployeeRole?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  dueDate?: string;
  assignedTo?: string;
  assignedEmployeeName?: string;
  assignedEmployeeEmail?: string;
  assignedEmployeeRole?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export async function getTasks(filters?: {
  status?: string;
  priority?: string;
  assignedTo?: string;
}): Promise<TaskItem[]> {
  const params = new URLSearchParams();
  if (filters?.status && filters.status !== "all") params.set("status", filters.status);
  if (filters?.priority && filters.priority !== "all") params.set("priority", filters.priority);
  if (filters?.assignedTo && filters.assignedTo !== "all") params.set("assignedTo", filters.assignedTo);
  const q = params.toString() ? `?${params.toString()}` : "";
  const json = await fetchWithAuth<{ success: boolean; data: { tasks: TaskItem[] } }>(
    `/api/tasks${q}`
  );
  return json.data.tasks;
}

export async function getTaskById(id: string): Promise<TaskItem> {
  const json = await fetchWithAuth<{ success: boolean; data: { task: TaskItem } }>(
    `/api/tasks/${id}`
  );
  return json.data.task;
}

export async function createTask(
  data: CreateTaskInput
): Promise<{ success: boolean; message: string; data: { task: TaskItem } }> {
  return await fetchWithAuth<{
    success: boolean;
    message: string;
    data: { task: TaskItem };
  }>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTask(
  id: string,
  data: UpdateTaskInput
): Promise<{ success: boolean; message: string; data: { task: TaskItem } }> {
  return await fetchWithAuth<{
    success: boolean;
    message: string;
    data: { task: TaskItem };
  }>(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function updateTaskStatus(
  id: string,
  status: TaskStatus
): Promise<{ success: boolean; message: string; data: { task: TaskItem } }> {
  return await fetchWithAuth<{
    success: boolean;
    message: string;
    data: { task: TaskItem };
  }>(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteTask(
  id: string
): Promise<{ success: boolean; message: string }> {
  return await fetchWithAuth<{ success: boolean; message: string }>(
    `/api/tasks/${id}`,
    {
      method: "DELETE",
    }
  );
}

// ── Payment Timeline ─────────────────────────────────────────────────────────

export type PaymentEntryType = "received" | "invested";
export type PaymentEntryStatus = "cleared" | "pending" | "reconciled";

export interface PaymentTimelineItem {
  id: string;
  projectId: string;
  projectCode: string;
  projectTitle: string;
  clientName: string;
  type: PaymentEntryType;
  amount: number;
  date: string;
  title: string;
  notes?: string;
  method?: string;
  referenceNo?: string;
  status: PaymentEntryStatus;
  createdBy?: string;
  createdByName?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface CreatePaymentEntryInput {
  projectId: string;
  projectCode?: string;
  projectTitle: string;
  clientName?: string;
  type: PaymentEntryType;
  amount: number;
  date: string;
  title: string;
  notes?: string;
  method?: string;
  referenceNo?: string;
  status?: PaymentEntryStatus;
}

export interface ProjectPaymentSummary {
  projectId: string;
  projectCode: string;
  projectTitle: string;
  clientName: string;
  budget: number;
  totalReceived: number;
  totalInvested: number;
  netBalance: number;
  remainingBudget: number;
  collectionPercent: number;
  entriesCount: number;
}

export async function getPaymentEntries(filters?: {
  projectId?: string;
  type?: string;
}): Promise<PaymentTimelineItem[]> {
  const params = new URLSearchParams();
  if (filters?.projectId) params.set("projectId", filters.projectId);
  if (filters?.type && filters.type !== "all") params.set("type", filters.type);
  const q = params.toString() ? `?${params.toString()}` : "";
  const json = await fetchWithAuth<{ success: boolean; data: { entries: PaymentTimelineItem[] } }>(
    `/api/payment-timeline/entries${q}`
  );
  return json.data.entries;
}

export async function createPaymentEntry(
  data: CreatePaymentEntryInput
): Promise<{ success: boolean; message: string; data: { entry: PaymentTimelineItem } }> {
  return await fetchWithAuth<{
    success: boolean;
    message: string;
    data: { entry: PaymentTimelineItem };
  }>("/api/payment-timeline/entries", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deletePaymentEntry(
  id: string
): Promise<{ success: boolean; message: string }> {
  return await fetchWithAuth<{ success: boolean; message: string }>(
    `/api/payment-timeline/entries/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function getProjectPaymentSummary(
  projectId: string
): Promise<ProjectPaymentSummary> {
  const json = await fetchWithAuth<{
    success: boolean;
    data: { summary: ProjectPaymentSummary };
  }>(`/api/payment-timeline/summary/${projectId}`);
  return json.data.summary;
}



