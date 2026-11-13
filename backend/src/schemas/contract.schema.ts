import { z } from "zod";

export const createContractSchema = z.object({
  title: z
    .string({ error: "Contract agreement title is required." })
    .min(3, "Contract title must be at least 3 characters.")
    .max(200, "Contract title is too long.")
    .trim(),
  agreementType: z
    .string()
    .trim()
    .optional()
    .default("Project Assignment Contract"),

  // Employee Details (Party 2)
  employeeUid: z
    .string({ error: "Employee UID is required." })
    .min(1, "Employee UID is required.")
    .trim(),
  employeeName: z
    .string({ error: "Employee name is required." })
    .min(2, "Employee name is required.")
    .max(100)
    .trim(),
  employeeEmail: z
    .string({ error: "Employee email is required." })
    .email("Must be a valid email address.")
    .toLowerCase()
    .trim(),
  employeeRole: z
    .string({ error: "Employee designation/role is required." })
    .min(2, "Role is required.")
    .max(100)
    .trim(),
  employeePhone: z
    .string()
    .trim()
    .optional()
    .default("+91 98765 43210"),

  // Project Scope & Details
  projectCode: z
    .string({ error: "Project code is required." })
    .min(1)
    .max(50)
    .trim(),
  projectTitle: z
    .string({ error: "Project title is required." })
    .min(2)
    .max(200)
    .trim(),
  clientName: z
    .string()
    .max(200)
    .trim()
    .optional()
    .default("Zenith Cloud Solutions"),
  remuneration: z
    .number({ error: "Milestone remuneration must be a number." })
    .int("Remuneration must be an integer.")
    .positive("Remuneration must be greater than zero."),
  paymentTerms: z
    .string()
    .trim()
    .optional()
    .default("Milestone Settlement"),
  startDate: z
    .string({ error: "Start date is required." })
    .trim(),
  endDate: z
    .string({ error: "End date / schedule deadline is required." })
    .trim(),

  // Clauses
  scopeDetails: z.string().trim().optional(),
  compensationClause: z.string().trim().optional(),
  ndaClause: z.string().trim().optional(),

  status: z
    .enum(["draft", "sent", "signed", "revoked"])
    .optional()
    .default("sent"),
});

export const updateContractStatusSchema = z.object({
  status: z.enum(["draft", "sent", "signed", "revoked"]),
});

export type CreateContractInput = z.infer<typeof createContractSchema>;
export type UpdateContractStatusInput = z.infer<typeof updateContractStatusSchema>;

