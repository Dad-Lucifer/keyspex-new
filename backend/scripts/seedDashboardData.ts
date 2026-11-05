/**
 * seedDashboardData.ts
 * --------------------
 * Populates Firestore with demo data for the Admin Dashboard.
 *
 * Usage:
 *   cd backend
 *   npx ts-node -r tsconfig-paths/register scripts/seedDashboardData.ts
 *
 * Safe to run multiple times — skips collections that already have data.
 */

import "../src/config/firebase"; // initialises Admin SDK (side effect)
import { db } from "../src/config/firebase";
import { Timestamp } from "firebase-admin/firestore";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ts(isoDate: string): Timestamp {
  return Timestamp.fromDate(new Date(isoDate));
}

async function seedCollection(
  name: string,
  docs: Array<{ id: string; data: Record<string, unknown> }>
): Promise<void> {
  const snap = await db.collection(name).limit(1).get();
  if (!snap.empty) {
    console.log(`  ⏭  ${name} — already has data, skipping.`);
    return;
  }
  const batch = db.batch();
  for (const { id, data } of docs) {
    batch.set(db.collection(name).doc(id), data);
  }
  await batch.commit();
  console.log(`  ✅ ${name} — seeded ${docs.length} document(s).`);
}

// ─── Seed Data ───────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("🌱 Seeding dashboard demo data...\n");

  // ── Projects
  await seedCollection("projects", [
    {
      id: "prj-3001",
      data: {
        id: "prj-3001",
        code: "PRJ-3001",
        title: "Enterprise Cloud Migration",
        clientId: "CLI-2001",
        clientName: "Apex Global",
        amount: 3_40_000,
        sharePercent: 40.2,
        status: "on-track",
        startDate: "2024-04-01",
        endDate: "2025-03-31",
        createdBy: "system",
        createdAt: ts("2024-04-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
    {
      id: "prj-3002",
      data: {
        id: "prj-3002",
        code: "PRJ-3002",
        title: "Fintech Core Banking UI",
        clientId: "CLI-2002",
        clientName: "Nexa Systems",
        amount: 2_10_000,
        sharePercent: 24.8,
        status: "near-deadline",
        startDate: "2024-05-01",
        endDate: "2024-11-30",
        createdBy: "system",
        createdAt: ts("2024-05-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
    {
      id: "prj-3003",
      data: {
        id: "prj-3003",
        code: "PRJ-3003",
        title: "HealthTech Telehealth App",
        clientId: "CLI-2003",
        clientName: "Vertex Labs",
        amount: 1_65_000,
        sharePercent: 19.5,
        status: "on-track",
        startDate: "2024-06-01",
        endDate: "2025-05-31",
        createdBy: "system",
        createdAt: ts("2024-06-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
    {
      id: "prj-3004",
      data: {
        id: "prj-3004",
        code: "PRJ-3004",
        title: "Retail POS Modernization",
        clientId: "CLI-2004",
        clientName: "BrightMart",
        amount: 1_30_000,
        sharePercent: 15.5,
        status: "at-risk",
        startDate: "2024-07-01",
        endDate: "2024-12-31",
        createdBy: "system",
        createdAt: ts("2024-07-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
  ]);

  // ── Obligations
  await seedCollection("obligations", [
    {
      id: "obl-001",
      data: {
        id: "obl-001",
        dueDate: "2024-10-28",
        title: "AWS Cloud Infra Renewal",
        account: "Apex Global • CLI-2001",
        amount: 65_000,
        status: "overdue",
        createdAt: ts("2024-10-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
    {
      id: "obl-002",
      data: {
        id: "obl-002",
        dueDate: "2024-10-31",
        title: "October Payroll Run",
        account: "Core Team (18 Staff) • Auto-ACH",
        amount: 2_40_000,
        status: "scheduled",
        createdAt: ts("2024-10-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
    {
      id: "obl-003",
      data: {
        id: "obl-003",
        dueDate: "2024-11-05",
        title: "Milestone 2 Disbursement",
        account: "Nexa Systems • CLI-2002",
        amount: 1_10_000,
        status: "pending-auth",
        createdAt: ts("2024-10-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
    {
      id: "obl-004",
      data: {
        id: "obl-004",
        dueDate: "2024-11-10",
        title: "SaaS Tooling & Licenses",
        account: "Vertex Labs • CLI-2003",
        amount: 35_000,
        status: "scheduled",
        createdAt: ts("2024-10-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
  ]);

  // ── Calendar Events
  await seedCollection("events", [
    {
      id: "evt-001",
      data: {
        id: "evt-001",
        date: "2024-10-29",
        title: "Sprint 14 Milestone Review",
        time: "10:30 AM",
        context: "PRJ-3001 (Cloud Migration)",
        tag: "Project Deadline",
        createdBy: "system",
        createdAt: ts("2024-10-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
    {
      id: "evt-002",
      data: {
        id: "evt-002",
        date: "2024-10-31",
        title: "Monthly Payroll Reconciliation",
        time: "04:00 PM",
        context: "Finance & HR Core Team",
        tag: "Operations",
        createdBy: "system",
        createdAt: ts("2024-10-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
    {
      id: "evt-003",
      data: {
        id: "evt-003",
        date: "2024-11-02",
        title: "Executive Q4 Budget Review",
        time: "02:00 PM",
        context: "Leadership Council Room",
        tag: "Financial",
        createdBy: "system",
        createdAt: ts("2024-10-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
    {
      id: "evt-004",
      data: {
        id: "evt-004",
        date: "2024-11-04",
        title: "Client Sync: Apex Global",
        time: "11:00 AM",
        context: "CLI-2001 (Google Meet)",
        tag: "Client Meeting",
        createdBy: "system",
        createdAt: ts("2024-10-01T09:00:00Z"),
        updatedAt: ts("2024-10-01T09:00:00Z"),
      },
    },
  ]);

  // ── Audit Log
  await seedCollection("auditLog", [
    {
      id: "log-001",
      data: {
        actor: { uid: "admin-001", name: "Alex Rivera", role: "admin", initials: "AR" },
        action: "Created Contract CON-5001",
        target: "Apex Global (CLI-2001)",
        time: ts("2024-10-28T10:00:00Z"),
        status: "Completed",
      },
    },
    {
      id: "log-002",
      data: {
        actor: { uid: "emp-001", name: "Riya Sharma", role: "employee", initials: "RS" },
        action: "Approved Salary Slip for EMP-1004",
        target: "DevOps Lead • Nov Run",
        time: ts("2024-10-28T09:00:00Z"),
        status: "Verified",
      },
    },
    {
      id: "log-003",
      data: {
        actor: { uid: "system", name: "Finance Bot", role: "system", initials: "FB" },
        action: "Recorded Inward Payment PAY-6001",
        target: "₹85,000 from Nexa Systems",
        time: ts("2024-10-28T07:00:00Z"),
        status: "Reconciled",
      },
    },
    {
      id: "log-004",
      data: {
        actor: { uid: "emp-002", name: "Marcus Vance", role: "employee", initials: "MV" },
        action: "Reassigned Task TSK-4012",
        target: "Fintech Banking UI (PRJ-3002)",
        time: ts("2024-10-28T05:00:00Z"),
        status: "Updated",
      },
    },
  ]);

  // ── Financial Snapshot
  await seedCollection("financials", [
    {
      id: "current",
      data: {
        fiscalYear: 2024,
        allocatedCap: 12_00_000,
        committedSpent: 8_45_000,
        remainingBuffer: 3_55_000,
        utilizedPercent: 70.4,
        salaryPayable: 2_40_000,
        salaryDueDate: "Nov 1",
        salaryStaffCount: 18,
        segments: [
          { name: "Operations", amountInLakhs: 4.20, percent: 49.7 },
          { name: "Payroll", amountInLakhs: 2.80, percent: 33.1 },
          { name: "Infra & SaaS", amountInLakhs: 1.45, percent: 17.2 },
        ],
        updatedAt: ts("2024-10-28T00:00:00Z"),
      },
    },
  ]);

  // ── Revenue Snapshots (monthly INR amounts for chart)
  await seedCollection("revenueSnapshots", [
    { id: "2023-11", data: { yearMonth: "2023-11", amount: 1_80_000 } },
    { id: "2023-12", data: { yearMonth: "2023-12", amount: 1_90_000 } },
    { id: "2024-01", data: { yearMonth: "2024-01", amount: 2_20_000 } },
    { id: "2024-02", data: { yearMonth: "2024-02", amount: 2_40_000 } },
    { id: "2024-03", data: { yearMonth: "2024-03", amount: 2_60_000 } },
    { id: "2024-04", data: { yearMonth: "2024-04", amount: 3_00_000 } },
    { id: "2024-05", data: { yearMonth: "2024-05", amount: 3_20_000 } },
    { id: "2024-06", data: { yearMonth: "2024-06", amount: 3_80_000 } },
    { id: "2024-07", data: { yearMonth: "2024-07", amount: 4_50_000 } },
    { id: "2024-08", data: { yearMonth: "2024-08", amount: 5_20_000 } },
    { id: "2024-09", data: { yearMonth: "2024-09", amount: 6_00_000 } },
    { id: "2024-10", data: { yearMonth: "2024-10", amount: 7_80_000 } },
    // Previous year for YTD/1Y comparison
    { id: "2023-01", data: { yearMonth: "2023-01", amount: 1_60_000 } },
    { id: "2023-02", data: { yearMonth: "2023-02", amount: 1_70_000 } },
    { id: "2023-03", data: { yearMonth: "2023-03", amount: 1_85_000 } },
    { id: "2023-04", data: { yearMonth: "2023-04", amount: 2_10_000 } },
    { id: "2023-05", data: { yearMonth: "2023-05", amount: 2_30_000 } },
    { id: "2023-06", data: { yearMonth: "2023-06", amount: 2_60_000 } },
    { id: "2023-07", data: { yearMonth: "2023-07", amount: 3_00_000 } },
    { id: "2023-08", data: { yearMonth: "2023-08", amount: 3_60_000 } },
    { id: "2023-09", data: { yearMonth: "2023-09", amount: 4_00_000 } },
    { id: "2023-10", data: { yearMonth: "2023-10", amount: 4_80_000 } },
  ]);

  console.log("\n🎉 Seed complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

