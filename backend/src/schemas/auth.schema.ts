import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: "Email is required." })
    .email("Must be a valid email address.")
    .toLowerCase()
    .trim(),
  password: z
    .string({ error: "Password is required." })
    .min(8, "Password must be at least 8 characters."),
});

export const refreshSchema = z.object({
  // refresh token is read from httpOnly cookie, but accept it in body too
});

export type LoginInput = z.infer<typeof loginSchema>;

