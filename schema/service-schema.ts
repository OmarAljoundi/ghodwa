import { z } from "zod";
import { SeoSchema } from "./seo-schema";
import { fileSchemaRequired } from "./upload-schema";

export const serviceSchema = z.object({
  id: z.number().int().positive(),
  ar_title: z.string().min(1),
  en_title: z.string().min(1),
  ar_content: z.string().min(1, { message: "Content is required" }),
  en_content: z.string().min(1, { message: "Content is required" }),
  is_published: z.boolean().default(false),
  seo: SeoSchema.optional(),
  image: fileSchemaRequired,
  en_icon: fileSchemaRequired,
  ar_icon: fileSchemaRequired,
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
export const updateServiceSchema = serviceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
export type CreateServiceSchema = z.infer<typeof createServiceSchema>;
export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;
