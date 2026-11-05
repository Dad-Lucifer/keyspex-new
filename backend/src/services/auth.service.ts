import { auth, db } from "../config/firebase";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { AppError } from "../utils/error";
import type { LoginInput } from "../schemas/auth.schema";
import type { AuthTokens, UserRecord, UserRole } from "../types";
import { FieldValue } from "firebase-admin/firestore";

const REFRESH_COOKIE_NAME = "ks_refresh";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  path: "/api/auth",
};

export { REFRESH_COOKIE_NAME, COOKIE_OPTIONS };

// ─── Firebase REST Identity Toolkit endpoint ─────────────────────────────────
// Firebase Admin SDK cannot verify passwords (server-side only).
// We call the public signInWithPassword REST endpoint which returns
// the Firebase UID on success and throws on wrong password.
const FIREBASE_SIGNIN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

async function verifyFirebasePassword(email: string, password: string): Promise<string> {
  const apiKey = process.env.FIREBASE_API_KEY;
  if (!apiKey) {
    throw new AppError(500, "FIREBASE_API_KEY is not set in backend/.env", "CONFIG_ERROR");
  }

  const res = await fetch(`${FIREBASE_SIGNIN_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    localId?: string;
    error?: { message?: string; code?: number };
  };

  if (!res.ok) {
    const errorMsg = data?.error?.message || "AUTHENTICATION_FAILED";
    console.error(`[Auth] Firebase Identity Toolkit error for ${email}:`, errorMsg);

    if (errorMsg === "OPERATION_NOT_ALLOWED") {
      throw new AppError(
        403,
        "Email/Password sign-in is not enabled in Firebase Console. Go to Authentication > Sign-in method and enable Email/Password.",
        "OPERATION_NOT_ALLOWED"
      );
    }
    if (errorMsg === "API_KEY_INVALID" || errorMsg.includes("API key")) {
      throw new AppError(
        500,
        "Invalid FIREBASE_API_KEY. Please verify the Web API Key in your backend/.env",
        "INVALID_API_KEY"
      );
    }
    if (
      errorMsg === "INVALID_PASSWORD" ||
      errorMsg === "INVALID_LOGIN_CREDENTIALS" ||
      errorMsg === "EMAIL_NOT_FOUND"
    ) {
      throw new AppError(401, "Invalid email or password.", "INVALID_CREDENTIALS");
    }
    throw new AppError(401, errorMsg, "INVALID_CREDENTIALS");
  }

  if (!data.localId) {
    console.error("[Auth] No localId returned by Firebase:", data);
    throw new AppError(500, "Authentication provider did not return user ID.", "AUTH_ERROR");
  }

  return data.localId;
}

export async function loginUser(input: LoginInput): Promise<{
  tokens: AuthTokens;
  refreshToken: string;
  user: Omit<UserRecord, "createdAt" | "updatedAt" | "lastLoginAt">;
}> {
  console.log(`[Auth] Login attempt for: ${input.email}`);

  // 1. Verify email & password with Firebase Auth
  const uid = await verifyFirebasePassword(input.email, input.password);
  console.log(`[Auth] Firebase credentials verified successfully. UID: ${uid}`);

  // 2. Fetch user profile from Firestore 'users' collection
  let userDoc = await db.collection("users").doc(uid).get();

  // Fallback: If not found by doc(uid), search by email in case doc was created with custom/auto ID
  if (!userDoc.exists) {
    console.warn(`[Auth] Document 'users/${uid}' not found. Searching by email: ${input.email}...`);
    const querySnapshot = await db
      .collection("users")
      .where("email", "==", input.email.toLowerCase())
      .limit(1)
      .get();

    if (!querySnapshot.empty) {
      userDoc = querySnapshot.docs[0];
      console.log(`[Auth] Found matching user by email with doc ID: ${userDoc.id}`);
    }
  }

  // Fallback: If still not in Firestore, auto-provision user from Firebase Auth
  if (!userDoc.exists) {
    console.warn(`[Auth] No Firestore record found for ${input.email}. Auto-syncing from Firebase Auth...`);
    const firebaseUser = await auth.getUser(uid);
    const role = (firebaseUser.customClaims?.role as UserRole) || "admin";

    const now = FieldValue.serverTimestamp();
    const newProfile = {
      uid,
      email: input.email.toLowerCase(),
      role,
      displayName: firebaseUser.displayName || input.email.split("@")[0],
      active: true,
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    };

    await db.collection("users").doc(uid).set(newProfile, { merge: true });
    userDoc = await db.collection("users").doc(uid).get();
    console.log(`[Auth] Auto-created Firestore profile for UID: ${uid} with role: ${role}`);
  }

  const userData = userDoc.data() as UserRecord;

  if (userData.active === false) {
    console.warn(`[Auth] Login blocked: Account ${input.email} is deactivated.`);
    throw new AppError(
      403,
      "Your account has been deactivated. Contact your administrator.",
      "ACCOUNT_INACTIVE"
    );
  }

  // 3. Issue JWT tokens
  const payload = {
    uid,
    email: userData.email,
    role: userData.role || "admin",
  };

  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // 4. Update lastLoginAt in Firestore (non-blocking, best-effort)
  db.collection("users")
    .doc(userDoc.id)
    .update({ lastLoginAt: FieldValue.serverTimestamp() })
    .catch((err) => console.error("[Auth] Failed to update lastLoginAt:", err));

  console.log(`[Auth] Login successful for ${input.email} (${userData.role})`);

  return {
    tokens: {
      accessToken,
      expiresIn: 15 * 60, // 15 mins in seconds
    },
    refreshToken,
    user: {
      uid,
      email: userData.email,
      role: userData.role || "admin",
      displayName: userData.displayName || userData.email.split("@")[0],
      active: userData.active ?? true,
    },
  };
}

export async function refreshTokens(refreshToken: string | undefined): Promise<AuthTokens & { refreshToken: string }> {
  if (!refreshToken) {
    throw new AppError(401, "No refresh token provided.", "NO_REFRESH_TOKEN");
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError(401, "Invalid or expired refresh token.", "REFRESH_TOKEN_INVALID");
  }

  // Re-validate user is still active in Firestore
  const userDoc = await db.collection("users").doc(payload.uid).get();
  if (!userDoc.exists) {
    throw new AppError(401, "User no longer exists.", "USER_NOT_FOUND");
  }

  const userData = userDoc.data() as UserRecord;
  if (!userData.active) {
    throw new AppError(403, "Account has been deactivated.", "ACCOUNT_INACTIVE");
  }

  const newPayload = { uid: payload.uid, email: payload.email, role: userData.role };
  const newAccessToken = signAccessToken(newPayload);
  const newRefreshToken = signRefreshToken(newPayload);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    expiresIn: 15 * 60,
  };
}

export async function logoutUser(_uid: string): Promise<void> {
  // Future: invalidate refresh token from whitelist/blacklist store
}

