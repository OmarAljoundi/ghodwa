import { z } from "zod";
import { SeoSchema } from "./seo-schema";

export const serviceSchema = z.object({
  id: z.number().int().positive(),
  ar_title: z.string().min(1),
  en_title: z.string().min(1),
  ar_content: z.string().min(1, { message: "Content is required" }),
  en_content: z.string().min(1, { message: "Content is required" }),
  is_published: z.boolean().default(false),
  seo: SeoSchema.optional(),
  image: z.any().optional(),
  en_icon: z.any().optional(),
  ar_icon: z.any().optional(),
  order: z.number().optional(),
  slug: z.string().min(1, { message: "Slug is required and must be unique" }),
  createdBy: z.string().default("admin"),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date(),
});

export const createServiceSchema = serviceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateServiceSchema = serviceSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
export type CreateServiceSchema = z.infer<typeof createServiceSchema>;
export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;
