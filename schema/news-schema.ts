import { z } from "zod";
import { SeoSchema } from "./seo-schema";

export const newsSchema = z.object({
  id: z.number().int().positive(),
  ar_title: z.string().min(1),
  en_title: z.string().min(1),
  ar_summary: z.string().optional(),
  en_summary: z.string().optional(),
  ar_content: z.string().min(1, { message: "Content is required" }),
  en_content: z.string().min(1, { message: "Content is required" }),
  is_published: z.boolean().default(false),
  seo: SeoSchema.optional(),
  image: z.any().array().default([]),
  slug: z.string().min(1, { message: "Slug is required and must be unique" }),
  createdBy: z.string().default("admin"),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date(),
});

export const createNewsSchema = newsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const updateNewsSchema = newsSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type NewsSchema = z.infer<typeof newsSchema>;
export type CreateNewsSchema = z.infer<typeof createNewsSchema>;
export type UpdateNewsSchema = z.infer<typeof updateNewsSchema>;
