import { z } from "zod";

const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

export const passwordSchema = z
  .string({ error: "Password is required." })
  .min(8, "Password must be at least 8 characters.")
  .max(100, "Password must be at most 100 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least one digit.");

export const nameSchema = z
  .string({ error: "Full name is required." })
  .trim()
  .min(2, "Full name must be at least 2 characters.")
  .max(80, "Full name must be at most 80 characters.")
  .regex(/^[a-zA-Z\s.'-]+$/, "Full name contains invalid characters.");

export const emailSchema = z
  .string({ error: "Work email is required." })
  .trim()
  .toLowerCase()
  .email("Must be a valid email address.")
  .max(100, "Email must be at most 100 characters.");

export const phoneSchema = z
  .string({ error: "Contact number is required." })
  .trim()
  .min(7, "Contact number must be at least 7 characters.")
  .max(20, "Contact number must be at most 20 characters.")
  .regex(phoneRegex, "Must be a valid contact number (e.g. +91 98765 43210).")
  .refine((val) => {
    const digitsOnly = val.replace(/\D/g, "");
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  }, "Contact number must contain between 7 and 15 digits.");

export const createUserSchema = z
  .object({
    displayName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    contactNo: phoneSchema,
    role: z.enum(["employee", "client"], {
      error: "Role must be 'employee' or 'client'.",
    }),
    contactEmail: z
      .string()
      .trim()
      .toLowerCase()
      .email("Contact email must be a valid email address.")
      .max(100)
      .optional()
      .or(z.literal("")),
    portfolioUrl: z
      .string()
      .trim()
      .max(200)
      .optional()
      .or(z.literal("")),
  })
  .strict();

export const updateUserSchema = z
  .object({
    displayName: nameSchema.optional(),
    active: z.boolean().optional(),
    password: passwordSchema.optional(),
    contactNo: phoneSchema.optional(),
    contactEmail: z
      .string()
      .trim()
      .toLowerCase()
      .email("Contact email must be a valid email address.")
      .max(100)
      .optional()
      .or(z.literal("")),
    portfolioUrl: z
      .string()
      .trim()
      .max(200)
      .optional()
      .or(z.literal("")),
  })
  .strict();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
