import { z } from "zod";

export const baseEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  location: z.string().min(1, "Location is required"),
});

export const eventSchema = baseEventSchema.transform((data) => ({
  ...data,
  date: new Date(data.date),
}));

export type EventFormData = z.infer<typeof eventSchema>;
export type EventFormValues = z.infer<typeof baseEventSchema>;
