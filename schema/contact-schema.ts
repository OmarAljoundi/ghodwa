import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z
    .string()
    .email({ message: "You must enter a valid email" })
    .min(1, "Email is required"),
  subject: z.string().min(10, "Subject should be at least 10 characters"),
  message: z
    .string()
    .min(10, { message: "Message should be at least 10 characters" }),
});

export type ContactSchema = z.infer<typeof contactSchema>;
