import { z } from "zod";

export const createInquirySchema = z.object({
  name: z
    .string({ error: "Name is required." })
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters.")
    .trim(),
  email: z
    .string({ error: "Email is required." })
    .email("Must be a valid email address.")
    .toLowerCase()
    .trim(),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  message: z
    .string({ error: "Message is required." })
    .min(5, "Message must be at least 5 characters.")
    .max(3000, "Message must be at most 3000 characters.")
    .trim(),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;

