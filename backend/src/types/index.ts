import type { Timestamp } from "firebase-admin/firestore";

export type UserRole = "admin" | "employee" | "client";

export interface UserRecord {
  uid: string;
  email: string;
  role: UserRole;
  displayName: string;
  createdBy?: string;    // uid of admin who created the user (not set for super-admin)
  createdAt: Timestamp;
  updatedAt: Timestamp;
  active: boolean;
  lastLoginAt?: Timestamp;
  contactNo?: string;
  contactEmail?: string;
  portfolioUrl?: string;
}

export interface JwtPayload {
  uid: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  expiresIn: number;
}

