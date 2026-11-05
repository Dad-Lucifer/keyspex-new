import { z } from "zod";

export const createObligationSchema = z.object({
  dueDate: z
    .string({ error: "dueDate is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "dueDate must be YYYY-MM-DD"),
  title: z.string({ error: "Title is required." }).min(2).max(200),
  account: z.string({ error: "Account is required." }).min(1).max(200),
  amount: z.number({ error: "Amount must be a number." }).int().positive(),
  status: z.enum(["overdue", "scheduled", "pending-auth", "paid"], {
    error: "Invalid obligation status.",
  }),
});

export const updateObligationSchema = z
  .object({
    dueDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "dueDate must be YYYY-MM-DD")
      .optional(),
    title: z.string().min(2).max(200).optional(),
    account: z.string().min(1).max(200).optional(),
    amount: z.number().int().positive().optional(),
    status: z.enum(["overdue", "scheduled", "pending-auth", "paid"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateObligationInput = z.infer<typeof createObligationSchema>;
export type UpdateObligationInput = z.infer<typeof updateObligationSchema>;

