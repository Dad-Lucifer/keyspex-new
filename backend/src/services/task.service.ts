import { db } from "../config/firebase";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import { AppError } from "../utils/error";
import { logAction } from "./auditLog.service";
import type { TaskRecord, CreateTaskInput, UpdateTaskInput, TaskPriority, TaskStatus } from "../types/task";

export interface TaskActor {
  uid: string;
  name?: string;
  email?: string;
  role?: string;
}

/**
 * List tasks from Firestore.
 * Supports filtering by status, priority, and assigned employee UID.
 */
export async function listTasks(filters?: {
  status?: string;
  priority?: string;
  assignedTo?: string;
}): Promise<TaskRecord[]> {
  let query: FirebaseFirestore.Query = db.collection("tasks");

  if (filters?.assignedTo) {
    query = query.where("assignedTo", "==", filters.assignedTo);
  }
  if (filters?.status) {
    query = query.where("status", "==", filters.status);
  }
  if (filters?.priority) {
    query = query.where("priority", "==", filters.priority);
  }

  const snapshot = await query.get();
  const tasks = snapshot.docs.map((doc) => docToTask(doc));

  // Sort primarily by dueDate asc, secondary createdAt desc
  tasks.sort((a, b) => {
    if (a.dueDate < b.dueDate) return -1;
    if (a.dueDate > b.dueDate) return 1;
    const aTime = a.createdAt?.seconds || 0;
    const bTime = b.createdAt?.seconds || 0;
    return bTime - aTime;
  });

  return tasks;
}

/**
 * Fetch a single task by doc ID.
 */
export async function getTaskById(id: string): Promise<TaskRecord> {
  const doc = await db.collection("tasks").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Task not found.", "TASK_NOT_FOUND");
  }
  return docToTask(doc);
}

/**
 * Create and assign a new task.
 */
export async function createTask(
  input: CreateTaskInput,
  actor?: TaskActor
): Promise<TaskRecord> {
  const now = Timestamp.now();
  const ref = db.collection("tasks").doc();

  const rawInput = input as any;

  const record: TaskRecord & {
    projectId?: string;
    projectCode?: string;
    projectTitle?: string;
  } = {
    id: ref.id,
    title: input.title.trim(),
    description: (input.description || "").trim(),
    dueDate: input.dueDate,
    assignedTo: input.assignedTo,
    assignedEmployeeName: input.assignedEmployeeName.trim(),
    assignedEmployeeEmail: input.assignedEmployeeEmail?.trim() || "",
    assignedEmployeeRole: input.assignedEmployeeRole?.trim() || "",
    projectId: (rawInput.projectId || "").trim(),
    projectCode: (rawInput.projectCode || "").trim(),
    projectTitle: (rawInput.projectTitle || "").trim(),
    priority: (input.priority || "medium") as TaskPriority,
    status: (input.status || "todo") as TaskStatus,
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

  logAction({
    actor: {
      uid: actor?.uid || "admin",
      name: actor?.name || "Administrator",
      role: (actor?.role || "admin") as "admin" | "employee" | "client",
      initials,
    },
    action: "Assigned Task",
    target: `${record.title} → ${record.assignedEmployeeName}`,
    status: "Completed",
  }).catch(() => {});

  return record;
}

/**
 * Update an existing task.
 */
export async function updateTask(
  id: string,
  input: UpdateTaskInput,
  actor?: TaskActor
): Promise<TaskRecord> {
  const ref = db.collection("tasks").doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    throw new AppError(404, "Task not found.", "TASK_NOT_FOUND");
  }

  const existingData = doc.data()!;
  const rawInput = input as any;
  const updatePayload: Record<string, unknown> = {
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (input.title !== undefined) updatePayload.title = input.title.trim();
  if (input.description !== undefined) updatePayload.description = input.description.trim();
  if (input.dueDate !== undefined) updatePayload.dueDate = input.dueDate;
  if (input.assignedTo !== undefined) updatePayload.assignedTo = input.assignedTo;
  if (input.assignedEmployeeName !== undefined)
    updatePayload.assignedEmployeeName = input.assignedEmployeeName.trim();
  if (input.assignedEmployeeEmail !== undefined)
    updatePayload.assignedEmployeeEmail = input.assignedEmployeeEmail.trim();
  if (input.assignedEmployeeRole !== undefined)
    updatePayload.assignedEmployeeRole = input.assignedEmployeeRole.trim();
  if (rawInput.projectId !== undefined) updatePayload.projectId = rawInput.projectId.trim();
  if (rawInput.projectCode !== undefined) updatePayload.projectCode = rawInput.projectCode.trim();
  if (rawInput.projectTitle !== undefined) updatePayload.projectTitle = rawInput.projectTitle.trim();
  if (input.priority !== undefined) updatePayload.priority = input.priority;
  if (input.status !== undefined) updatePayload.status = input.status;

  await ref.update(updatePayload);

  // If status or assignment changed, record audit
  if (
    (input.status && input.status !== existingData.status) ||
    (input.assignedTo && input.assignedTo !== existingData.assignedTo)
  ) {
    const initials = (actor?.name || "AD")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const changeDescription = input.status
      ? `Updated Task Status: ${existingData.title} → ${input.status}`
      : `Reassigned Task: ${existingData.title} → ${input.assignedEmployeeName}`;

    logAction({
      actor: {
        uid: actor?.uid || "admin",
        name: actor?.name || "Administrator",
        role: (actor?.role || "admin") as "admin" | "employee" | "client",
        initials,
      },
      action: changeDescription,
      target: existingData.title as string,
      status: "Updated",
    }).catch(() => {});
  }

  const updatedDoc = await ref.get();
  return docToTask(updatedDoc);
}

/**
 * Delete a task.
 */
export async function deleteTask(id: string, actor?: TaskActor): Promise<void> {
  const ref = db.collection("tasks").doc(id);
  const doc = await ref.get();
  if (!doc.exists) {
    throw new AppError(404, "Task not found.", "TASK_NOT_FOUND");
  }

  const taskTitle = doc.data()?.title || "Task";
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
    action: "Deleted Task",
    target: taskTitle,
    status: "Completed",
  }).catch(() => {});
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function docToTask(doc: FirebaseFirestore.DocumentSnapshot): TaskRecord {
  const d = doc.data()!;
  return {
    id: doc.id,
    title: (d.title as string) || "",
    description: (d.description as string) || "",
    dueDate: (d.dueDate as string) || "",
    assignedTo: (d.assignedTo as string) || "",
    assignedEmployeeName: (d.assignedEmployeeName as string) || "",
    assignedEmployeeEmail: (d.assignedEmployeeEmail as string) || "",
    assignedEmployeeRole: (d.assignedEmployeeRole as string) || "",
    ...(d.projectId ? { projectId: d.projectId as string } : {}),
    ...(d.projectCode ? { projectCode: d.projectCode as string } : {}),
    ...(d.projectTitle ? { projectTitle: d.projectTitle as string } : {}),
    priority: (d.priority as TaskPriority) || "medium",
    status: (d.status as TaskStatus) || "todo",
    createdBy: (d.createdBy as string) || "",
    createdByName: (d.createdByName as string) || "",
    createdAt: d.createdAt as Timestamp,
    updatedAt: d.updatedAt as Timestamp,
  } as TaskRecord;
}