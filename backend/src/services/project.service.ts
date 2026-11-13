import { db } from "../config/firebase";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import { AppError } from "../utils/error";
import type { Project, CreateProjectInput, UpdateProjectInput, ProjectStatus } from "../types/dashboard";
import { logAction } from "./auditLog.service";

/**
 * List projects, optionally capped to `limit` entries ordered by amount desc.
 */
export async function listProjects(limit?: number): Promise<Project[]> {
  let query = db.collection("projects").orderBy("amount", "desc") as FirebaseFirestore.Query;
  if (limit && limit > 0) {
    query = query.limit(limit);
  }
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => docToProject(doc));
}

/**
 * Fetch a single project by Firestore doc ID.
 */
export async function getProjectById(id: string): Promise<Project> {
  const doc = await db.collection("projects").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Project not found.", "PROJECT_NOT_FOUND");
  }
  return docToProject(doc);
}

/**
 * Create a new project document.
 */
export async function createProject(
  input: CreateProjectInput,
  adminUid: string,
  adminName: string
): Promise<Project> {
  let code = input.code?.trim();

  if (code) {
    // Check if custom code already exists
    const existing = await db
      .collection("projects")
      .where("code", "==", code)
      .limit(1)
      .get();

    if (!existing.empty) {
      throw new AppError(409, `Project code "${code}" is already in use.`, "PROJECT_CODE_TAKEN");
    }
  } else {
    // Auto-generate unique project code
    let unique = false;
    while (!unique) {
      code = `PRJ-${Math.floor(1000 + Math.random() * 9000)}`;
      const existing = await db
        .collection("projects")
        .where("code", "==", code)
        .limit(1)
        .get();
      if (existing.empty) {
        unique = true;
      }
    }
  }

  const now = Timestamp.now();
  const ref = db.collection("projects").doc();

  const project: Project = {
    id: ref.id,
    code: code!,
    title: input.title.trim(),
    description: input.description?.trim() || "",
    clientId: input.clientId?.trim() || "CLI-INTERNAL",
    clientName: input.clientName?.trim() || "Internal / Direct",
    amount: input.amount,
    sharePercent: input.sharePercent ?? 0,
    status: input.status || "on-track",
    startDate: input.startDate || new Date().toISOString().split("T")[0],
    endDate: input.endDate,
    // Always start empty — engineers are linked when they sign a contract
    assignedTo: [],
    assignedNames: [],
    createdBy: adminUid,
    createdAt: now,
    updatedAt: now,
  };

  await ref.set(project);

  // Async audit — intentionally not awaited so it doesn't block response
  logAction({
    actor: { uid: adminUid, name: adminName, role: "admin", initials: initials(adminName) },
    action: `Created Project ${project.code}`,
    target: `${project.title} (${project.clientName})`,
    status: "Completed",
  }).catch(() => void 0);

  return project;
}

/**
 * Update project fields by doc ID.
 */
export async function updateProject(
  id: string,
  input: UpdateProjectInput,
  adminUid: string,
  adminName: string
): Promise<void> {
  const doc = await db.collection("projects").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Project not found.", "PROJECT_NOT_FOUND");
  }

  // Strip assignedTo / assignedNames — these are exclusively managed by the
  // contract service when an employee signs or a contract is revoked.
  const { assignedTo: _a, assignedNames: _n, ...safeInput } = input as any;

  await db.collection("projects").doc(id).update({
    ...safeInput,
    updatedAt: FieldValue.serverTimestamp(),
  });

  logAction({
    actor: { uid: adminUid, name: adminName, role: "admin", initials: initials(adminName) },
    action: `Updated Project ${doc.data()?.code ?? id}`,
    target: `${doc.data()?.title} (${doc.data()?.clientId})`,
    status: "Updated",
  }).catch(() => void 0);
}

/**
 * Delete a project by doc ID.
 */
export async function deleteProject(
  id: string,
  adminUid: string,
  adminName: string
): Promise<void> {
  const doc = await db.collection("projects").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Project not found.", "PROJECT_NOT_FOUND");
  }

  const data = doc.data();
  await db.collection("projects").doc(id).delete();

  logAction({
    actor: { uid: adminUid, name: adminName, role: "admin", initials: initials(adminName) },
    action: `Deleted Project ${data?.code ?? id}`,
    target: `${data?.title} (${data?.clientId})`,
    status: "Completed",
  }).catch(() => void 0);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function docToProject(doc: FirebaseFirestore.DocumentSnapshot): Project {
  const d = doc.data()!;
  return {
    id: doc.id,
    code: (d.code as string) || "PRJ-0000",
    title: (d.title as string) || "Untitled Project",
    description: (d.description as string) || "",
    clientId: (d.clientId as string) || "CLI-INTERNAL",
    clientName: (d.clientName as string) || "Internal / Direct",
    amount: (d.amount as number) || 0,
    sharePercent: (d.sharePercent as number) || 0,
    status: (d.status as ProjectStatus) || "on-track",
    startDate: (d.startDate as string) || "",
    endDate: (d.endDate as string) || "",
    assignedTo: (d.assignedTo as string[]) || [],
    assignedNames: (d.assignedNames as string[]) || [],
    createdBy: (d.createdBy as string) || "",
    createdAt: d.createdAt as Timestamp,
    updatedAt: d.updatedAt as Timestamp,
  };
}

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

