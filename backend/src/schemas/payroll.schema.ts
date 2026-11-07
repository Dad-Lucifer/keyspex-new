import { z } from "zod";

export const createSalaryPaymentSchema = z
  .object({
    employeeUid: z
      .string({ error: "Employee UID is required." })
      .min(1, "Employee UID is required.")
      .trim(),
    employeeName: z
      .string({ error: "Employee full name is required." })
      .min(2, "Employee full name must be at least 2 characters.")
      .max(100, "Employee name is too long.")
      .trim(),
    employeeEmail: z
      .string({ error: "Employee email is required." })
      .email("Must be a valid email address.")
      .toLowerCase()
      .trim(),
    amount: z
      .number({ error: "Salary amount must be a number." })
      .positive("Salary amount must be greater than zero.")
      .max(100000000, "Salary amount exceeds maximum threshold."),
    period: z
      .string()
      .trim()
      .min(2, "Pay period must be specified (e.g. November 2024).")
      .optional()
      .default("November 2024"),
    paymentMethod: z
      .string()
      .trim()
      .optional()
      .default("Direct Bank Transfer (NEFT/ACH)"),
    notes: z.string().trim().max(500).optional().or(z.literal("")),
  })
  .strict();

export type CreateSalaryPaymentInput = z.infer<typeof createSalaryPaymentSchema>;

