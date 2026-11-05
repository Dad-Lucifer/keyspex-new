import { z } from "zod";

export const createProjectSchema = z.object({
  code: z.string({ error: "Project code is required." }).min(1).max(20),
  title: z.string({ error: "Title is required." }).min(2).max(200),
  clientId: z.string({ error: "Client ID is required." }).min(1).max(50),
  clientName: z.string({ error: "Client name is required." }).min(1).max(200),
  amount: z.number({ error: "Amount must be a number." }).int().positive(),
  sharePercent: z
    .number({ error: "sharePercent must be a number." })
    .min(0)
    .max(100),
  status: z.enum(["on-track", "near-deadline", "at-risk", "completed", "paused"], {
    error: "Invalid project status.",
  }),
  startDate: z
    .string({ error: "startDate is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "startDate must be YYYY-MM-DD"),
  endDate: z
    .string({ error: "endDate is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "endDate must be YYYY-MM-DD"),
});

export const updateProjectSchema = z
  .object({
    title: z.string().min(2).max(200).optional(),
    clientId: z.string().min(1).max(50).optional(),
    clientName: z.string().min(1).max(200).optional(),
    amount: z.number().int().positive().optional(),
    sharePercent: z.number().min(0).max(100).optional(),
    status: z
      .enum(["on-track", "near-deadline", "at-risk", "completed", "paused"])
      .optional(),
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "startDate must be YYYY-MM-DD")
      .optional(),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "endDate must be YYYY-MM-DD")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

