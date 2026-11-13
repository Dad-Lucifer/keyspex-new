import { z } from "zod";

export const createProjectSchema = z.object({
  code: z.string().min(1).max(20).trim().optional(),
  title: z
    .string({ error: "Project name is required." })
    .min(2, "Project name must be at least 2 characters.")
    .max(200, "Project name is too long.")
    .trim(),
  description: z.string().trim().max(2000).optional().default(""),
  clientId: z.string().min(1).max(50).trim().optional().default("CLI-INTERNAL"),
  clientName: z.string().min(1).max(200).trim().optional().default("Internal / Direct"),
  amount: z
    .number({ error: "Budget must be a number." })
    .int("Budget must be an integer.")
    .positive("Budget must be greater than 0."),
  sharePercent: z
    .number({ error: "sharePercent must be a number." })
    .min(0)
    .max(100)
    .optional()
    .default(0),
  status: z
    .enum(["on-track", "near-deadline", "at-risk", "completed", "paused"], {
      error: "Invalid project status.",
    })
    .optional()
    .default("on-track"),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "startDate must be YYYY-MM-DD")
    .optional()
    .default(() => new Date().toISOString().split("T")[0]),
  endDate: z
    .string({ error: "Deadline is required (YYYY-MM-DD)." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be YYYY-MM-DD"),
  // assignedTo / assignedNames are intentionally excluded from create:
  // engineers join a project by signing a contract, not by admin assignment.
});

export const updateProjectSchema = z
  .object({
    title: z.string().min(2).max(200).trim().optional(),
    description: z.string().trim().max(2000).optional(),
    clientId: z.string().min(1).max(50).trim().optional(),
    clientName: z.string().min(1).max(200).trim().optional(),
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
    // assignedTo / assignedNames are managed exclusively by the contract service
    // and must NOT be updatable via the project PATCH endpoint.
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

