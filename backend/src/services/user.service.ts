import { auth, db } from "../config/firebase";
import { AppError } from "../utils/error";
import type { CreateUserInput, UpdateUserInput } from "../schemas/user.schema";
import type { UserRecord, UserRole } from "../types";
import { Timestamp, FieldValue, Query, QueryDocumentSnapshot } from "firebase-admin/firestore";
import type { UpdateRequest } from "firebase-admin/auth";

export async function createUser(
  input: CreateUserInput,
  createdByUid: string,
  createdByRole: UserRole
): Promise<UserRecord> {
  // Only admin can create users
  if (createdByRole !== "admin") {
    throw new AppError(403, "Only admins can create users.", "FORBIDDEN");
  }

  // Check email not already registered
  try {
    await auth.getUserByEmail(input.email);
    throw new AppError(409, "A user with this email already exists.", "EMAIL_TAKEN");
  } catch (err) {
    if (err instanceof AppError) throw err;
    // getUserByEmail throws auth/user-not-found — that is expected, continue
  }

  // Create user in Firebase Auth
  const firebaseUser = await auth.createUser({
    email: input.email,
    password: input.password,
    displayName: input.displayName,
    emailVerified: false,
  });

  // Set custom claim for role (useful for Firebase rules / direct Firebase SDK usage)
  await auth.setCustomUserClaims(firebaseUser.uid, { role: input.role });

  const now = Timestamp.now();

  const userRecord: UserRecord = {
    uid: firebaseUser.uid,
    email: input.email,
    role: input.role,
    displayName: input.displayName,
    contactNo: input.contactNo,
    createdBy: createdByUid,
    createdAt: now,
    updatedAt: now,
    active: true,
    ...(input.contactEmail ? { contactEmail: input.contactEmail } : {}),
    ...(input.portfolioUrl ? { portfolioUrl: input.portfolioUrl } : {}),
  };

  await db.collection("users").doc(firebaseUser.uid).set(userRecord);

  return userRecord;
}

export async function listUsers(
  requestorRole: UserRole,
  filterRole?: UserRole
): Promise<Partial<UserRecord>[]> {
  if (requestorRole !== "admin") {
    throw new AppError(403, "Only admins can list users.", "FORBIDDEN");
  }

  let query: Query = db.collection("users");
  if (filterRole) {
    query = query.where("role", "==", filterRole);
  }

  const snapshot = await query.orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc: QueryDocumentSnapshot) => {
    const data = doc.data() as UserRecord;
    return {
      uid: data.uid,
      email: data.email,
      role: data.role,
      displayName: data.displayName,
      active: data.active,
      createdAt: data.createdAt,
      lastLoginAt: data.lastLoginAt,
      contactNo: data.contactNo,
      contactEmail: data.contactEmail,
      portfolioUrl: data.portfolioUrl,
    };
  });
}

export async function getUserById(uid: string): Promise<UserRecord> {
  const doc = await db.collection("users").doc(uid).get();
  if (!doc.exists) {
    throw new AppError(404, "User not found.", "USER_NOT_FOUND");
  }
  return doc.data() as UserRecord;
}

export async function updateUser(
  targetUid: string,
  input: UpdateUserInput,
  requestorUid: string,
  requestorRole: UserRole
): Promise<void> {
  // Users can update their own profile; admin can update anyone
  if (requestorRole !== "admin" && requestorUid !== targetUid) {
    throw new AppError(403, "Insufficient permissions.", "FORBIDDEN");
  }

  const doc = await db.collection("users").doc(targetUid).get();
  if (!doc.exists) {
    throw new AppError(404, "User not found.", "USER_NOT_FOUND");
  }

  // Non-admins cannot deactivate/activate accounts
  if (input.active !== undefined && requestorRole !== "admin") {
    throw new AppError(403, "Only admins can change account status.", "FORBIDDEN");
  }

  const firestoreUpdate: Record<string, unknown> = {
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (input.displayName) firestoreUpdate.displayName = input.displayName;
  if (input.active !== undefined) firestoreUpdate.active = input.active;
  if (input.contactNo !== undefined) firestoreUpdate.contactNo = input.contactNo;
  if (input.contactEmail !== undefined) firestoreUpdate.contactEmail = input.contactEmail;
  if (input.portfolioUrl !== undefined) firestoreUpdate.portfolioUrl = input.portfolioUrl;

  const authUpdate: UpdateRequest = {};
  if (input.displayName) authUpdate.displayName = input.displayName;
  if (input.password) authUpdate.password = input.password;
  if (input.active !== undefined) authUpdate.disabled = !input.active;

  await Promise.all([
    db.collection("users").doc(targetUid).update(firestoreUpdate),
    auth.updateUser(targetUid, authUpdate),
  ]);
}

export async function deleteUser(
  targetUid: string,
  requestorRole: UserRole
): Promise<void> {
  if (requestorRole !== "admin") {
    throw new AppError(403, "Only admins can delete users.", "FORBIDDEN");
  }

  const doc = await db.collection("users").doc(targetUid).get();
  if (!doc.exists) {
    throw new AppError(404, "User not found.", "USER_NOT_FOUND");
  }

  await Promise.all([
    auth.deleteUser(targetUid),
    db.collection("users").doc(targetUid).delete(),
  ]);
}

