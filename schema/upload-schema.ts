import { z } from 'zod';

export const fileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  lastModified: z.number().optional(),
  customId: z.string().nullable(),
  key: z.string(),
  url: z.url(),
  appUrl: z.url(),
  fileHash: z.string(),
  ufsUrl: z.string().default(''),
});

export const fileSchemaRequired = fileSchema.optional().superRefine((val, ctx) => {
  if (typeof val !== 'object' || val === null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Image is required and must be a valid object',
    });
  } else if (!('url' in val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Image object must have a 'url' property",
    });
  }
});

export const fileSchemaArrayRequired = fileSchema
  .array()
  .min(1, { message: 'At least one image must be added' })
  .default([]);
