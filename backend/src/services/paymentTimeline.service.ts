import { db } from "../config/firebase";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import { AppError } from "../utils/error";
import { logAction } from "./auditLog.service";
import type {
  PaymentTimelineRecord,
  CreatePaymentEntryInput,
  UpdatePaymentEntryInput,
  ProjectPaymentSummary,
  PaymentEntryType,
  PaymentEntryStatus,
} from "../types/paymentTimeline";

export interface TimelineActor {
  uid: string;
  name?: string;
  email?: string;
  role?: string;
}

/**
 * List payment entries, optionally filtered by projectId and/or entry type (received / invested).
 */
export async function listPaymentEntries(filters?: {
  projectId?: string;
  type?: string;
}): Promise<PaymentTimelineRecord[]> {
  let query: FirebaseFirestore.Query = db.collection("payment_entries");

  if (filters?.projectId) {
    query = query.where("projectId", "==", filters.projectId);
  }
  if (filters?.type && (filters.type === "received" || filters.type === "invested")) {
    query = query.where("type", "==", filters.type);
  }

  const snapshot = await query.get();
  const entries = snapshot.docs.map((doc) => docToPaymentEntry(doc));

  // Sort by date desc, secondary createdAt desc
  entries.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    const aTime = a.createdAt?.seconds || 0;
    const bTime = b.createdAt?.seconds || 0;
    return bTime - aTime;
  });

  return entries;
}

/**
 * Create a new payment entry (Received Payment from Client OR Invested Amount).
 */
export async function createPaymentEntry(
  input: CreatePaymentEntryInput,
  actor?: TimelineActor
): Promise<PaymentTimelineRecord> {
  const now = Timestamp.now();
  const ref = db.collection("payment_entries").doc();

  // If project exists, attempt to pull latest project details
  let projectCode = input.projectCode || "";
  let projectTitle = input.projectTitle;
  let clientName = input.clientName || "";

  try {
    const projectDoc = await db.collection("projects").doc(input.projectId).get();
    if (projectDoc.exists) {
      const pData = projectDoc.data()!;
      projectCode = projectCode || (pData.code as string) || "";
      projectTitle = (pData.title as string) || projectTitle;
      clientName = clientName || (pData.clientName as string) || "";
    }
  } catch {
    // Graceful fallback to input values
  }

  const record: PaymentTimelineRecord = {
    id: ref.id,
    projectId: input.projectId,
    projectCode: projectCode.trim(),
    projectTitle: projectTitle.trim(),
    clientName: clientName.trim(),
    type: input.type,
    amount: Number(input.amount),
    date: input.date,
    title: input.title.trim(),
    notes: (input.notes || "").trim(),
    method: (input.method || "Bank Wire / NEFT").trim(),
    referenceNo: (input.referenceNo || "").trim(),
    status: (input.status || "cleared") as PaymentEntryStatus,
    createdBy: actor?.uid || "admin",
    createdByName: actor?.name || "Admin",
    createdAt: now,
    updatedAt: now,
  };

  await ref.set(record);

  // Write audit trail
  const initials = (actor?.name || "AD")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const actionText =
    input.type === "received"
      ? `Received Client Payment: ₹${Number(input.amount).toLocaleString("en-IN")}`
      : `Recorded Project Investment: ₹${Number(input.amount).toLocaleString("en-IN")}`;

  logAction({
    actor: {
      uid: actor?.uid || "admin",
      name: actor?.name || "Administrator",
      role: (actor?.role || "admin") as "admin" | "employee" | "client",
      initials,
    },
    action: actionText,
    target: `${record.projectTitle} • ${record.title}`,
    status: "Completed",
  }).catch(() => {});

  return record;
}

/**
 * Update an existing payment entry.
 */
export async function updatePaymentEntry(
  id: string,
  input: UpdatePaymentEntryInput,
  actor?: TimelineActor
): Promise<PaymentTimelineRecord> {
  const ref = db.collection("payment_entries").doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    throw new AppError(404, "Payment entry not found.", "ENTRY_NOT_FOUND");
  }

  const payload: Record<string, unknown> = {
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (input.type !== undefined) payload.type = input.type;
  if (input.amount !== undefined) payload.amount = Number(input.amount);
  if (input.date !== undefined) payload.date = input.date;
  if (input.title !== undefined) payload.title = input.title.trim();
  if (input.notes !== undefined) payload.notes = input.notes.trim();
  if (input.method !== undefined) payload.method = input.method.trim();
  if (input.referenceNo !== undefined) payload.referenceNo = input.referenceNo.trim();
  if (input.status !== undefined) payload.status = input.status;

  await ref.update(payload);

  const updatedDoc = await ref.get();
  return docToPaymentEntry(updatedDoc);
}

/**
 * Delete a payment entry.
 */
export async function deletePaymentEntry(
  id: string,
  actor?: TimelineActor
): Promise<void> {
  const ref = db.collection("payment_entries").doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    throw new AppError(404, "Payment entry not found.", "ENTRY_NOT_FOUND");
  }

  const data = doc.data()!;
  const title = (data.title as string) || "Payment Entry";
  const amount = Number(data.amount || 0);

  await ref.delete();

  const initials = (actor?.name || "AD")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  logAction({
    actor: {
      uid: actor?.uid || "admin",
      name: actor?.name || "Administrator",
      role: (actor?.role || "admin") as "admin" | "employee" | "client",
      initials,
    },
    action: `Deleted Payment Entry (₹${amount.toLocaleString("en-IN")})`,
    target: `${data.projectTitle || "Project"} • ${title}`,
    status: "Completed",
  }).catch(() => {});
}

/**
 * Calculate payment summary for a specific project.
 */
export async function getProjectPaymentSummary(
  projectId: string
): Promise<ProjectPaymentSummary> {
  const projectDoc = await db.collection("projects").doc(projectId).get();
  if (!projectDoc.exists) {
    throw new AppError(404, "Project not found.", "PROJECT_NOT_FOUND");
  }

  const p = projectDoc.data()!;
  const budget = Number(p.amount || 0);

  const entriesSnap = await db
    .collection("payment_entries")
    .where("projectId", "==", projectId)
    .get();

  let totalReceived = 0;
  let totalInvested = 0;

  entriesSnap.docs.forEach((doc) => {
    const d = doc.data();
    const amt = Number(d.amount || 0);
    if (d.type === "received") {
      totalReceived += amt;
    } else if (d.type === "invested") {
      totalInvested += amt;
    }
  });

  const netBalance = totalReceived - totalInvested;
  const remainingBudget = Math.max(0, budget - totalReceived);
  const collectionPercent = budget > 0 ? Math.min(100, Math.round((totalReceived / budget) * 100)) : 0;

  return {
    projectId: projectDoc.id,
    projectCode: (p.code as string) || "",
    projectTitle: (p.title as string) || "",
    clientName: (p.clientName as string) || "",
    budget,
    totalReceived,
    totalInvested,
    netBalance,
    remainingBudget,
    collectionPercent,
    entriesCount: entriesSnap.size,
  };
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function docToPaymentEntry(
  doc: FirebaseFirestore.DocumentSnapshot
): PaymentTimelineRecord {
  const d = doc.data()!;
  return {
    id: doc.id,
    projectId: (d.projectId as string) || "",
    projectCode: (d.projectCode as string) || "",
    projectTitle: (d.projectTitle as string) || "",
    clientName: (d.clientName as string) || "",
    type: (d.type as PaymentEntryType) || "received",
    amount: Number(d.amount || 0),
    date: (d.date as string) || "",
    title: (d.title as string) || "",
    notes: (d.notes as string) || "",
    method: (d.method as string) || "Bank Wire / NEFT",
    referenceNo: (d.referenceNo as string) || "",
    status: (d.status as PaymentEntryStatus) || "cleared",
    createdBy: (d.createdBy as string) || "",
    createdByName: (d.createdByName as string) || "",
    createdAt: d.createdAt as Timestamp,
    updatedAt: d.updatedAt as Timestamp,
  };
}

