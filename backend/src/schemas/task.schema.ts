import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({ error: "Task name is required." })
    .min(2, "Task name must be at least 2 characters.")
    .max(200, "Task name cannot exceed 200 characters."),
  description: z
    .string()
    .max(3000, "Description cannot exceed 3000 characters.")
    .default(""),
  dueDate: z
    .string({ error: "Due date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Due date must be in YYYY-MM-DD format."),
  assignedTo: z
    .string({ error: "Please select an employee to assign this task." })
    .min(1, "Please select an employee to assign this task."),
  assignedEmployeeName: z
    .string({ error: "Assigned employee name is required." })
    .min(1, "Assigned employee name is required."),
  assignedEmployeeEmail: z
    .string()
    .email("Invalid employee email format.")
    .optional(),
  assignedEmployeeRole: z
    .string()
    .max(100)
    .optional(),
  priority: z
    .enum(["low", "medium", "high", "urgent"])
    .default("medium"),
  status: z
    .enum(["todo", "in-progress", "review", "completed"])
    .default("todo"),
});

export const updateTaskSchema = z
  .object({
    title: z.string().min(2).max(200).optional(),
    description: z.string().max(3000).optional(),
    dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    assignedTo: z.string().min(1).optional(),
    assignedEmployeeName: z.string().min(1).optional(),
    assignedEmployeeEmail: z.string().email().optional(),
    assignedEmployeeRole: z.string().max(100).optional(),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    status: z.enum(["todo", "in-progress", "review", "completed"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;

