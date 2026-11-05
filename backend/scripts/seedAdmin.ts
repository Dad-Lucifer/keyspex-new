/**
 * One-time script to seed the initial Admin user.
 * Run: ts-node scripts/seedAdmin.ts
 * 
 * Set ADMIN_EMAIL and ADMIN_PASSWORD as env vars before running.
 */
import "dotenv/config";
import { auth, db } from "../src/config/firebase";
import { Timestamp } from "firebase-admin/firestore";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const displayName = process.env.ADMIN_DISPLAY_NAME ?? "KeySpex Admin";

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables.");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  try {
    let firebaseUser;
    try {
      firebaseUser = await auth.getUserByEmail(email);
      console.log(`User already exists: ${firebaseUser.uid}. Updating credentials...`);
      await auth.updateUser(firebaseUser.uid, { password, displayName });
    } catch {
      firebaseUser = await auth.createUser({ email, password, displayName });
      console.log(`Created Firebase Auth user: ${firebaseUser.uid}`);
    }

    await auth.setCustomUserClaims(firebaseUser.uid, { role: "admin" });

    const now = Timestamp.now();
    await db.collection("users").doc(firebaseUser.uid).set(
      {
        uid: firebaseUser.uid,
        email,
        role: "admin",
        displayName,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      { merge: true }
    );

    console.log(`✅ Admin seeded successfully. UID: ${firebaseUser.uid}`);
    process.exit(0);
  } catch (err) {
    console.error("Failed to seed admin:", err);
    process.exit(1);
  }
}

seedAdmin();

