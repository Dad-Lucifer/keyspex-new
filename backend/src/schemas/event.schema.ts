import { z } from "zod";

const EVENT_TAGS = [
  "Project Deadline",
  "Operations",
  "Financial",
  "Client Meeting",
  "HR",
  "Review",
] as const;

export const createEventSchema = z.object({
  date: z
    .string({ error: "date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  title: z.string({ error: "Title is required." }).min(2).max(200),
  time: z
    .string({ error: "time is required." })
    .regex(/^\d{1,2}:\d{2}\s?(AM|PM)$/i, "time must be like '10:30 AM'"),
  context: z.string({ error: "context is required." }).min(1).max(300),
  tag: z.enum(EVENT_TAGS, { error: "Invalid event tag." }),
});

export const updateEventSchema = z
  .object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD")
      .optional(),
    title: z.string().min(2).max(200).optional(),
    time: z
      .string()
      .regex(/^\d{1,2}:\d{2}\s?(AM|PM)$/i, "time must be like '10:30 AM'")
      .optional(),
    context: z.string().min(1).max(300).optional(),
    tag: z.enum(EVENT_TAGS).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;

