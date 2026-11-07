import { db } from "../config/firebase";
import { Timestamp } from "firebase-admin/firestore";
import type { CreateInquiryInput } from "../schemas/inquiry.schema";

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: Timestamp;
}

export async function createInquiry(input: CreateInquiryInput): Promise<InquiryRecord> {
  const collectionRef = db.collection("inquiries");
  const docRef = collectionRef.doc();
  const now = Timestamp.now();

  const record: InquiryRecord = {
    id: docRef.id,
    name: input.name,
    email: input.email,
    ...(input.phone ? { phone: input.phone } : {}),
    ...(input.service ? { service: input.service } : {}),
    message: input.message,
    status: "new",
    createdAt: now,
  };

  await docRef.set(record);
  return record;
}

export async function listInquiries(limit = 50): Promise<InquiryRecord[]> {
  const snapshot = await db
    .collection("inquiries")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => doc.data() as InquiryRecord);
}

