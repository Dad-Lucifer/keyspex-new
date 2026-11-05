import { db } from "../config/firebase";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import type { AuditLogEntry, AuditActor, AuditStatus } from "../types/dashboard";

type LogActionInput = Omit<AuditLogEntry, "id" | "time">;

/**
 * Write a single audit log entry to Firestore.
 * Fire-and-forget safe — callers should not await this in hot paths if latency matters.
 */
export async function logAction(entry: LogActionInput): Promise<void> {
  const ref = db.collection("auditLog").doc();
  await ref.set({
    ...entry,
    time: FieldValue.serverTimestamp(),
  });
}

/**
 * Fetch the N most recent audit log entries.
 */
export async function getRecentActivity(limit = 10): Promise<AuditLogEntry[]> {
  const snapshot = await db
    .collection("auditLog")
    .orderBy("time", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      actor: data.actor as AuditActor,
      action: data.action as string,
      target: data.target as string,
      time: data.time as Timestamp,
      status: data.status as AuditStatus,
    };
  });
}

