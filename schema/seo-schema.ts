import { z } from "zod";

export const SeoSchema = z.object({
  ar_metaTitle: z.string().optional().nullable(),
  en_metaTitle: z.string().optional().nullable(),
  ar_metaDescription: z.string().optional().nullable(),
  en_metaDescription: z.string().optional().nullable(),
  ar_metaKeywords: z
    .object({ id: z.string(), text: z.string() })
    .array()
    .nullable()
    .default([]),
  en_metaKeywords: z
    .object({ id: z.string(), text: z.string() })
    .array()
    .nullable()
    .default([]),
});

export type SeoSchema = z.infer<typeof SeoSchema>;
