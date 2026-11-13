import { z } from "zod";

export const createPaymentEntrySchema = z.object({
  projectId: z
    .string({ error: "Project ID is required." })
    .min(1, "Project ID is required."),
  projectCode: z.string().optional().default(""),
  projectTitle: z
    .string({ error: "Project Title is required." })
    .min(1, "Project Title is required."),
  clientName: z.string().optional().default(""),
  type: z.enum(["received", "invested"], {
    error: "Type must be either 'received' or 'invested'.",
  }),
  amount: z
    .number({ error: "Amount must be a positive number." })
    .positive("Amount must be greater than zero."),
  date: z
    .string({ error: "Date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format."),
  title: z
    .string({ error: "Entry title / milestone name is required." })
    .min(2, "Title must be at least 2 characters.")
    .max(200, "Title cannot exceed 200 characters."),
  notes: z
    .string()
    .max(2000, "Notes cannot exceed 2000 characters.")
    .optional()
    .default(""),
  method: z
    .string()
    .max(100)
    .optional()
    .default("Bank Wire / NEFT"),
  referenceNo: z
    .string()
    .max(100)
    .optional()
    .default(""),
  status: z
    .enum(["cleared", "pending", "reconciled"])
    .default("cleared"),
});

export const updatePaymentEntrySchema = z
  .object({
    type: z.enum(["received", "invested"]).optional(),
    amount: z.number().positive().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    title: z.string().min(2).max(200).optional(),
    notes: z.string().max(2000).optional(),
    method: z.string().max(100).optional(),
    referenceNo: z.string().max(100).optional(),
    status: z.enum(["cleared", "pending", "reconciled"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreatePaymentEntrySchema = z.infer<typeof createPaymentEntrySchema>;
export type UpdatePaymentEntrySchema = z.infer<typeof updatePaymentEntrySchema>;

