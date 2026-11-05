import { db } from "../config/firebase";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import { AppError } from "../utils/error";
import type { CalendarEvent, CreateEventInput, UpdateEventInput, EventTag } from "../types/dashboard";

/**
 * List calendar events ordered by date ascending.
 * Pass `upcoming=true` to restrict to today and beyond.
 */
export async function listEvents(upcoming = false): Promise<CalendarEvent[]> {
  let query = db.collection("events").orderBy("date", "asc") as FirebaseFirestore.Query;

  if (upcoming) {
    const todayStr = new Date().toISOString().slice(0, 10);
    query = query.where("date", ">=", todayStr);
  }

  const snapshot = await query.get();
  return snapshot.docs.map((doc) => docToEvent(doc));
}

/**
 * Fetch a single event by doc ID.
 */
export async function getEventById(id: string): Promise<CalendarEvent> {
  const doc = await db.collection("events").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Event not found.", "EVENT_NOT_FOUND");
  }
  return docToEvent(doc);
}

/**
 * Create a new calendar event.
 */
export async function createEvent(
  input: CreateEventInput,
  adminUid: string
): Promise<CalendarEvent> {
  const now = Timestamp.now();
  const ref = db.collection("events").doc();

  const record: CalendarEvent = {
    id: ref.id,
    date: input.date,
    title: input.title,
    time: input.time,
    context: input.context,
    tag: input.tag,
    createdBy: adminUid,
    createdAt: now,
    updatedAt: now,
  };

  await ref.set(record);
  return record;
}

/**
 * Update a calendar event by doc ID.
 */
export async function updateEvent(id: string, input: UpdateEventInput): Promise<void> {
  const doc = await db.collection("events").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Event not found.", "EVENT_NOT_FOUND");
  }
  await db.collection("events").doc(id).update({
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

/**
 * Delete a calendar event by doc ID.
 */
export async function deleteEvent(id: string): Promise<void> {
  const doc = await db.collection("events").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Event not found.", "EVENT_NOT_FOUND");
  }
  await db.collection("events").doc(id).delete();
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function docToEvent(doc: FirebaseFirestore.DocumentSnapshot): CalendarEvent {
  const d = doc.data()!;
  return {
    id: doc.id,
    date: d.date as string,
    title: d.title as string,
    time: d.time as string,
    context: d.context as string,
    tag: d.tag as EventTag,
    createdBy: d.createdBy as string,
    createdAt: d.createdAt as Timestamp,
    updatedAt: d.updatedAt as Timestamp,
  };
}

