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
  clientId: string;
  clientName: string;
  amount: number;
  sharePercent: number;
  status: "on-track" | "near-deadline" | "at-risk" | "completed" | "paused";
  startDate: string;
  endDate: string;
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

export async function getObligations(next14days = false): Promise<ObligationItem[]> {
  const query = next14days ? "?next14days=true" : "";
  const json = await fetchWithAuth<{ success: boolean; data: { obligations: ObligationItem[] } }>(
    `/api/obligations${query}`
  );
  return json.data.obligations;
}

export async function getCalendarEvents(upcoming = true): Promise<CalendarEventItem[]> {
  const query = upcoming ? "?upcoming=true" : "?upcoming=false";
  const json = await fetchWithAuth<{ success: boolean; data: { events: CalendarEventItem[] } }>(
    `/api/events${query}`
  );
  return json.data.events;
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

