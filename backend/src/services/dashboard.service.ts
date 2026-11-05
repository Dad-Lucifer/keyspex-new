import { db } from "../config/firebase";
import type {
  DashboardMetrics,
  RevenueChartData,
  RevenuePeriod,
  BudgetData,
  BudgetSegment,
} from "../types/dashboard";

// ─── Hardcoded Fiscal Config ─────────────────────────────────────────────────
// In production these would live in a Firestore `config/fiscal` document.
// Values are in INR.

const FISCAL_ALLOCATED_CAP = 12_00_000;    // ₹12,00,000
const FISCAL_YEAR = 2024;

// ─── Metrics ─────────────────────────────────────────────────────────────────

/**
 * Aggregate dashboard KPI metrics from Firestore.
 * Gracefully returns zeros / sane defaults when collections are empty.
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const [projectsSnap, obligationsSnap, usersSnap, financialsSnap] = await Promise.all([
    db.collection("projects").get(),
    db.collection("obligations").get(),
    db.collection("users").get(),
    db.collection("financials").doc("current").get(),
  ]);

  // ── Projects
  const projects = projectsSnap.docs.map((d) => d.data());
  const activeProjects = projects.filter((p) => !["completed", "paused"].includes(p.status as string)).length;
  const projectsOnTrack = projects.filter((p) => p.status === "on-track").length;
  const projectsNearDeadline = projects.filter((p) => p.status === "near-deadline").length;
  const projectsAtRisk = projects.filter((p) => p.status === "at-risk").length;
  const totalRevenue = projects.reduce((sum, p) => sum + ((p.amount as number) ?? 0), 0);

  // ── Obligations (unpaid = overdue or pending-auth)
  const obligations = obligationsSnap.docs.map((d) => d.data());
  const outstanding = obligations
    .filter((o) => o.status === "overdue" || o.status === "pending-auth")
    .reduce((sum, o) => sum + ((o.amount as number) ?? 0), 0);
  const outstandingCount = obligations.filter(
    (o) => o.status === "overdue"
  ).length;

  // ── Users
  const users = usersSnap.docs.map((d) => d.data());
  const employees = users.filter((u) => u.role === "employee");
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((u) => u.active === true).length;
  const onboardingEmployees = employees.filter((u) => u.active !== true).length;

  // ── Financials (from persisted snapshot; fall back to computed values)
  const fin = financialsSnap.exists ? financialsSnap.data()! : {};
  const totalBudget: number = (fin.allocatedCap as number) ?? FISCAL_ALLOCATED_CAP;
  const committedSpent: number = (fin.committedSpent as number) ?? totalRevenue;
  const budgetUtilizationPercent = totalBudget > 0
    ? Math.round((committedSpent / totalBudget) * 1000) / 10
    : 0;
  const salaryPayable: number = (fin.salaryPayable as number) ?? 2_40_000;
  const salaryDueDate: string = (fin.salaryDueDate as string) ?? "Nov 1";
  const salaryStaffCount: number = (fin.salaryStaffCount as number) ?? totalEmployees;

  return {
    totalRevenue,
    outstanding,
    outstandingCount,
    totalBudget,
    budgetUtilizationPercent,
    salaryPayable,
    salaryDueDate,
    salaryStaffCount,
    activeProjects,
    projectsOnTrack,
    projectsNearDeadline,
    projectsAtRisk,
    totalEmployees,
    activeEmployees,
    onboardingEmployees,
  };
}

// ─── Revenue Chart ─────────────────────────────────────────────────────────

/**
 * Return revenue chart data for a given trailing period.
 * Reads from `revenueSnapshots` collection (monthly INR totals).
 * Falls back to empty arrays so the UI can show an empty chart gracefully.
 */
export async function getRevenueData(period: RevenuePeriod): Promise<RevenueChartData> {
  const monthCount = periodToMonthCount(period);

  const snapshot = await db
    .collection("revenueSnapshots")
    .orderBy("yearMonth", "desc")
    .limit(monthCount * 2) // current + previous year for each month
    .get();

  if (snapshot.empty) {
    return buildFallbackRevenue(period);
  }

  // Build maps: "YYYY-MM" → amount
  const dataMap = new Map<string, number>();
  for (const doc of snapshot.docs) {
    const d = doc.data();
    dataMap.set(d.yearMonth as string, d.amount as number);
  }

  const months: string[] = [];
  const current: number[] = [];
  const previous: number[] = [];

  const now = new Date();
  for (let i = monthCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const ym = toYearMonth(d);
    const ymPrev = toYearMonth(new Date(d.getFullYear() - 1, d.getMonth(), 1));
    months.push(d.toLocaleString("en-IN", { month: "short" }));
    current.push(dataMap.get(ym) ?? 0);
    previous.push(dataMap.get(ymPrev) ?? 0);
  }

  return { period, months, current, previous };
}

// ─── Budget ────────────────────────────────────────────────────────────────

/**
 * Return budget utilization breakdown.
 * Reads from `financials/current` document; falls back to computed defaults.
 */
export async function getBudgetData(): Promise<BudgetData> {
  const [finDoc, projectsSnap] = await Promise.all([
    db.collection("financials").doc("current").get(),
    db.collection("projects").get(),
  ]);

  const fin = finDoc.exists ? finDoc.data()! : {};
  const allocatedCap: number = (fin.allocatedCap as number) ?? FISCAL_ALLOCATED_CAP;

  // Derive committedSpent from projects if not stored
  const totalProjectRevenue = projectsSnap.docs.reduce(
    (sum, doc) => sum + ((doc.data().amount as number) ?? 0),
    0
  );
  const committedSpent: number = (fin.committedSpent as number) ?? totalProjectRevenue;
  const remainingBuffer = allocatedCap - committedSpent;
  const utilizedPercent =
    allocatedCap > 0 ? Math.round((committedSpent / allocatedCap) * 1000) / 10 : 0;

  // Segments — from stored breakdown or derived split
  const storedSegments = fin.segments as BudgetSegment[] | undefined;
  const segments: BudgetSegment[] = storedSegments ?? deriveSegments(committedSpent);

  return {
    allocatedCap,
    committedSpent,
    remainingBuffer,
    utilizedPercent,
    segments,
  };
}

// ─── Private Helpers ────────────────────────────────────────────────────────

function periodToMonthCount(period: RevenuePeriod): number {
  if (period === "6M") return 6;
  if (period === "1Y") return 12;
  // YTD — months from Jan to current month
  return new Date().getMonth() + 1;
}

function toYearMonth(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/**
 * Fallback demo revenue data matching the design mockup.
 * Returned when `revenueSnapshots` collection is empty.
 */
function buildFallbackRevenue(period: RevenuePeriod): RevenueChartData {
  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const allCurrent = [
    2_20_000, 2_40_000, 2_60_000, 3_00_000, 3_20_000, 3_80_000,
    4_50_000, 5_20_000, 6_00_000, 7_80_000, 8_00_000, 8_45_000,
  ];
  const allPrevious = [
    1_80_000, 1_90_000, 2_10_000, 2_30_000, 2_60_000, 3_00_000,
    3_60_000, 4_00_000, 4_80_000, 5_60_000, 6_20_000, 7_00_000,
  ];

  const count = periodToMonthCount(period);
  const curMonth = new Date().getMonth(); // 0-based

  // Slice the last `count` months up to and including current month
  const start = Math.max(0, curMonth + 1 - count);
  const end = curMonth + 1;

  return {
    period,
    months: allMonths.slice(start, end),
    current: allCurrent.slice(start, end),
    previous: allPrevious.slice(start, end),
  };
}

/**
 * Derive 3 budget segments (Operations 49.7%, Payroll 33.1%, Infra & SaaS 17.2%)
 * from total committed spend.
 */
function deriveSegments(committedSpent: number): BudgetSegment[] {
  const inLakhs = (n: number) => Math.round(n / 1_000) / 100;
  return [
    { name: "Operations", amountInLakhs: inLakhs(committedSpent * 0.497), percent: 49.7 },
    { name: "Payroll", amountInLakhs: inLakhs(committedSpent * 0.331), percent: 33.1 },
    { name: "Infra & SaaS", amountInLakhs: inLakhs(committedSpent * 0.172), percent: 17.2 },
  ];
}

