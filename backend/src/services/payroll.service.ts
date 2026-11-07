import { db } from "../config/firebase";
import { Timestamp } from "firebase-admin/firestore";
import type { CreateSalaryPaymentInput } from "../schemas/payroll.schema";
import { logAction } from "./auditLog.service";

export interface SalaryRecord {
  id: string;
  employeeUid: string;
  employeeName: string;
  employeeEmail: string;
  amount: number;
  period: string;
  paymentMethod: string;
  notes?: string;
  status: "paid" | "processing" | "failed";
  paidAt: Timestamp;
  paidBy: string;
  paidByName: string;
}

export interface PayrollSummary {
  totalDisbursed: number;
  disbursementsCount: number;
  averageSalary: number;
  currentPeriod: string;
}

/**
 * Record a new salary disbursement in the `salaries` Firestore collection.
 */
export async function disburseSalary(
  input: CreateSalaryPaymentInput,
  adminUid: string,
  adminName: string
): Promise<SalaryRecord> {
  const collectionRef = db.collection("salaries");
  const docRef = collectionRef.doc();
  const now = Timestamp.now();

  const record: SalaryRecord = {
    id: docRef.id,
    employeeUid: input.employeeUid,
    employeeName: input.employeeName,
    employeeEmail: input.employeeEmail,
    amount: input.amount,
    period: input.period || "Current Month",
    paymentMethod: input.paymentMethod || "Direct Bank Transfer (NEFT/ACH)",
    ...(input.notes ? { notes: input.notes } : {}),
    status: "paid",
    paidAt: now,
    paidBy: adminUid,
    paidByName: adminName,
  };

  await docRef.set(record);

  // Write audit log entry (non-blocking)
  logAction({
    actor: {
      uid: adminUid,
      name: adminName,
      role: "admin",
      initials: adminName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "AD",
    },
    action: `Disbursed Salary (₹${input.amount.toLocaleString("en-IN")})`,
    target: `${input.employeeName} (${input.period || "Current Period"})`,
    status: "Completed",
  }).catch((err) => console.warn("Failed to write audit log for salary:", err));

  return record;
}

/**
 * Fetch all salary disbursement records from Firestore `salaries` collection.
 */
export async function listSalaries(limit = 100): Promise<SalaryRecord[]> {
  const snapshot = await db
    .collection("salaries")
    .orderBy("paidAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      employeeUid: data.employeeUid,
      employeeName: data.employeeName,
      employeeEmail: data.employeeEmail,
      amount: data.amount,
      period: data.period,
      paymentMethod: data.paymentMethod,
      notes: data.notes,
      status: data.status,
      paidAt: data.paidAt,
      paidBy: data.paidBy,
      paidByName: data.paidByName,
    } as SalaryRecord;
  });
}

/**
 * Aggregate summary metrics for payroll disbursements.
 */
export async function getPayrollSummary(): Promise<PayrollSummary> {
  const snapshot = await db.collection("salaries").get();

  let totalDisbursed = 0;
  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    totalDisbursed += typeof data.amount === "number" ? data.amount : 0;
  });

  const count = snapshot.size;
  const averageSalary = count > 0 ? Math.round(totalDisbursed / count) : 0;

  return {
    totalDisbursed,
    disbursementsCount: count,
    averageSalary,
    currentPeriod: "Current Fiscal Period",
  };
}

