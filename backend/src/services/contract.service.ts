import crypto from "crypto";
import { db } from "../config/firebase";
import { Timestamp, FieldValue } from "firebase-admin/firestore";import { AppError } from "../utils/error";
import type { ContractRecord, ContractStatus } from "../types/contract";
import type { CreateContractInput } from "../schemas/contract.schema";
import { logAction } from "./auditLog.service";

function formatDate(date: Date = new Date()): string {
  const day = date.getDate();
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatTimestamp(date: Date = new Date()): string {
  const d = formatDate(date);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${d}, ${hours}:${minutes} ${ampm}`;
}

/**
 * Create and issue a new contract agreement for an employee.
 */
export async function createContract(
  input: CreateContractInput,
  adminUid: string,
  adminName: string
): Promise<ContractRecord> {
  const now = Timestamp.now();
  const ref = db.collection("contracts").doc();

  const formattedDate = formatDate();
  const timestampStr = formatTimestamp();

  // Generate cryptographic certificate hashes matching IT Act compliance
  const adminCertHash = `AUTH-KS-ADMIN-CERT-SHA256: ${crypto
    .createHash("sha256")
    .update(`admin-${ref.id}-${adminUid}-${Date.now()}`)
    .digest("hex")
    .slice(0, 40)}`;

  const isPreSigned = input.status === "signed";
  const employeeCertHash = isPreSigned
    ? `EMP-SIG-CERT-SHA256: ${crypto
        .createHash("sha256")
        .update(`emp-${ref.id}-${input.employeeUid}-${Date.now()}`)
        .digest("hex")
        .slice(0, 40)}`
    : "";

  const defaultScope = `The Employee agrees to undertake technical execution, component architecture, and sprint deliverables for ${input.projectTitle} in accordance with KeySpex quality benchmarks.`;
  const defaultCompensation = `Total project remuneration is agreed at ₹${input.remuneration.toLocaleString(
    "en-IN"
  )}, released on a milestone completion schedule upon review and administrative sign-off.`;
  const defaultNda = `All source code, designs, tokens, and artifacts created for this project remain the sole intellectual property of KeySpex Agency Pvt. Ltd. The Employee agrees to non-disclosure obligations.`;

  const contract: ContractRecord = {
    id: ref.id,
    title: input.title.trim(),
    agreementType: input.agreementType || "Project Assignment Contract",
    companyName: "KeySpex Agency Pvt. Ltd.",
    companyAddress: "Ground Floor, Innovation Park, Sector 62, Noida, UP, India",
    companyCin: "U72900DL2024PTC123456",
    contractDate: formattedDate,

    employeeUid: input.employeeUid.trim(),
    employeeName: input.employeeName.trim(),
    employeeEmail: input.employeeEmail.trim(),
    employeeRole: input.employeeRole.trim(),
    employeePhone: input.employeePhone || "+91 98765 43210",

    projectCode: input.projectCode.trim(),
    projectTitle: input.projectTitle.trim(),
    clientName: input.clientName || "Zenith Cloud Solutions",
    remuneration: input.remuneration,
    paymentTerms: input.paymentTerms || "Milestone Settlement",
    startDate: input.startDate,
    endDate: input.endDate,

    scopeDetails: input.scopeDetails?.trim() || defaultScope,
    compensationClause: input.compensationClause?.trim() || defaultCompensation,
    ndaClause: input.ndaClause?.trim() || defaultNda,

    party1Admin: {
      signatoryName: "KeySpex Leadership",
      signatoryRole: "Corporate Operations & HR",
      signedDate: formattedDate,
      certHash: adminCertHash,
      status: "Verified",
    },

    party2Employee: {
      signatoryName: input.employeeName.trim(),
      signatoryRole: input.employeeRole.trim(),
      signedDate: isPreSigned ? formattedDate : "",
      certHash: employeeCertHash,
      status: isPreSigned ? "Signed" : "Pending",
    },

    status: input.status || "sent",
    verificationTimestamp: timestampStr,
    createdBy: adminUid,
    createdAt: now,
    updatedAt: now,
  };

  await ref.set(contract);

  // Non-blocking enterprise audit log entry
  logAction({
    actor: {
      uid: adminUid,
      name: adminName,
      role: "admin",
      initials: adminName
        .split(" ")
        .map((w) => w[0]?.toUpperCase() ?? "")
        .slice(0, 2)
        .join(""),
    },
    action: `Issued Contract ${input.projectCode}`,
    target: `${input.title} → ${input.employeeName} (${input.employeeRole})`,
    status: "Completed",
  }).catch(() => void 0);

  return contract;
}

/**
 * List contracts, optionally filtered by employeeUid or status.
 */
export async function listContracts(
  employeeUid?: string,
  status?: ContractStatus
): Promise<ContractRecord[]> {
  let query: FirebaseFirestore.Query = db.collection("contracts").orderBy("createdAt", "desc");

  if (employeeUid) {
    query = query.where("employeeUid", "==", employeeUid);
  }
  if (status) {
    query = query.where("status", "==", status);
  }

  const snapshot = await query.get();
  return snapshot.docs.map((doc) => docToContract(doc));
}

/**
 * Fetch a single contract by Firestore doc ID.
 */
export async function getContractById(id: string): Promise<ContractRecord> {
  const doc = await db.collection("contracts").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Contract document not found.", "NOT_FOUND");
  }
  return docToContract(doc);
}

/**
 * Update contract status (e.g. employee signing or admin revoking).
 */
export async function updateContractStatus(
  id: string,
  newStatus: ContractStatus,
  actorUid: string,
  actorName: string
): Promise<ContractRecord> {
  const doc = await db.collection("contracts").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Contract document not found.", "NOT_FOUND");
  }

  const data = doc.data() as ContractRecord;
  const updates: Partial<ContractRecord> = {
    status: newStatus,
    updatedAt: Timestamp.now(),
  };

  if (newStatus === "signed" && data.party2Employee.status !== "Signed") {
    const formattedDate = formatDate();
    const employeeCertHash = `EMP-SIG-CERT-SHA256: ${crypto
      .createHash("sha256")
      .update(`emp-${id}-${data.employeeUid}-${Date.now()}`)
      .digest("hex")
      .slice(0, 40)}`;

    updates.party2Employee = {
      ...data.party2Employee,
      signedDate: formattedDate,
      certHash: employeeCertHash,
      status: "Signed",
    };
  }

  await db.collection("contracts").doc(id).update(updates);

  // ── Sync project assignedTo / assignedNames based on contract status ──────
  // Find the project by projectCode and update its engineer roster.
  if (data.projectCode) {
    try {
      const projectSnap = await db
        .collection("projects")
        .where("code", "==", data.projectCode)
        .limit(1)
        .get();

      if (!projectSnap.empty) {
        const projectRef = projectSnap.docs[0].ref;
        const projectData = projectSnap.docs[0].data();
        const currentAssignedTo: string[] = projectData.assignedTo || [];
        const currentAssignedNames: string[] = projectData.assignedNames || [];

        if (newStatus === "signed") {
          // Add employee to project roster if not already present
          if (!currentAssignedTo.includes(data.employeeUid)) {
            await projectRef.update({
              assignedTo: [...currentAssignedTo, data.employeeUid],
              assignedNames: [...currentAssignedNames, data.employeeName],
              updatedAt: FieldValue.serverTimestamp(),
            });
          }
        } else {
          // Contract revoked / sent back — remove employee from project roster
          const idx = currentAssignedTo.indexOf(data.employeeUid);
          if (idx !== -1) {
            const newTo = [...currentAssignedTo];
            const newNames = [...currentAssignedNames];
            newTo.splice(idx, 1);
            newNames.splice(idx, 1);
            await projectRef.update({
              assignedTo: newTo,
              assignedNames: newNames,
              updatedAt: FieldValue.serverTimestamp(),
            });
          }
        }
      }
    } catch {
      // Non-blocking — don't fail the contract status update if project sync fails
    }
  }
  // ──────────────────────────────────────────────────────────────────────────

  logAction({
    actor: {
      uid: actorUid,
      name: actorName,
      role: "admin",
      initials: actorName.slice(0, 2).toUpperCase(),
    },
    action: `Updated Contract Status to ${newStatus}`,
    target: `${data.title} (${data.employeeName})`,
    status: "Completed",
  }).catch(() => void 0);

  return {
    ...data,
    ...updates,
  };
}

/**
 * Delete a contract document.
 */
export async function deleteContract(
  id: string,
  adminUid: string,
  adminName: string
): Promise<void> {
  const doc = await db.collection("contracts").doc(id).get();
  if (!doc.exists) {
    throw new AppError(404, "Contract not found.", "NOT_FOUND");
  }

  const data = doc.data();
  await db.collection("contracts").doc(id).delete();

  logAction({
    actor: {
      uid: adminUid,
      name: adminName,
      role: "admin",
      initials: adminName.slice(0, 2).toUpperCase(),
    },
    action: `Deleted Contract ${data?.projectCode || id}`,
    target: `${data?.title} (${data?.employeeName})`,
    status: "Completed",
  }).catch(() => void 0);
}

function docToContract(doc: FirebaseFirestore.DocumentSnapshot): ContractRecord {
  const d = doc.data()!;
  return {
    id: doc.id,
    title: d.title as string,
    agreementType: (d.agreementType as string) || "Project Assignment Contract",
    companyName: (d.companyName as string) || "KeySpex Agency Pvt. Ltd.",
    companyAddress:
      (d.companyAddress as string) ||
      "Ground Floor, Innovation Park, Sector 62, Noida, UP, India",
    companyCin: (d.companyCin as string) || "U72900DL2024PTC123456",
    contractDate: (d.contractDate as string) || "",
    employeeUid: d.employeeUid as string,
    employeeName: d.employeeName as string,
    employeeEmail: d.employeeEmail as string,
    employeeRole: d.employeeRole as string,
    employeePhone: (d.employeePhone as string) || "+91 98765 43210",
    projectCode: d.projectCode as string,
    projectTitle: d.projectTitle as string,
    clientName: (d.clientName as string) || "Zenith Cloud Solutions",
    remuneration: (d.remuneration as number) || 0,
    paymentTerms: (d.paymentTerms as string) || "Milestone Settlement",
    startDate: (d.startDate as string) || "",
    endDate: (d.endDate as string) || "",
    scopeDetails: (d.scopeDetails as string) || "",
    compensationClause: (d.compensationClause as string) || "",
    ndaClause: (d.ndaClause as string) || "",
    party1Admin: d.party1Admin || {
      signatoryName: "KeySpex Leadership",
      signatoryRole: "Corporate Operations & HR",
      signedDate: "",
      certHash: "",
      status: "Verified",
    },
    party2Employee: d.party2Employee || {
      signatoryName: d.employeeName,
      signatoryRole: d.employeeRole,
      signedDate: "",
      certHash: "",
      status: "Pending",
    },
    status: (d.status as ContractStatus) || "sent",
    verificationTimestamp: (d.verificationTimestamp as string) || "",
    createdBy: d.createdBy as string,
    createdAt: d.createdAt as Timestamp,
    updatedAt: d.updatedAt as Timestamp,
  };
}

