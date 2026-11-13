import { Timestamp } from "firebase-admin/firestore";

export type PaymentEntryType = "received" | "invested";
export type PaymentEntryStatus = "cleared" | "pending" | "reconciled";

export interface PaymentTimelineRecord {
  id: string;
  projectId: string;
  projectCode: string;
  projectTitle: string;
  clientName: string;
  type: PaymentEntryType; // "received" (Client payment received) | "invested" (Investment / Expense incurred)
  amount: number; // INR
  date: string; // YYYY-MM-DD
  title: string; // e.g. "Milestone 1 Advance Payment (40%)", "Cloud Server & GPU Hosting"
  notes?: string;
  method?: string; // "Bank Wire / NEFT", "UPI", "Stripe", "Cheque", "Corporate Card"
  referenceNo?: string; // UTR / Txn reference number
  status: PaymentEntryStatus;
  createdBy?: string;
  createdByName?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreatePaymentEntryInput {
  projectId: string;
  projectCode?: string;
  projectTitle: string;
  clientName?: string;
  type: PaymentEntryType;
  amount: number;
  date: string; // YYYY-MM-DD
  title: string;
  notes?: string;
  method?: string;
  referenceNo?: string;
  status?: PaymentEntryStatus;
}

export interface UpdatePaymentEntryInput {
  type?: PaymentEntryType;
  amount?: number;
  date?: string;
  title?: string;
  notes?: string;
  method?: string;
  referenceNo?: string;
  status?: PaymentEntryStatus;
}

export interface ProjectPaymentSummary {
  projectId: string;
  projectCode: string;
  projectTitle: string;
  clientName: string;
  budget: number; // Total Project Budget in INR
  totalReceived: number; // Total received from client
  totalInvested: number; // Total invested / spent on project
  netBalance: number; // totalReceived - totalInvested (profit / retained cash)
  remainingBudget: number; // budget - totalReceived (outstanding to be collected)
  collectionPercent: number; // (totalReceived / budget) * 100
  entriesCount: number;
}

