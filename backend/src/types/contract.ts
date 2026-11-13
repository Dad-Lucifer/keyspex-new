import type { Timestamp } from "firebase-admin/firestore";

export type ContractStatus = "draft" | "sent" | "signed" | "revoked";

export interface DigitalSignature {
  signatoryName: string;
  signatoryRole: string;
  signedDate: string;
  certHash: string;
  status: "Verified" | "Signed" | "Pending";
}

export interface ContractRecord {
  id: string;
  title: string;
  agreementType: string;
  companyName: string;
  companyAddress: string;
  companyCin: string;
  contractDate: string;

  // Employee Signatory (Party 2)
  employeeUid: string;
  employeeName: string;
  employeeEmail: string;
  employeeRole: string;
  employeePhone: string;

  // Project Details
  projectCode: string;
  projectTitle: string;
  clientName: string;
  remuneration: number;
  paymentTerms: string;
  startDate: string;
  endDate: string;

  // Clauses
  scopeDetails: string;
  compensationClause: string;
  ndaClause: string;

  // Digital Signatures (IT Act Compliant)
  party1Admin: DigitalSignature;
  party2Employee: DigitalSignature;

  status: ContractStatus;
  verificationTimestamp: string;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

