import { db } from "../config/firebase";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import { AppError } from "../utils/error";
import type { Obligation, CreateObligationInput, UpdateObligationInput, ObligationStatus } from "../types/dashboard";

/**
 * List obligations ordered by dueDate ascending.
 * Pass `next14days=true` to filter to the next 14 days only.
 */
export async function listObligations(next14days = false): Promise<Obligation[]> {
  let query = db.collection("obligations").orderBy("dueDate", "asc") as FirebaseFirestore.Query;

  if (next14days) {
    const today = new Date();
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() + 14);
    const todayStr = today.toISOString().slice(0, 10);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    query = query.where("dueDate", ">=", todayStr).where("dueDate", "<=", cutoffStr);
  }

  const snapshot = await query.get();
  return snapshot.docs.map((doc) => docToObligation(doc));
}

/**
 * Fetch a single obligation by doc ID.
 */
export async function getObligationById(id: string): Promise<Obligation> {
  const doc = await db.collection("obligations").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Obligation not found.", "OBLIGATION_NOT_FOUND");
  }
  return docToObligation(doc);
}

/**
 * Create a new obligation.
 */
export async function createObligation(input: CreateObligationInput): Promise<Obligation> {
  const now = Timestamp.now();
  const ref = db.collection("obligations").doc();

  const record: Obligation = {
    id: ref.id,
    dueDate: input.dueDate,
    title: input.title,
    account: input.account,
    amount: input.amount,
    status: input.status,
    createdAt: now,
    updatedAt: now,
  };

  await ref.set(record);
  return record;
}

/**
 * Update an obligation by doc ID.
 */
export async function updateObligation(id: string, input: UpdateObligationInput): Promise<void> {
  const doc = await db.collection("obligations").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Obligation not found.", "OBLIGATION_NOT_FOUND");
  }
  await db.collection("obligations").doc(id).update({
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

/**
 * Delete an obligation by doc ID.
 */
export async function deleteObligation(id: string): Promise<void> {
  const doc = await db.collection("obligations").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Obligation not found.", "OBLIGATION_NOT_FOUND");
  }
  await db.collection("obligations").doc(id).delete();
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function docToObligation(doc: FirebaseFirestore.DocumentSnapshot): Obligation {
  const d = doc.data()!;
  return {
    id: doc.id,
    dueDate: d.dueDate as string,
    title: d.title as string,
    account: d.account as string,
    amount: d.amount as number,
    status: d.status as ObligationStatus,
    createdAt: d.createdAt as Timestamp,
    updatedAt: d.updatedAt as Timestamp,
  };
}

