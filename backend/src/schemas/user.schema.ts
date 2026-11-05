import { z } from "zod";

const passwordSchema = z
  .string({ error: "Password is required." })
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least one digit.");

export const createUserSchema = z.object({
  email: z
    .string({ error: "Email is required." })
    .email("Must be a valid email address.")
    .toLowerCase()
    .trim(),
  password: passwordSchema,
  displayName: z
    .string({ error: "Display name is required." })
    .min(2, "Display name must be at least 2 characters.")
    .max(80, "Display name must be at most 80 characters.")
    .trim(),
  role: z.enum(["employee", "client"], {
    error: "Role must be 'employee' or 'client'.",
  }),
});

export const updateUserSchema = z.object({
  displayName: z.string().min(2).max(80).trim().optional(),
  active: z.boolean().optional(),
  password: passwordSchema.optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

